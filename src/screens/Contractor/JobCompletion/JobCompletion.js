import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating";
import { _COLORS, LABEL_STYLES, BANNERS } from "../../../Themes";
import { JobCompletionCss } from "./JobCompletionCss";
import TopHeader from "../../../components/Molecules/Header/Header";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import { _goBack } from "./../../../services/CommonServices/index";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import RowTexts from "../../../components/Molecules/RowTexts/RowTexts";

//ScreenNo:156
export default JobCompletion = (props) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={JobCompletionCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Confirm job completion"}
      />
      <ScrollView>
        <View style={JobCompletionCss.Container}>
          <Text style={JobCompletionCss.HeadingText}>
            {"Please rate your experience"}
          </Text>
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            {"How would you rate the service you received overall?"}
          </Text>
          <View style={JobCompletionCss.starStyle}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              fullStarColor={_COLORS.Kodie_lightGreenColor}
              emptyStarColor={_COLORS.Kodie_GrayColor}
              starSize={45}
              selectedStar={(rating) => setRating(rating)}
            />
          </View>
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            {"How would you describe the level of communication throughout?"}
          </Text>
          <RowButtons
            leftButtonHeight={38}
            RightButtonHeight={38}
            LeftButtonText={"Great!"}
            RightButtonText={"Neutral"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
          />
          <RowButtons
            leftButtonHeight={38}
            RightButtonHeight={38}
            LeftButtonText={"Poor"}
            RightButtonText={"Other"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            RightButtonborderColor={_COLORS.Kodie_GreenColor}
            RightButtonTextColor={_COLORS.Kodie_BlackColor}
          />
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            {"Rate the quality of the work performed from 1 - 10."}
          </Text>
          <RangeSlider from={1} to={10} />
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            {"Please leave written feedback below."}
          </Text>
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
          <Text style={[LABEL_STYLES.commontext, JobCompletionCss.review]}>
            {"Would you recommend Jason Statham to other Kodie users?"}
          </Text>
          <RowButtons
            LeftButtonText={"Yes"}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={"No"}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
        </View>
        <View style={JobCompletionCss.ButtonView}>
          <CustomSingleButton
            disabled={isLoading ? true : false}
            onPress={() => props.navigation.navigate("RejectConfirm")}
            _ButtonText={"Submit"}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
          <TouchableOpacity>
            <Text style={JobCompletionCss.SkipText}>
              {"Skip & return home"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
