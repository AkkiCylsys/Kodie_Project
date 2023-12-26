import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import StepText from "../../../components/Molecules/StepText/StepText";
import { ContractorSignupSecondStyle } from "./ContractorSignUpSecondScreenCss";
import {
  FONTFAMILY,
  LABEL_STYLES,
  VIEW_STYLES,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import TopHeader from "./../../../components/Molecules/Header/Header";
import StatusBar from "./../../../components/Atoms/StatusBar/StatusBar";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _goBack } from "./../../../services/CommonServices/index";
export default ContractorSignUpSecondScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={ContractorSignupSecondStyle.container}>
      <TopHeader onPressLeftButton={() => _goBack(props)} />
      <StatusBar width={"50%"} />
      <StepText _StepNo={" 2"} _StepText={"Add photos and videos"} />
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
          disabled={isLoading ? true : false}
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Upload"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
        />
      </View>
      <View style={VIEW_STYLES._bottomButtonView}>
        <CustomSingleButton
          disabled={isLoading ? true : false}
          onPress={() =>
            props.navigation.navigate("ContractorSignUpThirdScreen")
          }
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
        />
      </View>
    </View>
  );
};
