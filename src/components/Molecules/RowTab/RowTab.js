import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { LABEL_STYLES } from "../../../Themes";
import { RowTabStyle } from "./RowTabStyle";
import DividerIcon from "../../Atoms/Devider/DividerIcon";
import { _COLORS, IMAGES } from "../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";

export default RowTab = (props) => {
  return (
    <>
      <View onPress={props?.RowPressed} style={RowTabStyle.Helpview}>
        <View style={RowTabStyle.Helpselctionview}>
          <View style={RowTabStyle.Helpimgview}>
            <Image source={props?.LeftImage} style={RowTabStyle.imgbox} />
          </View>
          <View style={RowTabStyle.TextViewMain}>
            <Text style={RowTabStyle.Helptext}>{props?.TabTaxt}</Text>
            {props.isSecondRowText ? (
              <Text style={RowTabStyle.SecondRowtext}>{props?.TabSubTaxt}</Text>
            ) : null}
          </View>
        </View>

        <View style={RowTabStyle.arrowiconview}>
          <Entypo name={"chevron-small-right"} size={20} />
        </View>
      </View>
      {props.IsDivider ? <View style={RowTabStyle.hairlinebuttom} /> : null}
    </>
  );
};

RowTab.defaultProps = {
  IsDivider: true,
  isSecondRowText: false,
  RightImage: IMAGES.rightarrow,
};
