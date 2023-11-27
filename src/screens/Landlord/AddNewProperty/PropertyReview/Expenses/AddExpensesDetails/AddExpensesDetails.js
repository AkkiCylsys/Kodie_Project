import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AddExpensesDetailsStyle } from "./AddExpensesDetailsStyle";
import { _COLORS } from "../../../../../../Themes";
import { LABEL_STYLES } from "../../../../../../Themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import CalendarModal from "../../../../../../components/Molecules/CalenderModal/CalenderModal";
import RowButtons from "../../../../../../components/Molecules/RowButtons/RowButtons";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "3-month", value: "1" },
  { label: "6-month", value: "2" },
  { label: "12-month", value: "3" },
];
export default AddExpensesDetails = (props) => {
  const [totalAmount, setTotalAmount] = useState("");
  const [accountXcl, setAccountXcl] = useState("");
  const [tax, setTax] = useState("");
  const [suplier, setSuplier] = useState("");
  const [expenseDes, setExpenseDes] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [value, setValue] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handlePopUp = () =>{
    props.onClose()
  }
  return (
    <View style={AddExpensesDetailsStyle.mainContainer}>
      <ScrollView>
        <View style={AddExpensesDetailsStyle.heading_View}>
          <Text style={AddExpensesDetailsStyle.heading_Text}>
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
        <View style={AddExpensesDetailsStyle.card}>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Total amount*"}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={totalAmount}
              onChangeText={setTotalAmount}
              placeholder="Enter the total amount of the expense"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddExpensesDetailsStyle.tax_main_view}>
            <View style={[AddExpensesDetailsStyle.inputContainer, { flex: 1 }]}>
              <Text style={LABEL_STYLES.commontext}>
                {"Total amount (excl. tax)"}
              </Text>
              <TextInput
                style={[AddExpensesDetailsStyle.input, { flex: 1 }]}
                value={accountXcl}
                onChangeText={setAccountXcl}
                placeholder="Amount excl."
                placeholderTextColor="#999"
              />
            </View>
            <View
              style={[
                AddExpensesDetailsStyle.inputContainer,
                AddExpensesDetailsStyle.Tax_input_cont,
              ]}
            >
              <Text style={LABEL_STYLES.commontext}>{"Tax (0.000%))"}</Text>
              <TextInput
                style={[AddExpensesDetailsStyle.input, { flex: 1 }]}
                value={tax}
                onChangeText={setTax}
                placeholder="Enter tax %"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Due date*"}</Text>
            <View style={AddExpensesDetailsStyle.datePickerView}>
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
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Repeating expense?*"}</Text>
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
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Who is responsible for paying for this?"}
            </Text>
            <RowButtons
              LeftButtonText={"Tenant"}
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              LeftButtonborderColor={_COLORS.Kodie_GrayColor}
              RightButtonText={"Landlord"}
              RightButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
              RightButtonTextColor={_COLORS.Kodie_BlackColor}
              RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
            />
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Expense category*"}</Text>
            <Dropdown
              style={AddExpensesDetailsStyle.dropdown}
              placeholderStyle={[
                AddExpensesDetailsStyle.placeholderStyle,
                { color: _COLORS.Kodie_LightGrayColor },
              ]}
              selectedTextStyle={AddExpensesDetailsStyle.selectedTextStyle}
              inputSearchStyle={AddExpensesDetailsStyle.inputSearchStyle}
              iconStyle={AddExpensesDetailsStyle.iconStyle}
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
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Supplier"}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={suplier}
              onChangeText={setSuplier}
              placeholder="Enter supplier’s name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Expense description"}</Text>
            <TextInput
              style={AddExpensesDetailsStyle.input}
              value={expenseDes}
              onChangeText={setExpenseDes}
              placeholder="Create a description for your expense"
              placeholderTextColor="#999"
            />
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
            <TextInput
              style={[AddExpensesDetailsStyle.input, { height: 100 }]}
              value={expenseDes}
              onChangeText={setExpenseDes}
              placeholder="Enter any notes about your expense"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Mark as paid?"}</Text>
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
          <View style={AddExpensesDetailsStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Paid date*"}</Text>
            <View style={AddExpensesDetailsStyle.datePickerView}>
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
          </View>
          <View style={AddExpensesDetailsStyle.ButtonView}>
            <TouchableOpacity
              style={[
                AddExpensesDetailsStyle.closeText,
                AddExpensesDetailsStyle.applyText,
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
                AddExpensesDetailsStyle.applyText,
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
                  AddExpensesDetailsStyle.text,
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
