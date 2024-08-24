import { View, Text, Image } from "react-native";
import React from "react";
import { GeneralSettingStyle } from "./GeneralSettingStyle";

const GeneralSetting = (props) => {
  return (

      <View style={GeneralSettingStyle.main}>
        <View style={GeneralSettingStyle.bindview}>
          <View style={GeneralSettingStyle.imageview}>
            <Image
              source={props.imageSource}
              style={GeneralSettingStyle.image}
            />
          </View>
          
        </View>
        <View style={{flex:1}}>
            <Text style={GeneralSettingStyle.headingtext}>{props.heading}</Text>
            <Text style={GeneralSettingStyle.desctext}>
              {props.description}
            </Text>
          </View>
        <Image source={props.leftarrowimg} style={GeneralSettingStyle.image} />
      </View>
  
  );
};

export default GeneralSetting;
