import Input from "@/components/InputWithInfo";
import { InputsPropostas } from "@/constants/InputsGerarProposta";
import { onChange } from "@/hooks/Handles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import axios from "axios";

export default function Index() {
  const [values, setValues] = useState({
    proposta: "",
    data: "",
    cnpj: "",
    nomeEmpresa: "",
    razao: "",
    potencia: "",
    valorContaEnergia: "",
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

  useEffect(() => {
    axios
      .get(process.env.EXPO_PUBLIC_URL_API + "api/proxima-proposta")
      .then((response) =>
        setValues((prev) => ({ ...prev, proposta: response.data.proposta }))
      );
  }, []);

  return (
    <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
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
        >
          <View>
            {InputsPropostas({ values, onChange, setValues })
              .slice(0, 5)
              .map((props, index) => (
                <Input key={index++} {...props} />
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
            {InputsPropostas({ values, onChange, setValues })
              .slice(5, 7)
              .map((props, index) => (
                <Input key={index++} {...props} />
              ))}
            {InputsPropostas({ values, onChange, setValues })
              .slice(14, 15)
              .map((props, index) => (
                <Input key={index++} {...props} />
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
              .slice(7, 11)
              .map((props, index) => (
                <Input key={index++} {...props} />
              ))}
          </View>
        </ProgressStep>
        <ProgressStep
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
        >
          <View>
            {InputsPropostas({ values, onChange, setValues })
              .slice(11, 14)
              .map((props, index) => (
                <Input key={index++} {...props} />
              ))}
          </View>
        </ProgressStep>
      </ProgressSteps>
    </SafeAreaView>
  );
}
