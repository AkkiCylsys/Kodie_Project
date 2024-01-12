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
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },

  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: _COLORS.Kodie_BlackColor,
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  cardHeight: { marginBottom: 8 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
  eyeIcon: {
    padding: 10,
  },
  accept_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 5,
  },
  termView: {
    flexDirection: "row",
    marginTop: 5,
  },
  CheckBox_View: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    borderWidth: 1,
    marginTop: 4,
  },
  checkbox_BG: {
    margin: 1.5,
  },
  termsConView: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 16,
    justifyContent: "center",
  },
  termsText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
  },
  already_account_login: {
    flex: 1,
    alignSelf: "center",
  },
  terms_Condition: { color: _COLORS.Kodie_GreenColor },
  error_text: { color: "red", marginLeft: 10 },
});
