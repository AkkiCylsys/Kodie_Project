import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { _COLORS } from "../../../Themes";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import MacIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

const Calendar = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setselectedDate] = useState(new Date());
  const handleConfirm = (date) => {
    setDatePickerVisibility(false);
    props.getData(date);
    setselectedDate(date);
    console.warn("A date has been picked: ", date);
  };

  const onCanceling = (date) => {
    setDatePickerVisibility(false);
    setselectedDate(date);
    console.warn("A date has been picked: ", date);
  };

  return (
    <View>
      <TouchableOpacity
        disabled={props?.isDisable ? true : false}
        onPress={() => {
          setDatePickerVisibility(true);
        }}
        style={[
          {
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            padding: 2,
          },
        ]}
      >
        <MacIcon
          name={props?.iconName || "calendar-month-outline"}
          size={23}
          color={_COLORS.Kodie_BlackColor}
          style={{ paddingVertical: 3, alignSelf: "center" }}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={selectedDate ? selectedDate : new Date()}
        display={"spinner"}
        mode={"date"}
        is24Hour={false}
        onConfirm={(date) => {
          handleConfirm(date);
        }}
        onCancel={(date) => {
          onCanceling(date);
        }}
      />
    </View>
  );
};
export default Calendar;
