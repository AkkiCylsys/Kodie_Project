import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ReportsStyle } from "./ReportsStyle";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { _COLORS, FONTFAMILY } from "../../../Themes";
import { useState } from "react";

const Report = (props) => {
  const [heart, setHeart] = useState(false);
  const [greenheart, setGreenHeart] = useState(false);
  const togglechange = () => {
    setHeart(!heart);
  };
  const toggle = () => {
    setGreenHeart(!greenheart);
  };
  return (
    <>
      <View style={ReportsStyle.mainContainer}>
        <View style={ReportsStyle.middatabindview}>
          <View style={ReportsStyle.bindview}>
            <View style={ReportsStyle.reportimgview}>
              <Image source={props.lineimg} style={ReportsStyle.reportimg} />
            </View>

            <View style={ReportsStyle.headinglineview}>
              <Text style={ReportsStyle.headintext}>{props.heading}</Text>
              <View style={ReportsStyle.addressviewbind}>
                <Text style={ReportsStyle.addresstext}>{props.address}</Text>
              </View>
            </View>
          </View>

          <View>
            <View>
              <TouchableOpacity style={ReportsStyle.dotsview}>
                <Entypo
                  name="dots-three-vertical"
                  size={25}
                  color={_COLORS.Kodie_LightGrayColor}
                  style={ReportsStyle.dotimg}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={toggle}>
              {props.solidheart ? (
                <AntDesign
                  name={heart ? "hearto" : "heart"}
                  size={28}
                  color={
                    greenheart
                    ? _COLORS.Kodie_LightGrayColor
                     :_COLORS.Kodie_lightGreenColor
                  }
                  style={ReportsStyle.heartimg}
                />
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity onPress={togglechange}>
              {props.hearting ? (
                <AntDesign
                  name={heart ? "heart" : "hearto"}
                  size={28}
                  color={
                    heart
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_LightGrayColor
                  }
                  style={ReportsStyle.heartimg}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
Report.defaultProps = {
  hearting: false,
  marginTop: 10,
  height: 58,
};

Report.defaultProps = {
  solidheart: false,
};

export default Report;
