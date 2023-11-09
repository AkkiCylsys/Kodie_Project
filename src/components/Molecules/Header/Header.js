import React from "react";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { HeaderStyle } from "./HeaderStyle";
import {
  FONTFAMILY,
  SMALLICON,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import { _goBack } from "../../../services/CommonServices";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TopHeader = (props) => {
  return (
    <View
      style={[
        HeaderStyle.mainView,
        { backgroundColor: props?.backgroundColor },
      ]}
    >
      <View style={HeaderStyle.leftButtonView}>
        <TouchableOpacity
          onPress={props?.onPressLeftButton}
          style={[HeaderStyle.button]}
        >
          {/* <Image source={props.leftImage} style={HeaderStyle.leftIcon} /> */}

          <Icon
            name={props.leftImage}
            size={30}
            color={_COLORS.Kodie_WhiteColor}
            style={HeaderStyle.MenuIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={HeaderStyle.middleTextView}>
        {props.isMiddleImage ? (
          <Image source={props.MiddleImage} style={HeaderStyle.MiddleIcon} />
        ) : (
          <Text style={[HeaderStyle.LabelText, { color: props.Text_Color }]}>
            {props.MiddleText}
          </Text>
        )}
      </View>
      {props.isrightImage ? (
        <TouchableOpacity
          onPress={props?.onPressRightButton}
          style={[HeaderStyle.button]}
        >
          <Image source={props.RightImage} style={HeaderStyle.leftIcon} />
        </TouchableOpacity>
      ) : (
        <View style={HeaderStyle.nullView}>
          <TouchableOpacity style={HeaderStyle.notificationButton}>
            {props.IsNotification ? (
              <Image
                source={IMAGES.NotificationIcon}
                style={HeaderStyle.leftIcon}
              />
            ) : null}
          </TouchableOpacity>
          <Image source={props.RightUserProfile} style={HeaderStyle.usericon} />
        </View>
      )}
    </View>
  );
};
TopHeader.defaultProps = {
  isrightImage: false,
  IsNotification: false,
  isMiddleImage: false,
  leftImage: "chevron-left",
  MiddleText: "Set up your profile",
  backgroundColor: _COLORS.Kodie_BlackColor,
  Text_Color: _COLORS.Kodie_WhiteColor,
};
export default TopHeader;
