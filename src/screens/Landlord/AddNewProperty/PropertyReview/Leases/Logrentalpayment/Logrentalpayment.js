import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LogrentalPaymentStyle } from "./LogrentalpaymentStyle";
import { _COLORS, LABEL_STYLES } from "../../../../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import CalendarModal from "../../../../../../components/Molecules/CalenderModal/CalenderModal";
import RowButtons from "../../../../../../components/Molecules/RowButtons/RowButtons";
import { CommonLoader } from "../../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import axios from "axios";
import { Config } from "../../../../../../Config";
const data = [
  { label: "3-month", value: "1" },
  { label: "6-month", value: "2" },
  { label: "12-month", value: "3" },
];
const Logrentalpayment = (props) => {
  //   console.log("lease_keys...", props.lease_keys);
  //   alert(JSON.stringify(props.lease_keys));
  const lease_keys = props.lease_keys;
  console.log("lease_keys in log rental payment...", lease_keys);
  const [isLoading, setIsLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState("");
  const [totalAmountError, setTotalAmountError] = useState("");
  const [notes, setNotes] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisiblepayment, setModalVisiblepayment] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateError, setSelectedDateError] = useState("");
  const [selectedpaymetPeriod, setSelectedpaymetPeriod] = useState("");
  const [selectedpaymetPeriodError, setSelectedpaymetPeriodError] =
    useState("");
  const [value, setValue] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Save");
  const [selected_payment_period_Button, setSelected_payment_period_Button] =
    useState(false);
  const [selected_payment_period_Id, setSelected_payment_period_Id] =
    useState(0);
  const [selected_payment_skipped_Button, setSelected_payment_skipped_Button] =
    useState(false);
  const [selected_payment_skipped_Id, setSelected_payment_skipped_Id] =
    useState(0);
  const [selected_Create_rental_Button, setSelected_Create_rental_Button] =
    useState(false);
  const [selected_Create_rental_Id, setSelected_Create_rental_Id] = useState(0);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalpayment = () => {
    setModalVisiblepayment(!isModalVisiblepayment);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  const handlepaymentPeriodDate = (payment_period) => {
    setSelectedpaymetPeriod(payment_period.dateString);
  };

  const handlePopUp = () => {
    props.onClose();
  };

  const handleSaveBtn = () => {
    if (totalAmount.trim() === "") {
      setTotalAmountError("Total amount is required.");
    } else if (selectedDate.trim() === "") {
      setSelectedDateError("Payment date is required.");
    } else if (selectedpaymetPeriod.trim() === "") {
      setSelectedpaymetPeriodError("Rental payment period is required.");
    } else {
      //   alert("done");
      handle_rental_payment();
    }
  };

  const handleTotalAmount = (text) => {
    setTotalAmount(text);
    if (text.trim() === "") {
      setTotalAmountError("Total amount is required.");
    } else {
      setTotalAmountError("");
    }
  };
  const handlePaymentDate = (text) => {
    setSelectedDate(text);
    if (text.trim() === "") {
      setSelectedDateError("Payment date is required.");
    } else {
      setSelectedDateError("");
    }
  };
  const handlePaymentPeriod = (text) => {
    setSelectedpaymetPeriod(text);
    if (text.trim() === "") {
      setSelectedpaymetPeriodError("Payment period is required.");
    } else {
      setSelectedpaymetPeriodError("");
    }
  };

  const handle_rental_payment = () => {
    const url = Config.BASE_URL;
    const rental_payment_url = url + "property_lease_details/create/paymentlog";
    console.log("Request URL:", rental_payment_url);
    setIsLoading(true);
    const rental_payment_Data = {
      lease_key: lease_keys,
      total_amount: totalAmount,
      payment_date: selectedDate,
      rental_payment_period: selectedpaymetPeriod,
      payment_period_complete: selected_payment_period_Id,
      payment_period_skipped: selected_payment_skipped_Id,
      create_rental_receipt: selected_Create_rental_Id,
      note: notes,
    };
    axios
      .post(rental_payment_url, rental_payment_Data)
      .then((response) => {
        console.log("API Response add_lease:", response.data);
        if (response.data.success === true) {
          alert(response.data.message);
          handlePopUp();
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={LogrentalPaymentStyle.mainContainer}>
      <ScrollView>
        <View style={LogrentalPaymentStyle.heading_View}>
          <Text style={LogrentalPaymentStyle.heading_Text}>
            {"Log rental payment"}
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
        <View style={LogrentalPaymentStyle.card}>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Total amount*"}</Text>
            <TextInput
              style={LogrentalPaymentStyle.input}
              value={totalAmount}
              onChangeText={setTotalAmount}
              onBlur={() => handleTotalAmount(totalAmount)}
              placeholder="Enter the total amount of the expense"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
          {totalAmountError ? (
            <Text style={LogrentalPaymentStyle.error_text}>
              {totalAmountError}
            </Text>
          ) : null}
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Payment date*"}</Text>
            <View style={LogrentalPaymentStyle.datePickerView}>
              <CalendarModal
                SelectDate={
                  selectedDate ? selectedDate : "Date of rental payment"
                }
                _textInputStyle={{
                  color: selectedDate
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={toggleModal}
                // onDayPress={handleDayPress}
                onDayPress={(day) => handlePaymentDate(day.dateString)}
                Visible={isModalVisible}
                onRequestClose={toggleModal}
                onChangeText={() => handlePaymentDate(selectedDate)}
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
          </View>
          {selectedDateError ? (
            <Text style={LogrentalPaymentStyle.error_text}>
              {selectedDateError}
            </Text>
          ) : null}
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Rental payment period*"}
            </Text>
            <View style={LogrentalPaymentStyle.datePickerView}>
              <CalendarModal
                SelectDate={
                  selectedpaymetPeriod ? selectedpaymetPeriod : "Week 2 August "
                }
                _textInputStyle={{
                  color: selectedpaymetPeriod
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_GrayColor,
                }}
                calenderIcon={toggleModalpayment}
                // onDayPress={handlepaymentPeriodDate}
                onDayPress={(payment_period) =>
                  handlePaymentPeriod(payment_period.dateString)
                }
                onChangeText={() => handlePaymentPeriod(selectedpaymetPeriod)}
                Visible={isModalVisiblepayment}
                onRequestClose={toggleModalpayment}
                markedDates={{
                  [selectedpaymetPeriod]: {
                    selected: true,
                    selectedColor: _COLORS.Kodie_lightGreenColor,
                    selectedTextColor: _COLORS.Kodie_BlackColor,
                  },
                }}
                _closeButton={toggleModalpayment}
                _ApplyButton={toggleModalpayment}
              />
            </View>
            {selectedpaymetPeriodError ? (
              <Text style={LogrentalPaymentStyle.error_text}>
                {selectedpaymetPeriodError}
              </Text>
            ) : null}
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Payment period complete"}
            </Text>
            <RowButtons
              LeftButtonText={"Yes"}
              leftButtonbackgroundColor={
                !selected_payment_period_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selected_payment_period_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selected_payment_period_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelected_payment_period_Button(false);
                setSelected_payment_period_Id(1);
                // alert(selected_payment_period_Id);
              }}
              RightButtonText={"No"}
              RightButtonbackgroundColor={
                selected_payment_period_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selected_payment_period_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selected_payment_period_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelected_payment_period_Button(true);
                setSelected_payment_period_Id(0);
                // alert(selected_payment_period_Id);
              }}
            />
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Payment period skipped"}
            </Text>
            <RowButtons
              LeftButtonText={"Yes"}
              leftButtonbackgroundColor={
                !selected_payment_skipped_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selected_payment_skipped_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selected_payment_skipped_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelected_payment_skipped_Button(false);
                setSelected_payment_skipped_Id(1);
                // alert(selected_payment_skipped_Id);
              }}
              RightButtonText={"No"}
              RightButtonbackgroundColor={
                selected_payment_skipped_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selected_payment_skipped_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selected_payment_skipped_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelected_payment_skipped_Button(true);
                setSelected_payment_skipped_Id(0);
                // alert(selected_payment_skipped_Id);
              }}
            />
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Create rental receipt"}
            </Text>
            <RowButtons
              LeftButtonText={"Yes"}
              leftButtonbackgroundColor={
                !selected_Create_rental_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selected_Create_rental_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selected_Create_rental_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelected_Create_rental_Button(false);
                setSelected_Create_rental_Id(1);
              }}
              RightButtonText={"No"}
              RightButtonbackgroundColor={
                selected_Create_rental_Button
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selected_Create_rental_Button
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selected_Create_rental_Button
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressRightButton={() => {
                setSelected_Create_rental_Button(true);
                setSelected_Create_rental_Id(0);
              }}
            />
          </View>
          <View style={LogrentalPaymentStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
            <TextInput
              style={[LogrentalPaymentStyle.input, { height: 100 }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter any notes about your expense"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>

          <View style={LogrentalPaymentStyle.ButtonView}>
            <TouchableOpacity
              style={[
                LogrentalPaymentStyle.closeText,
                LogrentalPaymentStyle.applyText,
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
                LogrentalPaymentStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == "Save"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleOptionClick("Save");
                handleSaveBtn();
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  LogrentalPaymentStyle.text,
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
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default Logrentalpayment;
