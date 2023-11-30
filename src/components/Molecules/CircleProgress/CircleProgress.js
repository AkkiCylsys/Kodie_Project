// import { View, Text } from "react-native";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useState } from "react";
import { CircleProgressStyle } from "./CircleProgressStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { _COLORS, IMAGES ,FONTFAMILY} from "../../../Themes";
import { FloatingAction } from "react-native-floating-action";

const actions = [
  {
    text: "Add property",
    icon: IMAGES.AddProperty,
    name: "add_Property",
    position: 2,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textStyle: {
      fontWeight: '600', 
      // color:_COLORS.Kodie_WhiteColor
    },
  },
  {
    text: "Edit dashboard",
    icon: IMAGES.EditDashboard,
    name: "edit_Dashboard",
    position: 1,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textStyle: {
      fontWeight: '600', 
      // color:_COLORS.Kodie_WhiteColor
    
    }
  },
  {
    text: "Invite prospective tenant",
    icon: IMAGES.InviteProspectiveTenant,
    name: "invite_Prospective_tenant",
    position: 3,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textStyle: {
      fontWeight: '600', 
      // color:_COLORS.Kodie_WhiteColor
    }
  },
  {
    text: "Invite contractor",
    icon: IMAGES.InviteContractor,
    name: "invite_Contract...",
    position: 4,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textStyle: {
      fontWeight: '600', 
      // color:_COLORS.Kodie_WhiteColor
    },
  },
  {
    text: "Add notice / reminder",
    icon: IMAGES.AddNoticeReminder,
    name: "Add_Notice_Reminder",
    position: 5,
    // color: '#37bc12',
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textStyle: {
      fontWeight: '600', 
      // color:_COLORS.Kodie_WhiteColor
    },
  },
  {
    text: "Create new job",
    icon: IMAGES.CreateNewJob,
    name: "Create_new_job",
    position: 6,
    color: _COLORS.Kodie_GreenColor,
    textElevation: 0,
    textStyle: {
      fontWeight: '600',  
      // color:_COLORS.Kodie_WhiteColor
    },
  },
];

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

        <View style={CircleProgressStyle.floatbtn}>
          {/* floating action button code start here */}
          <View style={styles.container}>
            <FloatingAction
                actions={actions}
                actionsPaddingTopBottom={5}
                color={_COLORS.Kodie_GreenColor}
                style={styles.floatingbtn}
                onPressItem={(name) => {
                  Alert.alert("Icon pressed", `the icon ${name} was pressed`);
                }}
                overlayColor="rgba(0, 0, 0, 0.5)"
              />
          </View>
        </View>
        {/* floating action button code end here */}
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
