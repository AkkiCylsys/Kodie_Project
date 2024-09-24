import React from "react";
import { View, Text } from "react-native";
import { LABEL_STYLES } from "../../../Themes";
import { RowTextCss } from "./RowTextCss";
export default RowTexts = (props) => {
  const {rightTextStyle,leftTextStyle} =props
  return (
    <View style={RowTextCss.TextView}>
      <Text style={[LABEL_STYLES.commonMidtext, RowTextCss.leftText,leftTextStyle]}>
        {props.leftText}
      </Text>
      <Text style={[LABEL_STYLES.commontext, RowTextCss.leftText,rightTextStyle]}>
        {props.rightText}
      </Text>
    </View>
  );
};
