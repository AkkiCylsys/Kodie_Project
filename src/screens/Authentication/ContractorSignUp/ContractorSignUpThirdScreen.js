import React from "react";
import { View, Text, Image} from "react-native";
import StepText from "../../../components/Molecules/StepText/StepText";
import { ContractorSignupThirdStyle } from "./ContractorSignUpThirdScreenCss";
import {
  FONTFAMILY,
  VIEW_STYLES,
  LABEL_STYLES,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import TopHeader from "./../../../components/Molecules/Header/Header"
import StatusBar from "./../../../components/Atoms/StatusBar/StatusBar"
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _goBack } from './../../../services/CommonServices/index'
export default ContractorSignUpThirdScreen = (props) => {
  return (
    <View style={ContractorSignupThirdStyle.container}>
                        <TopHeader onPressLeftButton={() => _goBack(props)} />
            <StatusBar width={"25%"} />
      <StepText _StepNo={"3"} _StepText={" Add certification documents"} />
      <View style={ContractorSignupThirdStyle.pdfIconView}>
        <Image
          source={IMAGES.document}
          style={ContractorSignupThirdStyle.pdfIcon}
        />
        <View style={ContractorSignupThirdStyle.doctextView}>
          <Text style={ContractorSignupThirdStyle.docText}>
            {"Certification documents.pdf"}
          </Text>
          <Text style={ContractorSignupThirdStyle.docsubText}>{"1.3 MB"}</Text>
        </View>
      </View>
      <View style={ContractorSignupThirdStyle.phototextView}>
        <Text style={LABEL_STYLES.commontext}>{"Certification documents"}</Text>
        <Text style={LABEL_STYLES.commonMidtext}>
          {"You can upload certification documents"}
        </Text>
        <CustomSingleButton
          leftImage={IMAGES.uploadIcon}
          isLeftImage={true}
          _ButtonText={"Upload"}
          backgroundColor={_COLORS.Kodie_lightGreenColor}
        />
      </View>
      <View style={VIEW_STYLES._bottomButtonView}>
        <CustomSingleButton onPress={() => props.navigation.navigate('ContractorSignUpSecondScreen')} _ButtonText={"Next"} Text_Color={_COLORS.Kodie_WhiteColor} />
      </View>
    </View>
  );
};
