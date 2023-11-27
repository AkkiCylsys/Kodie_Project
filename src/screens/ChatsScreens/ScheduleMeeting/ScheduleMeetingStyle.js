import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../Themes";

export const ScheduleMeetingStyle = StyleSheet.create({
  mainview: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height: "100%",
  },
  container: {
    marginHorizontal:15
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  _texinputLabel: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
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
  //   repeat section
  mainreapeatview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:8
  },
  bindimagetextview:{
    flexDirection:'row'
  },
  repeattext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft:15
  },
  iconStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 16,
    tintColor: _COLORS.Kodie_BlackColor,
  },
  noticedropdownview: {
    width: 120,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },
  dropdownNotice: {
    height: 35,
    paddingBottom: 4,
    borderWidth: 0.8,
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
  inputContainer: {
    marginBottom: 15,
    marginTop: 10,
  },
  propertydesctext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  inputdesc: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 5,
  },
  divider:{
    marginVertical:10
  },
  seconddivider:{
    marginTop:15
  },
  thirddivider:{
    marginTop:15
  }
});
