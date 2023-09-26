// Screen no: 187
import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { LandlordProfileDataStyle } from "./LandlordProfileDataStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { IMAGES, _COLORS } from "../../../Themes/index";
const LandlordData = [
  {
    id: "1",
    Heading: "Account",
    Sub_heading: "Manage your account settings",
    img: IMAGES.Account,
  },
  {
    id: "2",
    Heading: "Manage Subscription",
    Sub_heading: "Manage your subscription plans",
    img: IMAGES.Subscription,
  },
  {
    id: "3",
    Heading: "Privacy & Security",
    Sub_heading: "View your privacy and security settings",
    img: IMAGES.Privacy,
  },
  {
    id: "4",
    Heading: "Notifications",
    Sub_heading: "Manage in-app notifications",
    img: IMAGES.Notification,
  },
  {
    id: "5",
    Heading: "Storage & Data",
    Sub_heading: "Manage your account settings",
    img: IMAGES.Storage,
  },
  {
    id: "6",
    Heading: "Language",
    Sub_heading: "Change language",
    img: IMAGES.language,
  },
  {
    id: "7",
    Heading: "Help & Feedback",
    Sub_heading: "Get help and leave feedback",
    img: IMAGES.FeedBack,
  },
  {
    id: "8",
    Heading: "Tell a Friend",
    Sub_heading: "Tell your friends about Kodie",
    img: IMAGES.Contact,
  },
  {
    id: "9",
    Heading: "Switch Account",
    Sub_heading: "Switch to another Kodie account",
    img: IMAGES.SwitchAcc_,
  },
  {
    id: "10",
    Heading: "Logout",
    Sub_heading: "Logout of your Kodie profile",
    img: IMAGES.Logout,
  },
];
const LandlordProfileData = (props) => {
  const LandlordProfile_render = ({ item, index }) => {
    return (
      <>
        <View style={LandlordProfileDataStyle.container}>
          <View style={LandlordProfileDataStyle.profileView}>
            <Image
              source={item.img}
              style={LandlordProfileDataStyle.profileIcon}
            />
            <View style={LandlordProfileDataStyle.textContainer}>
              <Text style={LandlordProfileDataStyle.profile_Heading}>
                {item.Heading}
              </Text>
              <Text style={LandlordProfileDataStyle.profile_SubHeading}>
                {item.Sub_heading}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={LandlordProfileDataStyle.ArrowIcon}>
            <Entypo
              name="chevron-small-right"
              size={23}
              color={_COLORS.Kodie_GrayColor}
              style={LandlordProfileDataStyle.ArrowIconStyle}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
  return (
    <>
      <FlatList
        data={LandlordData}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={(item) => item?.id}
        renderItem={LandlordProfile_render}
      />
    </>
  );
};
export default LandlordProfileData;
