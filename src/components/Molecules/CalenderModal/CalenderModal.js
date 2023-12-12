import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MacIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { _COLORS, FONTFAMILY, LABEL_STYLES } from "../../../Themes";
import { CalenderCss } from "./CalenderModalCss";
import Entypo from "react-native-vector-icons/Entypo";
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

LocaleConfig.defaultLocale = "en";

const CalendarModal = (props) => {
  return (
    <View style={CalenderCss.container}>
      <TouchableOpacity
        onPress={props.calenderIcon}
        style={CalenderCss.calenderView}
      >
        <Text style={[CalenderCss.textInputStyle, props._textInputStyle]}>
          {props.SelectDate}
        </Text>
        <TouchableOpacity onPress={props.calenderIcon}>
          <MacIcon
            name={"calendar-month-outline"}
            size={23}
            color={_COLORS.Kodie_MediumGrayColor}
            style={CalenderCss.calenderSty}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={props.Visible}
        onRequestClose={props.onRequestClose}
      >
        <View style={CalenderCss.modalContainer}>
          <View style={CalenderCss.modalContent}>
            <View style={CalenderCss.headingView}>
              <Text style={CalenderCss.Select_date_text}>{"Select date"}</Text>
              <TouchableOpacity onPress={props._closeButton}>
                <Entypo
                  name="cross"
                  size={25}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={props.onDayPress}
              todayTextColor={_COLORS.Kodie_BlackColor}
              dayTextColor={_COLORS.Kodie_BlackColor}
              markedDates={props.markedDates}
            />
            <View style={CalenderCss.ButtonView}>
              <TouchableOpacity
                style={[CalenderCss.closeButton, CalenderCss.closeText]}
                onPress={props._closeButton}
              >
                <Text style={LABEL_STYLES.commontext}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[CalenderCss.closeButton, CalenderCss.applyText]}
                onPress={props._ApplyButton}
              >
                <Text style={[LABEL_STYLES.commontext, CalenderCss.text]}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarModal;
