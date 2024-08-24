import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  _COLORS,
  LABEL_RejectConfirmCss,
  IMAGES,
  BANNERS,
  LABEL_STYLES,
} from "../../../Themes";
import { RejectConfirmCss } from "./RejectConfirmcss";
import TopHeader from "../../../components/Molecules/Header/Header";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import { _goBack } from "./../../../services/CommonServices/index";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import RowTexts from "../../../components/Molecules/RowTexts/RowTexts";
import ReadMore from "@fawazahmed/react-native-read-more";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SliderBox } from "react-native-image-slider-box";

const images = [
  BANNERS.wallImage,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];

export default RejectConfirm = (props) => {
  const [ischeck1, setIsCheck1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={RejectConfirmCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Repair request"}
      />
      <ScrollView>
        <SliderBox
          images={images}
          sliderBoxHeight={180}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor={_COLORS.Kodie_VeryLightGrayColor}
          inactiveDotColor={_COLORS.Kodie_GrayColor}
          dotStyle={RejectConfirmCss.dotStyle}
        />
        <View style={RejectConfirmCss.titleContainer}>
          <Text style={LABEL_STYLES.commontext}>Plasterer to fix wall</Text>
          <Text style={LABEL_STYLES.commonMidtext}>Posted Nov 5, 2022</Text>
        </View>
        <View
          style={[
            RejectConfirmCss.carouselText,
            RejectConfirmCss.shadowContainer,
          ]}
        />
        <View style={RejectConfirmCss.Container}>
          <Text style={[LABEL_STYLES.commontext, RejectConfirmCss.CoverText]}>
            Repair request
          </Text>
          <RowTexts leftText={"Contractor name"} rightText={"Jason Statham"} />
          <RowTexts leftText={"Job"} rightText={"Plasterer to fix wall"} />
          <RowTexts
            leftText={"Location"}
            rightText={"1729 Melbourne St Australia"}
          />
          <RowTexts leftText={"Date"} rightText={"Nov 11, 2022"} />
          <RowTexts leftText={"Time"} rightText={"10pm - 2am (4 hours)"} />
          <RowTexts leftText={"Who pays?"} rightText={"Landlord"} />
          <RowTexts leftText={"Budget"} rightText={"$200"} />
          <Text style={[RejectConfirmCss.CoverText]}>Description</Text>
          <Text style={[RejectConfirmCss.textStyle]}>
            My wall needs to fixed, its cracked and I can’t do it myself.
          </Text>
          <Text style={RejectConfirmCss.CoverText}>{"Contractor details"}</Text>
          <ReadMore
            seeMoreStyle={RejectConfirmCss.readMore}
            seeLessStyle={RejectConfirmCss.readMore}
            seeMoreText={"read more"}
            seeLessText={"read Less"}
            numberOfLines={2}
            style={RejectConfirmCss.textStyle}
          >
            {
              "Hey thanks for your consideration. Check out my job history and I think you'll find I'm a great fit for this job Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </ReadMore>
          <CustomSingleButton
            onPress={() => {}}
            _ButtonText={"View contractor profile"}
            Text_Color={_COLORS.Kodie_BlackColor}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
            height={40}
            disabled={isLoading ? true : false}
          />
          <TouchableOpacity
            style={[RejectConfirmCss.rowView]}
            onPress={() => setIsCheck1(!ischeck1)}
          >
            <MaterialCommunityIcons
              name={ischeck1 ? "checkbox-marked" : "checkbox-blank-outline"}
              size={15}
              color={_COLORS.Kodie_GreenColor}
              style={RejectConfirmCss.checkBox}
            />
            <Text style={RejectConfirmCss.textStyle}>
              Pre-approve this type of repair in future
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={RejectConfirmCss.buttonView}>
        <View style={RejectConfirmCss.button}>
          <RowButtons
            LeftButtonText={"Reject"}
            RightButtonText={"Confirm"}
            onPressRightButton={() => {
              props.navigation.navigate("Properties");
            }}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_WhiteColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
          />
        </View>
      </View>
    </View>
  );
};
