//ScreenNo:7
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BANNERS } from "../../../Themes/CommonVectors/Images";
import { SignUpStyles } from "./SignUpStyle";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import BottomTextsButton from "./../../../components/Molecules/BottomTextsButton/BottomTextsButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { IMAGES, _COLORS } from "./../../../Themes/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LABEL_STYLES } from "../../../Themes/CommonStyles/CommonStyles";
import axios from "axios";

export default SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [term, setTerm] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //... Regex signup email validation
  const validateSignUpEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  //...... email validation define here
  const handleSignUpEmail = (text) => {
    setEmail(text);
    if (text.trim() === "") {
      setEmailError("Email is required");
    } else if (!validateSignUpEmail(text)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else {
      setEmailError("");
    }
  };

  //...... password validation define here
  const handleSignUpPassword = (text) => {
    setPassword(text);
    if (text.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  //.......... Api comign data define here
  const SignUpData = {
    email: email,
    password: password,
    is_term_condition: term,
    is_privacy_policy: privacy,
  };

  //.......... Api method define here
  const signApi =
    'https://cylsys-kodie-api-01-e3fa986bbe83.herokuapp.com/api/v1/signup';

  const Signuphandle = () => {
    axios
      .post(signApi, SignUpData)
      .then((response) => {
        if (response.status === true) {
          alert(response.message);
          props.navigation.navigate("SignUpVerification");
        } 
         else if (response.status === false) {
          alert(response.error);
        } else {
          setEmailError("");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  //....... handle signup button validation here
  const handleSubmit = () => {
    if (email.trim() === "") {
      setEmailError("Email is required!");
    } else if (!validateSignUpEmail(email)) {
      setEmailError(
        "Hold on, this email appears to be invalid. Please enter a valid email address."
      );
    } else if (password.trim() === "") {
      setPasswordError("Password is required");
    } else if (!term || !privacy) {
      alert("Please accept both Terms & Conditions and Privacy Policy.");
    } else {
      Signuphandle();
    }
  };

  return (
    <View style={SignUpStyles.container}>
      <ScrollView>
        <View style={SignUpStyles.logoContainer}>
          <Image source={BANNERS.BannerFirst} style={SignUpStyles.logo} />
        </View>
        <View style={SignUpStyles.maintextView}>
          <Text style={SignUpStyles.title}>Welcome to Kodie</Text>
          <Text style={SignUpStyles.discription}>
            Your personal solution to managing your rental properties. No fuss,
            no hassle.
          </Text>
        </View>

        {/*.............. signup input field start here ..................*/}
        <View style={SignUpStyles.card}>
          <View style={SignUpStyles.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Email address*</Text>
            <TextInput
              style={[
                SignUpStyles.input,
                {
                  borderColor: emailError
                    ? _COLORS.Kodie_lightRedColor
                    : _COLORS.Kodie_GrayColor,
                },
              ]}
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleSignUpEmail(email)}
              placeholder="Enter Your Email Address"
              placeholderTextColor="#999"
            />
            {emailError ? (
              <Text style={SignUpStyles.error_text}>{emailError}</Text>
            ) : null}
          </View>

          <View style={SignUpStyles.inputContainer}>
            <Text
              style={[LABEL_STYLES._texinputLabel, SignUpStyles.cardHeight]}
            >
              Password
            </Text>
            <View style={SignUpStyles.passwordContainer}>
              <TextInput
                style={SignUpStyles.passwordInput}
                value={password}
                onChangeText={setPassword}
                onBlur={() => handleSignUpPassword(password)}
                placeholder="Password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={handleTogglePassword}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={_COLORS.Kodie_BlackColor}
                  style={SignUpStyles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={SignUpStyles.error_text}>{passwordError}</Text>
            ) : null}
          </View>
          <Text style={SignUpStyles.accept_Text}>
            {"Accept the terms of use"}
          </Text>

          {/*.............. checkbox field start here ..................*/}
          <View style={SignUpStyles.termView}>
            <TouchableOpacity
              onPress={() => {
                setTerm(!term);
              }}
            >
              <View style={SignUpStyles.CheckBox_View}>
                {term && (
                  <FontAwesome
                    name="check"
                    size={15}
                    value={term}
                    onChangeText={setTerm}
                    color={_COLORS.Kodie_GreenColor}
                    style={SignUpStyles.checkbox_BG}
                  />
                )}
              </View>
            </TouchableOpacity>

            <View style={SignUpStyles.termsConView}>
              <Text style={SignUpStyles.termsText}>{"I have read the"}</Text>
              <TouchableOpacity>
                <Text
                  style={[SignUpStyles.termsText, SignUpStyles.terms_Condition]}
                >
                  {"Terms & Conditions"}
                </Text>
              </TouchableOpacity>
              <Text style={SignUpStyles.termsText}>{"And agree"}</Text>
            </View>
          </View>
          <View style={SignUpStyles.termView}>
            <TouchableOpacity
              onPress={() => {
                setPrivacy(!privacy);
              }}
            >
              <View style={SignUpStyles.CheckBox_View}>
                {privacy && (
                  <FontAwesome
                    name="check"
                    size={15}
                    value={privacy}
                    onChangeText={setPrivacy}
                    color={_COLORS.Kodie_GreenColor}
                    style={SignUpStyles.checkbox_BG}
                  />
                )}
              </View>
            </TouchableOpacity>

            <View style={SignUpStyles.termsConView}>
              <Text style={SignUpStyles.termsText}>{"I have read the"}</Text>
              <TouchableOpacity>
                <Text
                  style={[SignUpStyles.termsText, SignUpStyles.terms_Condition]}
                >
                  {"Privacy Policy"}
                </Text>
              </TouchableOpacity>
              <Text style={SignUpStyles.termsText}>{"And agree"}</Text>
            </View>
          </View>
        </View>

        {/*.............. signup button  here ..................*/}
        <View style={SignUpStyles.signBtnView}>
          <CustomSingleButton
            _ButtonText={"Sign up now"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={handleSubmit}
          />
          <DividerIcon
            DeviderText={"or"}
            style={{ marginTop: 32, marginBottom: 30 }}
          />

          {/*.............. signup option field here ..................*/}
          <CustomSingleButton
            leftImage={IMAGES.GoogleIcon}
            isLeftImage={true}
            _ButtonText={"Sign up with Google"}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
          <CustomSingleButton
            leftImage={IMAGES.FacebookIcon}
            isLeftImage={true}
            _ButtonText={"Sign up with Facebook"}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
          <BottomTextsButton
            _LeftButtonText={"Already have an account?"}
            _RightButtonText={"Login"}
            onPress={() => {
              props.navigation.navigate("SignUpVerification");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
