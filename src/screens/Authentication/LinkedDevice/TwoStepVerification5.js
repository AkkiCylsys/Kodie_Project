import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { TwoStepVerificationStyle5 } from "./TwoStepVerificationStyle5";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS,IMAGES } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
const TwoStepVerification5 = (props) => {

  return (
    <>
      <View style={TwoStepVerificationStyle5.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <ScrollView>
          <View style={TwoStepVerificationStyle5.container}>
            <View style={TwoStepVerificationStyle5.img}>
              <Image source={IMAGES.lock} />
            </View>
            <View style={TwoStepVerificationStyle5.text}>
              <Text style={{textAlign:"center"}}>
              Two-step verification has been switched on.
              </Text>
            </View>
            <View style={TwoStepVerificationStyle5.Button}>
              <CustomSingleButton
                _ButtonText={"Done"}
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

export default TwoStepVerification5;
