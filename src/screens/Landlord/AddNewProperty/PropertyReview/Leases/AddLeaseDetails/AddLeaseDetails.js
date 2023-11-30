import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AddLeaseDetailsStyle } from "./AddLeaseDetailsStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { FONTFAMILY, _COLORS } from "../../../../../../Themes";
import { LABEL_STYLES } from "../../../../../../Themes/CommonStyles/CommonStyles";
import CalendarModal from "../../../../../../components/Molecules/CalenderModal/CalenderModal";
import { Dropdown } from "react-native-element-dropdown";
import RowButtons from "../../../../../../components/Molecules/RowButtons/RowButtons";
import SwitchToggle from "react-native-switch-toggle";
import CustomDropdown from "../../../../../../components/Molecules/CustomDropdown/CustomDropdown";
const data = [
  "All",
  "2- Month",
  "4- Month",
  "6- Month",
  "8- Month",
  "10- Month",
  "1- Year",
];
const notification_data = [
  { label: "Notification", value: "1" },
  { label: "Email", value: "2" },
];
const reminder_data = [
  { label: "30-day", value: "1" },
  { label: "2-day", value: "2" },
  { label: "2-day", value: "3" },
];

export default AddLeaseDetails = (props) => {
  const [value, setValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [rentalAmount, setRentalAmount] = useState("");
  const [rentalBond, setRentalBond] = useState("");
  const [paymentDueDay, setPaymentDueDay] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [on, setOn] = useState(true);
  <SwitchToggle switchOn={on} onPress={() => setOn(!on)} />;
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  // ----data come from dropdown and define these condition
  const handleApply = (selectedOptions) => {
    console.log("Clear Action");
  };
  const handleClear = () => {
    console.log("Clear Action");
  };
  const handlePopUp = () => {
    props.onClose();
  };
  return (
    <View style={AddLeaseDetailsStyle.mainContainer}>
      <ScrollView>
        <View style={AddLeaseDetailsStyle.heading_View}>
          <Text style={AddLeaseDetailsStyle.heading_Text}>
            {"Add lease details"}
          </Text>

          <TouchableOpacity onPress={handlePopUp}>
            <AntDesign
              name="close"
              size={22}
              color={_COLORS.Kodie_BlackColor}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View style={AddLeaseDetailsStyle.card}>
          <Text style={LABEL_STYLES.commontext}>{"Commencement date"}</Text>
          <View style={AddLeaseDetailsStyle.datePickerView}>
            <CalendarModal
              SelectDate={selectedDate ? selectedDate : "Start Date"}
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
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Rental lease term"}</Text>

            <View>
              <CustomDropdown
                data={data}
                placeholdertext="6-month"
                onApply={handleApply}
                onClear={handleClear}
                btnview={true}
              />
            </View>
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Rental amount"}</Text>
            <TextInput
              style={AddLeaseDetailsStyle.input}
              value={rentalAmount}
              onChangeText={setRentalAmount}
              placeholder="Enter the rental amount"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Rental bond"}</Text>
            <TextInput
              style={AddLeaseDetailsStyle.input}
              value={rentalBond}
              onChangeText={setRentalBond}
              placeholder="Enter the rental bond amount"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Rental payment frequency"}
            </Text>
            <RowButtons
              LeftButtonText={"Weekly"}
              leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
              LeftButtonTextColor={_COLORS.Kodie_BlackColor}
              LeftButtonborderColor={_COLORS.Kodie_GrayColor}
              RightButtonText={"Monthly"}
              RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Payment due day"}</Text>
            <TextInput
              style={AddLeaseDetailsStyle.input}
              value={paymentDueDay}
              onChangeText={setPaymentDueDay}
              placeholder=""
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Pro rata first rental payment"}
            </Text>
            <RowButtons
              LeftButtonText={"Yes"}
              leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
              LeftButtonTextColor={_COLORS.Kodie_BlackColor}
              LeftButtonborderColor={_COLORS.Kodie_GrayColor}
              RightButtonText={"No"}
              RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
            />
          </View>

          <View style={AddLeaseDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Set property notifications"}
            </Text>
            <View style={AddLeaseDetailsStyle.notification_view}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  AddLeaseDetailsStyle.notification_text,
                ]}
              >
                {"Set notification type"}
              </Text>
              <Dropdown
                style={[
                  AddLeaseDetailsStyle.dropdown,
                  { flex: 1, borderRadius: 15 },
                ]}
                placeholderStyle={[
                  AddLeaseDetailsStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                iconStyle={AddLeaseDetailsStyle.iconStyle}
                data={notification_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Email"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={AddLeaseDetailsStyle.reminder_m_view}>
            <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={AddLeaseDetailsStyle.toggle_con}
              circleStyle={AddLeaseDetailsStyle.toggle_circle}
            />
            <Text style={AddLeaseDetailsStyle.exp_reminder_text}>
              {"Lease expiry reminder"}
            </Text>
            <View style={AddLeaseDetailsStyle.reminder_dropdown}>
              <Dropdown
                style={[
                  AddLeaseDetailsStyle.dropdown,
                  AddLeaseDetailsStyle.reminder_dropdown_sty,
                ]}
                placeholderStyle={[
                  AddLeaseDetailsStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                iconStyle={AddLeaseDetailsStyle.iconStyle}
                data={reminder_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="30-days"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              <Text style={AddLeaseDetailsStyle.before}>{"before"}</Text>
            </View>
          </View>
          <View style={AddLeaseDetailsStyle.reminder_m_view}>
            <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={AddLeaseDetailsStyle.toggle_con}
              circleStyle={AddLeaseDetailsStyle.toggle_circle}
            />
            <Text style={AddLeaseDetailsStyle.exp_reminder_text}>
              {"Rent payment reminder"}
            </Text>
            <View style={AddLeaseDetailsStyle.reminder_dropdown}>
              <Dropdown
                style={[
                  AddLeaseDetailsStyle.dropdown,
                  AddLeaseDetailsStyle.reminder_dropdown_sty,
                ]}
                placeholderStyle={[
                  AddLeaseDetailsStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                iconStyle={AddLeaseDetailsStyle.iconStyle}
                data={reminder_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="2-days"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              <Text style={AddLeaseDetailsStyle.before}>{"before"}</Text>
            </View>
          </View>
          <View style={AddLeaseDetailsStyle.reminder_m_view}>
            <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={AddLeaseDetailsStyle.toggle_con}
              circleStyle={AddLeaseDetailsStyle.toggle_circle}
            />
            <Text style={AddLeaseDetailsStyle.exp_reminder_text}>
              {"Late rental reminder"}
            </Text>
            <View style={AddLeaseDetailsStyle.reminder_dropdown}>
              <Dropdown
                style={[
                  AddLeaseDetailsStyle.dropdown,
                  AddLeaseDetailsStyle.reminder_dropdown_sty,
                ]}
                placeholderStyle={[
                  AddLeaseDetailsStyle.placeholderStyle,
                  { color: _COLORS.Kodie_LightGrayColor },
                ]}
                selectedTextStyle={AddLeaseDetailsStyle.selectedTextStyle}
                inputSearchStyle={AddLeaseDetailsStyle.inputSearchStyle}
                iconStyle={AddLeaseDetailsStyle.iconStyle}
                data={reminder_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="2-days"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              <Text style={AddLeaseDetailsStyle.before}>{"After"}</Text>
            </View>
          </View>
          <View style={AddLeaseDetailsStyle.ButtonView}>
            <TouchableOpacity
              style={[
                AddLeaseDetailsStyle.closeText,
                AddLeaseDetailsStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == "cancel"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick("cancel");
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  {
                    color:
                      selectedOption == "cancel"
                        ? _COLORS.Kodie_WhiteColor
                        : null,
                  },
                ]}
              >
                {"cancel"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                AddLeaseDetailsStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == "Save"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick("Save");
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  AddLeaseDetailsStyle.text,
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
        </View>
      </ScrollView>
    </View>
  );
};
