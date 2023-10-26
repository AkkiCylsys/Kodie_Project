import React, { useState } from "react";
//ScreenNo:8
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
import { LABEL_STYLES, _COLORS } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;
//ScreenNo:8
export default SignUpVerification = (props) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [value, setValue] = useState("");
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
          {
            "Please confirm your account by entering the 6-digit verification  code sent to your email."
          }
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
                style={[
                  SignUpVerificationStyle.cell,
                  isFocused && SignUpVerificationStyle.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <Text
          style={[LABEL_STYLES.commonMidtext, SignUpVerificationStyle.textcode]}
        >
          {"It may take a few minutes to receive your code. "}
        </Text>

        <View style={SignUpVerificationStyle.customBtn}>
          <CustomSingleButton
            _ButtonText={"Verify email"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={() => {
              props.navigation.navigate("SignUpSteps");
            }}
          />
        </View>

        <TouchableOpacity
          style={SignUpVerificationStyle.goBack_View}
          onPress={() => {
            props.navigation.navigate("SignUp");
          }}
        >
          <View style={SignUpVerificationStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </View>
          <Text style={SignUpVerificationStyle.goBack_Text}>{"Go back"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
