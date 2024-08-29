import Input from "@/components/Input";
import { LoginInputs } from "@/constants/LoginInputs";
import { useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { handleLogin, onChange } from "@/hooks/Handles";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const refs = [useRef(null), useRef(null)];

  return (
    <SafeAreaView className="w-full h-full flex-1 items-center justify-center">
      <View className="flex w-4/5 p-4 rounded-md bg-[#38457a]">
        <Text className="text-white font-semibold text-2xl text-center">
          Login
        </Text>
        {LoginInputs({ values, onChange, setValues }).map((props, index) => (
          <Input
            index={index+1}
            refs={refs}
            key={index++}
            {...props}
          />
        ))}
        <TouchableOpacity
          className="bg-white flex items-center justify-center py-2 h-12 rounded-md mt-4"
          onPress={() => handleLogin(setLoading, values, Toast)}
        >
          {loading ? (
            <ActivityIndicator color={"#38457a"} size={"large"} />
          ) : (
            <Text className=" text-[#38457a] font-semibold text-2xl text-center">
              Entrar
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
