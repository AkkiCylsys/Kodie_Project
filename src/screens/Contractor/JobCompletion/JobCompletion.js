import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Image } from "react-native";
import StarRating from "react-native-star-rating";
import { _COLORS, LABEL_STYLES, BANNERS } from "../../../Themes";
import { JobCompletionCss } from "./JobCompletionCss";
import TopHeader from "../../../components/Molecules/Header/Header";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import { _goBack } from "./../../../services/CommonServices/index";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import RowTexts from "../../../components/Molecules/RowTexts/RowTexts";
// Screen no. 156
export default JobCompletion = (props) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  return (
    <View style={JobCompletionCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Confirm job completion"}
      />
      <ScrollView>
        <View style={JobCompletionCss.Container}>
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            Rate contractor
          </Text>
          <View style={JobCompletionCss.starStyle}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor={_COLORS.Kodie_lightGreenColor}
              emptyStarColor={_COLORS.Kodie_GrayColor}
              starSize={32}
              selectedStar={(rating) => setRating(rating)}
            />
          </View>
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            Review
          </Text>
          <RowButtons
            leftButtonHeight={38}
            RightButtonHeight={38}
            LeftButtonText={"Clean job"}
            RightButtonText={"Neat"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
          />
          <RowButtons
            leftButtonHeight={38}
            RightButtonHeight={38}
            LeftButtonText={"Fast hand"}
            RightButtonText={"Other"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            RightButtonborderColor={_COLORS.Kodie_GreenColor}
            RightButtonTextColor={_COLORS.Kodie_BlackColor}
          />
          <TextInput
            style={[JobCompletionCss.input]}
            value={review}
            onChangeText={setReview}
            placeholder="Enter your address"
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical={"top"}
          />
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
          <Text style={JobCompletionCss.photo}>Photo Confirmation</Text>

          <Image source={BANNERS.BannerSecond} style={JobCompletionCss.image} />
        </View>
      </ScrollView>
      <View style={JobCompletionCss.ButtonView}>
        <CustomSingleButton
          onPress={() => props.navigation.navigate("RejectConfirm")}
          _ButtonText={"Continue"}
          Text_Color={_COLORS.Kodie_WhiteColor}
        />
      </View>
    </View>
  );
};
