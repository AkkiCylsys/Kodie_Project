import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";

export const AddNewNoticeStyle = StyleSheet.create({
  MainContainer: { flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor },
  mainview: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
  },

  dropdownheadingtext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
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
    color: _COLORS.Kodie_LightGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginHorizontal: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 16,
  },

  locationInputview: {
    height: 48,
    borderWidth: 0.4,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 5,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Noticeview: {
    flex: 1,
  },
  locationInput: {
    borderWidth: 0.4,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginTop: 5,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
  },
  noticehead: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 15,
  },
  mainreapeatview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  noticedropdownview: {
    width: 170,
  },
  dropdownNotice: {
    height: 35,
    paddingBottom: 4,
    borderWidth: 0.8,
  },
  repeattext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
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
    justifyContent: "space-evenly",
    padding: 5,
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
    marginLeft: 15,
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
  },
  addattachment: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
});
