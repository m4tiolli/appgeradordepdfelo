import RNPickerSelect from "react-native-picker-select";
export const Select = ({ setValues, name, fatores }: any) => {
  return (
    <RNPickerSelect
      style={{
        inputAndroid: {
          height: 44,
          width: "100%",
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: "#38457af8",
          fontSize: 20,
          borderWidth: 1,
          borderColor: "#38457ad4",
          marginTop: 16,
          color: "#fff",
        },
      }}
      placeholder={{
        label: "Duração de contrato",
        value: "",
      }}
      onValueChange={(value) =>
        setValues((prev: any) => ({ ...prev, [name]: value }))
      }
      items={fatores}
      useNativeAndroidPickerStyle={false}
    />
  );
};
