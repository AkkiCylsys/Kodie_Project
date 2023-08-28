import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const SwitchButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBox: {
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "red",
  },
  activeButton: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_BlackColor,
  },
  buttonText: {
    flex: 1,
    color: _COLORS.Kodie_MediumGrayColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
  },
});
