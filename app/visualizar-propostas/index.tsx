import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Text,
  View,
} from "react-native";
import { fetchPropostas } from "@/hooks/Fetchs";
import { useState, useEffect } from "react";
import Proposta from "@/components/Proposta";
import { IProposta } from "@/interfaces/Proposta";

function VisualizarPropostas() {
  const [propostas, setPropostas] = useState<IProposta[]>([]);
  useEffect(() => {
    fetchPropostas({ setPropostas });
  }, []);

  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center">
      <Text className="text-3xl text-[#38457a] font-semibold mt-10 mb-10">
        Visualizar propostas
      </Text>
      <FlatList
        contentContainerStyle={{ alignItems: "center", width: "100%", paddingBottom: 200 }}
        className="flex-1 w-full"
        ItemSeparatorComponent={ItemSeparator}
        data={propostas}
        keyExtractor={(proposta) => proposta.proposta}
        renderItem={({ item }) => <Proposta proposta={item} />}
      />
    </SafeAreaView>
  );
}

const ItemSeparator = () => {
  return <View className="h-[1px] bg-[#38457a98] my-2 " />;
};

export default VisualizarPropostas;
