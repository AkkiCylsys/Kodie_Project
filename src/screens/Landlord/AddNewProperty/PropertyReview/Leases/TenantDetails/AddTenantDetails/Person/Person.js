import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { PersonStyle } from "./PersonStyle";
import { _COLORS, LABEL_STYLES } from "../../../../../../../../Themes";
import axios from "axios";
import { CommonLoader } from "../../../../../../../../components/Molecules/ActiveLoader/ActiveLoader";
import { useDispatch, useSelector } from "react-redux";
export default Person = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  const property_id = props.property_id;
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [PhoneNumbeError, setPhoneNumberError] = useState("");
  const [note, setNote] = useState("");
  const [selectedOption, setSelectedOption] = useState("Save");
  const [isLoading, setIsLoading] = useState(false);
  const [personResponse, setpersonResponse] = useState("");
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  //... Regex signup email validation
  const validatePersonEmail = (email) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };
  // Validation for First Name....
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

  // Validation for Last Name....
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

  // Email validation define here....
  const handlePersonEmail = (text) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required");
    } else if (!validatePersonEmail(text)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setEmailError("");
    }
  };

  // Validation for Phone Number
  const validatePhoneNumber = (text) => {
    const mobileReg = /^\d{10}$/;
    if (text === "") {
      setPhoneNumberError("Phone number is required");
    } else if (!mobileReg.test(text)) {
      setPhoneNumberError("Invalid phone number format");
    } else {
      setPhoneNumberError("");
    }
    setPhoneNumber(text);
  };


  // API bind person code here.....
  const Personhandle = () => {

    const PersonDetailsData = {
      user_key: loginData.Login_details.result,
      upd_key: property_id,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: PhoneNumber,
      notes: note,
    };
    const PersonUrl =
      "https://e3.cylsys.com/api/v1/tanant_details/create/person";
    console.log("Request URL:", PersonUrl);
    setIsLoading(true);

    axios
      .post(PersonUrl, PersonDetailsData)
      .then((response) => {
        setpersonResponse(response.data);
        console.log("Person Details_data response", response.data);
        if (response.data.success == true || response.data.error == false) {
          alert(response.data.message);
          setIsLoading(false);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhoneNumber("");
          setPhoneNumber("");
          setNote("");
          setIsLoading(false);
        } else {
          setEmailError(response.data.message);
          console.error("personDetail_error:", response.data.error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("personDetail error...:", error);
        alert(error);
        setIsLoading(false);
      });
  };
  // setEmailError(response.data.message);
  // props.navigation.navigate("LeaseSummary");
  const handleSaveBtn = () => {
    if (firstName.trim() === "") {
      setFirstNameError("First name is required.");
    } else if (lastName.trim() === "") {
      setLastNameError("Last name is required.");
    } else if (email.trim() == "") {
      setEmailError("Email is required.");
    } else {
      Personhandle();
    }
  };

  return (
    <KeyboardAvoidingView style={PersonStyle.mainConatainer}   behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={PersonStyle.card}>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"First name*"}</Text>
            <TextInput
              style={PersonStyle.input}
              value={firstName}
              onChangeText={validateFirstName}
              placeholder="Enter tenant’s first name"
              placeholderTextColor="#999"
            />
            <Text style={PersonStyle.errorText}>{firstNameError}</Text>
          </View>

          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Last name*"}</Text>
            <TextInput
              style={PersonStyle.input}
              value={lastName}
              onChangeText={validateLastName}
              placeholder="Enter tenant’s last name"
              placeholderTextColor="#999"
            />
            <Text style={PersonStyle.errorText}>{lastNameError}</Text>
          </View>

          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Email*"}</Text>
            <TextInput
              style={PersonStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handlePersonEmail(email)}
              // onChangeText={() => handlePersonEmail(email)}
              placeholder="Enter tenant’s email address"
              placeholderTextColor="#999"
            />
            <Text style={PersonStyle.errorText}>{emailError}</Text>
          </View>

          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Phone number (mobile preferred)"}
            </Text>
            <TextInput
              style={PersonStyle.input}
              value={PhoneNumber}
              onChangeText={setPhoneNumber}
              onBlur={() => validatePhoneNumber(PhoneNumber)}
              placeholder="Enter tenant’s mobile number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
            />
            <Text style={PersonStyle.errorText}>{PhoneNumbeError}</Text>
          </View>
          <View style={PersonStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>{"Notes"}</Text>
            <TextInput
              style={[PersonStyle.input, { height: 100 }]}
              value={note}
              onChangeText={setNote}
              placeholder="Enter any notes about your tenant"
              placeholderTextColor="#999"
              multiline
              numberOfLines={5}
              textAlignVertical={"top"}
            />
          </View>
          <View style={PersonStyle.ButtonView}>
            <TouchableOpacity
              style={[
                PersonStyle.closeText,
                PersonStyle.applyText,
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
                PersonStyle.applyText,
                {
                  backgroundColor:
                    selectedOption == "Save"
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_WhiteColor,
                },
              ]}
              onPress={() => {
                handleSaveBtn();
                // handleOptionClick("Save");
              }}
            >
              <Text
                style={[
                  LABEL_STYLES.commontext,
                  PersonStyle.text,
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
    </KeyboardAvoidingView>
  );
};
