import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { _COLORS } from "./../../../Themes/index";
const RailSelected = () => <View style={styles.root} />;

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 5,
    backgroundColor:_COLORS.Kodie_LightGrayColor,
    borderRadius: 2,
  },
});
