import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";
import RNPickerSelect from "react-native-picker-select";
import { fetchDepartamentos } from "@/hooks/Fetchs";
import axios from "axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { getToken } from "@/hooks/TokenValid";

interface Values {
  [key: string]: {
    value: string | boolean;
    placeholder: string;
  };
}

export default function AtualizarDados() {
  const [values, setValues] = useState<Values>({
    nome: { value: "", placeholder: "Nome" },
    email: { value: "", placeholder: "E-mail" },
    telefone1: { value: "", placeholder: "Telefone 1" },
    telefone2: { value: "", placeholder: "Telefone 2" },
    departamento: { value: "", placeholder: "Departamento" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState([false, false]);
  const [deptos, setDeptos] = useState<any>();
  const [token, setToken] = useState("")

  useEffect(() => {
    const pegarToken = async () => {
      const t = await getToken()
      setToken(t as string)
    }
    pegarToken()
  })

  useEffect(() => {
    const preencher = async () => {
      const departamentos = await fetchDepartamentos();
      setDeptos(
        departamentos.map((d: any) => ({ label: d.nome, value: d.nome }))
      );
      setIsMounted([true, false]);
    };
    preencher();
  }, []);

  useEffect(() => {
    const pegarDados = async () => {
      const token = await getToken();
      try {
        const res = await axios.get(process.env.EXPO_PUBLIC_URL_API + "api/perfil", {
          headers: { Authorization: token as unknown as string },
        });
        const userData = res.data;
        console.log(userData);
        setValues({
          nome: { value: userData.nome, placeholder: "Nome" },
          email: { value: userData.email, placeholder: "E-mail" },
          telefone1: { value: userData.telefone1, placeholder: "Telefone 1" },
          telefone2: { value: userData.telefone2, placeholder: "Telefone 2" },
          departamento: {
            value: userData.departamento,
            placeholder: "Departamento",
          },
        });
        setIsMounted([true, true]);
      } catch (error) {
        console.error(error);
      }
    };
    pegarDados();
  }, []);

  const onChange = (name: string, text: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: { value: text, placeholder: prev[name].placeholder },
    }));
  };

  if (isMounted.includes(false)) {
    return (
      <View className="w-full h-full bg-white flex items-center justify-center">
        <ActivityIndicator color="#38457a" size="large" />
      </View>
    );
  }

  const disabled =
    values.nome.value === "" ||
    values.email.value === "" ||
    values.telefone1.value === "" ||
    values.telefone2.value === "" ||
    values.departamento.value === "";

  const Atualizar = () => {
    setIsLoading(true);
    const body = {
      nome: values.nome.value,
      email: values.email.value,
      telefone1: values.telefone1.value,
      telefone2: values.telefone2.value,
      departamento: values.departamento.value,
    };
    axios
      .put(process.env.EXPO_PUBLIC_URL_API + "api/perfil", body, { headers: { Authorization: token } })
      .then(() => setIsLoading(false))
      .then(() =>
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Dados atualizados com sucesso",
        })
      )
      .then(() =>
        setTimeout(() => {
          router.push("/");
        }, 5000)
      )
      .catch((error) => {
        console.error(error)
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
        Editar dados
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
              value={values[key].value as string}
            />
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
                value={values[key].value as string}
                items={deptos}
                useNativeAndroidPickerStyle={false}
              />
            </View>
          );
        }
        return null;
      })}

      <TouchableOpacity
        className={`bg-[#38457a] p-4 mt-4 rounded-md w-[80%] flex items-center justify-center ${disabled ? "opacity-60 " : ""
          }`}
        onPress={Atualizar}
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
