import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import StepText from "../../../components/Molecules/StepText/StepText";
import { ContractorSignupThirdStyle } from "./ContractorSignUpThirdScreenCss";
import {
  FONTFAMILY,
  VIEW_STYLES,
  LABEL_STYLES,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import TopHeader from "./../../../components/Molecules/Header/Header";
import StatusBar from "./../../../components/Atoms/StatusBar/StatusBar";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import Entypo from "react-native-vector-icons/Entypo";
import { _goBack } from "./../../../services/CommonServices/index";
export default ContractorSignUpThirdScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={ContractorSignupThirdStyle.container}>
      <TopHeader onPressLeftButton={() => _goBack(props)} />
      <StatusBar width={"75%"} />
      <StepText _StepNo={" 3"} _StepText={" Add certification documents"} />
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
        <TouchableOpacity style={ContractorSignupThirdStyle.crossIcon}>
          <Entypo
            name="cross"
            size={20}
            color={_COLORS.Kodie_WhiteColor}
            style={ContractorSignupThirdStyle.crossIconStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={ContractorSignupThirdStyle.phototextView}>
        <Text style={LABEL_STYLES.commontext}>{"Certification documents"}</Text>
        <Text style={LABEL_STYLES.commonMidtext}>
          {"You can upload certification documents"}
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
            props.navigation.navigate("ContractorSignUpFinalScreen")
          }
          _ButtonText={"Next"}
          Text_Color={_COLORS.Kodie_WhiteColor}
        />
      </View>
    </View>
  );
};
