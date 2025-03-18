import { StyleSheet } from "react-native";
import { _COLORS } from "../../../Themes";
export const PropertiesCSS = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
});
