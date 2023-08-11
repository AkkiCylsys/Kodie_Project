import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MacIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { _COLORS } from "../../../Themes";
import { clockStyle } from "./clockcss";
const TimePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedItime, setselectedItime] = useState(
    props?.data || moment(new Date()).format("YYYY-MM-DD")
  );

  const handleConfirm = (date) => {
    setDatePickerVisibility(false);
    props.getData(date);
    setselectedItime(date);
    console.warn("A time has been picked: ", date);
  };
  const onCanceling = (date) => {
    setDatePickerVisibility(false);
    setselectedItime(date);
    console.warn("A time has been picked: ", date);
  };

  return (
    <View>
      <TouchableOpacity
        disabled={props?.isDisable ? true : false}
        onPress={() => {
          setDatePickerVisibility(true);
        }}
        style={[clockStyle.mainView]}
      >
        <MacIcon
          name={props?.iconName || "clock-outline"}
          size={23}
          color={_COLORS.Kodie_BlackColor}
          style={[clockStyle.iconStyle]}
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        value={selectedItime ? selectedItime : new Date()}
        display={"spinner"}
        mode={"time"}
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
export default TimePicker;
