import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const CustomButtonstyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    width: "100%",
    height: 58,
    backgroundColor: _COLORS.Kodie_BlackColor,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
  },
  buttonText: {
    color: _COLORS.Kodie_WhiteColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  leftIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    alignSelf: "center",
  },
});
