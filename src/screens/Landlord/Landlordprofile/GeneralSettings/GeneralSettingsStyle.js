import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const GeneralSettingsStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height:'100%',
  },
  Headingview: {
    marginHorizontal: 20,
  },
  Headingtext: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginVertical: 15,
  },
  componentview:{
    flex:1.5,
    // borderWidth:1,
    // width:'90%',
    // marginRight:30
  },

  rowview:{
    flexDirection:'row',
   justifyContent:'space-evenly',
    marginHorizontal:20
  },
  dropdown: {
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
    width: 90,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 15,
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
    borderWidth: 1,
    marginRight: 15,
  },
  textratemainview:{
    flexDirection:'row',
    marginVertical:20,
    marginHorizontal:20
  },
  textratecomponentview:{
    flex:2,
    // borderWidth:1
    // width:'75%'
  },
  rateview:{
    flex:0.5,
    borderWidth:1,
    height:40,
    // width:75,
    // flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderColor:_COLORS.Kodie_GrayColor
  },
  calenderview:{
    marginVertical:10,
    marginHorizontal:20
    // marginRight:10
  },
  origanisationview:{
    marginVertical:10,
    marginHorizontal:20
    // marginRight:10
  }
});
