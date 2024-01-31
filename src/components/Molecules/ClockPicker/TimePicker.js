import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MacIcon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { FONTFAMILY, _COLORS } from "../../../Themes";
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
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: _COLORS.Kodie_WhiteColor,
            borderRadius: 5,
            borderWidth: 1,
            paddingVertical: 5,
            borderColor: _COLORS.Kodie_GrayColor,
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 15,
            flex: 1,
          },
          props.timerConStyle,
        ]}
        onPress={() => {
          setDatePickerVisibility(true);
        }}
      >
        <Text
          style={[
            {
              alignSelf: "center",
              paddingVertical: 6,
              fontSize: 14,
              paddingLeft: 10,
              flex: 1,
              color: _COLORS.Kodie_BlackColor,
              fontFamily: FONTFAMILY.K_Medium,
            },
            {
              color: props._TextTimeColor,
            },
          ]}
        >
          {props.selectedTime}
        </Text>
        {!props.timerIcons ? (
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
              color={_COLORS.Kodie_MediumGrayColor}
              style={[clockStyle.iconStyle]}
            />
          </TouchableOpacity>
        ) : null}
        {/* <TouchableOpacity
          disabled={props?.isDisable ? true : false}
          onPress={() => {
            setDatePickerVisibility(true);
          }}
          style={[clockStyle.mainView]}
        >
          <MacIcon
            name={props?.iconName || "clock-outline"}
            size={23}
            color={_COLORS.Kodie_MediumGrayColor}
            style={[clockStyle.iconStyle]}
          />
        </TouchableOpacity> */}

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
      </TouchableOpacity>
    </View>
  );
};
export default TimePicker;
