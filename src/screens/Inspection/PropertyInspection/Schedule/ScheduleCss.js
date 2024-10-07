import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const ScheduleCss = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  inspections: {
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 10,
  },
  
  margin: { marginTop: 20 },
  DetailsView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 15,
  },
  DetailsIcon: { height: 30, width: 30 },
  details_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    marginLeft: 5,
  },

  MBText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: "left",
  },
  closeIconView: { justifyContent: "center", alignItems: "flex-end" },
  TextInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  userStyle: { height: 20, width: 20, marginHorizontal: 10 },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  ModalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ShareText: {
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
  },
  inputContainer: {
    marginVertical: 20,
  },
  cardHeight: { marginBottom: 8 },
  emailinput: {
    borderWidth: 1,
    height: 45,
    padding: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 5,
  },
  ButtonView: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  cancelView: { alignSelf: "center" },
  cancelText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginHorizontal: 16,
  },
  SaveView: {
    borderRadius: 5,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginLeft: 40,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  DoneText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_WhiteColor,
  },
});
