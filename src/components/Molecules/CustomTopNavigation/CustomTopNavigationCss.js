import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const TopNavigationstyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  tabText: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_Regular,
  },
});
