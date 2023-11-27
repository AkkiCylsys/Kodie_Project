import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";

export const ContractorSignupSecondStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  phototextView: {
    flex: 1,
    marginHorizontal: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginVertical: 15,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: "cover",
  },
});
