import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const TenantStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  logo: {
    width: 210,
    height: 70,
    resizeMode: "contain",
  },

  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: "left",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:Platform.OS =='android'? 0.2:null,
    shadowRadius: 2,
    padding: 20,
  },
  inputContainer: {
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
  _bottomButtonView: {
    bottom: 10,
    position: "relative",
    paddingHorizontal: 20,
  },
  cardHeight: { marginBottom: 8 },
  inputContainer: {
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop:5
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
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
