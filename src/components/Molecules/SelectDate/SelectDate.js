import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useRef } from "react";
import { SelectDateStyle } from "./SelectDateStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { Calendar, LocaleConfig } from "react-native-calendars";

const SelectDate = (props) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [yesterday, setYesterday] = useState(false);
  const [sevendays, setSevenDays] = useState(false);
  const [thirtydays, setThirtyDays] = useState(false);
  const [thismonth, setThisMonth] = useState(false);
  const [Lastmonth, setLastMonth] = useState(false);
  const [tastyear, setYear] = useState(false);
  const [thisrange, setRange] = useState(false);
  const [customerange, setCustomeRange] = useState(false);
  const refRBSheet = useRef();
  const [selected, setSelected] = useState("");
const [calender , setCalender ] = useState(false)
  const toggleyesterday = () => {
    setYesterday(!yesterday);
  };
  const togglesevendays = () => {
    setSevenDays(!sevendays);
  };
  const togglethirtydays = () => {
    setThirtyDays(!thirtydays);
  };
  const togglethismonth = () => {
    setThisMonth(!thismonth);
  };
  const toggleLastmonth = () => {
    setLastMonth(!Lastmonth);
  };
  const toggletastyear = () => {
    setYear(!tastyear);
  };
  const togglethisrange = () => {
    setRange(!thisrange);
  };
  const togglecustomerange = () => {
    setCustomeRange(!customerange);
  };
  const handleClosePopup = () => {
    setPopupVisible(true);
  };
  const togglecalender = () => {
    setCalender(!calender)
  }

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
            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={toggleyesterday}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        yesterday
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Today</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>17 FEB 2023</Text>
              </View>
            </View>

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={togglesevendays}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        sevendays
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Yesterday</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>17 FEB 2023</Text>
              </View>
            </View>

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={togglethirtydays}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        thirtydays
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Last 7 days</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>10 Jan-17 FEB 2023</Text>
              </View>
            </View>

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={togglethismonth}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        thismonth
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Last 30 days</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>18 Jan-17 FEB 2023</Text>
              </View>
            </View>

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={toggleLastmonth}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        Lastmonth
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>This month</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>1 Jan-17 FEB 2023</Text>
              </View>
            </View>

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={toggletastyear}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        tastyear
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Last month</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>1 Jan-30 Jan 2023</Text>
              </View>
            </View>

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={togglethisrange}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <MaterialCommunityIcons
                      size={25}
                      color={_COLORS.Kodie_GrayColor}
                      name={
                        thisrange
                          ? "checkbox-marked-circle"
                          : "checkbox-blank-circle-outline"
                      }
                    />
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Last year</Text>
              </View>
              <View>
                <Text style={SelectDateStyle.datetext}>1 Jan-31 Dec 2023</Text>
              </View>
            </View>

            <Divider style={SelectDateStyle.Divider} />

            <View style={SelectDateStyle.optionsview}>
              <View style={SelectDateStyle.bindview}>
                <TouchableOpacity onPress={togglecalender}>
                  <View style={SelectDateStyle.optionsiconview}>
                    <TouchableOpacity
                      onPress={togglecalender}
                    >
                      <MaterialCommunityIcons
                        size={25}
                        color={_COLORS.Kodie_GrayColor}
                        name={
                          calender
                            ? "checkbox-marked-circle"
                            : "checkbox-blank-circle-outline"
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <Text style={SelectDateStyle.textoption}>Custom range</Text>
              </View>

            </View>

            {calender && (
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
              )}
         
          </ScrollView>
        </View>
      </ScrollView>
      {/* RBSheet  define here */}
      {/* <RBSheet
        ref={refRBSheet}
        height={330}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: SelectDateStyle.bottomModal_container,
        }}
      >
        <Date />
      </RBSheet> */}
    </View>
  );
};

export default SelectDate;
