import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../Themes";
export const ChangeContactInputStyle = StyleSheet.create({
  maincontainer:{
    backgroundColor:_COLORS.Kodie_WhiteColor,
    height:'100%'
  },
  firstview: {
    alignItems: "center",
    marginHorizontal:15,
    paddingVertical:20
  },
  secondview:{
  marginVertical:30,
  marginHorizontal:15
  },
  numbercodefirstview:{
    height: 50,
    borderWidth: 0.3,
    width: '100%',
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    marginTop:5
  },

  bindview:{
   flexDirection:'row',
   alignItems:'center',
   marginHorizontal:5
  },
  oldnumbertext: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },

  numbercode: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontWeight: "400",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  downarrowimg: {
    width: 12,
    height: 6,
    marginHorizontal:5
  },
  lineimg: {
    height: 21,
    width: 45,
  },
  Vectorimg: {
    width: 15,
    height: 17,
    tintColor: "#CED5D7",
  },
  secondview: {
    alignItems: "center",
    marginVertical:15,
    marginHorizontal:15,
  },
});
