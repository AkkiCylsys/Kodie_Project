import React,{ useState} from "react";
import {
  Text,
  View,
  ScrollView,TextInput
} from "react-native";
import { TwoStepVerificationStyle3 } from "./TwoStepVerificationStyle3";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS, } from "../../../Themes";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
const TwoStepVerification3 = (props) => {
  return (
    <>
      <View style={TwoStepVerificationStyle3.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <DividerIcon style={TwoStepVerificationStyle3.divider} />
        <ScrollView>
          <View style={TwoStepVerificationStyle3.container}>
              <Text style={TwoStepVerificationStyle3.text}>
              Add an email so you can reset your PIN if you forget it.
              </Text>
              <View>
              <TextInput
                style={TwoStepVerificationStyle3.input}
                placeholder="Add email address"
                placeholderTextColor="#999"
              />
            </View>
            <View style={TwoStepVerificationStyle3.Button}>
              <CustomSingleButton
                _ButtonText={"Next"}
                Text_Color={_COLORS.Kodie_WhiteColor}
                text_Size={16}
                backgroundColor={_COLORS.Kodie_BlackColor}
                height={58}
                marginTop={3}
              />
            </View>
            <View style={TwoStepVerificationStyle3.Button2}>
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

export default TwoStepVerification3;
