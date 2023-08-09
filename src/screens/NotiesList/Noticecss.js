import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../Themes/index";

export const Noticecss = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_MostLiteGreyColor,
  },
  propertyTittle: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  propertyView: { marginVertical: 10, marginHorizontal: 16 },
  btnView: { marginHorizontal: 16, marginVertical: 10 },
  container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 4,
    marginVertical: 5,
  },

  textContainer: {
    flexDirection: "column",
    marginLeft: 5,
  },

  pdfInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  note: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  location: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  lines: {
    width: 6,
    height: 45,
    resizeMode: "cover",
  },
  address: { flexDirection: "row", alignItems: "center" },
  crossIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 25,
    right: 20,
    zIndex: 1,
  },
});
