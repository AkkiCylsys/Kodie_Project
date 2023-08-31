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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;


export default SignUpVerification = (props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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

        <View style={SignUpVerificationStyle.otp_view}>
          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={SignUpVerificationStyle.CodeField}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[SignUpVerificationStyle.cell, isFocused && SignUpVerificationStyle.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <Text style={SignUpVerificationStyle.accept_Text}>
          {"Accept the terms of use"}
        </Text>
        <View style={SignUpVerificationStyle.termView}>
          <TouchableOpacity>
            <View style={SignUpVerificationStyle.CheckBox_View}>
              <FontAwesome name="check" size={15} color={_COLORS.Kodie_GreenColor} style={SignUpVerificationStyle.checkbox_BG} />
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
            <View style={SignUpVerificationStyle.CheckBox_View}>
              <FontAwesome name="check" size={15} color={_COLORS.Kodie_GreenColor} style={SignUpVerificationStyle.checkbox_BG} />
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
