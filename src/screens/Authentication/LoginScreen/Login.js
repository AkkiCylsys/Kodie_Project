import React, { useState, useRef } from "react";
import {
  View,
  BackHandler,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { logos } from "../../../Themes/CommonVectors/Images";
import { LoginStyles } from "./LoginCss";
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import BottomTextsButton from "./../../../components/Molecules/BottomTextsButton/BottomTextsButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
  const [newpassword, setNewPassword] = useState("");
  const [Resetpassword, setResetpassword] = useState("");
  const [isClick, setIsClick] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const refRBSheet = useRef();
  const buttonLabels = ["Next", "Next", "Save", "Back to login"];
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
  const handleToggleNewPassword = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleToggleResetPassword = () => {
    setShowResetPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleButtonPress = () => {
    if (isClick === 3) {
      // If it's the "Finish" screen, close the modal
      refRBSheet.current.close();
    } else {
      // Otherwise, proceed to the next screen
      setIsClick((prev) => (prev + 1) % 4);
    }
  };
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
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
            >
              <Text style={LoginStyles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
            <CustomSingleButton
              onPress={() => props.navigation.navigate("BottomNav")}
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
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={Platform.OS === "android" ? 450 : 600}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LoginStyles.bottomModal_container,
        }}
      >
        <View style={LoginStyles.ModalMainView}>
          <Text style={LoginStyles.Modaltitle}>Reset Password</Text>
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
            }}
          >
            <Entypo
              name="cross"
              size={20}
              color={_COLORS.Kodie_BlackColor}
              style={LoginStyles.crossIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={LoginStyles.card}>
          {isClick === 0 && (
            <>
              <View style={LoginStyles.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>
                  Enter your email address
                </Text>
                <TextInput
                  style={LoginStyles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Your Email Address"
                  placeholderTextColor="#999"
                />
              </View>
            </>
          )}
          {isClick === 1 && (
            <>
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
              <View style={LoginStyles.varifycode}>
                <View style={[LoginStyles.inputContainer, { flex: 1 }]}>
                  <Text style={LABEL_STYLES._texinputLabel}>
                    Verification code
                  </Text>
                  <TextInput
                    style={LoginStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="code"
                    placeholderTextColor="#999"
                  />
                </View>
                <View style={LoginStyles.codeMargin} />
                <View style={LoginStyles.getButtonView}>
                  <Text style={LoginStyles.getButton}>Get</Text>
                </View>
              </View>
            </>
          )}
          {isClick === 2 && (
            <ScrollView contentContainerStyle={{ marginBottom: 90 }}>
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
              <View style={LoginStyles.varifycode}>
                <View style={[LoginStyles.inputContainer, { flex: 1 }]}>
                  <Text style={LABEL_STYLES._texinputLabel}>
                    Verification code
                  </Text>
                  <TextInput
                    style={LoginStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="code"
                    placeholderTextColor="#999"
                  />
                </View>
                <View style={LoginStyles.codeMargin} />
                <View style={LoginStyles.getButtonView}>
                  <Text style={LoginStyles.getButton}>Get</Text>
                </View>
              </View>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.cardHeight]}
                >
                  New password
                </Text>
                <View style={LoginStyles.passwordContainer}>
                  <TextInput
                    style={LoginStyles.passwordInput}
                    value={newpassword}
                    onChangeText={setNewPassword}
                    placeholder="Password"
                    secureTextEntry={!showNewPassword}
                  />
                  <TouchableOpacity onPress={handleToggleNewPassword}>
                    <MaterialCommunityIcons
                      name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                      style={LoginStyles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.cardHeight]}
                >
                  Confirm password
                </Text>
                <View style={LoginStyles.passwordContainer}>
                  <TextInput
                    style={LoginStyles.passwordInput}
                    value={Resetpassword}
                    onChangeText={setResetpassword}
                    placeholder="Password"
                    secureTextEntry={!showResetPassword}
                  />
                  <TouchableOpacity onPress={handleToggleResetPassword}>
                    <MaterialCommunityIcons
                      name={
                        showResetPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                      style={LoginStyles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
          {isClick === 3 && (
            <>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.passchange]}
                >
                  Password change
                </Text>
                <Image
                  source={IMAGES.CheckIcon}
                  style={LoginStyles.checkicon}
                  resizeMode={"center"}
                />
              </View>
            </>
          )}
          <View style={{ marginBottom: 800 }}>
            <CustomSingleButton
              onPress={handleButtonPress}
              _ButtonText={buttonLabels[isClick]}
              Text_Color={_COLORS.Kodie_WhiteColor}
              marginTop={
                isClick
                  ? Platform.OS === "android"
                    ? "1%"
                    : "50%"
                  : Platform.OS === "android"
                  ? "20%"
                  : "80%"
              }
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};
