import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const EditDashboardComponentStyle = StyleSheet.create({
  Maniview: {
    flex: 1,
    marginHorizontal: 16,
  },
  Container: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Textview: {
    flex: 1,
  },
  Text1: {
    flex: 1,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 14,
  },
  Text2: {
    flex: 1,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 11,
  },
  iconmenu: {
    marginHorizontal: 10,
  },
});
