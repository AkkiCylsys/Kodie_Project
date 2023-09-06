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
export default SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
            <TouchableOpacity>
              <View style={SignUpStyles.CheckBox_View}>
                <FontAwesome
                  name="check"
                  size={15}
                  color={_COLORS.Kodie_GreenColor}
                  style={SignUpStyles.checkbox_BG}
                />
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
            <TouchableOpacity>
              <View style={SignUpStyles.CheckBox_View}>
                <FontAwesome
                  name="check"
                  size={15}
                  color={_COLORS.Kodie_GreenColor}
                  style={SignUpStyles.checkbox_BG}
                />
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
            onPress={() => {
              props.navigation.navigate("AboutYou");
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
