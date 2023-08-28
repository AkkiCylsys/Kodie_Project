import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TenantStyle } from "./TenantStyle";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import TopHeader from "./../../../components/Molecules/Header/Header";
import StatusBar from "./../../../components/Atoms/StatusBar/StatusBar";
import {
  VIEW_STYLES,
  FONTFAMILY,
  LABEL_STYLES,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import { _goBack } from "./../../../services/CommonServices/index";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
export default TenantSignup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={TenantStyle.container}>
      <TopHeader onPressLeftButton={() => _goBack(props)} />
      <StatusBar width={"25%"} />
      <ScrollView>
        <Text style={TenantStyle.title}>Enter your personal information</Text>
        <View style={TenantStyle.formContainer}>
          <View style={TenantStyle.card}>
            <View style={TenantStyle.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Full name*</Text>
              <TextInput
                style={TenantStyle.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name and surname"
                placeholderTextColor="#999"
              />
            </View>
            <View style={TenantStyle.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Email address*</Text>
              <TextInput
                style={TenantStyle.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
              />
            </View>
            <View style={TenantStyle.inputContainer}>
              <Text style={LABEL_STYLES._texinputLabel}>Phone number*</Text>
              <TextInput
                style={TenantStyle.input}
                value={phoneNumber}
                keyboardType="number-pad"
                onChangeText={setPhoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
              />
            </View>
            <View style={TenantStyle.inputContainer}>
              <Text
                style={[LABEL_STYLES._texinputLabel, TenantStyle.cardHeight]}
              >
                Password
              </Text>
              <View style={TenantStyle.passwordContainer}>
                <TextInput
                  style={TenantStyle.passwordInput}
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
                    style={TenantStyle.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <CustomSingleButton
            onPress={() => props.navigation.navigate("InviteTenant")}
            _ButtonText={"Next"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
        <View style={TenantStyle.goBack_View}>
          <TouchableOpacity style={TenantStyle.backIcon}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
          <Text style={TenantStyle.goBack_Text}>{"Go back"}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
