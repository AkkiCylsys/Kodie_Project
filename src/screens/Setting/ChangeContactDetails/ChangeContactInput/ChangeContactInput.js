import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { ChangeContactInputStyle } from "./ChangeContactInputStyle";
import TopHeader from "../../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, IMAGES } from "../../../../Themes";
import { _goBack } from "../../../../services/CommonServices";
import axios from "axios";
import { Config } from "../../../../Config";
import { CommonLoader } from "../../../../components/Molecules/ActiveLoader/ActiveLoader";
//screen number 206
const ChangeContactInput = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPhoneNumber, setOldPhoneNumber] = useState("");
  const [oldPhoneNumberError, setOldPhoneNumberError] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newPhoneNumberError, setNewPhoneNumberError] = useState("");
  // Validation....
  const validateOldPhoneNumber = (text) => {
    setOldPhoneNumber(text);
    const mobileReg = /^[6-9]\d{9}$/;
    if (text === "") {
      setOldPhoneNumberError("Old phone number is required.");
    } else if (!mobileReg.test(text)) {
      setOldPhoneNumberError("Invalid phone number format.");
    } else {
      setOldPhoneNumberError("");
    }
  };
  const validateNewPhoneNumber = (text) => {
    setNewPhoneNumber(text);
    const mobileReg = /^[6-9]\d{9}$/;
    if (text === "") {
      setNewPhoneNumberError("New phone number is required.");
    } else if (!mobileReg.test(text)) {
      setNewPhoneNumberError("Invalid phone number format.");
    } else {
      setNewPhoneNumberError("");
    }
  };

  const handleSubmit = async () => {
    if (oldPhoneNumber.trim() === "") {
      setOldPhoneNumberError("Old phone number is required.");
    } else if (newPhoneNumber.trim() === "") {
      setNewPhoneNumberError("New phone number is required.");
    } else if (oldPhoneNumber.trim() === newPhoneNumber.trim()) {
      setNewPhoneNumberError(
        "New phone number must be different from the old one."
      );
    } else {
      props.navigation.navigate("ChangeContactNotify", {
        oldPhoneNumber: oldPhoneNumber,
        newPhoneNumber: newPhoneNumber,
      });
      setOldPhoneNumber("");
      setNewPhoneNumber("");
    }
  };
  return (
    <View style={ChangeContactInputStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Change contact details"}
      />
      <View>
        <View style={ChangeContactInputStyle.firstview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your old phone number with country code
          </Text>
          <View style={ChangeContactInputStyle.numbercodefirstview}>
            <View style={ChangeContactInputStyle.bindview}>
              <Text style={ChangeContactInputStyle.numbercode}>+61</Text>
              <Image
                style={ChangeContactInputStyle.downarrowimg}
                source={IMAGES.downarrow}
              />
              <Image
                style={ChangeContactInputStyle.lineimg}
                source={IMAGES.verticalLine}
              />
              <TextInput
                keyboardType="numeric"
                placeholder="1234567890"
                value={oldPhoneNumber}
                maxLength={10}
                onChangeText={setOldPhoneNumber}
                onBlur={() => {
                  validateOldPhoneNumber(oldPhoneNumber);
                }}
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
            <Image
              style={ChangeContactInputStyle.Vectorimg}
              source={IMAGES.pencile}
            />
          </View>
          {oldPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {oldPhoneNumberError}
            </Text>
          ) : null}
        </View>

        <View style={ChangeContactInputStyle.secondview}>
          <Text style={ChangeContactInputStyle.oldnumbertext}>
            Enter your new phone number with country code
          </Text>
          <View style={ChangeContactInputStyle.numbercodefirstview}>
            <View style={ChangeContactInputStyle.bindview}>
              <Text style={ChangeContactInputStyle.numbercode}>+61</Text>
              <Image
                style={ChangeContactInputStyle.downarrowimg}
                source={IMAGES.downarrow}
              />
              <Image
                style={ChangeContactInputStyle.lineimg}
                source={IMAGES.verticalLine}
              />
              <TextInput
                keyboardType="numeric"
                placeholder="1234567890"
                value={newPhoneNumber}
                onChangeText={setNewPhoneNumber}
                onBlur={() => validateNewPhoneNumber(newPhoneNumber)}
                maxLength={10}
                placeholderTextColor={_COLORS.Kodie_LightGrayColor}
              />
            </View>
            <Image
              style={ChangeContactInputStyle.Vectorimg}
              source={IMAGES.pencile}
            />
          </View>
          {newPhoneNumberError ? (
            <Text style={ChangeContactInputStyle.error_text}>
              {newPhoneNumberError}
            </Text>
          ) : null}
        </View>

        <View style={{ marginTop: 60, marginLeft: 15, marginRight: 15 }}>
          <CustomSingleButton
            _ButtonText={"Next"}
            disabled={isLoading ? true : false}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              // UpdateContactDetails();
              handleSubmit();
            }}
          />
        </View>
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default ChangeContactInput;
