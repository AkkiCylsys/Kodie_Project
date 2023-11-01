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
import { LABEL_STYLES } from "../../../../Themes";
import { _COLORS } from "../../../../Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
export default Account = (props) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [referral, setRefferral] = useState("");
  const [value, setValue] = useState(null);
 
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  // Validation for First Name
  const validateFirstName = (text) => {
    if (text === "") {
      setFirstNameError("First name is required");
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setFirstNameError("First name should contain only alphabetic characters");
    } else {
      setFirstNameError("");
    }
    setFirstName(text);
  };

  // Validation for Last Name
  const validateLastName = (text) => {
    if (text === "") {
      setLastNameError("Last name is required");
    } else if (!/^[A-Za-z]+$/.test(text)) {
      setLastNameError("Last name should contain only alphabetic characters");
    } else {
      setLastNameError("");
    }
    setLastName(text);
  };
  // Validation for Phone Number
  const validateMobileNumber = (text) => {
    const mobileReg = /^\d{10}$/;
    if (text === "") {
      setMobileNumberError("Phone number is required");
    } else if (!mobileReg.test(text)) {
      setMobileNumberError("Invalid phone number format");
    } else {
      setMobileNumberError("");
    }
    setMobileNumber(text);
  };

  const handleNextBtn = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First name is required.");
    } else if (lastName.trim() === "") {
      setLastNameError("Last name is required.");
    } else if (mobileNumber.trim() == "") {
      setMobileNumberError("Phone number is required.");
    } else {
      props.navigation.navigate("AboutYou");
      // alert("done")
    }
  };

  const data = [
    { label: "Bharat", value: "1" },
    { label: "Australia", value: "2" },
    { label: "America", value: "3" },
  ];

  return (
    <ScrollView>
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
            onChangeText={validateFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="#999"
          />
          <Text style={AccountStyle.errorText}>{firstNameError}</Text>
        </View>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>Last name*</Text>
          <TextInput
            style={AccountStyle.input}
            value={lastName}
            onChangeText={validateLastName}
            placeholder="Enter your last name"
            placeholderTextColor="#999"
          />
          <Text style={AccountStyle.errorText}>{lastNameError}</Text>
        </View>
        <View style={AccountStyle.inputContainer}>
          <Text style={LABEL_STYLES._texinputLabel}>
            Phone number* (mobile preferred)
          </Text>
          <TextInput
            style={AccountStyle.input}
            value={mobileNumber}
            onChangeText={validateMobileNumber}
            placeholder="Enter your phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Text style={AccountStyle.errorText}>{mobileNumberError}</Text>
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
            value={referral}
            onChangeText={setRefferral}
            placeholder="If you have a referral code, enter it here"
            placeholderTextColor="#999"
          />
        </View>
      </View>
    </ScrollView>
  );
};
