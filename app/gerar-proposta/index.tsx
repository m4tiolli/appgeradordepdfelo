import Input from "@/components/InputWithInfo";
import { InputsPropostas } from "@/constants/InputsGerarProposta";
import { onChange } from "@/hooks/Handles";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import axios from "axios";
import DatePickerField from "@/components/DatePicker";
import { Select } from "@/components/Select";
import { getToken } from "@/hooks/TokenValid";
import { Values } from "@/interfaces/Input";

export default function Index() {
  const [values, setValues] = useState<Values>({
    proposta: "",
    data: new Date(),
    cnpj: 0,
    fatorFinanceiroMes: 0,
    nomeEmpresa: "",
    razao: "",
    potencia: 0,
    valorContaEnergia: 0,
    vendedor: "",
    departamentoVendedor: "",
    telefoneVendedor: "",
    emailVendedor: "",
    tomador: "",
    departamentoTomador: "",
    telefoneTomador: "",
    emailTomador: "",
    valor: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [fatores, setFatores] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);

  const [departamentos, setDepartamentos] = useState<any>([]);

  const token = getToken();

  const buscarDadosUsuario = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_URL_API + "api/perfil",
        {
          headers: { Authorization: await token },
        }
      );
      setValues((prev) => ({
        ...prev,
        vendedor: response.data?.nome,
        emailVendedor: response.data?.email,
        telefoneVendedor: response.data?.telefone1,
        departamentoVendedor: response.data?.departamento,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const buscarDepartamentos = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_URL_API + "api/departamentos"
      );
      setDepartamentos(
        response.data.map((departamento: any) => ({
          label: departamento.nome,
          value: departamento.nome,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const buscarFatores = async () => {
    try {
      const response = await axios.get(
        process.env.EXPO_PUBLIC_URL_API + "api/fatores-financeiros"
      );
      setFatores(response.data);
      setOptions(
        response.data.map((fator: any) => ({
          label: fator.meses + " meses",
          value: fator.meses,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.EXPO_PUBLIC_URL_API + "api/proxima-proposta")
      .then((response) =>
        setValues((prev) => ({ ...prev, proposta: response.data.proposta }))
      );
    buscarDadosUsuario();
    buscarDepartamentos();
    buscarFatores();
  }, []);

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const GerarPDF = () => {
    const dataString = (values.data as Date).toISOString().substring(0, 10);
    setValues((prev) => ({...prev, data: dataString}))
    console.log(values)
  }

  return (
    <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
      <View className="w-[90%] flex-1 items-center">
        <Text className="text-3xl text-[#38457a] font-semibold">
          Gerar nova proposta
        </Text>
        <ProgressSteps
          activeStepIconBorderColor="#38457a"
          progressBarColor="#38457a"
          labelColor="#38457a"
          activeLabelColor="#38457a"
          activeStepNumColor="#38457a"
          completedStepNumColor="#fff"
          completedCheckColor="#fff"
          completedStepIconColor="#38457a"
          completedProgressBarColor="#38457a"
          disabledStepNumColor="#38457a"
        >
          <ProgressStep
            label="Dados da proposta"
            nextBtnText="Avançar"
            previousBtnText="Voltar"
            nextBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            nextBtnTextStyle={{ color: "#ffffff" }}
            nextBtnDisabled={Object.values(values)
              .slice(0, 4)
              .some((value) => value === "")}
          >
            <View>
              {InputsPropostas({ values, onChange, setValues })
                .slice(0, 1)
                .map((props, index) => (
                  <Input key={index++} {...props} index={index} refs={refs} />
                ))}
              <View className="relative mt-4">
                <Text className="absolute font-semibold text-[#38457a]">
                  Duração de contrato
                </Text>
                <Select
                  setValues={setValues}
                  name="fatorFinanceiroMes"
                  fatores={options}
                  placeholder={"Duração do contrato"}
                />
              </View>
              <DatePickerField setValues={setValues} values={values} />
              {InputsPropostas({ values, onChange, setValues })
                .slice(1, 4)
                .map((props, index) => (
                  <Input key={index++} {...props} index={index} refs={refs} />
                ))}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Dados técnicos"
            nextBtnText="Avançar"
            previousBtnText="Voltar"
            nextBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            nextBtnTextStyle={{ color: "#ffffff" }}
            previousBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            previousBtnTextStyle={{ color: "#ffffff" }}
          >
            <View>
              {InputsPropostas({
                values,
                onChange,
                setValues,
                mesesFatorFinanceiro: fatores,
              })
                .slice(4, 6)
                .map((props, index) => (
                  <Input key={index++} {...props} index={index} refs={refs} />
                ))}
              {InputsPropostas({
                values,
                onChange,
                setValues,
              })
                .slice(13, 14)
                .map((props, index) => (
                  <Input key={index++} {...props} index={index} refs={refs} />
                ))}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Dados do vendedor"
            nextBtnText="Avançar"
            previousBtnText="Voltar"
            nextBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            nextBtnTextStyle={{ color: "#ffffff" }}
            previousBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            previousBtnTextStyle={{ color: "#ffffff" }}
          >
            <View>
              {InputsPropostas({ values, onChange, setValues })
                .slice(6, 10)
                .map((props, index) => (
                  <Input key={index++} {...props} index={index} refs={refs} />
                ))}
            </View>
          </ProgressStep>
          <ProgressStep
            onSubmit={GerarPDF}
            label="Dados do tomador"
            nextBtnText="Avançar"
            previousBtnText="Voltar"
            nextBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            nextBtnTextStyle={{ color: "#ffffff" }}
            previousBtnStyle={{
              backgroundColor: "#38457a",
              borderRadius: 5,
            }}
            previousBtnTextStyle={{ color: "#ffffff" }}
            finishBtnText="Finalizar"
          >
            <View>
              {InputsPropostas({ values, onChange, setValues })
                .slice(10, 13)
                .map((props, index) => (
                  <Input key={index++} {...props} index={index} refs={refs} />
                ))}

              <View className="relative mt-4">
                <Text className="absolute font-semibold text-[#38457a]">
                  Departamento do tomador
                </Text>
                <Select
                  setValues={setValues}
                  name="departamentoTomador"
                  fatores={departamentos}
                  placeholder={"Departamento do tomador"}
                />
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center bg-[#00000094]">
          <View className="bg-white p-4 rounded-md gap-y-4">
            <Text className="text-3xl font-semibold text-[#38457a] text-center">
              Proposta gerada!
            </Text>
            <View className="flex items-center justify-center gap-x-4 flex-row">
              <TouchableOpacity className="border-2 border-[#38457a] w-[40%] p-4 rounded-md flex items-center justify-center">
                <Text className="text-[#38457a] text-lg font-semibold">
                  Visualizar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#38457a]  w-[40%] p-4 rounded-md flex items-center justify-center">
                <Text className="text-white text-lg font-semibold">Baixar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
