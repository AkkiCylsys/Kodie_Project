import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "../../../Themes/index";

export const SocialMediaStyle = StyleSheet.create({
  Mainview:{
flex:1,
backgroundColor:_COLORS?.Kodie_WhiteColor
  },
  Helpview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
    marginBottom: 3,
},
Helpselctionview: {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
},
Helpimgview: {
  padding: 8,
  borderWidth: 0.5,
  borderRadius: 5,
  borderColor: _COLORS.Kodie_MediumGrayColor,
  backgroundColor: _COLORS.Kodie_TransparentColor,
},
TextViewMain:{
  flexDirection:'column',
  justifyContent:'center',
  marginBottom:5
},
Helptext: {
  fontSize: 14,
  marginLeft: 15,
  color: _COLORS.Kodie_BlackColor,
  fontFamily: FONTFAMILY.K_SemiBold,
},
SecondRowtext: {
  fontSize: 11,
  marginLeft: 15,
  color: _COLORS.Kodie_ExtraLightGrayColor,
  fontFamily: FONTFAMILY.K_Regular
},
arrowiconview: {
  height: 30,
  width: 30,
  borderWidth: 0.5,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  borderColor: _COLORS.Kodie_MediumGrayColor,

},
});
