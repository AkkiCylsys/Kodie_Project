import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const PropertyInspectionCSS = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
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
  apartment_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  melbourne_Text: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  locationView: { flexDirection: "row" },
  LocationText: {
    fontSize: 12,
    alignSelf: "center",
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  slider_view: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
});
