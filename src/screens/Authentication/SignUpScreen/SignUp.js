import React, { useState } from "react";
import { View, BackHandler, Text, Image, ScrollView } from "react-native";
import { BANNERS } from "../../../Themes/CommonVectors/Images";
import { SignUpStyles } from "./SignUpStyle";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import BottomTextsButton from "./../../../components/Molecules/BottomTextsButton/BottomTextsButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import { IMAGES, _COLORS } from "./../../../Themes/index";
import { useFocusEffect, useTheme } from "@react-navigation/native";
export default SignUp = (props) => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       BackHandler.exitApp();
  //       return true;
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //     return () => {
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //     };
  //   }, [])
  // );

  return (
    <View style={SignUpStyles.container}>
      <ScrollView>
        <View style={SignUpStyles.logoContainer}>
          <Image source={BANNERS.BannerFirst} style={SignUpStyles.logo} />
        </View>
        <View style={SignUpStyles.maintextView}>
          <Text style={SignUpStyles.title}>Welcome to Kodie</Text>
          <Text style={SignUpStyles.discription}>
            Your personal solution to managing your rental properties. No fuss,
            no hassle.
          </Text>
        </View>
        <View style={SignUpStyles.signBtnView}>
          <CustomSingleButton
            _ButtonText={"Sign up now"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            onPress={()=>{props.navigation.navigate('AboutYou')}}
          />
          <DividerIcon
            DeviderText={"or"}
            style={{ marginTop: 32, marginBottom: 30 }}
          />
          <CustomSingleButton
            leftImage={IMAGES.GoogleIcon}
            isLeftImage={true}
            _ButtonText={"Sign up with Google"}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
          <CustomSingleButton
            leftImage={IMAGES.FacebookIcon}
            isLeftImage={true}
            _ButtonText={"Sign up with Facebook"}
            backgroundColor={_COLORS.Kodie_WhiteColor}
          />
          <BottomTextsButton
            _LeftButtonText={"Already have an account?"}
            _RightButtonText={"Login"}
            onPress={() => {
              props.navigation.navigate("SignUpVerification");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
