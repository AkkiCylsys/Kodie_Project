import { StyleSheet } from "react-native";
import { _COLORS ,FONTFAMILY} from "../../../Themes";

export const CircleProgressStyle = StyleSheet.create({
  maincontainerview:{
    backgroundColor:_COLORS.Kodie_WhiteColor
  },
  mainview: {
    width: '100%',
    height: 75,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: _COLORS.Kodie_LightGrayColor,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    alignItems:'center',
    elevation: 2,
    backgroundColor:_COLORS.Kodie_WhiteColor

  },
  circle: {
    width:50,
    height: 50,
    borderWidth: 2,
    borderRadius: 100,
    borderRightColor: "green",
    borderBottomColor: "green",
    borderTopColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  homeicon: {
    color: _COLORS.Kodie_LightGrayColor,
  },
  bindview:{
    flexDirection:'row'
  },
  persentview:{
    marginHorizontal:8
  },
  persenttext:{
    fontSize:22,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_SemiBold
  },
  ratetext:{
    fontSize:12,
    color:_COLORS.Kodie_ExtraminLiteGrayColor
  },

  floatbtn:{
    position: 'absolute',
    right:0,
    marginVertical:60,
    marginHorizontal:-30,
    zIndex:1,

  },

});
