import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const NoticeStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dateDayview: {
    alignItems:'center',
  justifyContent:'center'
  },
  daytext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  datetext: {
    fontSize: 10,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  middatabindview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    borderWidth: 0.4,
    width: 300,
    height: 65,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
  },
  bindview: {
    flexDirection: "row",
  },
  headinglineview: {
    // flexDirection:'row'
    marginHorizontal: 15,
  },
  lineimg: {
    width: 6,
    height: 40,
  },
  headintext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  addressviewbind: {
    flexDirection: "row",
    marginTop: 3,
  },
  addresstext: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 3,
  },
  locationimg: {},
  dotsview: {
    justifyContent:'flex-end',
    flexDirection:'row'
  },
  dotimg:{
  
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
