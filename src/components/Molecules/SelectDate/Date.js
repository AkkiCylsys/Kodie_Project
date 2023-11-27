import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
const Date = () => {
  const [selected, setSelected] = useState("");
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
    </View>
  );
};

export default Date;
