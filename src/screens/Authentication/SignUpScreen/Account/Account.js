import React, { useState } from "react";
//ScreenNo:9
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AccountStyle } from "./AccountStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import { _goBack } from "../../../../services/CommonServices";
import { LABEL_STYLES } from "../../../../Themes";
import { _COLORS } from "../../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
const data = [
  { label: "Bharat", value: "1" },
  { label: "Australia", value: "2" },
  { label: "America", value: "3" },
];
export default Account = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [value, setValue] = useState(null);
  return (
    // <View style={AccountStyle.mainContainer}>
    // <ScrollView>
    <>
      <View style={AccountStyle.headingView}>
        <Text style={AccountStyle.heading}>
          {"Introduce yourself to Kodie"}
        </Text>
      </View>
      <View style={AccountStyle.card}>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>First name*</Text>
          <TextInput
            style={AccountStyle.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="#999"
          />
        </View>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Last name*</Text>
          <TextInput
            style={AccountStyle.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor="#999"
          />
        </View>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>
            Phone number* (mobile preferred)
          </Text>
          <TextInput
            style={AccountStyle.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter your last name"
            placeholderTextColor="#999"
            keyboardType="number-pad"
          />
        </View>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>
            Current physical address
          </Text>
          <View style={AccountStyle.locationContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Location");
              }}
            >
              <Entypo
                name={"location-pin"}
                size={24}
                color={_COLORS.Kodie_MediumGrayColor}
                style={AccountStyle.locationIcon}
              />
            </TouchableOpacity>
            <TextInput
              style={AccountStyle.locationInput}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter new location"
              placeholderTextColor={_COLORS.Kodie_LightGrayColor}
            />
          </View>
          <Dropdown
            style={AccountStyle.dropdown}
            placeholderStyle={AccountStyle.placeholderStyle}
            selectedTextStyle={AccountStyle.selectedTextStyle}
            inputSearchStyle={AccountStyle.inputSearchStyle}
            iconStyle={AccountStyle.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Enter address manually"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />
        </View>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Organisation name</Text>
          <TextInput
            style={AccountStyle.input}
            value={organisation}
            onChangeText={setOrganisation}
            placeholder="Enter the name of your company"
            placeholderTextColor="#999"
          />
        </View>
        <Text style={AccountStyle.org_desc}>
          {
            "Your organisation name will be used in emails and SMS correspondence from Kodie."
          }
        </Text>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Referral code</Text>
          <TextInput
            style={AccountStyle.input}
            value={organisation}
            onChangeText={setOrganisation}
            placeholder="If you have a referral code, enter it here"
            placeholderTextColor="#999"
          />
        </View>
        {/* <CustomSingleButton
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
          onPress={() => {
            // props.navigation.navigate("AboutYou");s
          }}
        />
        <View style={AccountStyle.goBack_View}>
          <TouchableOpacity style={AccountStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
          <Text style={AccountStyle.goBack_Text}>{"Go back"}</Text>
        </View> */}
      </View>
    </>
  );
};
