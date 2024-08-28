import { TextInput, InputModeOptions, View, Text } from "react-native";
import React from "react";
import { InputWithInfoProps } from "@/interfaces/Input";

export default function Input(props: InputWithInfoProps) {
  return (
    <View className="relative mt-4">
      <Text className="absolute font-semibold text-[#38457a]">{props.placeholder}</Text>
      <TextInput
        onChangeText={(text) =>
          props.onChange({ name: props.name, text, setValues: props.setValues })
        }
        value={props.value}
        inputMode={props.type as InputModeOptions}
        placeholder={props.placeholder}
        placeholderTextColor={"#ffffffd4"}
        cursorColor={"#38457a"}
        secureTextEntry={props.password}
        className="w-full border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
      />
    </View>
  );
}
