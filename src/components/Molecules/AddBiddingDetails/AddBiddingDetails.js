import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { AddBiddingDetailsCss } from "./AddBiddingDetailsCss";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import SwitchToggle from "react-native-switch-toggle";
import RowButtons from "../RowButtons/RowButtons";
import CalendarModal from "../CalenderModal/CalenderModal";
import { LABEL_STYLES } from "../../../Themes";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";
import CustomSingleButton from "../../Atoms/CustomButton/CustomSingleButton";

const data = [
  { label: "3-month", value: "1" },
  { label: "6-month", value: "2" },
  { label: "12-month", value: "3" },
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

const AddBiddingDetails = (props) => {
  const [value, setValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [rentalAmount, setRentalAmount] = useState("");
  const [rentalBond, setRentalBond] = useState("");
  const [paymentDueDay, setPaymentDueDay] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [on, setOn] = useState(true);
  const [Visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const toggleview = () => {
    setVisible(!Visible);
  };

  const handleclosepopUp = () => {
    props.onclose();
  };

  return (
    <View style={AddBiddingDetailsCss.mainContainer}>
      <ScrollView contentContainerStyle={{ flex: 1, marginBottom: 50 }}>
        <View style={AddBiddingDetailsCss.heading_View}>
          <Text style={AddBiddingDetailsCss.heading_Text}>
            {"Add bidding details"}
          </Text>
          <TouchableOpacity onPress={handleclosepopUp}>
            <AntDesign
              name="close"
              size={22}
              color={_COLORS.Kodie_BlackColor}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
        <View style={AddBiddingDetailsCss.card}>
          <Text style={LABEL_STYLES.commontext}>{"Commencement date"}</Text>
          <View style={AddBiddingDetailsCss.datePickerView}>
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
          <View style={AddBiddingDetailsCss.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Duration"}</Text>
            <Dropdown
              style={AddBiddingDetailsCss.dropdown}
              placeholderStyle={[
                AddBiddingDetailsCss.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
              inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
              iconStyle={AddBiddingDetailsCss.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="6-month"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
            />
          </View>
          <View style={AddBiddingDetailsCss.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"List price"}</Text>
            <TextInput
              style={AddBiddingDetailsCss.input}
              value={rentalAmount}
              onChangeText={setRentalAmount}
              placeholder="Enter the rental amount"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddBiddingDetailsCss.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Auto-accept threshold"}
            </Text>
            <TextInput
              style={AddBiddingDetailsCss.input}
              value={rentalBond}
              onChangeText={setRentalBond}
              placeholder="Enter the rental bond amount"
              placeholderTextColor="#999"
            />
          </View>

          <View style={AddBiddingDetailsCss.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Set bid notifications"}
            </Text>
            <View style={AddBiddingDetailsCss.notification_view}>
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  AddBiddingDetailsCss.notification_text,
                ]}
              >
                {"Set notification type"}
              </Text>
              <Dropdown
                style={[
                  AddBiddingDetailsCss.dropdown,
                  { flex: 1, borderRadius: 15 },
                ]}
                placeholderStyle={[
                  AddBiddingDetailsCss.placeholderStyle,
                  { color: _COLORS.Kodie_BlackColor },
                ]}
                selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                iconStyle={AddBiddingDetailsCss.iconStyle}
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
          <View style={AddBiddingDetailsCss.reminder_m_view}>
            <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={AddBiddingDetailsCss.toggle_con}
              circleStyle={AddBiddingDetailsCss.toggle_circle}
            />
            <Text style={AddBiddingDetailsCss.exp_reminder_text}>
              {"Bidding open reminder"}
            </Text>
            <View style={AddBiddingDetailsCss.reminder_dropdown}>
              <Dropdown
                style={[
                  AddBiddingDetailsCss.dropdown,
                  AddBiddingDetailsCss.reminder_dropdown_sty,
                ]}
                placeholderStyle={[
                  AddBiddingDetailsCss.placeholderStyle,
                  { color: _COLORS.Kodie_BlackColor },
                ]}
                selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                iconStyle={AddBiddingDetailsCss.iconStyle}
                data={reminder_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="1-days"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              <Text style={AddBiddingDetailsCss.before}>{"before"}</Text>
            </View>
          </View>
          <View style={AddBiddingDetailsCss.reminder_m_view}>
            <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={AddBiddingDetailsCss.toggle_con}
              circleStyle={AddBiddingDetailsCss.toggle_circle}
            />
            <Text style={AddBiddingDetailsCss.exp_reminder_text}>
              {"Bidding close reminder"}
            </Text>
            <View style={AddBiddingDetailsCss.reminder_dropdown}>
              <Dropdown
                style={[
                  AddBiddingDetailsCss.dropdown,
                  AddBiddingDetailsCss.reminder_dropdown_sty,
                ]}
                placeholderStyle={[
                  AddBiddingDetailsCss.placeholderStyle,
                  { color: _COLORS.Kodie_BlackColor },
                ]}
                selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                iconStyle={AddBiddingDetailsCss.iconStyle}
                data={reminder_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="1-days"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              <Text style={AddBiddingDetailsCss.before}>{"before"}</Text>
            </View>
          </View>
          <View style={AddBiddingDetailsCss.reminder_m_view}>
            <SwitchToggle
              switchOn={on}
              onPress={() => setOn(!on)}
              circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
              circleColorOn={_COLORS.Kodie_GreenColor}
              backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
              backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
              containerStyle={AddBiddingDetailsCss.toggle_con}
              circleStyle={AddBiddingDetailsCss.toggle_circle}
            />
            <Text style={AddBiddingDetailsCss.exp_reminder_text}>
              {"New bid"}
            </Text>
            <View style={AddBiddingDetailsCss.reminder_dropdown}>
              <Dropdown
                style={[
                  AddBiddingDetailsCss.dropdown,
                  AddBiddingDetailsCss.reminder_dropdown_sty,
                ]}
                placeholderStyle={[
                  AddBiddingDetailsCss.placeholderStyle,
                  { color: _COLORS.Kodie_BlackColor },
                ]}
                selectedTextStyle={AddBiddingDetailsCss.selectedTextStyle}
                inputSearchStyle={AddBiddingDetailsCss.inputSearchStyle}
                iconStyle={AddBiddingDetailsCss.iconStyle}
                data={reminder_data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="5 min"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              <Text style={AddBiddingDetailsCss.before}>{"After"}</Text>
            </View>
          </View>

          {/* Button section here */}
          <View style={AddBiddingDetailsCss.ButtonView}>
            <TouchableOpacity
              style={[
                AddBiddingDetailsCss.closeText,
                AddBiddingDetailsCss.applyText,
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
                AddBiddingDetailsCss.applyText,
                {
                  backgroundColor:
                    selectedOption == "Save"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                toggleview("Save");
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  AddBiddingDetailsCss.text,
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

        {/* Binding enable popup section here */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={Visible}
          onRequestClose={toggleview}
        >
          <View style={AddBiddingDetailsCss.ModalMainView}>
            <View style={AddBiddingDetailsCss.ModalView}>
              <View style={AddBiddingDetailsCss.modalContainer}>
                <TouchableOpacity onPress={toggleview}>
                  <AntDesign
                    name="close"
                    size={20}
                    color={_COLORS.Kodie_BlackColor}
                    style={AddBiddingDetailsCss.modalCloseIcon}
                  />
                </TouchableOpacity>
                <Text style={AddBiddingDetailsCss.modalMainText}>
                  Bidding enabled
                </Text>
                <Text style={AddBiddingDetailsCss.modalSubText}>
                  Congratulations! You have successfully enabled property
                  bidding feature. You will be notified once a tenant places a
                  bid .
                </Text>
                <Image
                  source={IMAGES.CheckIcon}
                  resizeMode={"center"}
                  style={AddBiddingDetailsCss.checkStl}
                />
                <CustomSingleButton
                  _ButtonText={"Continue"}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  height={48}
                />
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  _ButtonText={"Return"}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  height={48}
                  borderColor={_COLORS.Kodie_WhiteColor}
                  backgroundColor={_COLORS.Kodie_WhiteColor}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddBiddingDetails;
