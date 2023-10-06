import { StyleSheet } from "react-native";
import { _COLORS } from "../../../Themes";

export const CircleProgressStyle = StyleSheet.create({
  mainview: {
    width: 325,
    height: 67,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: _COLORS.Kodie_LightGrayColor,
    justifyContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 100,
    borderRightColor: "green",
    borderBottomColor: "green",
    borderTopColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  homeicon: {
    color: _COLORS.Kodie_LightGrayColor,
  },
});
