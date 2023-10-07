import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Help_FeedBackCss } from "./Help_FeedBackCss";
import Entypo from "react-native-vector-icons/Entypo";
import { IMAGES, _COLORS } from "../../../Themes/index";
import TopHeader from "../../../components/Molecules/Header/Header";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { _goBack } from "../../../services/CommonServices";
const feedbackData = [
  {
    id: "1",
    Heading: "Halp Center",
    img: IMAGES.helpCenter,
  },
  {
    id: "2",
    Heading: "Contact Us",
    img: IMAGES.contactus,
  },
  {
    id: "3",
    Heading: "Terms & PrivacyPolicy",
    img: IMAGES.TermPrivacy,
  },
  {
    id: "4",
    Heading: "AppInfo",
    img: IMAGES.AppInfo,
  },
];
const Help_FeedBack = (props) => {
  const HelpFeedback_render = ({ item, index }) => {
    return (
      <>
        <View style={Help_FeedBackCss.container}>
          <View style={Help_FeedBackCss.profileView}>
            <Image source={item.img} style={Help_FeedBackCss.profileIcon} />

            <Text style={Help_FeedBackCss.profile_Heading}>{item.Heading}</Text>
          </View>
          <TouchableOpacity style={Help_FeedBackCss.ArrowIcon}>
            <Entypo
              name="chevron-small-right"
              size={23}
              color={_COLORS.Kodie_GrayColor}
              style={Help_FeedBackCss.ArrowIconStyle}
            />
          </TouchableOpacity>
          <DividerIcon />
        </View>
      </>
    );
  };
  return (
    <View style={Help_FeedBackCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Help & Feedback"}
      />
      <View style={Help_FeedBackCss.flatlistContainer}>
        <FlatList
          data={feedbackData}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          keyExtractor={(item) => item?.id}
          renderItem={HelpFeedback_render}
        />
      </View>
    </View>
  );
};
export default Help_FeedBack;
