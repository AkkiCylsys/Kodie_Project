import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 220,
    height: 180,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 20,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  signBtnView: {
    marginHorizontal: 16,
    marginBottom: 30,
  }, 
  maintextView: {
    padding: 20,
  },
  discription: {
    fontSize: 16,
    textAlign: "left",
    color: _COLORS.Kodie_VeryLightGrayColor,
    marginTop: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
});
