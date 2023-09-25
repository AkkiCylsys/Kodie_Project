// Screen no:226
import { View, Text, Image } from "react-native";
import React from "react";
import { AppInfoStyle } from "./AppInfoStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS } from "../../../Themes";

const AppInfo = () => {
  return (
    <>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"App info"}
      />
      <View style={AppInfoStyle.maincontainer}>
        <View style={AppInfoStyle.headingview}>
          <Text style={AppInfoStyle.propertytext}>
            Kodie property management{" "}
          </Text>
          <Text style={AppInfoStyle.versiontext}>Version 2.23. 16.76</Text>

          <View>
            <Image
              style={AppInfoStyle.mainlogo}
              source={require("../../../assets/images/Logo/MainLogo.png")}
            />
          </View>
        </View>

        <View style={AppInfoStyle.timedurationview}>
          <Text style={AppInfoStyle.timedurationtext}>
            @ 2023-2023 Kodie Inc
          </Text>
        </View>

        <View style={AppInfoStyle.buttonview}>
          <CustomSingleButton
            _ButtonText={"Licenses"}
            backgroundColor={_COLORS.Kodie_lightGreenColor}
          />
        </View>
      </View>
    </>
  );
};

export default AppInfo;
