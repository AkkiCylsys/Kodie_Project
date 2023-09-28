import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { TwoStepVerificationStyle } from "./TwoStepVerificationStyle";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS,IMAGES } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
const TwoStepVerification = (props) => {

  return (
    <>
      <View style={TwoStepVerificationStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <ScrollView>
          <View style={TwoStepVerificationStyle.container}>
            <View style={TwoStepVerificationStyle.img}>
              <Image source={IMAGES.lock} />
            </View>
            <View style={TwoStepVerificationStyle.text}>
              <Text style={{textAlign:"center"}}>
              For extra security turn on  two-step verification 
              which will require a PIN when Login your email with Kodie again.
              </Text>
            </View>
            <View style={TwoStepVerificationStyle.Button}>
              <CustomSingleButton
                _ButtonText={"Turn on"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                text_Size={14}
                backgroundColor={_COLORS.Kodie_BlackColor}
                height={58}
                marginTop={3}
              />
            </View>
          </View>
        </ScrollView>
        
      </View>
    </>
  );
};

export default TwoStepVerification;
