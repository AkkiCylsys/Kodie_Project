import React from "react";
import { View, Text, ScrollView, Image } from "react-native";

import { _COLORS, LABEL_STYLES, IMAGES } from "../../../Themes";
import { JobCompletionCss } from "./JobCompletionCss";
import TopHeader from "../../../components/Molecules/Header/Header";
import RowButtons from "../../../components/Molecules/RowButtons/RowButtons";
import { _goBack } from "./../../../services/CommonServices/index";

export default JobCompletion = (props) => {
  return (
    <View style={JobCompletionCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Confirm job completion"}
      />
      <ScrollView>
        <View style={JobCompletionCss.Container}>
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
            RightButtonbackgroundColor={_COLORS.Kodie_GreenColor}
            RightButtonborderColor={_COLORS.Kodie_GreenColor}
            RightButtonTextColor={_COLORS.Kodie_BlackColor}
          />
        </View>
      </ScrollView>
    </View>
  );
};
