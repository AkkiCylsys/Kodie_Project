import { View, Text } from "react-native";
import React from "react";
import { CircleProgressStyle } from "./CircleProgressStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const CircleProgress = () => {
  return (
    <View>
      <View style={CircleProgressStyle.mainview}>

        <View style={CircleProgressStyle.circle}>
          <MaterialCommunityIcons name="home-city" size={20} style={CircleProgressStyle.homeicon}/>
        </View>
      </View>
    </View>
  );
};

export default CircleProgress;
