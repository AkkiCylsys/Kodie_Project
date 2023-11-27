import { View, Text, Image } from "react-native";
import React from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { HelpOrFeedbackStyle } from "./HelpOrFeedbackStyle";
import { IMAGES } from "../../../Themes/index";
import { FlatList } from "react-native-gesture-handler";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import RowTab from "../../../components/Molecules/RowTab/RowTab";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
//ScreenNo:224
const HelpOrFeedback = (props) => {
  return (
    <>
      <View style={HelpOrFeedbackStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Help & Feedback"}
        />
        <RowTab LeftImage={IMAGES.HelpCentre} TabTaxt="Help Centre" />

          <RowTab LeftImage={IMAGES.ContactUs} TabTaxt="Contact Us" />

        <RowTab
          LeftImage={IMAGES.TermsandPolicy}
          TabTaxt="Terms & Privacy Policy"
        />
        <RowTab
          LeftImage={IMAGES.TermsandPolicy}
          TabTaxt="App Info"
          IsDivider={false}
        />
      </View>
    </>
  );
};

export default HelpOrFeedback;
