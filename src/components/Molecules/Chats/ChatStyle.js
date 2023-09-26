import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const ChatStyle = StyleSheet.create({
  mainview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal:15
  },
  textimgbindview: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileimage: {
    width: 44,
    height: 44,
  },
  bindtextview: {
    marginLeft: 15,
  },
  headingtext: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  descriptiontext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
  timeview: {},
  timetext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
});
