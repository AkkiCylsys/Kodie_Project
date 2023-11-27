import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { EditDashboardComponentStyle } from "./EditDashboardComponentStyle";
import { _COLORS } from "../../../Themes";

const EditDashboardComponent = (props) => {
  return (
    <>
      <View style={EditDashboardComponentStyle.Maniview}>
        <View style={EditDashboardComponentStyle.Container}>
          <View style={EditDashboardComponentStyle.iconmenu}>
            {props.icon}
          </View>
          <View style={EditDashboardComponentStyle.Textview}>
            <Text style={EditDashboardComponentStyle.Text1}>
              {props.heading}
            </Text>
            <Text style={EditDashboardComponentStyle.Text2}>{props.name}</Text>
          </View>
          <View style={EditDashboardComponentStyle.iconmenu}>
          {props.iconmenu}
          </View>
        </View>
      </View>
    </>
  );
};

export default EditDashboardComponent;
