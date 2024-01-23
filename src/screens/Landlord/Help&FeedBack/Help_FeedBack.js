import React from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Help_FeedBackCss } from "./Help_FeedBackCss";
import Entypo from "react-native-vector-icons/Entypo";
import { IMAGES, _COLORS } from "../../../Themes/index";
import TopHeader from "../../../components/Molecules/Header/Header";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { _goBack } from "../../../services/CommonServices";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";

const feedbackData = [
  {
    id: "1",
    Heading: "Halp Center",
    icon: (
      <AntDesign
        name="questioncircleo"
        size={20}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "2",
    Heading: "Contact Us",
    icon: (
      <MaterialIcons
        name="perm-contact-cal"
        size={22}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "3",
    Heading: "Terms & Privacy Policy",
    icon: (
      <Fontisto
        name="file-1"
        size={20}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
  {
    id: "4",
    Heading: "AppInfo",
    icon: (
      <Feather
        name="info"
        size={20}
        color={_COLORS.Kodie_GreenColor}
        style={{ alignSelf: "center" }}
      />
    ),
  },
];
const Help_FeedBack = (props) => {
  const navigation = useNavigation();
  const HelpFeedback_render = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            if (item.id === "1") {
              //---- Navigate to OtherScreen when Contact Us is clicked
              navigation.navigate("OtherScreen");
            }
            if (item.id === "2") {
              //---- Navigate to OtherScreen when Contact Us is clicked
              navigation.navigate("Contactus");
            }

            if (item.id === "3") {
              //---- Navigate to OtherScreen when Contact Us is clicked
              navigation.navigate("OtherScreen");
            }
            if (item.id === "4") {
              //----- Navigate to OtherScreen when AppInfo is clicked
              navigation.navigate("AppInfo");
            }
          }}
          style={Help_FeedBackCss.container}
        >
          <View style={Help_FeedBackCss.profileView}>
            {/* <Image source={item.img} style={Help_FeedBackCss.profileIcon} /> */}
            <Text style={Help_FeedBackCss.IconView}>{item.icon}</Text>
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={Help_FeedBackCss.profile_Heading}>
                {item.Heading}
              </Text>
            </View>
          </View>
          <View style={Help_FeedBackCss.ArrowIcon}>
            <Entypo
              name="chevron-small-right"
              size={23}
              color={_COLORS.Kodie_GrayColor}
              style={Help_FeedBackCss.ArrowIconStyle}
            />
          </View>
          <DividerIcon />
        </TouchableOpacity>
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
