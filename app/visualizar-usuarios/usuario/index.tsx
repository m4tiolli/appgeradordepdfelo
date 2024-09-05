import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IUsuario } from "@/interfaces/Usuario";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function UsuarioDetails() {
  const [isModalExcluirOpen, setIsModalExcluirOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [usuario, setUsuario] = useState<IUsuario>();
  const [admin, setAdmin] = useState<number>(usuario?.administrador as number);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsuario = async () => {
      const prop = await AsyncStorage.getItem("usuario");
      if (prop) {
        setUsuario(JSON.parse(prop));
        setAdmin(JSON.parse(prop).administrador);
      }
    };
    getUsuario();
  }, []);

  if (!usuario) {
    return (
      <SafeAreaView className="w-full flex-1 items-center justify-center">
        <ActivityIndicator color="#38457a" size="large" />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  console.log(admin);

  const handleExcluir = async () => {
    setIsModalExcluirOpen(false);
    setIsLoading(true);
    axios
      .delete(process.env.EXPO_PUBLIC_URL_API + `api/usuario/${usuario.id}`)
      .then(async () => {
        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Usuário excluído com sucesso",
        });
        setIsLoading(false);
        await AsyncStorage.removeItem("usuario");
        setTimeout(() => {
          router.push("/visualizar-usuarios");
        }, 5000);
      });
  };

  const handleEditar = async () => {
    setIsModalEditarOpen(false);
    setIsLoading(true);
    axios
      .put(process.env.EXPO_PUBLIC_URL_API + `api/usuario/${usuario.id}`, {
        administrador: admin,
      })
      .then(async () => {
        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Usuário editado com sucesso",
        });
        setIsLoading(false);
        await AsyncStorage.removeItem("usuario");
        setTimeout(() => {
          router.push("/visualizar-usuarios");
        }, 3000);
      });
  };

  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center">
      <Text className="text-4xl font-bold text-[#38457a]">{usuario.nome}</Text>

      <Text className="text-[#38457a] font-bold text-2xl mt-8">
        Dados do usuário
      </Text>
      <View className="flex flex-row items-center justify-between rounded-md p-2 w-[90%] bg-[#38457a] mt-2">
        <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md">Departamento:</Text>
          <Text className="text-white text-md">Email:</Text>
          <Text className="text-white text-md">Telefones:</Text>
          <Text className="text-white text-md">Administrador:</Text>
        </View>
        <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md font-semibold text-right">
            {usuario.departamento}
          </Text>
          <Text className="text-white text-md font-semibold text-right">
            {usuario.email}
          </Text>
          <Text className="text-white text-md font-semibold text-right">
            {usuario.telefone1} | {usuario.telefone2}
          </Text>
          <Text className="text-white text-md font-semibold text-right">
            {admin == 1 ? "Sim" : "Não"}
          </Text>
        </View>
      </View>
      <View className="flex items-center flex-row justify-between w-[90%]">
        <TouchableOpacity
          onPress={() => setIsModalEditarOpen(!isModalEditarOpen)}
          className="bg-none p-4 border-2 border-[#38457a] rounded-md w-[45%] mt-10"
        >
          <Text className="text-2xl text-[#38457a] font-semibold text-center">
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsModalExcluirOpen(!isModalExcluirOpen)}
          className="bg-[#38457a] p-4 rounded-md w-[45%] mt-10"
        >
          <Text className="text-2xl text-white font-semibold text-center">
            Excluir
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalExcluirOpen} transparent animationType="fade">
        <SafeAreaView className="flex-1 items-center justify-center w-full bg-[#00000036]">
          <View className="p-4 rounded-md bg-white">
            <Text className="text-2xl text-[#38457a] font-semibold text-center">
              Deseja excluir o usuário {usuario.nome}?
            </Text>
            <View className="flex items-center flex-row justify-between w-[90%]">
              <TouchableOpacity
                onPress={() => setIsModalExcluirOpen(!isModalExcluirOpen)}
                className="bg-none p-4 border-2 border-[#38457a] rounded-md w-[45%] mt-10"
              >
                <Text className="text-2xl text-[#38457a] font-semibold text-center">
                  Voltar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleExcluir}
                className="bg-red-500 p-4 rounded-md w-[45%] mt-10"
              >
                <Text className="text-2xl text-white font-semibold text-center">
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={isModalEditarOpen} transparent animationType="fade">
        <SafeAreaView className="flex-1 items-center justify-center w-full bg-[#00000036]">
          <View className="p-4 rounded-md bg-white">
            <Text className="text-2xl text-[#38457a] font-semibold text-center">
              Editar privilégios de {usuario.nome}
            </Text>
            <View className="my-6 flex items-center justify-center">
              <BouncyCheckbox
                onPress={(isChecked: boolean) =>
                  setAdmin(isChecked as unknown as number)
                }
                iconStyle={{ borderColor: "#38457a", borderRadius: 5 }}
                fillColor="#38457a"
                textStyle={{ textDecorationLine: "none" }}
                size={30}
                isChecked={admin as unknown as boolean}
                innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
                textComponent={
                  <Text className="text-[#38457a] text-2xl font-medium ml-4">
                    Administrador
                  </Text>
                }
              />
            </View>
            <View className="flex items-center flex-row justify-between w-[90%]">
              <TouchableOpacity
                onPress={() => setIsModalEditarOpen(!isModalEditarOpen)}
                className="bg-none p-4 border-2 border-[#38457a] rounded-md w-[45%]"
              >
                <Text className="text-2xl text-[#38457a] font-semibold text-center">
                  Voltar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditar}
                className="bg-green-500 p-4 rounded-md w-[45%]"
              >
                <Text className="text-2xl text-white font-semibold text-center">
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal visible={isLoading} transparent animationType="fade">
        <SafeAreaView className="flex-1 items-center justify-center w-full bg-[#00000036]">
          <View className="p-4 rounded-md bg-white">
            <ActivityIndicator color="#38457a" size="large" />
          </View>
        </SafeAreaView>
      </Modal>

      <Toast />
    </SafeAreaView>
  );
}
