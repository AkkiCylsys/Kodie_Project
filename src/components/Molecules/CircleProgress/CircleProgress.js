// import { View, Text } from "react-native";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import { CircleProgressStyle } from "./CircleProgressStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS, IMAGES ,FONTFAMILY} from "../../../Themes";

const CircleProgress = (props) => {
  return (
    <>
      <View style={CircleProgressStyle.maincontainerview}>
        <View style={CircleProgressStyle.mainview}>
          <View style={CircleProgressStyle.bindview}>
            <View style={CircleProgressStyle.circle}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                style={CircleProgressStyle.homeicon}
              />
            </View>
            <View style={CircleProgressStyle.persentview}>
              <Text style={CircleProgressStyle.persenttext}>80%</Text>
              <Text style={CircleProgressStyle.ratetext}>Occupancy rate</Text>
            </View>
          </View>

          <View style={CircleProgressStyle.bindview}>
            <View style={CircleProgressStyle.circle}>
              <MaterialCommunityIcons
                name="home-city"
                size={20}
                style={CircleProgressStyle.homeicon}
              />
            </View>
            <View style={CircleProgressStyle.persentview}>
              <Text style={CircleProgressStyle.persenttext}>95%</Text>
              <Text style={CircleProgressStyle.ratetext}>
                Rental collection
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_GrayColor,
  },

});
export default CircleProgress;
