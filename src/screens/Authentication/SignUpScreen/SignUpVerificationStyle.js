import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const SignUpVerificationStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  checkEmail_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 10,
  },
  verify_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 24,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 12,
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  accept_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  termView: {
    flexDirection: "row",
    marginTop: 5,
  },
  radio_View: {
    height: 18,
    width: 18,
    borderRadius: 18 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginTop: 4,
  },
  radioBg: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    margin: 2,
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderColor: _COLORS.Kodie_BlackColor,
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
  terms_Condition: { color: _COLORS.Kodie_GreenColor },
  customBtn: {
    justifyContent: "flex-end",
    flex: 1,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
});
