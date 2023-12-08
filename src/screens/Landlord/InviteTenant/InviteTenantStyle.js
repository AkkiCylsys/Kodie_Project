import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const InviteTenantStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  usericon: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 20,
    // flex:1
  },
  usermainView: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameView: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: "15%",
    // flex:1
  },
  nameText: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  starStyle: {
    // marginTop: 25,
    // marginHorizontal: 10,
    flex: 1,
    paddingTop:6
    // backgroundColor:'red',
    // justifyContent:"center",
    // alignItems:'flex-end'
  },
  bindstarview: {
    flexDirection: "row",
  },
  verifiedView:{
    paddingTop:5
  },
  starratingStyle: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft: 5,
  },
  desc_View: { flexDirection: "row", marginTop: 2 },
  desc_heading: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  desc_value: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  description: {
    marginTop: 5,
    marginHorizontal: 16,
  },
  RowBtnView: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  readtext: {
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 12,
    textDecorationLine: "underline",
    textDecorationColor: _COLORS.Kodie_GreenColor,
  },
  menuiconview: {
    flexDirection: "row",
    // backgroundColor:'red',
    flex:1,
    marginBottom:8,
    justifyContent:'flex-end',
  },
  heartimg: {
    marginRight: 10,
  },
});
