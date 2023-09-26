import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const BillinginformationStyle = StyleSheet.create({
  maincontainer: {
    // backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  topsectionview: {
    flexDirection: "row",
    width: 330,
    height: 135,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 20,
  },
  mainimgview: {},
  mainimg: {
    width: 147,
    height: 123,
    marginRight: 5,
    borderRadius: 15,
    marginTop: 12,
    overflow: "hidden",
  },
  toptextmainview: {
    justifyContent: "center",
    marginHorizontal: 5,
  },
  startextview: {
    flexDirection: "row",
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 0.3,
    width: 50,
    height: 23,
    alignItems: "center",
    borderRadius: 10,

  },
  starimg: {
    tintColor: _COLORS.Kodie_ExtraDarkGreen,
  },
  ratingtext: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
    alignItems: "center",
  },
  fixingtextview: {
    width: 170,
  },
  fixtext: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 5,
  },
  walltext: {
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  dollertext: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraDarkGreen,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 12,
  },
  jobdetailsview: {
    marginHorizontal: 15,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginTop: 10,
    width: 330,
    height: 230,
    borderRadius: 10,
  },
  moreinfo:{
    marginHorizontal: 15,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    width: 330,
    height: 120,
    borderRadius:8,
  },
  jobbindview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  jobdetailstext: {
    fontSize: 17,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  moreinfoview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  moreinfotext: {
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginRight: 3,
  },
  downarrowimg: {
    width: 10,
    height: 6,
    marginTop: 2,
  },
  divider: {
    height: 1.1,
    color: _COLORS.Kodie_ExtraLiteGrayColor,
    marginTop: 4,
  },
  completedview: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  completedtext: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  completeddate: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  totalcostview: {
    marginHorizontal: 15,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginTop: 15,
    width: 330,
    height: 155,
    borderRadius: 15,
  },
  totalcosttext: {
    fontSize: 17,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  jobinvoicetext:{
  marginTop:15
  },
  dividersecond: {
    height: 1,
    opacity: 0.5,
  },
  totaljobcostview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  totaltext: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  totalmonytext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
  },
  moneytext: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraDarkGreen,
    fontFamily: FONTFAMILY.K_Regular,
  },
  pdfName: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 5,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginHorizontal: 5,
  },
  textContainer: {
    borderWidth: 0.3,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginTop: 8,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
  },
  bindfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  doticon: {
    color: _COLORS.Kodie_GrayColor,
  },
  buttonview: {
    marginHorizontal: 10,
    marginBottom: 50,
  },
  gobackicon: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
    marginTop: 10,
    textAlign: "center",
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
    marginTop: 13,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 29,
  },
});
