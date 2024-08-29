import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../Themes";
export const ExpensesStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    // marginBottom: 50,
  },
  add_Expenses_view: {
    alignSelf: "center",
    paddingVertical: 20,
  },
  add_Expenses_Text: {
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
  },
  propertyExpensetext:{
    color: _COLORS.Kodie_BlackColor,
    marginLeft: 16,
    fontSize: 20,
    marginVertical: 5,
    fontFamily: FONTFAMILY.K_Bold,
  },
  btn_View: {
    flex:1,
    marginHorizontal: 16,
    marginBottom:10,
    marginTop:10
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  heading_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal:16,
    marginTop:20,marginBottom:10
  },
  account_view: { flexDirection: "row", justifyContent: "space-between" },
  Account_main_View: {
    // borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: _COLORS.Kodie_LiteWhiteColor,
    elevation:3,
  },
  Accounting_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    // fontFamily: FONTFAMILY.K_Bold,
    fontFamily:FONTFAMILY.K_ExtraBold
  },
  Paid_Text: {
    fontSize: 10,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  Amount_Text: {
    fontSize: 10,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  date_paid: {
    fontSize: 10,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  paid_Date_View: {
    flexDirection: "row",
    marginLeft:5
  },
  rent_received_text: {
    color: _COLORS.Kodie_DarkOrange,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
    marginBottom:3
  },
  rent_received_view: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: _COLORS.Kodie_LightOrange,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 5,
  },
  paidDate_subView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  datePaid_main_view:{
    borderBottomWidth:0.3,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    elevation:3,
    marginBottom:5
  }
});
