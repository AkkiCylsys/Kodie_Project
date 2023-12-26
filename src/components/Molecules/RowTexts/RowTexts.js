import React from "react";
import { View, Text } from "react-native";
import { LABEL_STYLES } from "../../../Themes";
import { RowTextCss } from "./RowTextCss";
export default RowTexts = (props) => {
  return (
    <View style={RowTextCss.TextView}>
      <Text style={[LABEL_STYLES.commonMidtext, RowTextCss.leftText]}>
        {props.leftText}
      </Text>
      <Text style={[LABEL_STYLES.commontext, RowTextCss.leftText]}>
        {props.rightText}
      </Text>
    </View>
  );
};
