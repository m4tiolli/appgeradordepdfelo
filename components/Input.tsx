import { InputProps } from "@/interfaces/Input";
import React from "react";
import { InputModeOptions, TextInput } from "react-native";

const Input = (props: InputProps) => {
  return (
    <TextInput
      onChangeText={(text) =>
        props.onChange({ name: props.name, text, setValues: props.setValues })
      }
      inputMode={props.type as InputModeOptions}
      placeholder={props.placeholder}
      placeholderTextColor={"#ffffffd4"}
      cursorColor={"#38457a"}
      secureTextEntry={props.password}
      className="w-full border border-[#ffffff4d] bg-[#ffffff0c] text-white text-xl p-2 rounded-md mt-4"
      onSubmitEditing={(e) => {
        console.log("array: " + props.refs.length)
        console.log("index: " + props.index)
        if (props.index < props.refs.length) {
          props.refs[props.index].current.focus();
        } else return
      }}
      autoFocus={props.index === 0}
      showSoftInputOnFocus
      returnKeyType={props.refs[props.index] >= props.refs[props.refs.length] ? "done" : "next"}
      blurOnSubmit={props.refs[props.index] >= props.refs[props.refs.length]}
      ref={props.refs[props.index]}
    />
  );
};

export default Input;
