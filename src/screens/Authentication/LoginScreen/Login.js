// Screen 2,3,4,5,6
import React, { useState, useRef } from "react";
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
  const [Resetpassword, setResetpassword] = useState("");
  const [isClick, setIsClick] = useState(0);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const refRBSheet = useRef();
  const [apiData, setApiData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  // Reset validation..

  const handleforgetValidation = () => {
    if (resetEmail.trim() === "") {
      setResetEmailError("Email is required!");
    } else {
      send_verification_code();
      // setIsClick(isClick + 1);
    }
  };
  const validateResetEmail = (resetEmail) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(resetEmail);
  };

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
  const handleverificationcodes = () => {
    if (verificationcode.trim() === "") {
      setVerificationcodeError("Please enter verification code");
    } else {
      verify_Otp();
      // setIsClick(isClick + 1);
    }
  };
  const handleResetpasswordCheck = () => {
    if (newpassword.trim() === "") {
      setNewPasswordError("Please create a new password");
    } else if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Please enter a confirmation password");
    } else if (newpassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(""); // Clear the error message
      create_password()
      // setIsClick(isClick + 1);
    }
  };

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
      // setIsClick((prev) => (prev + 1) % 4);
      setIsClick(isClick + 1);
    }
  };

  const makeApiLogin = () => {
    // -----loading set true here
    setIsLoading(true);
    const url =
      // "https://cylsys-kodie-api-027-6d8a135bd60f.herokuapp.com/api/v1/login";
      "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response:", result);
        // -----write inner conditon here if / else
        if (result.status ===true ) {
          setIsLoading(false);
          alert(result.message);
          setIsAuthenticated(true);
          props.navigation.navigate("DrawerNavigstorLeftMenu");
        } else {
          alert("Please check your email and password.");
          setPasswordError(
            "Hmm, it seems like the credential you entered is invalid. Please try again."
          );
          setIsAuthenticated(false);
        }
        
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsAuthenticated(false);
      })
      // loding
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required");
    } else if (!validateEmail(text)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };
  const handleNewPassword = (text) => {
    setNewPassword(text);
    if (text.trim() === "") {
      setNewPasswordError("New Password is required");
    } else {
      setNewPasswordError("");
    }
  };
  const handleConfirmpassword = (text) => {
    setConfirmPassword(text);
    if (text.trim() === "") {
      setConfirmPasswordError("Please enter a confirmation password");
    } else if (newpassword !== text) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(""); // Clear the error message
    }
  };
  const handleSubmit = () => {
    if (email.trim() === "") {
      setEmailError("Email is required!");
    } else if (!validateEmail(email)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      makeApiLogin();
    }
  };

  const handleverificationCode = (text) => {
    setVerificationcode(text);
    if (text.trim() === "") {
      setVerificationcodeError("verification code is required");
    } else {
      setVerificationcodeError("");
    }
  };

  const send_verification_code = () => {
    // Set loading to true before making the API call
    setIsLoading(true);
  
    const url = "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/reset_password1";
    console.log("url...",url)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmail, // Assuming you have 'email' defined or passed as an argument
      }),
    })
   
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response send otp:", result);
        if (result?.status === true) {
          // If the API call is successful, increment isClick
          alert("The otp has been sent your email")
          setIsClick(isClick + 1);
        } else {
          alert("Verification code is not sent");
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        // Always set loading to false, whether the API call succeeds or fails
        setIsLoading(false);
      });
  };
  
  const verify_Otp = () => {
    // Set loading to true before making the API call
    setIsLoading(true);
  
    const url = "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/reset_password2";
    console.log("url...",url)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmail, // Assuming you have 'email' defined or passed as an argument
        otp:verificationcode
      }),
    })
   
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response verify otp:", result);
        if (result?.status === true) {
          // If the API call is successful, increment isClick
          alert(result?.message)
          setIsClick(isClick + 1);
        } else {
          alert(result?.message);
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        // Always set loading to false, whether the API call succeeds or fails
        setIsLoading(false);
      });
  };
  const create_password = () => {
    // Set loading to true before making the API call
    setIsLoading(true);
  
    const url = "https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/reset_password";
    console.log("url...",url)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: resetEmail, // Assuming you have 'email' defined or passed as an argument
        // otp:verificationcode,
        password: newpassword

      }),
    })
   
      .then((response) => response.json())
      .then((result) => {
        console.log("API Response create_password:", result);
        if (result) {
          // If the API call is successful, increment isClick
          alert(result.message[0][0])
          setIsClick(isClick + 1);
        } else {
          alert("password not created");
        }
      })
      .catch((error) => {
        console.error("API failed", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        // Always set loading to false, whether the API call succeeds or fails
        setIsLoading(false);
      });
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
                style={[
                  LoginStyles.input,
                  {
                    borderColor: emailError
                      ? _COLORS.Kodie_lightRedColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
                value={email}
                onChangeText={handleEmailChange}
                onBlur={() => handleEmailChange(email)}
                placeholder="Your email address"
                placeholderTextColor="#999"
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
                onChangeText={handlePasswordChange}
                onBlur={() => {
                  handlePasswordChange(password);
                }}
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
              }}
            >
              <Text style={LoginStyles.forgot}>Forgot password?</Text>
            </TouchableOpacity>

            <CustomSingleButton
              onPress={handleSubmit}
              _ButtonText={"Login"}
              Text_Color={_COLORS.Kodie_WhiteColor}
            />
            {/* -----loading section code here */}
            {isLoading && (
              <View style={LoginStyles.loderview}>
                <ActivityIndicator size={50} color={_COLORS.Kodie_BlackColor} />
              </View>
            )}
            <View style={LoginStyles.loderview}></View>
            <DividerIcon DeviderText={"or"} />
            <CustomSingleButton
              onPress={() => {
                // props.navigation.navigate("Invitefriend"),
                // props.navigation.navigate("Bedroom");
                // props.navigation.navigate("ConfirmJobCompletion");
                // props.navigation.navigate("JobCompletion");
                props.navigation.navigate("ContractorSignUpFirstScreen");
              }}
              leftImage={IMAGES.GoogleIcon}
              isLeftImage={true}
              _ButtonText={" Google"}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <CustomSingleButton
              onPress={() => props.navigation.navigate("ManageSubscription")}
              leftImage={IMAGES.FacebookIcon}
              isLeftImage={true}
              _ButtonText={"Login with Facebook"}
              backgroundColor={_COLORS.Kodie_WhiteColor}
            />
            <BottomTextsButton
              _LeftButtonText={"Don't have an account yet?"}
              _RightButtonText={"Sign up"}
              onPress={() => {
                props.navigation.navigate("SignUp");
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
                  style={[
                    LoginStyles.input,
                    {
                      borderColor: resetEmailError
                        ? _COLORS.Kodie_lightRedColor
                        : _COLORS.Kodie_GrayColor,
                    },
                  ]}
                  value={resetEmail}
                  onChangeText={handleResetEmailChange}
                  onBlur={() => handleResetEmailChange(resetEmail)}
                  placeholder="Your Email Address"
                  placeholderTextColor="#999"
                />
              </View>
              {resetEmailError ? (
                <Text style={LoginStyles.error_text}>{resetEmailError}</Text>
              ) : null}
            </>
          )}
          {isClick === 1 && (
            <>
              <View style={LoginStyles.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                <TextInput
                  style={LoginStyles.input}
                  value={resetEmail}
                  // onChangeText={handleEmailChange}
                  // onBlur={() => handleEmailChange(email)}
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
                    placeholder="code"
                    placeholderTextColor="#999"
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
              ) : null}
            </>
          )}
          {isClick === 2 && (
            <ScrollView
              contentContainerStyle={{ marginBottom: 90 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={LoginStyles.inputContainer}>
                <Text style={LABEL_STYLES._texinputLabel}>Email</Text>
                <TextInput
                  style={LoginStyles.input}
                  value={resetEmail}
                  // onChangeText={handleEmailChange}
                  // onBlur={() => handleEmailChange(email)}
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
                    value={verificationcode}
                    onChangeText={handleverificationCode}
                    onBlur={() => handleverificationCode(verificationcode)}
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
              ) : null}
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.cardHeight]}
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
                {newpasswordError ? (
                  <Text style={LoginStyles.error_text}>{newpasswordError}</Text>
                ) : null}
              </View>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.cardHeight]}
                >
                  Confirm password
                </Text>
                <View style={[LoginStyles.passwordContainer,{
                      borderColor: confirmPasswordError
                        ? _COLORS.Kodie_lightRedColor
                        : _COLORS.Kodie_GrayColor,
                    },]}>
                  <TextInput
                    style={LoginStyles.passwordInput}
                    value={confirmPassword}
                    onChangeText={handleConfirmpassword}
                    onBlur={() => handleConfirmpassword(confirmPassword)}
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
                {confirmPasswordError ? (
                  <Text style={LoginStyles.error_text}>
                    {confirmPasswordError}
                  </Text>
                ) : null}
              </View>
            </ScrollView>
          )}
          {isClick === 3 && (
            <>
              <View style={LoginStyles.inputContainer}>
                <Text
                  style={[LABEL_STYLES._texinputLabel, LoginStyles.passchange]}
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
            {isLoading && (
              <View style={LoginStyles.secondloder}>
                <ActivityIndicator size={50} color={_COLORS.Kodie_BlackColor} />
              </View>
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
