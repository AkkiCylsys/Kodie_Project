import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { DeleteAccountStyle } from "./DeleteAccountStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES, LABEL_STYLES } from "../../../Themes";
import { _goBack } from "../../../services/CommonServices";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Config } from "../../../Config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import PhoneInput from "react-native-phone-number-input";

const DeleteAccount = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);
  console.log("loginResponse.....", loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const validateAccountEmail = (email) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };
  const handleAccountEmail = (text) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required !");
    } else if (!validateAccountEmail(text)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setEmailError("");
    }
  };
  const validateMobileNumber = (text) => {
    const mobileReg = /^[6-9]\d{9}$/;
    if (text === "") {
      setPhoneNumberError("Phone number is required");
    } else if (!mobileReg.test(text)) {
      setPhoneNumberError("Invalid phone number format");
    } else {
      setPhoneNumberError("");
    }
    setPhoneNumber(text);
  };
  const handleSubmit = async () => {
    if (phoneNumber.trim() === "" && email.trim() === "") {
      setPhoneNumberError("Phone number is required");
      setEmailError("Email is required!");
    } else if (phoneNumber.trim() !== "" && email.trim() !== "") {
      DeleteAccount();
    } else if (phoneNumber.trim() !== "") {
      DeleteAccount();
    } else if (email.trim() !== "") {
      if (!validateAccountEmail(email)) {
        setEmailError(
          "Hold on, this email appears to be invalid. Please enter a valid email address."
        );
      } else {
        DeleteAccount();
      }
    }
  };

  // Api intrigation..
  const DeleteAccount = () => {
    const dataToSend = {
      // uad_key: 644,
      uad_key: loginData?.Login_details?.user_account_id,
      // email: "Rupesh1@gmail.com",
      email: email,
      // phone_number: "8965656565",
      phone_number: phoneNumber,
    };

    const url = Config.BASE_URL;
    const deleteAccount_url = `${url}profile/deleteuseraccount`;
    console.log("url...", deleteAccount_url);

    setIsLoading(true);

    axios
      .delete(deleteAccount_url, { data: dataToSend })
      .then((res) => {
        console.log("res delete Account......", res);
        if (res?.data?.success === true) {
          alert(res?.data?.message);
          props.navigation.navigate("LoginScreen");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Response data:", error.response.data);
          alert(error.response.data.message);
        }
        console.error("Error deleting:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={DeleteAccountStyle.container}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Delete this account"}
      />
      <ScrollView>
        <View style={DeleteAccountStyle.headingview}>
          <Image
            style={DeleteAccountStyle.helpimg}
            source={IMAGES.helpCenter}
          />
          <Text style={DeleteAccountStyle.accounttext}>
            If you delete this account
          </Text>
        </View>

        <View style={DeleteAccountStyle.Pointsview}>
          <Text style={DeleteAccountStyle.textpoint}>
            • The account will be deleted from Kodie and all your devices
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Your message history will be erased
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Delete your payments info
          </Text>
          <Text style={DeleteAccountStyle.textpoint}>
            • Property data will also be deleted
          </Text>
        </View>

        <View style={DeleteAccountStyle.logoutview}>
          <Image style={DeleteAccountStyle.Logoutimg} source={IMAGES.Log_Out} />
          <Text style={DeleteAccountStyle.insteadtext}>
            Change number instead?
          </Text>
        </View>

        <View style={DeleteAccountStyle.buttonview}>
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={"Change number instead"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            Text_Color={_COLORS.Kodie_BlackColor}
            onPress={() => {
              props.navigation.navigate("ChangeContactInput");
            }}
          />
        </View>

        <View style={DeleteAccountStyle.toconfirmview}>
          <Text style={DeleteAccountStyle.toconfirmtext}>
            To delete your account, confirm your country code and enter your
            phone or email address
          </Text>
        </View>
        <View style={DeleteAccountStyle.card}>
          <Text style={LABEL_STYLES.commontext}>{"Company phone number"}</Text>
          {/* <View style={DeleteAccountStyle.phoneinputbindview}> */}
          {/* <View style={DeleteAccountStyle.phoneinput}>
              <View style={DeleteAccountStyle.bindnumberview}>
                <Text style={DeleteAccountStyle.numbercode}>+61</Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color={_COLORS.Kodie_LightGrayColor}
                  resizeMode={"contain"}
                />
                <Image
                  style={DeleteAccountStyle.lineimg}
                  source={IMAGES.verticalLine}
                />
                <TextInput
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="numeric"
                  placeholder="Phone number"
                  onBlur={() => validateMobileNumber(phoneNumber)}
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  maxLength={10}
                />
              </View>
            </View> */}
          <View style={[DeleteAccountStyle.simpleinputview, { height: 55 }]}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="IN"
              layout="first"
              // onBlur={() => validateMobileNumber(phoneNumber)}
              // onChangeText={(text) => {
              //   setPhoneNumber(text);
              // }}
              onChangeText={(text) => {
                validateMobileNumber(text);
              }}
              placeholder={"Enter your phone number"}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              // withDarkTheme
              // withShadow
              autoFocus
              textContainerStyle={{
                flex: 1,
                backgroundColor: _COLORS.Kodie_WhiteColor,
              }}
              containerStyle={{
                flex: 1,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </View>
          {phoneNumberError ? (
            <Text style={DeleteAccountStyle.error_text}>
              {phoneNumberError}
            </Text>
          ) : null}
          {/* </View> */}
          <View style={DeleteAccountStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {"Enter your email address"}
            </Text>
            <TextInput
              style={DeleteAccountStyle.input}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleAccountEmail(email)}
              placeholder="Email"
              placeholderTextColor="#999"
            />
          </View>
          {emailError ? (
            <Text style={DeleteAccountStyle.error_text}>{emailError}</Text>
          ) : null}
        </View>
        <View style={DeleteAccountStyle.buttonblackview}>
          <CustomSingleButton
            _ButtonText={"Delete account"}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              handleSubmit();
              // DeleteAccount()
            }}
          />
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default DeleteAccount;
