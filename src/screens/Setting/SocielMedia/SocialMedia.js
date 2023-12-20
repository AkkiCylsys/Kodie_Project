
//ScreenNo:227
import { View, Text, Image } from "react-native";
import React from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { SocialMediaStyle } from "./SocialMediaStyles";
import { IMAGES } from "../../../Themes/index";

import RowTab from "../../../components/Molecules/RowTab/RowTab";

import { _goBack } from "../../../services/CommonServices/CommonMethods";
const SocialMedia = (props) => {
  return (
    <>
      <View style={SocialMediaStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Follow us on social media"}
        />
        {/* <RowTab LeftImage={IMAGES.instagram} TabTaxt="Instagram" /> */}
        <RowTab
            // isSecondRowText={true}
            LeftIconName={"instagram"}
            LeftIconLibrary={"AntDesign"}
            TabTaxt="Instagram"
          />
        <RowTab
            // isSecondRowText={true}
            LeftIconName={"facebook-square"}
            LeftIconLibrary={"AntDesign"}
            TabTaxt="Facebook"
          />
        <RowTab
            // isSecondRowText={true}
            LeftIconName={"linkedin"}
            LeftIconLibrary={"MaterialCommunityIcons"}
            TabTaxt="Linkedin"
          />
        <RowTab
            // isSecondRowText={true}
            LeftIconName={"twitter-square"}
            LeftIconLibrary={"FontAwesome"}
            TabTaxt="Twitter"
          />
        {/* <RowTab LeftImage={IMAGES.Facebook} TabTaxt="Facebook" />
        <RowTab LeftImage={IMAGES.linkdin} TabTaxt="Linkedin" />
        <RowTab
          LeftImage={IMAGES.Twitter}
          TabTaxt="Twitter"
          IsDivider={false}
        /> */}
      </View>
    </>
  );
};

export default SocialMedia;
