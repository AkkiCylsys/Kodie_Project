import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const Dividerstyles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  textView: {
    paddingHorizontal: 10,
  },
  Divider_Text: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color:_COLORS.Kodie_MediumGrayColor
  },
  iconView: {
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
  },
});
