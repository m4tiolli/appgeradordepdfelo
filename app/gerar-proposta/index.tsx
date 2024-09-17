import Input from "@/components/InputWithInfo";
import { InputsPropostas } from "@/constants/InputsGerarProposta";
import { onChange } from "@/hooks/Handles";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import axios from "axios";
import DatePickerField from "@/components/DatePicker";
import { Select } from "@/components/Select";
import { getToken } from "@/hooks/TokenValid";
import { Values } from "@/interfaces/Input";
import { router } from "expo-router";
import { RadioButton } from "react-native-paper";

export default function Index() {
  const [values, setValues] = useState<Values>({
    proposta: "",
    data: new Date(),
    cnpj: "",
    cnpjMask: "",
    fatorFinanceiroMes: 0,
    nomeEmpresa: "",
    razao: "",
    potencia: 0,
    valorContaEnergia: 0,
    valorContaEnergiaMask: "",
    vendedor: "",
    departamentoVendedor: "",
    telefoneVendedor: "",
    telefone2Vendedor: "",
    emailVendedor: "",
    tomador: "",
    departamentoTomador: "",
    telefoneTomador: "",
    emailTomador: "",
    valor: 0,
    valorMask: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [fatores, setFatores] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);
  const [linkPdf, setLinkPdf] = useState("");
  const [departamentos, setDepartamentos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [elo, setElo] = useState("S");
  const [propostas, setPropostas] = useState({
    propostaRecuperadora: "",
    propostaServicos: "",
  });

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
        telefone2Vendedor: response.data?.telefone2,
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
        process.env.EXPO_PUBLIC_URL_API + "api/ef/fatores-financeiros"
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
      .then((response) => setPropostas(response.data.proposta));
    buscarDadosUsuario();
    buscarDepartamentos();
    buscarFatores();
  }, []);

  useEffect(() => {
    const qual =
      elo === "S" ? propostas.propostaServicos : propostas.propostaRecuperadora;
    if (values.proposta !== qual) {
      setValues((prev) => ({ ...prev, proposta: qual }));
    }
  }, [elo, propostas, values.proposta]);

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

  const GerarPDF = async () => {
    setIsLoading(true);
    const idFator = fatores.find(
      (fator: any) => fator.meses === values.fatorFinanceiroMes
    );
    const dataString = (values.data as Date).toISOString();
    const sliced = dataString.slice(0, 10);
    function formatarData(data: string): string {
      const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];
      if (data.length === 10) {
        const [ano, mes, dia] = data.split("-");
        const mesNome = meses[parseInt(mes, 10) - 1];
        return `${dia} de ${mesNome} de ${ano}`;
      } else {
        return "";
      }
    }

    const dataToSend = {
      vendedor: values.vendedor,
      telefone1vendedor: values.telefoneVendedor,
      telefone2vendedor: values.telefone2Vendedor,
      emailvendedor: values.emailVendedor,
      departamentovendedor: values.departamentoVendedor,
      tomador: values.tomador,
      departamento: values.departamentoTomador,
      email: values.emailTomador,
      telefone: values.telefoneTomador,
      data: sliced,
      dataFull: formatarData(sliced),
      proposta: values.proposta,
      nomeEmpresa: values.nomeEmpresa,
      razao: values.razao,
      cnpj: values.cnpj,
      potencia: values.potencia,
      valor: values.valor,
      meses: values.fatorFinanceiroMes,
      valorContaEnergia: values.valorContaEnergia,
      fatorFinanceiroId: idFator.id,
      elo: elo
    };

    await axios
      .post(process.env.EXPO_PUBLIC_URL_API + "api/ef/gerar-pdf", dataToSend, {
        headers: { Authorization: await token },
      })
      .then((response) => setLinkPdf(response.data.downloadLink))
      .then(() => setIsLoading(false))
      .then(() => setModalVisible(true))
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const Passo1Desativado =
    values.fatorFinanceiroMes === 0 ||
    values.proposta === "" ||
    values.data === "" ||
    values.cnpj === "" ||
    values.razao === "" ||
    values.nomeEmpresa === "";

  const Passo2Desativado =
    values.potencia === "" ||
    values.valorContaEnergia === "" ||
    values.valor === 0;

  const Passo3Desativado =
    values.vendedor === "" ||
    values.emailVendedor === "" ||
    values.telefoneVendedor === "" ||
    values.departamentoVendedor === "";

  const Passo4Desativado =
    values.tomador === "" ||
    values.emailTomador === "" ||
    values.telefoneTomador === "" ||
    values.departamentoTomador === "";

  return (
    <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
      {isLoading ? (
        <SafeAreaView className="flex z-50 absolute w-full h-full flex-1 items-center justify-center bg-[#0000005b]">
          <View className="p-4 bg-white rounded-md">
            <ActivityIndicator size="large" color={"#38457a"} />
          </View>
        </SafeAreaView>
      ) : (
        ""
      )}
      <View className="w-full flex-1 items-center">
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
            nextBtnDisabled={Passo1Desativado}
          >
            <View>
              <View className="flex flex-row items-center justify-start">
                <Text className="font-semibold text-[#38457a]">Qual Elo:</Text>
                <RadioButton
                  value="Serviços"
                  status={elo === "S" ? "checked" : "unchecked"}
                  onPress={() => setElo("S")}
                  color="#38457a"
                />
                <Text className="font-medium text-[#38457a] -ml-1">
                  Serviços
                </Text>
                <RadioButton
                  value="Recuperadora"
                  status={elo === "R" ? "checked" : "unchecked"}
                  onPress={() => setElo("R")}
                  color="#38457a"
                />
                <Text className="font-medium text-[#38457a] -ml-1">
                  Recuperadora
                </Text>
              </View>
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
            nextBtnDisabled={Passo2Desativado}
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
            nextBtnDisabled={Passo3Desativado}
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
            nextBtnDisabled={Passo4Desativado}
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
            <Text className="text-xl font-normal text-[#38457a] text-center">
              A proposta {values.proposta} foi gerada e está salva na nuvem!
            </Text>
            <View className="flex items-center justify-center gap-x-4 flex-row">
              <TouchableOpacity
                onPress={() => router.push("/")}
                className="bg-white border border-[#38457a]  w-[40%] p-4 text-[#38457a] rounded-md flex items-center justify-center"
              >
                <Text className="text-[#38457a] text-lg font-semibold">
                  Voltar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(linkPdf)}
                className="bg-[#38457a]  w-[40%] p-4 rounded-md flex items-center justify-center"
              >
                <Text className="text-white text-lg font-semibold">Baixar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
