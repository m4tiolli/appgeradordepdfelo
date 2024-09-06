import { buttons } from "@/constants/Buttons";
import { fetchUserById } from "@/hooks/Fetchs";
import { getToken, isTokenValid } from "@/hooks/TokenValid";
import { IUsuario } from "@/interfaces/Usuario";
import JWT from "expo-jwt";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const [usuario, setUsuario] = useState<IUsuario>();
  const [expire, setExpire] = useState({ data: "", hora: "" });
  useEffect(() => {
    async function checkToken() {
      try {
        if ((await isTokenValid()) !== true) {
          console.log("Token expired");
          Toast.show({
            type: "error",
            text1: "Sessão expirada.",
            text2: "Sua sessão expirou. Por favor, realize o login novamente.",
          });
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sessão expirada.",
          text2: "Sua sessão expirou. Por favor, realize o login novamente.",
        });
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    }

    const getExpirationDate = async () => {
      const token = await getToken();

      if (!token) {
        await checkToken();
        return;
      }

      const decoded = JWT.decode(token, "secret_key");
      if (decoded.exp) {
        const expirationDate = new Date(decoded.exp * 1000);
        const data = expirationDate.toLocaleDateString("pt-BR");
        const hora = expirationDate.toLocaleTimeString("pt-BR");
        setExpire({ data: data, hora: hora });
        setTimeout(() => {
          setIsMounted(true);
        }, 2000);
      } else {
        setIsMounted(true);
        console.log("Token does not contain an expiration date");
      }
    };
    checkToken();
    fetchUserById({ setUser: setUsuario });
    getExpirationDate();
  }, []);

  return (
    <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
      {!isMounted ? (
        <ActivityIndicator size={"large"} color={"#38457a"} />
      ) : (
        <>
          <Text className="text-2xl text-[#38457a] font-semibold absolute top-14">
            Conectado como: {usuario?.nome}
          </Text>

          <Text className="text-3xl text-[#38457a] font-semibold">
            Gerador de proposta
          </Text>
          {buttons.map((button, index) => (
            usuario?.administrador === 1 ? (
              <TouchableOpacity
                className="bg-[#38457a] rounded-md w-[70%] p-4 mt-4 flex items-center justify-center"
                onPress={button.onPress}
                key={index++}
              >
                <Text className="text-white text-2xl font-semibold">
                  {button.title}
                </Text>
              </TouchableOpacity>
            ) : !button.sec ? (
              <TouchableOpacity
                className="bg-[#38457a] rounded-md w-[70%] p-4 mt-4 flex items-center justify-center"
                onPress={button.onPress}
                key={index++}
              >
                <Text className="text-white text-2xl font-semibold">
                  {button.title}
                </Text>
              </TouchableOpacity>
            ) : null
          ))}
          <Text className="mt-4 text-lg font-regular">
            Seu acesso expira em {expire.data} às {expire.hora}
          </Text>
        </>
      )}

      <Toast />
    </SafeAreaView>
  );
}
