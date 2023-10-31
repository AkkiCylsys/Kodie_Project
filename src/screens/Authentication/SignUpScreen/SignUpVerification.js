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
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isLoading, setIsLoading] = useState(false);

  //.......... input box validation define here
  const handleverification_code = (text) => {
    setVerificationCode(text);
    if (text.trim() === "") {
      setVerificationCodeError(" Otp is required.");
    } else {
      setVerificationCodeError("");
    }
  };

  //.......... Api body define here
  const Signup_verification_Data = {
    email: email,
    otp: verificationCode,
  };

  //.......... Api method define here
  const sign_verification_Api =
    "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/signup";

  const handle_Signup_verification = () => {
    setIsLoading(true);

    axios
      .post(sign_verification_Api, Signup_verification_Data)
      .then((response) => {
        console.log("sign_verification_Api responce", response.data);
        if (response.data.status === true) {
          alert(response.data.message);
          setEmail("");
          setVerificationCode("");
          props.navigation.navigate("SignUpSteps");
          setIsLoading(false);
        } else {
          verificationCodeError(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("signup Verification error:", error);
        setIsLoading(false);
      });
  };

  //.......... Handle button define here
  const handleSubmit = () => {
    if (verificationCode.trim() === "") {
      verificationCodeError("Otp is required!");
    } else {
      handle_Signup_verification();
    }
  };

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
            value={verificationCode}
            onChangeText={setVerificationCode}
            onBlur={() => handleverification_code(verificationCode)}
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
        {verificationCodeError ? (
          <Text style={SignUpVerificationStyle.error_text}>
            {verificationCodeError}
          </Text>
        ) : null}
        <Text
          style={[LABEL_STYLES.commonMidtext, SignUpVerificationStyle.textcode]}
        >
          {"It may take a few minutes to receive your code. "}
        </Text>

        <View style={SignUpVerificationStyle.customBtn}>
          <CustomSingleButton
            _ButtonText={"Verify email"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={handleSubmit()}
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
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
