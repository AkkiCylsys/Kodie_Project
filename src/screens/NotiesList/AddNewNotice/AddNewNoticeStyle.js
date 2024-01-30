import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const AddNewNoticeStyle = StyleSheet.create({
  MainContainer: { flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor },
  mainview: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },
  locationInputview: {
    height: 48,
    borderWidth: 0.4,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 10,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  mainreapeatview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  noticedropdownview: {
    width: 215,
  },
  repeattext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
    marginTop: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 16,
    tintColor: _COLORS.Kodie_BlackColor,
  },
  divider: {
    marginHorizontal: 5,
    flex: 1,
    marginTop: 20,
  },
  dividersecond: {
    flex: 1,
    marginTop: 20,
  },
  alldayviewmain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 15,
  },
  alldayview: {
    flexDirection: "row",
  },
  alldaytext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 15,
  },
  datetimeview: {
    marginHorizontal: 10,
  },
  dateview: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical:10,
    marginLeft:45
  },
  datetext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  timetext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  dividerthird: {
    marginTop: 20,
  },
  secondmainview: {
    flex: 1,
  },
  addlocationmainview: {
    marginTop: 10,
  },
  addlocationtext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 5,
    marginTop: 5,
  },
  dividerfourth: {
    marginTop: 20,
    marginBottom: 5,
  },
  setnotificationview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
    padding: 5,
    flex: 1,
    marginTop: 15,
  },
  rightimgview: {
    borderWidth: 0.5,
    borderRadius: 8,
    width: 23,
    height: 23,
    alignItems: "center",
    paddingTop: 5,
    color:_COLORS.Kodie_GrayColor
  },
  rightarrowimg: {
    width: 6,
    height: 11,
  },
  setnoticeviewdrop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationbind: {
    flex: 1,
    flexDirection: "row",
  },
  settext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },
  setnotificationdrop: {
    borderWidth: 0.5,
    width: 115,
    height: 40,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },
  setcustomview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 15,
  },
  setcustometext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 35,
  },
  Notificationtypetext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft:45,
  },
  inputContainer: {
    marginBottom: 15,
    flex: 1,
    marginTop: 15,
  },
  input: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 5,
  },
  propertydesctext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  addattachmentbtnview: {
    flex: 1,
    marginBottom:20
  },
  addattachment: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop:24,
    
  },
  // ....drop down
  jobDetailsView: {
    marginTop: 12,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GrayColor,
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
  // ...
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 20,
  },
  toggle_con: {
    width: 45,
    height: 20,
    borderRadius: 20,
    padding: 5,
    // marginTop: 18,
    alignItems: "center",
  },
  toggle_circle: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  input_guest:{
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    justifyContent: "space-between",
  },
  ChatText:{
    fontSize:10,
    color:_COLORS.Kodie_WhiteColor,
    fontFamily:FONTFAMILY.K_Medium,
    alignSelf:"center"

  },
  chatBtn:{
    borderWidth: 1,
    width: 56,
    height: 48,
    marginLeft:10,
    alignSelf:"center",
    marginTop:20,
    borderRadius:8,
    backgroundColor:_COLORS.Kodie_lightGreenColor,
    borderColor:_COLORS.Kodie_lightGreenColor,
  },
  customIcon:{
    height: 23,
    width: 23,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
  }
});
