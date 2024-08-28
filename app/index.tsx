import { buttons } from "@/constants/Buttons";
import { isTokenValid } from "@/hooks/TokenValid";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Index() {
  useEffect(() => {
    async function checkToken() {
      if (!(await isTokenValid())) {
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
    checkToken();
  });

  return (
    <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
      <Text className="text-3xl text-[#38457a] font-semibold">
        Gerador de proposta
      </Text>
      {buttons.map((button, index) => (
        <TouchableOpacity
          className="bg-[#38457a] rounded-md w-[70%] p-4 mt-4 flex items-center justify-center"
          onPress={button.onPress}
          key={index++}
        >
          <Text className="text-white text-2xl font-semibold">
            {button.title}
          </Text>
        </TouchableOpacity>
      ))}
      <Toast />
    </SafeAreaView>
  );
}
