import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { EditDashboardStyle } from "./EditDashboardStyle";
import { _COLORS, IMAGES } from "../../../Themes";
import RowButtons from "../RowButtons/RowButtons";

const EditDashboard = (props) => {
  
  return (
    <>
      <ScrollView>
        <View style={EditDashboardStyle.Mainview}>
          <View style={EditDashboardStyle.Textview}>
            <Text style={EditDashboardStyle.Text}>Bidding ends in</Text>
            <Text style={EditDashboardStyle.Text}>Budget:</Text>
          </View>
          <View style={EditDashboardStyle.Boxview}>
            <View style={EditDashboardStyle.firstbox}>
              <Text style={EditDashboardStyle.boxtext}>22 hrs</Text>
            </View>
            <View style={EditDashboardStyle.firstbox}>
              <Text style={EditDashboardStyle.boxtext}>33 mins</Text>
            </View>
            <View style={EditDashboardStyle.firstbox}>
              <Text style={EditDashboardStyle.boxtext}>10 secs</Text>
            </View>
            <View style={EditDashboardStyle.firstbox1}>
              <Text style={EditDashboardStyle.boxtext}>$100 per hour</Text>
            </View>
          </View>
          <RowButtons
            leftButtonHeight={44}
            RightButtonHeight={44}
            LeftButtonText={"Bid for job"}
            RightButtonText={"Message"}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default EditDashboard;
