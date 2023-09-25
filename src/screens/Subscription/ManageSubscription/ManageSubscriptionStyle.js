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
    alignSelf:'flex-start',
    paddingHorizontal: 10, 
  },
  MainHeading:{
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf:'center',

  },
  Subscriptionprice:{
    fontSize: 24,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf:'flex-start',
    paddingHorizontal: 10, 
  },
  SubscriptionpriceText:{
    fontSize: 24,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf:'flex-start',
    paddingHorizontal: 10, 
  },
  ShadowLine:{
    height:.5,
    backgroundColor:_COLORS.Kodie_MediumGrayColor,
    shadowOffset: {width: -2, height: 2},  
    shadowColor: _COLORS.Kodie_MediumGrayColor,  
    shadowOpacity: 0.5,  
    shadowRadius: 3, 
    marginTop:10 ,
    elevation:5
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
  marginTop:20,
  marginRight:20,
  padding:10,
  marginBottom:20,
  marginLeft:10,
  //borderWidth: 0.2,
  borderRadius:8,
  backgroundColor:_COLORS.Kodie_WhiteColor,
  borderColor:_COLORS.Kodie_BlackColor,
  //backgroundColor:_COLORS.Kodie_MediumGrayColor,
  shadowOffset: {width: -2, height: 4},  
  shadowColor: _COLORS.Kodie_BlackColor,  
  shadowOpacity: 0.7,  
  shadowRadius: 8,
  elevation: 20,  
},

switchBtn_view:{
flex:0.5
},
getText:{
  fontSize: 12,
paddingHorizontal:10,
  color: _COLORS.Kodie_BlackColor,
  fontFamily: FONTFAMILY.K_Medium,

}
});
