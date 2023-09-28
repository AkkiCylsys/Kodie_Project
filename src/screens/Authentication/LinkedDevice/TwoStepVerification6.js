import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { TwoStepVerificationStyle6 } from "./TwoStepVerificationStyle6";
import { _COLORS,IMAGES } from "../../../Themes";
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
const TwoStepVerification6 = (props) => {

  return (
    <>
      <View style={TwoStepVerificationStyle6.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Two-step verification"}
        />
        <DividerIcon style={TwoStepVerificationStyle6.divider} />

        <ScrollView>
          <View style={TwoStepVerificationStyle6.container}>
            <View style={TwoStepVerificationStyle6.img}>
              <Image source={IMAGES.lock} />
            </View>
            <View style={TwoStepVerificationStyle6.text}>
              <Text style={{ textAlign: "center" }}>
                Two-step verification is switched on. You will need to enter
                your pin when you log in to kodie using your email again.
              </Text>
            </View>
            <View></View>
            <View style={TwoStepVerificationStyle6.bindview}>
              <Image
                source={IMAGES.CheckIcon}
                style={TwoStepVerificationStyle6.imgicon}
              />
              <View style={TwoStepVerificationStyle6.innertextview}>
                <Text style={TwoStepVerificationStyle6.textitem}>Turn off</Text>
              </View>
            </View>
            <View style={TwoStepVerificationStyle6.bindview}>
              <Image
                source={IMAGES.CheckIcon}
                style={TwoStepVerificationStyle6.imgicon}
              />
              <View style={TwoStepVerificationStyle6.innertextview}>
                <Text style={TwoStepVerificationStyle6.textitem}>Change PIN</Text>
              </View>
            </View>
            <View style={TwoStepVerificationStyle6.bindview}>
              <Image
                source={IMAGES.CheckIcon}
                style={TwoStepVerificationStyle6.imgicon}
              />
              <View style={TwoStepVerificationStyle6.innertextview}>
                <Text style={TwoStepVerificationStyle6.textitem}>Change email address</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default TwoStepVerification6;
