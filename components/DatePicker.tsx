import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const DatePickerField = ({
  setValues,
  values,
}: {
  setValues: any;
  values: any;
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate as Date);
    setValues((prev: any) => ({
      ...prev,
      data: date,
    }));
  };

  return (
    <SafeAreaView>
      <View className="relative -mt-4">
        <Text className="absolute font-semibold text-[#38457a]">
          Data da proposta
        </Text>
        <TouchableOpacity onPress={() => setShow(true)}>
          <TextInput
            editable={false}
            value={
              date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
            }
            className="w-full border border-[#38457a4d] bg-[#38457af8] text-white text-xl p-2 rounded-md mt-4"
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={values.data}
            mode="date"
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DatePickerField;
