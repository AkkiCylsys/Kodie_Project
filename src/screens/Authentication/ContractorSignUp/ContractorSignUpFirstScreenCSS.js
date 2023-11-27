import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const ContractorSignUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
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
    shadowOpacity:Platform.OS =='android'? 0.2:null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  cardHeight: { marginBottom: 8 },
  inputContainer: {
    marginBottom: 20,
  },
  LastinputContainer: {
    marginBottom: 70,
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
  addressh: { height: 100 },
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
  },
  eyeIcon: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:Platform.OS =='android'? 0.2:null,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
  },
});
