
//ScreenNo:227
import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import TopHeader from "../../../components/Molecules/Header/Header";
import { SocialMediaStyle } from "./SocialMediaStyles";
import { IMAGES } from "../../../Themes/index";

import RowTab from "../../../components/Molecules/RowTab/RowTab";

import { _goBack } from "../../../services/CommonServices/CommonMethods";
import axios from "axios";
import { Config } from "../../../Config";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS } from "../../../Themes/index";
import AntDesign from "react-native-vector-icons/AntDesign";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";

const SocialMedia = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkdin, setLinkdin] = useState("");
  useEffect(() => {
    handle_SocialMedia()
  }, [])
  const handle_SocialMedia = () => {
    const url = Config.BASE_URL;
    const SocialMedia_url = url + "lookup_details";
    console.log("Request URL:", SocialMedia_url);
    setIsLoading(true);
    const SocialMedia_data = {
      P_PARENT_CODE: "INVITE",
      P_TYPE: "OPTION",
    };
    axios
      .post(SocialMedia_url, SocialMedia_data)
      .then((response) => {
        console.log("API Response SocialMedia Data:", response.data);
        if (response.data.status === true) {
          setSocialMediaData(response.data.lookup_details);
          // alert(JSON.stringify(response.data.lookup_details));
        } else {
          alert(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("API failed SocialMedia", error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <View style={SocialMediaStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Follow us on social media"}
        />
        {/* <RowTab LeftImage={IMAGES.instagram} TabTaxt="Instagram" /> */}
        {/* <RowTab
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
            TabTaxt="Twitter" */}
        {/* /> */}
        <View onPress={() => { }} style={SocialMediaStyle.Helpview}>
          <View style={SocialMediaStyle.Helpselctionview}>
            <View style={SocialMediaStyle.Helpimgview}>
              <AntDesign
                name={"instagram"}
                size={18}
                color={_COLORS.Kodie_GreenColor}
              />
            </View>
            <View style={SocialMediaStyle.TextViewMain}>
              <Text style={SocialMediaStyle.Helptext}>{"Instagram"}</Text>
            </View>
          </View>
          <View style={SocialMediaStyle.arrowiconview}>
            <Entypo
              name={"chevron-small-right"}
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <DividerIcon />
        </View>
      </View>
    </>
  );
};

export default SocialMedia;
