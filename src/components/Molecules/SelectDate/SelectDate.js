import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SelectDateStyle } from "./SelectDateStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS, LABEL_STYLES } from "../../../Themes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Calendar, LocaleConfig } from "react-native-calendars";

const SelectDate = (props) => {
  const [selected, setSelected] = useState("");
  const [calender, setCalender] = useState(false);
  const [optionStates, setOptionStates] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Save");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setOptionStates(
      OptionData.map((item) => ({ id: item.id, checked: false }))
    );
  }, []);

  const toggleOption = (id) => {
    setOptionStates((prevStates) =>
      prevStates.map((state) =>
        state.id === id
          ? { ...state, checked: !state.checked }
          : { ...state, checked: false }
      )
    );
    setSelected((prevSelected) => (prevSelected === id ? "" : id));
    setCalender(id === 8 && !calender);
    // alert(id === 8 && !calender)
    props?.CalenderId(id === 8 && !calender);
  };

  const handleClosePopup = () => {
    setCalender(false);
    props.onClose();
  };

  const OptionData = [
    { id: 1, day: "Today", date: "17 FEB 2023" },
    { id: 2, day: "Yesterday", date: "17 FEB 2023" },
    { id: 3, day: "Last 7 days", date: "10 Jan-17 FEB 2023" },
    { id: 4, day: "Last 30 days", date: "18 Jan-17 FEB 2023" },
    { id: 5, day: "This month", date: "1 Jan-17 FEB 2023" },
    { id: 6, day: "Last month", date: "1 Jan-30 Jan 2023" },
    { id: 7, day: "Last year", date: "1 Jan-31 Dec 2023" },
    { id: 8, day: "Custom range", date: "" },
  ];

  const renderdate = ({ item }) => (
    <View style={SelectDateStyle.optionsview}>
      <View style={SelectDateStyle.bindview}>
        <TouchableOpacity onPress={() => toggleOption(item.id)}>
          <View style={SelectDateStyle.optionsiconview}>
            <MaterialIcons
              size={25}
              color={
                optionStates.find((state) => state.id === item.id)?.checked
                  ? _COLORS.Kodie_GreenColor
                  : _COLORS.Kodie_GrayColor
              }
              name={
                optionStates.find((state) => state.id === item.id)?.checked
                  ? "check-circle"
                  : "radio-button-unchecked"
              }
            />
          </View>
        </TouchableOpacity>
        <Text style={SelectDateStyle.textoption}>{item.day}</Text>
      </View>
      <View>
        <Text style={SelectDateStyle.datetext}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <View style={SelectDateStyle.headingview}>
        <Text style={SelectDateStyle.headingtext}>Select date</Text>
        <TouchableOpacity onPress={handleClosePopup}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={SelectDateStyle.optionsmainview}>
          <ScrollView>
            <FlatList
              data={OptionData}
              renderItem={renderdate}
              keyExtractor={(item) => item.key}
            />

            {calender && (
              <>
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
                <View style={SelectDateStyle.ButtonView}>
                  <TouchableOpacity
                    style={[
                      SelectDateStyle.closeText,
                      SelectDateStyle.applyText,
                      {
                        backgroundColor:
                          selectedOption == "Cancel"
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_WhiteColor,
                      },
                    ]}
                    onPress={() => {
                      handleOptionClick("Cancel");
                      handleClosePopup();
                    }}
                  >
                    <Text
                      style={[
                        LABEL_STYLES.commontext,
                        {
                          color:
                            selectedOption == "Cancel"
                              ? _COLORS.Kodie_WhiteColor
                              : null,
                        },
                      ]}
                    >
                      {"Cancel"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      SelectDateStyle.applyText,
                      {
                        backgroundColor:
                          selectedOption == "Save"
                            ? _COLORS.Kodie_BlackColor
                            : _COLORS.Kodie_WhiteColor,
                      },
                    ]}
                    onPress={() => {
                      handleOptionClick("Save");
                      handleClosePopup();
                    }}
                  >
                    <Text
                      style={[
                        LABEL_STYLES.commontext,
                        SelectDateStyle.text,
                        {
                          color:
                            selectedOption == "Save"
                              ? _COLORS.Kodie_WhiteColor
                              : null,
                        },
                      ]}
                    >
                      {" Save"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectDate;
