import React from "react";
import { View, Text, Image } from "react-native";
import StepText from "../../../components/Molecules/StepText/StepText";
import { ContractorSignupSecondStyle } from "./ContractorSignUpSecondScreenCss";
import {
  FONTFAMILY,
  LABEL_STYLES,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";

import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";

export default ContractorSignUpSecondScreen = (props) => {
  return (
    <View style={ContractorSignupSecondStyle.container}>
      <StepText _StepNo={"2"} _StepText={"Add photos and videos"} />
      <View style={ContractorSignupSecondStyle.logoContainer}>
        <Image
          source={IMAGES.userIcons}
          style={ContractorSignupSecondStyle.logo}
        />
      </View>
      <View style={ContractorSignupSecondStyle.phototextView}>
        <Text style={LABEL_STYLES.commontext}>{"Photos and Video"}</Text>
        <Text style={LABEL_STYLES.commonMidtext}>
          {"You can upload photo and video here"}
        </Text>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          _ButtonText={"Upload"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
        />
      </View>
    </View>
  );
};
