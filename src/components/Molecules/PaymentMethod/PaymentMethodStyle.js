import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const PaymentMethodStyle = StyleSheet.create({
  mainview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal:15,
  },
  textimgbindview: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileimageview:{
    width:40,
    height:28,
    borderRadius:8,
    borderColor:_COLORS.Kodie_GrayColor,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  profileimage: {
    width: 36,
    height: 26,
  },
  bindtextview: {
    marginLeft: 15,
    alignItems:'center',
    flexDirection:'row'
  },
  headingtext: {
    fontSize: 15,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  descriptiontext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
  timeview: {},
  timetext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  circleimg:{
    width: 25,
    height: 25,
  }
});
