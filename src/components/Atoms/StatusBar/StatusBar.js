import React from "react";
import { View } from "react-native";
import {StatusBarStyle} from "./StatusBarStyle"
import { _COLORS} from "./../../../Themes/index"

const StatusBar = (props) => {
  return (
<View style={[StatusBarStyle.mainView,{width:props.width}]}/>
  );
};
StatusBar.defaultProps = {
    width: '0%',

};
export default StatusBar;
