import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
import { fontSize } from "../../Themes/FontStyle/FontStyle";

export const paymentdetailsStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  scrollviewpayment: {
    marginHorizontal: 16,
  },

  PaymentView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 16,
  },
  Paymenttext: {
    fontSize: 25.15,
    color: _COLORS.Kodie_BlackColor,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 11,
    marginBottom: 23,
  },
  Input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  inputtext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
  },
  cardIcon: {
    padding: 10,
  },
  inputCarddate: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 11,
    marginBottom: 23,
    width: 152,
  },
  ViewTextstyle: {
    marginHorizontal: 11,
    marginTop: 30,
    marginBottom: 45,
  },
  Textstyle: {
    // alignItems:"center",
    alignSelf: "center",
  },
  job_Details_txt: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  btnview: {
    marginBottom: 43,
  },
  job_billing: { marginTop: 16 },
  switchBtn_view: { marginTop: 12 },
  bottomModal_container: {
    borderRadius: 15,
  },
  modalContainer: { marginHorizontal: 16, marginVertical: 16 },
  modalMainText: {
    fontFamily: FONTFAMILY.K_Medium,
    fontSize: 21,
    color: _COLORS.Kodie_BlackColor,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalMainText2: {
    // fontFamily: FONTFAMILY.K_Medium,
    fontSize: 14,
    color: _COLORS.Kodie_LightGrayColor,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    // marginVertical: 10,
  },
  modalSubText: {
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 19,
  },
  checkStl: {
    height: 120,
    width: 120,
    alignSelf: "center",
    marginVertical: 50,
    marginBottom: 10,
  },
  // current css
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
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 6,
  },
  btn_main_view: {
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center',
    // width:335,
    height:70,
    // borderWidth: 1,
    // padding: 5,
    borderRadius: 15,
    borderColor: _COLORS.Kodie_GrayColor,
    // backgroundColor: _COLORS.Kodie_LightGrayColor,
    marginTop:20
  },
  person_view: {
    backgroundColor: _COLORS.Kodie_GreenColor,
    // padding:24,
    borderRadius: 15,
    height:75,
    width:180,
    flexDirection:'row',
    alignItems:'center',
    // justifyContent:'space-evenly',
    justifyContent:'center'

  },
  person_text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    lineHeight:18,
    letterSpacing:1,
    marginLeft: 8,
  },
  company_text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    marginLeft: 8,
    letterSpacing:1,
    lineHeight:18,
  },
});
