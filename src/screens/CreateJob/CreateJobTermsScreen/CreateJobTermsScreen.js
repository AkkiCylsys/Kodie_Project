
//ScreenNo:123
//ScreenNo:124
//ScreenNo:125
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { CreateJobTermsStyle } from "./CreateJobTermsStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { Dropdown } from "react-native-element-dropdown";
import { _COLORS, LABEL_STYLES } from "../../../Themes/index";
import TimePicker from "../../../components/Molecules/ClockPicker/TimePicker";
import moment from "moment";
import RangeSlider from "../../../components/Molecules/RangeSlider/RangeSlider";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarModal from "../../../components/Molecules/CalenderModal/CalenderModal";
const data = [
  { label: "3 hours", value: "1" },
  { label: "4 hours", value: "2" },
  { label: "5 hours", value: "3" },
  { label: "6 hours", value: "4" },
];
export default CreateJobTermsScreen = (props) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [value, setValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View style={CreateJobTermsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Create new job request"}
      />
      <ScrollView>
        <View style={CreateJobTermsStyle.container}>
          <Text style={CreateJobTermsStyle.terms_Text}>{"Terms"}</Text>
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {" Request date and time"}
          </Text>
          <View style={CreateJobTermsStyle.datePickerView}>
            <CalendarModal
              SelectDate={selectedDate ? selectedDate : "Select Date"}
              _textInputStyle={{
                color: selectedDate
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor,
              }}
              calenderIcon={toggleModal}
              onDayPress={handleDayPress}
              Visible={isModalVisible}
              onRequestClose={toggleModal}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: _COLORS.Kodie_lightGreenColor,
                  selectedTextColor: _COLORS.Kodie_BlackColor,
                },
              }}
              _closeButton={toggleModal}
              _ApplyButton={toggleModal}
            />

            <View style={CreateJobTermsStyle.spaceView} />
            <View style={[CreateJobTermsStyle.calenderView]}>
              <Text style={CreateJobTermsStyle.textInputStyle}>
                {currentTime && currentTime != ""
                  ? String(currentTime)
                  : "Select time"}
              </Text>

              <TimePicker
                data={new Date()}
                getData={(date) => {
                  setCurrentTime(moment(date).format("hh:mm "));
                }}
              />
            </View>
          </View>
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {"How many hours do you need?"}
          </Text>
          <Dropdown
            style={CreateJobTermsStyle.dropdown}
            placeholderStyle={CreateJobTermsStyle.placeholderStyle}
            selectedTextStyle={CreateJobTermsStyle.selectedTextStyle}
            inputSearchStyle={CreateJobTermsStyle.inputSearchStyle}
            iconStyle={CreateJobTermsStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="3 hours"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {"How often do you need this service?"}
          </Text>
          <Dropdown
            style={CreateJobTermsStyle.dropdown}
            placeholderStyle={CreateJobTermsStyle.placeholderStyle}
            selectedTextStyle={CreateJobTermsStyle.selectedTextStyle}
            inputSearchStyle={CreateJobTermsStyle.inputSearchStyle}
            iconStyle={CreateJobTermsStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="One time"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {"What is your budget for this job?"}
          </Text>
          <RangeSlider from={1} to={2000} />
          <View style={CreateJobTermsStyle.resp_View}>
            <Text style={LABEL_STYLES.commontext}>
              {"Who is responsible for paying for this?"}
            </Text>
            <Text style={CreateJobTermsStyle.sub_des_Text}>
              {"If you select “Landlord”, authorisation will be required"}
            </Text>

            <RowButtons
              LeftButtonText={"Tenant"}
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              LeftButtonborderColor={_COLORS.Kodie_LightWhiteColor}
              RightButtonText={"Landlord"}
              RightButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
              RightButtonTextColor={_COLORS.Kodie_BlackColor}
              RightButtonborderColor={_COLORS.Kodie_GreenColor}
            />
          </View>
          <Text style={[LABEL_STYLES.commontext, CreateJobTermsStyle.heading]}>
            {"Booking insurance?"}
          </Text>
          <RowButtons
            LeftButtonText={"Yes ($1.50)"}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={"No"}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <View style={CreateJobTermsStyle.nextBtn_view}>
            <CustomSingleButton
              _ButtonText={"Next"}
              Text_Color={_COLORS.Kodie_WhiteColor}
              onPress={() => props.navigation.navigate("ConfirmJobCompletion")}
            />
          </View>
          <View style={CreateJobTermsStyle.goBack_View}>
            <TouchableOpacity style={CreateJobTermsStyle.backIcon}>
              <Ionicons
                name="chevron-back"
                size={22}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
            <Text style={CreateJobTermsStyle.goBack_Text}>{"Go back"}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
