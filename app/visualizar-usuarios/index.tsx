import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { fetchUsuarios } from "@/hooks/Fetchs";
import { useState, useCallback } from "react";
import UsuarioCard from "@/components/Usuario";
import { IUsuario } from "@/interfaces/Usuario";
import { useFocusEffect } from "expo-router";

function VisualizarUsuarios() {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  useFocusEffect(
    useCallback(() => {
      fetchUsuarios({ setUsuarios });
    }, [setUsuarios])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUsuarios({ setUsuarios });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center">
      <Text className="text-3xl text-[#38457a] font-semibold mt-10 mb-10">
        Visualizar Usuarios
      </Text>
      <FlatList
        refreshControl={
          <RefreshControl colors={["#38457a"]} refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          alignItems: "center",
          width: "100%",
          paddingBottom: 200,
        }}
        className="flex-1 w-full"
        ItemSeparatorComponent={ItemSeparator}
        data={usuarios}
        keyExtractor={(usuario) => usuario.email}
        renderItem={({ item }) => <UsuarioCard usuario={item} />}
      />
    </SafeAreaView>
  );
}

const ItemSeparator = () => {
  return <View className="h-[1px] bg-[#38457a98] my-2 " />;
};

export default VisualizarUsuarios;
