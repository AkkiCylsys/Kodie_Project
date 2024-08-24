import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";
export const SelectDateStyle = StyleSheet.create({
  headingview: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    marginHorizontal:15
  },
  headingtext: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  optionsmainview: {
   marginHorizontal:20,
    marginVertical:5
  },
  optionsview: {
    flexDirection: "row",
    textAlign: "justify",
    alignItems: "center",
    justifyContent:'space-between',
    flex:1,
    paddingVertical:5
  },
  bindview:{
    flexDirection:'row',
    alignItems:'center'
  },
  optionsiconview: {
    alignItems: "center",
    borderColor: _COLORS.Kodie_MediumGrayColor,
  },
  checkbox:{
    borderRadius:10
  },
  datetext:{
    color:_COLORS.Kodie_LightGrayColor,
    fontSize:12
  },
  textoption: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 8,
  },
  Divider:{
    marginRight:2,
    marginTop:15,
     opacity:0.3
  },
  bottomModal_container: {
    // borderWidth: 0.5,
    // borderColor: _COLORS.Kodie_LightGrayColor,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // elevation: 10,
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 20,
    marginBottom:50
  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
});
