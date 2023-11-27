import { StyleSheet } from "react-native";
import { _COLORS,IMAGES,FONTFAMILY } from "../../../Themes";
export const SelectStyle = StyleSheet.create({
  headingview: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal:20
  },
  headingtext: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  optionsmainview: {
    marginLeft: 20,
    marginTop: 8,
  },
  optionsview: {
    flexDirection: "row",
    textAlign: "justify",
    alignItems: "center",
    padding: 10,
  },
  optionsiconview: {
    width: 32,
    height: 30,
    borderWidth: 0.3,
    borderRadius: 5,
    alignItems: "center",
    padding: 5,
    borderColor:_COLORS.Kodie_MediumGrayColor
  },
  textoption: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft: 10,
  },
});
