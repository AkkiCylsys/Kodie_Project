//ScreenNo:225
import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { ContactusStyle } from "./ContactusStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { CustomButtonstyles } from "../../../components/Atoms/CustomButton/CustomButtonCss";
import { _COLORS } from "../../../Themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { _goBack } from "../../../services/CommonServices";
const Contactus = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Contact us"}
      />
      <View style={ContactusStyle.inputview}>
        <Text style={ContactusStyle.textmessage}>Tell us how we can help</Text>
        <View style={ContactusStyle.inputboxview}>
          <TextInput
            style={ContactusStyle.input}
            placeholder="Tell us how we can help"
          />
        </View>

        <View style={ContactusStyle.checkboxview}>
          <Ionicons name="checkbox" style={ContactusStyle.imgcheckbox} />
          <View style={ContactusStyle.checkboxtextview}>
            <Text style={ContactusStyle.optionaltext}>
              Include device information? (optional)
            </Text>
            <Text style={ContactusStyle.answertext}>
              Technical details like your model and setting can help us answer
              your question.
            </Text>
          </View>
        </View>

        <View style={ContactusStyle.viaemailview}>
          <Text style={ContactusStyle.viaemailtext}>
            We will get back to you via email.
          </Text>
        </View>
        <View style={ContactusStyle.buttonview}>
          <CustomSingleButton
            _ButtonText={"Submit"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              props.navigation.navigate("AppInfo");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Contactus;
