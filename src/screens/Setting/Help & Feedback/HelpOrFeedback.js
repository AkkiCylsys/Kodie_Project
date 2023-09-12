import { View, Text, Image } from "react-native";
import React from "react";
import Header from "../../../components/Molecules/Header/Header";
import { HelpOrFeedbackStyle } from "./HelpOrFeedbackStyle";
const HelpOrFeedback = () => {
  return (
    <View>
      <Header />
      <View style={HelpOrFeedbackStyle.Helpview}>
        <View style={HelpOrFeedbackStyle.Helpselctionview}>
          <View style={HelpOrFeedbackStyle.Helpimgview}>
            <Image
              source={require("../../../assets/icons/help.png")}
              style={HelpOrFeedbackStyle.imgbox}
            />
          </View>
          <Text style={HelpOrFeedbackStyle.Helptext}>Help Center</Text>
        </View>
        <View style={HelpOrFeedbackStyle.arrowiconview}>
          <Image
            source={require("../../../assets/icons/rightarrow.png")}
            style={HelpOrFeedbackStyle.rightarrowicon}
          />
        </View>
      </View>
      <View style={HelpOrFeedbackStyle.hairlinebuttom} />

      <View style={HelpOrFeedbackStyle.Helpview}>
        <View style={HelpOrFeedbackStyle.Helpselctionview}>
          <View style={HelpOrFeedbackStyle.Helpimgview}>
            <Image
              source={require("../../../assets/icons/Contact.png")}
              style={HelpOrFeedbackStyle.imgbox}
            />
          </View>
          <Text style={HelpOrFeedbackStyle.Helptext}>Contact us</Text>
        </View>
        <View style={HelpOrFeedbackStyle.arrowiconview}>
          <Image
            source={require("../../../assets/icons/rightarrow.png")}
            style={HelpOrFeedbackStyle.rightarrowicon}
          />
        </View>
      </View>
      <View style={HelpOrFeedbackStyle.hairlinebuttom} />

      <View style={HelpOrFeedbackStyle.Helpview}>
        <View style={HelpOrFeedbackStyle.Helpselctionview}>
          <View style={HelpOrFeedbackStyle.Helpimgview}>
            <Image
              source={require("../../../assets/icons/file.png")}
              style={HelpOrFeedbackStyle.imgbox}
            />
          </View>
          <Text style={HelpOrFeedbackStyle.Helptext}>
            Terms & Privacy Policy
          </Text>
        </View>
        <View style={HelpOrFeedbackStyle.arrowiconview}>
          <Image
            source={require("../../../assets/icons/rightarrow.png")}
            style={HelpOrFeedbackStyle.rightarrowicon}
          />
        </View>
      </View>
      <View style={HelpOrFeedbackStyle.hairlinebuttom} />

      <View style={HelpOrFeedbackStyle.Helpview}>
        <View style={HelpOrFeedbackStyle.Helpselctionview}>
          <View style={HelpOrFeedbackStyle.Helpimgview}>
            <Image
              source={require("../../../assets/icons/info.png")}
              style={HelpOrFeedbackStyle.imgbox}
            />
          </View>
          <Text style={HelpOrFeedbackStyle.Helptext}>App Info</Text>
        </View>
        <View style={HelpOrFeedbackStyle.arrowiconview}>
          <Image
            source={require("../../../assets/icons/rightarrow.png")}
            style={HelpOrFeedbackStyle.rightarrowicon}
          />
        </View>
      </View>
      <View style={HelpOrFeedbackStyle.hairlinebuttom} />
    </View>
  );
};

export default HelpOrFeedback;
