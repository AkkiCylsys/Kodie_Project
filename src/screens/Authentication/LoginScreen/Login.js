import React, { useState } from "react";
import {
  View,
  BackHandler,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { logos } from "../../../Themes/CommonVectors/Images";
import { LoginStyles } from "./LoginCss";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import BottomTextsButton from "./../../../components/Molecules/BottomTextsButton/BottomTextsButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import {
  FONTFAMILY,
  LABEL_STYLES,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import { useFocusEffect, useTheme } from "@react-navigation/native";
export default Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <View style={LoginStyles.container}>
      <ScrollView>
        <View style={LoginStyles.logoContainer}>
          <Image source={logos.mainLogo} style={LoginStyles.logo} />
        </View>
        <View style={LoginStyles.formContainer}>
          <Text style={LoginStyles.title}>Login</Text>
          <View style={LoginStyles.card}>
            <View style={LoginStyles.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
              <TextInput
                style={LoginStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Your Email Address"
                placeholderTextColor="#999"
              />
            </View>
            <View style={LoginStyles.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Password</Text>
              <TextInput
                style={LoginStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>
            <CustomSingleButton
              onPress={() => props.navigation.navigate("UserTypeScreen")}
              _ButtonText={"Login"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
            <DividerIcon DeviderText={"or"} />
            <CustomSingleButton
              leftImage={IMAGES.GoogleIcon}
              isLeftImage={true}
              _ButtonText={"Login with Google"}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <CustomSingleButton
              leftImage={IMAGES.FacebookIcon}
              isLeftImage={true}
              _ButtonText={"Login with Facebook"}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <BottomTextsButton
              _LeftButtonText={"Don't have an account yet?"}
              _RightButtonText={"Register"}
              onPress={() => {
                props.navigation.navigate("ContractorSignUpFirstScreen");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
