import { OnChange } from "@/interfaces/Handles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const onChange = ({ name, text, setValues }: OnChange) => {
  setValues((prevState: any) => ({ ...prevState, [name]: text }));
};

export const handleLogin = async (
  setLoading: React.Dispatch<React.SetStateAction<any>>,
  values: { email: string; password: string },
  Toast: any
) => {
  setLoading(true);
  axios
    .post(process.env.EXPO_PUBLIC_URL_API + "api/login", {
      email: values.email,
      senha: values.password,
    })
    .then(async (response) => {
      setLoading(false);
      await AsyncStorage.setItem("token", response.data.token);
      Toast.show({
        type: "success",
        text1: "Autenticado",
        text2: "Bem-vindo!",
      });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    })
    .catch((erro) => {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login.",
        text2: erro.response.data,
      });
    });
};
