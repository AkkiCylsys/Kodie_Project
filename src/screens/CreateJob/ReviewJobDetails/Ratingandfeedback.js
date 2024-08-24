import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { RatingandfeedbackStyle } from "./RatingandfeedbackStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices/CommonMethods";
import { _COLORS } from "../../../Themes";
import StarRating from "react-native-star-rating";
import RangeSlider from "../../../components/Molecules/RangeSlider/RangeSlider";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
const Ratingandfeedback = (props) => {
  const [rating, setRating] = useState(4);
  const [propertyDesc, setPropertyDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <View style={RatingandfeedbackStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Rating & feedback"}
        />
        <ScrollView>
          <View style={RatingandfeedbackStyle.Container}>
            <View>
              <Text style={RatingandfeedbackStyle.Containertext}>
                Please rate your experience
              </Text>
              <Text style={RatingandfeedbackStyle.startext}>
                How would you rate the service you received overall?
              </Text>
            </View>
            <View style={RatingandfeedbackStyle.starStyle}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={rating}
                fullStarColor={_COLORS.Kodie_lightGreenColor}
                emptyStarColor={_COLORS.Kodie_LightGrayColor}
                starSize={50}
                selectedStar={(rating) => setRating(rating)}
              />
            </View>
            <Text style={RatingandfeedbackStyle.star2text}>
              How would you describe the level of communication throughout?
            </Text>
            <RowButtons
              LeftButtonText={"Great!"}
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              LeftButtonborderColor={_COLORS.Kodie_LightWhiteColor}
              RightButtonText={"Neutral"}
              RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
            />
            <RowButtons
              LeftButtonText={"Poor"}
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              LeftButtonTextColor={_COLORS.Kodie_MediumGrayColor}
              LeftButtonborderColor={_COLORS.Kodie_LightWhiteColor}
              RightButtonText={"Other"}
              RightButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
              RightButtonTextColor={_COLORS.Kodie_BlackColor}
              RightButtonborderColor={_COLORS.Kodie_GrayColor}
            />
            <View>
              <Text style={RatingandfeedbackStyle.star2text}>
                Rate the quality of the work performed from 1 - 10.
              </Text>
              <RangeSlider from={1} to={10} />
              <Text style={RatingandfeedbackStyle.star2text}>
                Please leave written feedback below.
              </Text>
              <View>
                <TextInput
                  style={RatingandfeedbackStyle.input}
                  value={propertyDesc}
                  onChangeText={setPropertyDesc}
                  placeholder="Describe your property here..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={5}
                  textAlignVertical={"top"}
                />
              </View>
              <View>
                <Text style={RatingandfeedbackStyle.star2text}>
                  Would you recommend Jason Statham to other Kodie users?
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
              <View style={RatingandfeedbackStyle.btnview}>
                <CustomSingleButton
                  _ButtonText={"Submit"}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  disabled={isLoading ? true : false}
                />
                <TouchableOpacity>
                  <Text style={RatingandfeedbackStyle.SkipText}>
                    {"Return home"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Ratingandfeedback;
