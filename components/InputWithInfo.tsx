import {
  TextInput,
  InputModeOptions,
  View,
  Text,
  KeyboardTypeOptions,
} from "react-native";
import React from "react";
import { InputWithInfoProps } from "@/interfaces/Input";
import MaskInput from "react-native-mask-input";

export default function Input(props: Readonly<InputWithInfoProps>) {
  if (props.index != undefined && props.refs != undefined) {
    return (
      <View className="relative mt-4">
        <Text className="absolute font-semibold text-[#38457a]">
          {props.placeholder}
        </Text>
        {props.name == "cnpj" ? (
          <MaskInput
            className="w-full border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
            value={props.value}
            onChangeText={(masked, unmasked) => {
              props.setValues({ ...props.values, cnpjMask: masked });
              props.onChange({
                name: props.name,
                text: unmasked,
                setValues: props.setValues,
              });
            }}
            mask={[
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            placeholderTextColor={"#ffffffd4"}
            cursorColor={"#38457a"}
            keyboardType="numeric"
          />
        ) : props.name == "valorContaEnergia" ? (
          <MaskInput
            className="w-full border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
            value={props.value}
            onChangeText={(masked, unmasked) => {
              props.setValues({
                ...props.values,
                valorContaEnergiaMask: masked,
              });
              props.onChange({
                name: props.name,
                text: unmasked,
                setValues: props.setValues,
              });
            }}
            mask={[
              "R",
              "$",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              ",",
              /\d/,
              /\d/,
            ]}
            placeholderTextColor={"#ffffffd4"}
            cursorColor={"#38457a"}
            keyboardType="numeric"
            onBlur={() => props.onEnd && props.onEnd()}
          />
        ) : props.name == "telefoneTomador" ? (
          <MaskInput
            className="w-full border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
            value={props.value}
            onChangeText={(masked, unmasked) => {
              props.setValues({ ...props.values, telefoneTomador: masked });
            }}
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            placeholderTextColor={"#ffffffd4"}
            cursorColor={"#38457a"}
            keyboardType="numeric"
            onBlur={() => props.onEnd && props.onEnd()}
          />
        ) : (
          <TextInput
            onChangeText={(text) => {
              const texto = props.name === "razao" ? text.toUpperCase() : text;
              props.onChange({
                name: props.name,
                text: texto,
                setValues: props.setValues,
              });
            }}
            value={props.value}
            inputMode={props.type as InputModeOptions}
            placeholder={props.placeholder}
            placeholderTextColor={"#ffffffd4"}
            cursorColor={"#38457a"}
            secureTextEntry={props.password}
            className="w-full border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
            onSubmitEditing={() => {
              if (props.refs && props.index) {
                props.refs[props.index + 1].current.focus();
              }
            }}
            autoFocus={props.index === 0}
            showSoftInputOnFocus
            returnKeyType={
              props.refs[props.index] >= props.refs[props.refs.length]
                ? "done"
                : "next"
            }
            blurOnSubmit={
              props.refs[props.index] >= props.refs[props.refs.length]
            }
            ref={props.refs[props.index]}
            keyboardType={
              (props.keyboardType as KeyboardTypeOptions) ?? "default"
            }
            onBlur={() => props.onEnd && props.onEnd()}
            editable={props.name !== "valor"}
          />
        )}
      </View>
    );
  }
}
