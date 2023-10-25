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
//ScreenNo:7
export default SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [term, setTerm] = useState(false);
  const [privacy,setPrivacy] =useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [check, setIsCheck] = useState(false);
  const [privacycheck, setPrivacycheckCheck] = useState(false);
  
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
// const handleSignUp = () => {
//   fetch("https://cylsys-kodie-api-027-6d8a135bd60f.herokuapp.com/api/v1/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//       is_term_condition: 1,
//       is_privacy_policy: 1,
//     }),
//     timeout: 10000,
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.success) {
//         props.navigation.navigate("Login");
//       } else {
//         alert("Signup failed. Please try again.");
//       }
//     })
//     .catch(error => {
//       console.error("Signup error:", error);
//       alert("Network request timed out. Please check your connection or try again later.");
//     });
//   }  

 
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
        <View style={SignUpStyles.card}>
          <View style={SignUpStyles.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Email address*</Text>
            <TextInput
              style={SignUpStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Your Email Address"
              placeholderTextColor="#999"
            />
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
          </View>
          <Text style={SignUpStyles.accept_Text}>
            {"Accept the terms of use"}
          </Text>
          <View style={SignUpStyles.termView}>
            <TouchableOpacity
              onPress={() => {
                setIsCheck(!check);
              }}
            >
              <View style={SignUpStyles.CheckBox_View}>
                {check && (
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
                setPrivacycheckCheck(!privacycheck);
              }}
            >
              <View style={SignUpStyles.CheckBox_View}>
                {privacycheck && (
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

        <View style={SignUpStyles.signBtnView}>
          <CustomSingleButton
            _ButtonText={"Sign up now"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            // onPress={handleSignUp}
            onPress={() => {
              props.navigation.navigate("SignUpVerification");
            }}
          />
          <DividerIcon
            DeviderText={"or"}
            style={{ marginTop: 32, marginBottom: 30 }}
          />
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
