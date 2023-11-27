import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../../Themes";

export const PropertyExpensesStyle = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  heading_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  account_view: { flexDirection: "row", justifyContent: "space-between" },
  Account_main_View: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: _COLORS.Kodie_LiteWhiteColor,
  },
  Accounting_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
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
    marginRight: 5,
  },
  paid_Date_View: {
    flexDirection: "row",
  },
  rent_received_text: {
    color: _COLORS.Kodie_DarkOrange,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
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
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  }
});
