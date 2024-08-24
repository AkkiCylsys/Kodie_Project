import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const RangeSliderStyle = StyleSheet.create({
  rangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  range: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
   
  },
  rangecomponetView: {
    marginTop: 10,
  },
});
