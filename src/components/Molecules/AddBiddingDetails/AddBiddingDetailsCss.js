import { Platform, StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const AddBiddingDetailsCss = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  heading_Text: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  heading_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 16,
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
    marginBottom: 15,
  },
  datePickerView: { flexDirection: "row", marginBottom: 15 },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: Platform.OS == "ios" ? 50 : 250,
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
    // borderWidth: 1,
    marginRight: 16,
    tintColor: _COLORS.Kodie_BlackColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  //   inputContainer: {
  //     marginTop: 15,
  //   },
  input: {
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  notification_view: { flexDirection: "row", justifyContent: "space-between" },
  notification_text: { marginRight: 30, alignSelf: "center" },
  toggle_con: {
    width: 48,
    height: 25,
    borderRadius: 20,
    padding: 5,
    marginTop: 15,
    alignSelf: "center",
    // justifyContent: "center",
  },
  toggle_circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  exp_reminder_text: {
    flex: 0.6,
    marginLeft: 10,
    alignSelf: "center",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
  },
  reminder_m_view: { flex: 0.5, flexDirection: "row" },
  reminder_dropdown: { flex: 0.8, flexDirection: "row" },
  reminder_dropdown_sty: { flex: 1.8, borderRadius: 15 },
  before: {
    flex: 0.5,
    marginLeft: 10,
    alignSelf: "center",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 20,
  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    color: _COLORS.Kodie_WhiteColor,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  ModalMainView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ModalView: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 10,
  },
  modalContainer: { flex: 1, marginHorizontal: 16 },
  modalCloseIcon: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  modalMainText: {
    fontFamily: FONTFAMILY.K_Medium,
    fontSize: 21,
    color: _COLORS.Kodie_BlackColor,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalSubText: {
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: "center",
    alignSelf: "center",
  },
  checkStl: { height: 120, width: 120, alignSelf: "center" },
  itemView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
  },
});
