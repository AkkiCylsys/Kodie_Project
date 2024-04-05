//ScreenNo:226
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { AppInfoStyle } from "./AppInfoStyle";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import { _COLORS } from "../../../Themes";
import { logos } from "../../../Themes/CommonVectors/Images";
import { _goBack } from "../../../services/CommonServices";
import DeviceInfo from "react-native-device-info";

const AppInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const appVersion = DeviceInfo.getVersion();
  console.log("App Version:", appVersion);
  const currentYear = new Date().getFullYear();
  console.log("Current Year:", currentYear);

  // Get the previous year
  const previousYear = currentYear - 1;
  console.log("Previous Year:", previousYear);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:_COLORS.Kodie_WhiteColor}}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"App info"}
      />
      <ScrollView>
        <View style={AppInfoStyle.maincontainer}>
          <View style={AppInfoStyle.headingview}>
            <Text style={AppInfoStyle.propertytext}>
              Kodie property management
            </Text>
            <Text style={AppInfoStyle.versiontext}>Version {appVersion}</Text>

            <View>
              <Image style={AppInfoStyle.mainlogo} source={logos.mainLogo} />
            </View>
          </View>

          <View style={AppInfoStyle.timedurationview}>
            <Text style={AppInfoStyle.timedurationtext}>
             @ {previousYear}-{currentYear} Kodie Inc
            </Text>
          </View>

          <View style={AppInfoStyle.buttonview}>
            <CustomSingleButton
              _ButtonText={"Licenses"}
              backgroundColor={_COLORS.Kodie_lightGreenColor}
              disabled={isLoading ? true : false} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppInfo;
