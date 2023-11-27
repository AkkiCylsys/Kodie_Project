import React from "react";
import { View, Text } from "react-native";
import { LABEL_STYLES } from "../../../Themes";
import { BudgetCss } from "./BudgetStyle";
export default Budget = (props) => {
  return (
    <View style={BudgetCss.container}>
      <Text style={[LABEL_STYLES._texinputLabel, BudgetCss.textStyle]}>
        Budget:
      </Text>
      <Text style={LABEL_STYLES._texinputLabel}>{props.PriceText}</Text>
    </View>
  );
};
