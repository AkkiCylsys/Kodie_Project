import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes/index";
export const ReviewjobdetailsStyle2 = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  Container: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  divider: {
    marginTop: 25,
    borderColor: "#CED5D7",
    marginTop: -5,
  },
  TextFixing: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 8,
  },
  ElectricalsText: {
    marginBottom: 20,
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  textview: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 20,
    marginTop: 20,
  },
  progressText: {
    fontSize: 9,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign: "center",
    color: _COLORS.Kodie_WhiteColor,
  },
  progresBar: { 

    alignSelf: "center" ,
    borderRadius:10,
 },
 progressborder:{
    height: 71,
    borderWidth: 0.6,
    borderRadius:10,
    marginTop:10,
    justifyContent:"center",
    borderTopColor:_COLORS.Kodie_ExtraLightGrayColor,
 },
 Inputbox:{
    flexDirection:"row" ,
   justifyContent:"space-around",
},
Inpouttext:{
   color:_COLORS.Kodie_BlackColor,
   marginRight:50,
   fontSize:14
},
Inpouttext1:{
   fontSize:14,
   color:_COLORS.Kodie_GreenColor
},
});
