import { InputProps } from "@/interfaces/Input";
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
    />
  );
};

export default Input;
