import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { _COLORS } from "./../../../Themes/index";
const THUMB_RADIUS = 15;

const Thumb = () => <View style={styles.root} />;

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 7,
    borderColor: _COLORS.Kodie_WhiteColor,
    backgroundColor:_COLORS.Kodie_WhiteColor,
    borderColor:_COLORS.Kodie_BlackColor,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 6
  }
});

export default memo(Thumb);
