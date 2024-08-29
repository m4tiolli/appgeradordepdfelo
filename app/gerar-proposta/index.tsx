import Input from "@/components/InputWithInfo";
import { InputsPropostas } from "@/constants/InputsGerarProposta";
import { onChange } from "@/hooks/Handles";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

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
  const [step1Data, setStep1Data] = useState({ name: "", address: "" });
  const [step2Data, setStep2Data] = useState({ email: "", username: "" });
  const [step3Data, setStep3Data] = useState({
    password: "",
    retypePassword: "",
  });
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
              .slice(0, 7)
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
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={step2Data.email}
              onChangeText={(text) =>
                setStep2Data({ ...step2Data, email: text })
              }
            />
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={step2Data.username}
              onChangeText={(text) =>
                setStep2Data({ ...step2Data, username: text })
              }
            />
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
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={step3Data.password}
              onChangeText={(text) =>
                setStep3Data({ ...step3Data, password: text })
              }
            />
            <Text style={styles.label}>Retype Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Retype Password"
              secureTextEntry={true}
              value={step3Data.retypePassword}
              onChangeText={(text) =>
                setStep3Data({ ...step3Data, retypePassword: text })
              }
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
  },
});
