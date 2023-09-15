import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../../Themes";
export const TenantDetailsStyle = StyleSheet.create({
  verify_text: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft: 8,
    alignSelf: "center",
  },
  heading_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  userName: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  name_view:{ marginLeft: 10 },
  details_main_view:{flex:1,flexDirection: "row", justifyContent: "space-between" },
  user_subView:{ flexDirection: "row", marginTop: 10 },
  check_view:{ flexDirection: "row", marginTop: 10 },
  startRating: { paddingHorizontal: 1 },
  starStyle: {
    marginTop: 20,
    marginLeft: 60,
  },

  rent_received_text: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
  },
  rent_received_view: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: _COLORS.Kodie_mostLightGreenColor,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  scoreNo: {
    fontSize: 10,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  resident_score_text: {
    fontSize: 10,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginRight: 5,
  },
  score_view: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 15,
  },
  
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
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
  },
  rent_received_view: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: _COLORS.Kodie_minDarkGreenColor,
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
  },
  account_view: { flexDirection: "row", justifyContent: "space-between" },
});
