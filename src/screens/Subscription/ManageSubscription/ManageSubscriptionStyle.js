import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "../../../Themes/index";
import { transform } from "@babel/core";

export const ManageSubscriptionStyle = StyleSheet.create({

  Mainview: {
flex:1,

backgroundColor:_COLORS.Kodie_WhiteColor
  },
  SubscriptionImage:{
    height:130,
    width:130,
    marginTop:15,
    alignSelf:'center'
  },
  DoneImage:{
    height:17,
    width:17,
    resizeMode:'contain',
    marginTop:4
   // alignSelf:'center'
  },
  Heading:{
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf:'center'
  },
  SubHeading:{
      fontSize: 14,
      color: _COLORS.Kodie_BlackColor,
      fontFamily: FONTFAMILY.K_Regular,
      alignSelf:'center',
      textAlign:'center',
      paddingHorizontal:10
   
  },
  SubDataText:{
    fontSize: 14,
    marginLeft:8,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,

},
  SubUnderlineHeading:{
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf:'center',
    textAlign:'center',
    paddingHorizontal:10,
    textDecorationLine: 'underline'
},
RangeSliderView:{
  paddingHorizontal:15
},
SubscriptionDataView:{
  width:300,
  marginBottom:20,
  marginLeft:10,
  borderWidth: 1,
  borderRadius:8,
  backgroundColor:_COLORS.Kodie_WhiteColor,
  borderColor:_COLORS.Kodie_BlackColor,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: -1 },
  shadowOpacity: 0.16,
  shadowRadius: 6
},
switchBtn_view:{
  marginTop:50,
  height:50
}

});
