import { IUsuario } from "@/interfaces/Usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface UsuarioProps {
  usuario: IUsuario;
}

export default function Usuario({ usuario }: Readonly<UsuarioProps>) {
  const handleNavigate = async () => {
    const usuarioString = JSON.stringify(usuario);
    await AsyncStorage.setItem("usuario", usuarioString);
    router.navigate("/visualizar-usuarios/usuario");
  };

  return (
    <View className="bg-[#38457a] w-[90vw] p-4 rounded-md flex flex-row items-center justify-between">
      <View>
        <Text className="text-white text-xl font-semibold">{usuario.nome}</Text>
        <Text className="text-white text-md font-normal">{usuario.email}</Text>
      </View>

      <TouchableOpacity
        className="border border-white rounded-md p-4"
        onPress={handleNavigate}
      >
        <Text className="text-white">Detalhes</Text>
      </TouchableOpacity>
    </View>
  );
}
