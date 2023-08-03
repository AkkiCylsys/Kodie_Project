import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";

export const ContractorSignupThirdStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  phototextView: {
    flex: 1,
    marginHorizontal: 16,
  },
  pdfIconView: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 20,
    marginVertical: 15,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },

  docText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  docsubText: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  doctextView: {
    marginLeft: 10,
  },
});
