import React from "react";
import { Text, View } from "react-native";
import { StepTextStyle } from "./StepTextCss";

const StepText = (props) => {
  return (
    <View style={StepTextStyle.mainView}>
      <Text style={StepTextStyle.stepHeadingvalueText}>
        Step{props._StepNo}:{props._StepText}
      </Text>
    </View>
  );
};

export default StepText;
