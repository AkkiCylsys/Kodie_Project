import React from "react";
import { Text, Image, TouchableOpacity, View, StatusBar } from "react-native";
import { HeaderStyle } from "./HeaderStyle";
import {
  FONTFAMILY,
  SMALLICON,
  IMAGES,
  _COLORS,
} from "./../../../Themes/index";
import { _goBack } from "../../../services/CommonServices";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DividerIcon from "../../Atoms/Devider/DividerIcon";

const imageurl =
  "http://e3.cylsys.com/upload/photo/AB71AAB8-C137-4561-A883-4417718442AE.jpg";

const TopHeader = (props) => {
  return (
    <>
      <StatusBar
        backgroundColor={props.statusBarColor || "white"}
        barStyle={props.statusBarStyle || "dark-content"}
      />
      <View
        style={[
          HeaderStyle.mainView,
          // { backgroundColor: _COLORS.Kodie_BlackColor },
        ]}
      >
        <View style={HeaderStyle.leftButtonView}>
          <TouchableOpacity
            onPress={props?.onPressLeftButton}
            style={[HeaderStyle.button]}
          >
            <Icon
              name={props.leftImage}
              size={30}
              color={_COLORS.Kodie_BlackColor}
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
                <Icon
                  name={"bell-outline"}
                  size={30}
                  color={_COLORS.Kodie_BlackColor}
                  style={HeaderStyle.MenuIcon}
                />
              ) : // <Image
              //   source={IMAGES.NotificationIcon}
              //   style={HeaderStyle.leftIcon}
              // />
              null}
            </TouchableOpacity>
            <Image
              source={props?.RightUserProfile || IMAGES.Landlordprofile}
              style={HeaderStyle.usericon}
            />
          </View>
        )}
      </View>
      <DividerIcon marginTop={2} />
    </>
  );
};

TopHeader.defaultProps = {
  isrightImage: false,
  IsNotification: false,
  isMiddleImage: false,
  leftImage: "chevron-left",
  MiddleText: "Set up your profile",
  // statusBarColor: _COLORS.Kodie_BlackColor,
  // backgroundColor: _COLORS.Kodie_BlackColor,
  Text_Color: _COLORS.Kodie_BlackColor,
};

export default TopHeader;
