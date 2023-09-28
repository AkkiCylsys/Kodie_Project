import React,{ useState} from "react";
import {
  Text,
  View,
  ScrollView,TextInput
} from "react-native";
import { TwoStepVerificationStyle4 } from "./TwoStepVerificationStyle4";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
const TwoStepVerification4 = (props) => {
  return (
    <>
      <View style={TwoStepVerificationStyle4.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <DividerIcon style={TwoStepVerificationStyle4.divider} />
        <ScrollView>
          <View style={TwoStepVerificationStyle4.container}>
              <Text style={TwoStepVerificationStyle4.text}>
              Confirm your email address
              </Text>
              <View>
              <TextInput
                style={TwoStepVerificationStyle4.input}
                placeholder="Add email address"
                placeholderTextColor="#999"
              />
            </View>
            <View style={TwoStepVerificationStyle4.Button}>
              <CustomSingleButton
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                text_Size={16}
                backgroundColor={_COLORS.Kodie_BlackColor}
                height={58}
                marginTop={3}
              />
            </View>
            <View style={TwoStepVerificationStyle4.Button2}>
              <CustomSingleButton
                _ButtonText={"Skip"}
                Text_Color={_COLORS.Kodie_BlackColor}
                text_Size={16}
                backgroundColor={_COLORS.Kodie_WhiteColor}
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

export default TwoStepVerification4;
