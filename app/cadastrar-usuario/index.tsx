import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MaskInput from "react-native-mask-input";
import RNPickerSelect from "react-native-picker-select";
import { fetchDepartamentos } from "@/hooks/Fetchs";
import axios from "axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface Values {
  [key: string]: {
    value: string | boolean;
    placeholder: string;
  };
}

export default function CadastrarUsuario() {
  const [values, setValues] = useState<Values>({
    nome: { value: "", placeholder: "Nome" },
    email: { value: "", placeholder: "E-mail" },
    administrador: { value: false, placeholder: "Administrador" },
    telefone1: { value: "", placeholder: "Telefone 1" },
    telefone2: { value: "", placeholder: "Telefone 2" },
    departamento: { value: "", placeholder: "Departamento" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [deptos, setDeptos] = useState<any>();

  useEffect(() => {
    const preencher = async () => {
      const departamentos = await fetchDepartamentos();
      setDeptos(
        departamentos.map((d: any) => ({ label: d.nome, value: d.nome }))
      );
      setIsMounted(true);
    };
    preencher();
  }, []);

  const onChange = (name: string, text: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: { value: text, placeholder: prev[name].placeholder },
    }));
  };

  if (!isMounted) {
    return (
      <View className="w-full h-full bg-white flex items-center justify-center">
        <ActivityIndicator color="#38457a" size="large" />
      </View>
    );
  }

  const disabled = values.nome.value === "" ||
    values.email.value === "" ||
    values.telefone1.value === "" ||
    values.telefone2.value === "" ||
    values.departamento.value === "" ||
    values.administrador.value === false

  const Cadastrar = () => {
    setIsLoading(true);
    const body = {
      nome: values.nome.value,
      email: values.email.value,
      administrador: values.administrador.value,
      telefone1: values.telefone1.value,
      telefone2: values.telefone2.value,
      departamento: values.departamento.value,
    };
    axios
      .post(process.env.EXPO_PUBLIC_URL_API + "api/cadastrar-usuario", body)
      .then(() => setIsLoading(false))
      .then(() =>
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Usuário criado com sucesso",
        })
      )
      .then(() =>
        setTimeout(() => {
          router.push("/");
        }, 5000)
      )
      .catch((error) => {
        setIsLoading(false);
        Toast.show({
          type: "error",
          text1: "Erro!",
          text2: error.response.data,
        });
      });
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-3xl font-semibold text-[#38457a]">
        Cadastrar usuário
      </Text>
      {Object.keys(values).map((key, index) => {
        if (
          key !== "administrador" &&
          key !== "telefone1" &&
          key !== "telefone2" &&
          key !== "departamento"
        ) {
          return (
            <TextInput
              className="w-[80%] border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
              key={index++}
              onChangeText={(text) => onChange(key, text)}
              placeholder={values[key].placeholder}
              placeholderTextColor={"#ffffffd4"}
            />
          );
        } else if (key === "administrador") {
          return (
            <View key={index++} className="w-[80%] mt-4">
              <BouncyCheckbox
                onPress={(isChecked: boolean) =>
                  setValues((prev) => ({
                    ...prev,
                    [key]: {
                      value: isChecked,
                      placeholder: prev[key].placeholder,
                    },
                  }))
                }
                iconStyle={{ borderColor: "#38457a", borderRadius: 5 }}
                fillColor="#38457a"
                textStyle={{ textDecorationLine: "none" }}
                size={30}
                isChecked={values[key].value as boolean}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                textComponent={
                  <Text className="text-[#38457a] text-2xl font-medium ml-4">
                    {values[key].placeholder}
                  </Text>
                }
              />
            </View>
          );
        } else if (key === "telefone1" || key === "telefone2") {
          return (
            <MaskInput
              key={index++}
              className="w-[80%] border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
              placeholder={values[key].placeholder}
              placeholderTextColor="#ffffffd4"
              onChangeText={(masked, unmasked) => onChange(key, masked)}
              value={values[key].value as string}
              mask={[
                "(",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              keyboardType="numeric"
            />
          );
        } else if (key === "departamento") {
          return (
            <View key={index++} className="w-[80%]">
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    height: 44,
                    width: "100%",
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    backgroundColor: "#38457af8",
                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: "#38457ad4",
                    marginTop: 16,
                    color: "#fff",
                  },
                }}
                placeholder={{
                  label: values[key].placeholder,
                  value: "",
                }}
                onValueChange={(value) =>
                  setValues((prev: any) => ({
                    ...prev,
                    [key]: {
                      value: value,
                      placeholder: prev[key].placeholder,
                    },
                  }))
                }
                items={deptos}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          );
        }
        return null;
      })}

      <TouchableOpacity
        className={`bg-[#38457a] p-4 mt-4 rounded-md w-[80%] ${disabled ? "opacity-60 " : ""}`}
        onPress={Cadastrar}
        disabled={disabled}
      >
        <Text className="text-center text-white font-semibold text-2xl">
          {isLoading ? <ActivityIndicator color="#fff" /> : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
}
