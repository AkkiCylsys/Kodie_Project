import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../../Themes";

export const AddLeaseDetailsStyle = StyleSheet.create({
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  datePickerView: { flexDirection: "row" },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
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
    borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 15,
  },
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
    marginTop: 20,
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
  reminder_dropdown: { flex: 0.9, flexDirection: "row" },
  reminder_dropdown_sty: { flex: 1.8, borderRadius: 15 },
  before: {
    marginLeft: 10,
    alignSelf: "center",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
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
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf:"center",
    fontSize:14,
    fontFamily:FONTFAMILY.K_SemiBold
  },
});