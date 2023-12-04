// Screen 2,3,4,5,6
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  BackHandler,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
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
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginSuccess } from "../../../redux/Actions/Authentication/AuthenticationApiAction";
import axios from "axios";
import { Config } from "../../../Config";
import { loginApiActionCreator } from "../../../redux/Actions/Authentication/AuthenticationApiCreator";
export default Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [verificationcode, setVerificationcode] = useState("");
  const [verificationcodeError, setVerificationcodeError] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [newpasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isClick, setIsClick] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const refRBSheet = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isTimeron, setIsTimeron] = useState(true);
  const [loginResponse, setLoginResponse] = useState(true);

  // const Login_response = useSelector(
  //   (state) => state?.authenticationReducer?.data
  // );
  // console.log("Login_response.....", Login_response);
  const buttonLabels = [
    "Send verification code",
    "Next",
    "Save",
    "Back to login",
  ];

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        refRBSheet.current.close();
        setIsClick(0);
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
  const handleLogin = () => {
    // Your login logic here
    // ...

    // Dismiss the keyboard
    Keyboard.dismiss();
  };
  const handleToggleResetPassword = () => {
    setShowResetPassword((prevShowPassword) => !prevShowPassword);
  };

  // Reset validation email..
  const handleforgetValidation = () => {
    if (resetEmail.trim() === "") {
      setResetEmailError("Email is required!");
    } else if (!validateResetEmail(resetEmail)) {
      setResetEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      send_verification_code();
    }
  };

  //... Regex login email validation
  const validateResetEmail = (resetEmail) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(resetEmail);
  };

  //... inner reset password email variable define here
  const handleResetEmailChange = (text) => {
    setResetEmail(text);
    if (text.trim() === "") {
      setResetEmailError("Email is required");
    } else if (!validateResetEmail(text)) {
      setResetEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setResetEmailError("");
    }
  };

  //... inner reset password varification_Code variable define here
  const handleverificationcodes = () => {
    if (verificationcode.trim() === "") {
      setVerificationcodeError("Verification code is required");
    } else {
      verify_Otp();
    }
  };

  //... inner reset password Password_Check variable define here
  const handleResetpasswordCheck = () => {
    if (newpassword.trim() === "") {
      setNewPasswordError("Please enter a new password");
    } else if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please enter a confirmation password");
    } else if (newpassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
      create_password();
    }
  };

  //... inner reset password Next Button code define here
  const handleButtonPress = () => {
    if (isClick === 3) {
      refRBSheet.current.close();
    } else if (isClick === 0) {
      handleforgetValidation();
    } else if (isClick === 1) {
      handleverificationcodes();
    } else if (isClick === 2) {
      handleResetpasswordCheck();
    } else {
      setIsClick(isClick + 1);
    }
  };
  //... inner reset password rejex variable define here
  const validateEmail = (email) => {
    const emailPattern =
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return emailPattern.test(email);
  };

  //... inner  email variable define here
  const handleEmailChange = (text) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required.");
    } else if (!validateEmail(text)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setEmailError("");
    }
  };

  //... inner reset password password variable define here
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.trim() === "") {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
  };

  //... inner reset password new password variable define here
  const handleNewPassword = (text) => {
    setNewPassword(text);
    if (text.trim() === "") {
      setNewPasswordError("New Password is required.");
    } else {
      setNewPasswordError("");
    }
  };

  //... inner reset password confirm password variable define here
  const handleConfirmpassword = (text) => {
    setConfirmPassword(text);
    if (text.trim() === "") {
      setConfirmPasswordError("Please enter a confirmation password.");
    } else if (newpassword !== text) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(""); // Clear the error message
    }
  };

  //... inner reset password submit button variable define here
  const handleSubmit = async () => {
    if (email.trim() === "") {
      setEmailError("Email is required!");
    } else if (!validateEmail(email)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else if (password.trim() === "") {
      setPasswordError("Password is required.");
    } else {
      // makeApiLogin();
      //alert("click")
      Keyboard.dismiss();
      setIsLoading(true);
      let data = {
        email: email,
        password: password,
      };
      setIsLoading(true);
      let res = await dispatch(loginApiActionCreator(data));
      //alert(res)
      console.log("login_data...", res);
      setIsLoading(false);
      if (res == 401) {
        setIsLoading(false);
        //alert("Please check your email and password.");
        setPasswordError(
          "Hmm, it seems like the credentials you entered are invalid. Please try again."
        );
      } else {
        if (res.data.status === true) {
          //  alert("Login successful");
          setIsLoading(false);
          props.navigation.navigate("DrawerNavigatorLeftMenu");
          setEmail("");
          setPassword("");
        } else {
          setIsLoading(false);
          //alert("Please check your email and password.");
          setPasswordError(
            "Hmm, it seems like the credentials you entered are invalid. Please try again."
          );
        }
      }
    }
    // Keyboard.dismiss();
  };

  //...  verification variable define here
  const handleverificationCode = (text) => {
    const regex = /^[0-9]+$/;
    setVerificationcode(text);
    if (text.trim() === "") {
      setVerificationcodeError("verification code is required.");
    } else if (!regex.test(text)) {
      setVerificationcodeError("Verification code must contain only numbers.");
    } else {
      setVerificationcodeError("");
    }
  };

  //  login Api ...
  const makeApiLogin = () => {
    const url = Config.API_URL;
    const loginurl = url + "user_login";
    console.log("Request URL:", loginurl);
    setIsLoading(true);
    axios
      .post(loginurl, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setLoginResponse(response.data);

        if (response.data.status === true) {
          alert("Login successful");
          // dispatch(fetchLoginSuccess(loginResponse));
          props.navigation.navigate("DrawerNavigatorLeftMenu");
          setEmail("");
          setPassword("");
        } else {
          alert("Please check your email and password.");
          setPasswordError(
            "Hmm, it seems like the credentials you entered are invalid. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setPasswordError(
          "Hmm, it seems like the credentials you entered are invalid. Please try again."
        );
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //send_verification_code Api code here....
  const send_verification_code = () => {
    const url = Config.API_URL;
    const verification_code_url = url + "user_reset_password_email_verify";
    console.log("Request URL:", verification_code_url);
    setIsLoading(true);
    axios
      .post(verification_code_url, {
        email: resetEmail,
      })
      .then((response) => {
        console.log("API Response send otp:", response.data);
        if (response.data.status === true) {
          alert("The otp has been sent to your email.");
          if (isClick === 1) {
            setIsTimeron(true);
            setIsClick(1);
            setVerificationcode("");
            setIsTimeron(true);
          } else {
            setIsClick(isClick + 1);
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //verify_otp Api code here.....
  const verify_Otp = () => {
    const url = Config.API_URL;
    const verify_Otp_url = url + "user_signup_verifyotp";
    console.log("Request URL:", verify_Otp_url);
    setIsLoading(true);
    axios
      .post(verify_Otp_url, {
        email: resetEmail,
        otp: verificationcode,
      })
      .then((response) => {
        console.log("API Response verify otp:", response.data);
        if (response.data.status === true) {
          alert(response.data.message);
          setIsClick(isClick + 1);
        } else {
          setVerificationcodeError(
            "The verification code you’ve entered is incorrect. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error("API failed", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //------ create_password Api code here
  const create_password = () => {
    const url = Config.API_URL;
    const create_password_url = url + "user_reset_password";
    console.log("Request URL:", create_password_url);
    setIsLoading(true);
    axios
      .post(create_password_url, {
        email: resetEmail,
        password: newpassword,
      })
      .then((response) => {
        console.log("API Response create_password:", response.data);
        if (response.data.status === true) {
          // If the API call is successful, increment isClick
          alert(response.data.message);
          setIsClick(isClick + 1);
        } else {
          alert("Password not created.");
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={LoginStyles.container}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={LoginStyles.logoContainer}>
          <Image source={logos.mainLogo} style={LoginStyles.logo} />
        </View>
        {/* ------ login code start  here ........... */}
        <View style={LoginStyles.formContainer}>
          <Text style={LoginStyles.title}>Login</Text>
          <View style={LoginStyles.card}>
            <View style={LoginStyles.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
              <TextInput
                style={[
                  LoginStyles.input,
                  {
                    borderColor: emailError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
                value={email}
                onChangeText={setEmail}
                onBlur={() => handleEmailChange(email)}
                placeholder="Your email address"
                placeholderTextColor="#999"
                maxLength={30}
              />
            </View>
            {emailError ? (
              <Text style={LoginStyles.error_text}>{emailError}</Text>
            ) : null}
            <View style={LoginStyles.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Password</Text>
              <TextInput
                style={[
                  LoginStyles.input,
                  {
                    borderColor: passwordError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
                value={password}
                onChangeText={setPassword}
                onBlur={() => handlePasswordChange(password)}
                placeholder="Enter password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>
            {passwordError ? (
              <Text style={LoginStyles.error_text}>{passwordError}</Text>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
                setIsClick(0);
                setResetEmail("");
                setVerificationcode("");
                setVerificationcodeError("");
                setNewPassword("");
                setPasswordError("");
                setConfirmPassword("");
                setConfirmPasswordError("");
                setResetEmailError("");
              }}
            >
              <Text style={LoginStyles.forgot}>Forgot password?</Text>
            </TouchableOpacity>

            <CustomSingleButton
              onPress={handleSubmit}
              _ButtonText={"Login"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
            <View style={LoginStyles.loderview}></View>
            <DividerIcon DeviderText={"or"} />
            <CustomSingleButton
              onPress={() => {
                // props.navigation.navigate("ContractorSignUpFirstScreen");
                props.navigation.navigate("SignUpSteps");
                // props.navigation.navigate("Account");
              }}
              leftImage={IMAGES.GoogleIcon}
              isLeftImage={true}
              _ButtonText={"Login with Google"}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <CustomSingleButton
              onPress={() =>
                // props.navigation.navigate("ManageSubscription")
                props.navigation.navigate("DrawerNavigatorLeftMenu")
              }
              leftImage={IMAGES.FacebookIcon}
              isLeftImage={true}
              _ButtonText={"Login with Facebook"}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <BottomTextsButton
              _LeftButtonText={"Don't have an account yet? "}
              _RightButtonText={"Sign up"}
              onPress={() => {
                props.navigation.navigate("SignUp");
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* ------ Rest password code start  here ........... */}
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={Platform.OS === "android" ? 550 : 565}
            customStyles={{
              wrapper: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              draggableIcon: {
                backgroundColor: _COLORS.Kodie_LightGrayColor,
              },
              container: LoginStyles.bottomModal_container,
            }}
          >
            <View style={LoginStyles.ModalMainView}>
              <Text style={LoginStyles.Modaltitle}>Reset password</Text>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.close();
                  setIsClick(0);
                  setResetEmail("");
                  setVerificationcode("");
                  setVerificationcodeError("");
                  setNewPassword("");
                  setPasswordError("");
                  setConfirmPassword("");
                  setConfirmPasswordError("");
                  setResetEmailError("");
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
              {/* ------ Reset passowrd 0 section start code  here ........... */}
              {isClick === 0 && (
                <>
                  <View style={LoginStyles.inputContainer}>
                    <Text style={LABEL_STYLES._texinputLabel}>
                      Enter your email address
                    </Text>
                    <TextInput
                      style={[
                        LoginStyles.input,
                        {
                          borderColor: resetEmailError
                            ? _COLORS.Kodie_lightRedColor
                            : _COLORS.Kodie_GrayColor,
                        },
                      ]}
                      value={resetEmail}
                      onChangeText={setResetEmail}
                      onBlur={() => handleResetEmailChange(resetEmail)}
                      placeholder="Your email address"
                      placeholderTextColor="#999"
                      maxLength={30}
                    />
                  </View>
                  {resetEmailError ? (
                    <Text style={LoginStyles.error_text}>
                      {resetEmailError}
                    </Text>
                  ) : null}
                </>
              )}

              {/* ------ Reset passowrd 1 section start code  here ........... */}
              {isClick === 1 && (
                <>
                  <View style={LoginStyles.inputContainer}>
                    <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                    <TextInput
                      style={[
                        LoginStyles.input,
                        { backgroundColor: _COLORS?.Kodie_LightGrayLineColor },
                      ]}
                      value={resetEmail}
                      placeholder="Your Email Address"
                      placeholderTextColor="#999"
                      editable={false}
                    />
                  </View>
                  <View style={LoginStyles.varifycode}>
                    <View style={[LoginStyles.inputContainer, { flex: 1 }]}>
                      <Text style={LABEL_STYLES._texinputLabel}>
                        Verification code
                      </Text>
                      <TextInput
                        style={[
                          LoginStyles.input,
                          {
                            borderColor: verificationcodeError
                              ? _COLORS.Kodie_lightRedColor
                              : _COLORS.Kodie_GrayColor,
                          },
                        ]}
                        value={verificationcode}
                        onChangeText={handleverificationCode}
                        onBlur={() => handleverificationCode(verificationcode)}
                        placeholder="Code"
                        returnKeyType="done"
                        placeholderTextColor="#999"
                        keyboardType="number-pad"
                        maxLength={6}
                      />
                    </View>
                    <View style={LoginStyles.codeMargin} />

                    <View style={LoginStyles.getButtonView}>
                      {isTimeron ? (
                        <CountdownCircleTimer
                          isPlaying
                          trailColor={_COLORS.Kodie_lightGreenColor}
                          duration={50}
                          size={45}
                          colors={_COLORS.Kodie_lightGreenColor}
                          onComplete={() => {
                            setIsTimeron(false);
                          }}
                        >
                          {({ remainingTime }) => (
                            <Text style={{ color: _COLORS.Kodie_WhiteColor }}>
                              {remainingTime} S
                            </Text>
                          )}
                        </CountdownCircleTimer>
                      ) : (
                        <TouchableOpacity onPress={send_verification_code}>
                          <Text style={LoginStyles.getButton}>{"Resend"}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  {verificationcodeError ? (
                    <Text style={LoginStyles.error_text}>
                      {verificationcodeError}
                    </Text>
                  ) : null}
                </>
              )}

              {/* ------ Reset passowrd 2 section start code  here ........... */}
              {isClick === 2 && (
                <ScrollView
                  contentContainerStyle={{ marginBottom: 90 }}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {/* <View style={LoginStyles.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                <TextInput
                  style={[
                    LoginStyles.input,
                    { backgroundColor: _COLORS?.Kodie_LightGrayLineColor },
                  ]}
                  value={resetEmail}
                  placeholder="Your email address"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={LoginStyles.varifycode}>
                <View style={[LoginStyles.inputContainer, { flex: 1 }]}>
                  <Text style={LABEL_STYLES._texinputLabel}>
                    Verification code
                  </Text>
                  <TextInput
                    style={[
                      LoginStyles.input,
                      { backgroundColor: _COLORS?.Kodie_LightGrayLineColor },
                    ]}
                    value={verificationcode}
                    placeholder="code"
                    placeholderTextColor="#999"
                    editable={false}
                  />
                </View>

                <View style={LoginStyles.codeMargin} />
                <View style={LoginStyles.getButtonView}>
                  <Text style={LoginStyles.getButton}>Get</Text>
                </View>
              </View>
              {verificationcodeError ? (
                <Text style={LoginStyles.error_text}>
                  {verificationcodeError}
                </Text>
              ) : null} */}
                  <View style={LoginStyles.inputContainer}>
                    <Text
                      style={[
                        LABEL_STYLES._texinputLabel,
                        LoginStyles.cardHeight,
                      ]}
                    >
                      New password
                    </Text>
                    <View
                      style={[
                        LoginStyles.passwordContainer,
                        {
                          borderColor: newpasswordError
                            ? _COLORS.Kodie_lightRedColor
                            : _COLORS.Kodie_GrayColor,
                        },
                      ]}
                    >
                      <TextInput
                        style={LoginStyles.passwordInput}
                        value={newpassword}
                        onChangeText={handleNewPassword}
                        onBlur={() => handleNewPassword(newpassword)}
                        placeholder=" Enter New Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showNewPassword}
                      />
                      <TouchableOpacity onPress={handleToggleNewPassword}>
                        <MaterialCommunityIcons
                          name={
                            showNewPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={_COLORS.Kodie_BlackColor}
                          style={LoginStyles.eyeIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    {newpasswordError ? (
                      <Text style={LoginStyles.error_text}>
                        {newpasswordError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={LoginStyles.inputContainer}>
                    <Text
                      style={[
                        LABEL_STYLES._texinputLabel,
                        LoginStyles.cardHeight,
                      ]}
                    >
                      Confirm password
                    </Text>
                    <View
                      style={[
                        LoginStyles.passwordContainer,
                        {
                          borderColor: confirmPasswordError
                            ? _COLORS.Kodie_lightRedColor
                            : _COLORS.Kodie_GrayColor,
                        },
                      ]}
                    >
                      <TextInput
                        style={LoginStyles.passwordInput}
                        value={confirmPassword}
                        onChangeText={handleConfirmpassword}
                        onBlur={() => handleConfirmpassword(confirmPassword)}
                        placeholder=" Enter Confirm Password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showResetPassword}
                      />
                      <TouchableOpacity onPress={handleToggleResetPassword}>
                        <MaterialCommunityIcons
                          name={
                            showResetPassword
                              ? "eye-off-outline"
                              : "eye-outline"
                          }
                          size={20}
                          color={_COLORS.Kodie_BlackColor}
                          style={LoginStyles.eyeIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    {confirmPasswordError ? (
                      <Text style={LoginStyles.error_text}>
                        {confirmPasswordError}
                      </Text>
                    ) : null}
                  </View>
                </ScrollView>
              )}

              {/* ------ Reset passowrd 3 section start code  here ........... */}
              {isClick === 3 && (
                <>
                  <View style={LoginStyles.inputContainer}>
                    <Text
                      style={[
                        LABEL_STYLES._texinputLabel,
                        LoginStyles.passchange,
                      ]}
                    >
                      Password successfully updated
                    </Text>
                    <Image
                      source={IMAGES.CheckIcon}
                      style={LoginStyles.checkicon}
                      resizeMode={"center"}
                    />
                  </View>
                </>
              )}

              {/* ------ Loder section start code  here ........... */}
              {isLoading && (
                <View style={LoginStyles.secondloder}>
                  <ActivityIndicator
                    size={30}
                    color={_COLORS.Kodie_BlackColor}
                  />
                </View>
              )}

              {/* ------ Next button section start code  here ........... */}
              <View
                style={[
                  {
                    marginBottom: 800,
                    marginTop:
                      isClick === 1 || isClick === 2 || isClick === 3
                        ? 150
                        : 220,
                  },
                ]}
              >
                <CustomSingleButton
                  onPress={handleButtonPress}
                  _ButtonText={buttonLabels[isClick]}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  marginTop={
                    isClick
                      ? Platform.OS === "android"
                        ? "1%"
                        : "1%"
                      : Platform.OS === "android"
                      ? "20%"
                      : "0%"
                  }
                />
              </View>
            </View>
          </RBSheet>

      {isLoading ? <CommonLoader /> : null}
    </KeyboardAvoidingView>
  );
};
