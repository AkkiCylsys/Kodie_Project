import { View, Text, Image } from "react-native";
import React from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { HelpOrFeedbackStyle } from "./HelpOrFeedbackStyle";
import { IMAGES } from "../../../Themes/index";
import { FlatList } from "react-native-gesture-handler";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";

const settingData = [
  {
    id: "1",
    Heading: "Halp Center",
    img: IMAGES.helpCenter,
    arrowimg: IMAGES.rightarrow,
  },
  {
    id: "2",
    Heading: "Contact Us",
    img: IMAGES.contactus,
    arrowimg: IMAGES.rightarrow,
  },
  {
    id: "3",
    Heading: "Terms & PrivacyPolicy",
    img: IMAGES.TermPrivacy,
    arrowimg: IMAGES.rightarrow,
  },
  {
    id: "4",
    Heading: "AppInfo",
    img: IMAGES.AppInfo,
    arrowimg: IMAGES.rightarrow,
  },
];

const HelpOrFeedback = (props) => {
  const renderItem = ({ item }) => (
    <>
      <View style={HelpOrFeedbackStyle.Helpview}>
        <View style={HelpOrFeedbackStyle.Helpselctionview}>
          <View style={HelpOrFeedbackStyle.Helpimgview}>
            <Image source={item.img} style={HelpOrFeedbackStyle.imgbox} />
          </View>

          <Text style={HelpOrFeedbackStyle.Helptext}>{item.Heading}</Text>
        </View>

        <View style={HelpOrFeedbackStyle.arrowiconview}>
          <Image
            source={item.arrowimg}
            style={HelpOrFeedbackStyle.rightarrowicon}
          />
        </View>
      </View>
      <DividerIcon style={HelpOrFeedbackStyle.hairlinebuttom} />
    </>
  );

  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Help & Feedback"}
      />
      <FlatList
        data={settingData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </>
  );
};

export default HelpOrFeedback;
