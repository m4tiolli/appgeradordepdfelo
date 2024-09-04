import { IProposta } from "@/interfaces/Proposta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Linking } from "react-native";

interface PropostaCardProps {
  proposta: IProposta;
}

export default function PropostaCard({ proposta }: Readonly<PropostaCardProps>) {
  const handleNavigate = async () => {
    const propostaString = JSON.stringify(proposta);
    await AsyncStorage.setItem("proposta", propostaString)
    router.navigate("/visualizar-propostas/proposta");
  };

  return (
    <View className="bg-[#38457a] w-[90vw] p-4 rounded-md flex flex-row items-center justify-between">
      <View>
        <Text className="text-white text-xl font-semibold">
          {proposta.proposta}
        </Text>
        <Text className="text-white text-md font-normal">
          {proposta.nomeEmpresa}
        </Text>
      </View>

      <TouchableOpacity
        className="border border-white rounded-md p-4"
        onPress={handleNavigate}
      >
        <Text className="text-white">Detalhes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white rounded-md p-4"
        onPress={() => Linking.openURL(proposta.link_pdf)}
      >
        <Text className="text-[#38457a]">Baixar</Text>
      </TouchableOpacity>
    </View>
  );
}
