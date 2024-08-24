import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const StepTextStyle = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignSelf: "center",
    marginHorizontal: 14,
    marginHorizontal: 16,
  },
  stepHeadingtext: {
    flex: 0.5,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  stepHeadingvalueText: {
    flex: 1,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
});
