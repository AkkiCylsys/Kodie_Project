import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SignUpVerificationStyle } from "./SignUpVerificationStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { _COLORS } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
export default SignUpVerification = (props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  return (
    <View style={SignUpVerificationStyle.mainContainer}>
      <TopHeader
        MiddleText={"Set up your Kodie account"}
        onPressLeftButton={() => _goBack(props)}
      />
      <View style={SignUpVerificationStyle.container}>
        <Text style={SignUpVerificationStyle.checkEmail_Text}>
          {"Check your email"}
        </Text>
        <Text style={SignUpVerificationStyle.verify_Text}>
          {"Enter the 6-digit verification  code sent to your email"}
        </Text>
        <View style={SignUpVerificationStyle.formContainer}>
          <View style={SignUpVerificationStyle.card}>
            <View>
              <TextInput
                style={SignUpVerificationStyle.input}
                value={verificationCode}
                onChangeText={setVerificationCode}
                placeholder="Enter the 6-digit verification  code "
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
        <Text style={SignUpVerificationStyle.accept_Text}>
          {"Accept the terms of use"}
        </Text>
        <View style={SignUpVerificationStyle.termView}>
          <TouchableOpacity>
            <View style={SignUpVerificationStyle.radio_View}>
              <View style={SignUpVerificationStyle.radioBg}></View>
            </View>
          </TouchableOpacity>

          <View style={SignUpVerificationStyle.termsConView}>
            <Text style={SignUpVerificationStyle.termsText}>
              {"I have read the"}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  SignUpVerificationStyle.termsText,
                  SignUpVerificationStyle.terms_Condition,
                ]}
              >
                {"Terms & Conditions"}
              </Text>
            </TouchableOpacity>
            <Text style={SignUpVerificationStyle.termsText}>{"And agree"}</Text>
          </View>
        </View>
        <View style={SignUpVerificationStyle.termView}>
          <TouchableOpacity>
            <View style={SignUpVerificationStyle.radio_View}>
              <View style={SignUpVerificationStyle.radioBg}></View>
            </View>
          </TouchableOpacity>

          <View style={SignUpVerificationStyle.termsConView}>
            <Text style={SignUpVerificationStyle.termsText}>
              {"I have read the"}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  SignUpVerificationStyle.termsText,
                  SignUpVerificationStyle.terms_Condition,
                ]}
              >
                {"Privacy Policy"}
              </Text>
            </TouchableOpacity>
            <Text style={SignUpVerificationStyle.termsText}>{"And agree"}</Text>
          </View>
        </View>
        <View style={SignUpVerificationStyle.customBtn}>
          <CustomSingleButton
            _ButtonText={"Complete sign up"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
        <View style={SignUpVerificationStyle.goBack_View}>
          <TouchableOpacity style={SignUpVerificationStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
          <Text style={SignUpVerificationStyle.goBack_Text}>{"Go back"}</Text>
        </View>
      </View>
    </View>
  );
};
