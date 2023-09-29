import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
export const DrawerStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: { marginHorizontal: 20, marginVertical: 16 },
  HeaderText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  ImageStyle: { height: 40, width: 40, alignSelf: "center" },
  SubHeading: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  SubHeadingView: { flexDirection: "row", marginTop: 15, borderRadius: 8 },
  rowFlex: { flexDirection: "row", borderRadius: 8 },
});
