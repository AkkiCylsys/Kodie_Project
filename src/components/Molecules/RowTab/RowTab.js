import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { LABEL_STYLES } from "../../../Themes";
import { RowTabStyle } from "./RowTabStyle";
import DividerIcon from "../../Atoms/Devider/DividerIcon";
import { _COLORS, IMAGES } from "../../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export default RowTab = (props) => {
  const renderLeftIcon = () => {
    // Use the appropriate icon based on the library
    if (props?.LeftIconLibrary === "FontAwesome") {
      return (
        <FontAwesome
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "MaterialIcons") {
      return (
        <MaterialIcons
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "AntDesign") {
      return (
        <AntDesign
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "Feather") {
      return (
        <Feather
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "FontAwesome") {
      return (
        <FontAwesome
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "FontAwesome5") {
      return (
        <FontAwesome5
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "Fontisto") {
      return (
        <Fontisto
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "Ionicons") {
      return (
        <Ionicons
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else if (props?.LeftIconLibrary === "SimpleLineIcons") {
      return (
        <SimpleLineIcons
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    } else {
      return (
        <Entypo
          name={props?.LeftIconName}
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      );
    }
  };

  return (
    <>
      <View onPress={props?.RowPressed} style={RowTabStyle.Helpview}>
        <View style={RowTabStyle.Helpselctionview}>
          <View style={RowTabStyle.Helpimgview}>
            {renderLeftIcon()}
            {/* <Image source={props?.LeftImage} style={RowTabStyle.imgbox} /> */}
          </View>
          <View style={RowTabStyle.TextViewMain}>
            <Text style={RowTabStyle.Helptext}>{props?.TabTaxt}</Text>
            {props.isSecondRowText ? (
              <Text
                style={RowTabStyle.SecondRowtext}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {props?.TabSubTaxt}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={RowTabStyle.arrowiconview}>
          {/* <Image
                        source={props?.RightImage}
                        style={RowTabStyle.rightarrowicon}
                    /> */}
          <Entypo
            name={"chevron-small-right"}
            size={22}
            color={_COLORS.Kodie_ExtraLightGrayColor}
          />
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
