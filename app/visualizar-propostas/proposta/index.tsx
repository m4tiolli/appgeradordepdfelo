import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IProposta } from "@/interfaces/Proposta";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PropostaDetails() {
  const [proposta, setProposta] = useState<IProposta>();
  useEffect(() => {
    const getProposta = async () => {
      const prop = await AsyncStorage.getItem("proposta");
      setProposta(JSON.parse(prop as string));
    };
    getProposta();
  }, []);
  console.log(proposta);

  if (!proposta) {
    return (
      <SafeAreaView className="w-full flex-1 items-center justify-center">
        <ActivityIndicator color="#38457a" size="large" />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  const formattedCpnj = proposta.cnpjEmpresa.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );

  return (
    <SafeAreaView className="w-full flex-1 items-center justify-center">
      <Text className="text-4xl font-bold text-[#38457a]">
        {proposta.proposta}
      </Text>
      <Text className="text-3xl font-semibold text-[#38457a]">
        {proposta.nomeEmpresa}
      </Text>
      <Text className="text-xl font-normal text-[#38457a]">
        {proposta.razaoEmpresa}
      </Text>
      <Text className="text-xl font-normal text-[#38457a]">
        {formattedCpnj}
      </Text>
      <Text className="text-[#38457a] font-bold text-2xl mt-8">
        Dados do contrato
      </Text>
      <View className="flex flex-row items-center justify-between rounded-md p-2 w-[90%] bg-[#38457a] mt-2">
      <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md">Valor total:</Text>
          <Text className="text-white text-md">Valor da conta de energia:</Text>
          <Text className="text-white text-md">Potência do equipamento:</Text>
          <Text className="text-white text-md">Duração do contrato:</Text>
        </View>
        <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md font-semibold text-right">R$ {proposta.valor}</Text>
          <Text className="text-white text-md font-semibold text-right">R$ {proposta.contaEnergia}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.potencia} KVA</Text>
          <Text className="text-white text-md font-semibold text-right">{Math.floor(proposta.meses as unknown as number)} meses</Text>
        </View>
      </View>
      <Text className="text-[#38457a] font-bold text-2xl mt-8">
        Dados do tomador
      </Text>
      <View className="flex flex-row items-center justify-between rounded-md p-2 w-[90%] bg-[#38457a] mt-2">
        <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md">Nome:</Text>
          <Text className="text-white text-md">Departamento:</Text>
          <Text className="text-white text-md">E-mail:</Text>
          <Text className="text-white text-md">Telefone:</Text>
        </View>
        <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md font-semibold text-right">{proposta.tomador}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.departamentoTomador}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.emailTomador}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.telefoneTomador}</Text>
        </View>
      </View>
      <Text className="text-[#38457a] font-bold text-2xl mt-8">
        Dados do vendedor
      </Text>
      <View className="flex flex-row items-center justify-between rounded-md p-2 w-[90%] bg-[#38457a] mt-2">
      <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md">Nome:</Text>
          <Text className="text-white text-md">Departamento:</Text>
          <Text className="text-white text-md">E-mail:</Text>
          <Text className="text-white text-md">Telefone:</Text>
        </View>
        <View className="gap-y-2 flex flex-col">
          <Text className="text-white text-md font-semibold text-right">{proposta.nomeVendedor}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.departamentoVendedor}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.emailVendedor}</Text>
          <Text className="text-white text-md font-semibold text-right">{proposta.telefone1Vendedor}</Text>
        </View>
      </View>
      
      <TouchableOpacity className="bg-[#38457a] p-4 rounded-md w-[80%] mt-10">
        <Text className="text-2xl text-white font-semibold text-center">
          Visualizar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
