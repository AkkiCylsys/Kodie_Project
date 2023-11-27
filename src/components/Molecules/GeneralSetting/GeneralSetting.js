import { View, Text, Image } from "react-native";
import React from "react";
import { GeneralSettingStyle } from "./GeneralSettingStyle";

const GeneralSetting = (props) => {
  return (
    <View>
      <View style={GeneralSettingStyle.main}>
        <View style={GeneralSettingStyle.bindview}>
          <View style={GeneralSettingStyle.imageview}>
            <Image
              source={props.imageSource}
              style={GeneralSettingStyle.image}
            />
          </View>
          <View>
            <Text style={GeneralSettingStyle.headingtext}>{props.heading}</Text>
            <Text style={GeneralSettingStyle.desctext}>
              {props.description}
            </Text>
          </View>
        </View>
        <Image source={props.leftarrowimg} style={GeneralSettingStyle.image} />
      </View>
    </View>
  );
};

export default GeneralSetting;
