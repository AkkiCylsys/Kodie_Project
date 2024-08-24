import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../../../Themes";
export const AddExpensesDetailsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
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
    marginBottom: 250,
  },
  inputContainer: {

  },
  Tax_input_cont: { flex: 1, marginLeft: 8 },
  input: {
    height: 45,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop:14
  },
  addition_featureView: {
    // marginBottom: 20,
  },
  additiontext:{
    marginTop:10
  },
  additionview:{
    marginBottom:20,
    marginTop:10
  },
  inputContainertext:{
    marginBottom:12,
    marginTop:5
  },
  
  Furnished_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginBottom:5
  },
  tax_main_view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerView: { flexDirection: "row" },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    // marginTop: 10,
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
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    alignSelf: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  errorText: { color: "red", marginLeft: 10 },
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
