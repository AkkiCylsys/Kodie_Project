import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const JobsCss = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Line: {
    borderBottomWidth: 2,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
    marginTop:3
  },
  activeTab: {
    backgroundColor:_COLORS.Kodie_WhiteColor,
    borderBottomWidth: 1.5,
  },
});
