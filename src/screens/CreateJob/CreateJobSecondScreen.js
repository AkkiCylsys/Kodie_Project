import React from "react";
import { View, Text } from "react-native";
import StepText from "../../components/Molecules/StepText/StepText";
import { CreateJobSecondStyle } from "./CreateJobSecondScreenCss";
import { _COLORS, LABEL_STYLES, IMAGES, VIEW_STYLES } from "../../Themes/index";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
export default CreateJobSecondScreen = () => {
  return (
    <View style={CreateJobSecondStyle.container}>
         <TopHeader onPressLeftButton={() => _goBack(props)} MiddleText={"Create job"} />
      <StepText _StepNo={"2"} _StepText={" Photo and Video"} />
      <View style={CreateJobSecondStyle.phototextView}>
        <Text style={LABEL_STYLES.commontext}>{"Photos and Video"}</Text>
        <Text style={LABEL_STYLES.commonMidtext}>
          {"You can upload photo and video here"}
        </Text>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          borderColor={_COLORS.Kodie_TransparentColor}
          _ButtonText={"Upload"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
        />
      </View>
      <View style={VIEW_STYLES._bottomButtonView}>
        <CustomSingleButton
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
        />
      </View>
    </View>
  );
};
