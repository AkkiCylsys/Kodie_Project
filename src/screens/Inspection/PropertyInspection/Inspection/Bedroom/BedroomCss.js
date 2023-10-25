import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../../Themes";
export const BedroomCss = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  HeaderText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 15,
  },
  RowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  RowText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    borderBottomWidth: 1,
  },
  TableView: { flexDirection: "row", justifyContent: "space-between" },
  bedText: {
    flex: 0.3,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  boxView: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: "center",
    paddingVertical: 2,
  },
  YText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
  },
  rightIcon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignSelf: "center",
  },
  IconStyle: { alignSelf: "center", justifyContent: "center" },
  dropdown1: {
    flex: 0.35,
    height: 30,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_GrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  iconStyle: {
    width: 15,
    height: 15,
    borderWidth: 1,
    marginRight: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
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
    marginVertical: 4,
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
    justifyContent: "flex-end",
    marginVertical: 26,
  },
  cancelView: { alignSelf: "center" },
  cancelText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
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
  groupIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIcon: {
    position: "absolute",
    left: 5,
    alignSelf: "center",
  },
  secondModal: { flex: 1, marginHorizontal: 16 },
  circleStyle: { height: 35, width: 35, borderRadius: 35 / 2 },
  pluscirclestyle: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 27,
    borderColor: _COLORS.Kodie_LightWhiteColor,
  },
  input: {
    height: 70,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
});