import { StyleSheet } from "react-native";
// import { IMAGES, _COLORS,FONTFAMILY } from "./../../../Themes/index";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../Themes";
export const ChangeContactInputStyle = StyleSheet.create({
  firstview: {
    alignItems: "center",
    top:25,
  },
  oldnumbertext: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.3,
    width: 330,
    // borderColor:_COLORS.Kodie_GrayColor,
    borderRadius: 8,
    color: _COLORS.Kodie_GrayColor,
    paddingLeft: 68,
    top:5
  },
  numbercode: {
    position: "absolute",
    top: 28,
    marginLeft: 23,
    color:_COLORS.Kodie_BlackColor,
    fontSize:13,
    fontWeight:'400',
    fontFamily:FONTFAMILY.K_SemiBold
  },
  downarrowimg: {
    width: 12,
    height: 5,
    position: "absolute",
    left: 0,
    marginLeft: 50,
    marginTop: 37,
  },
  lineimg: {
    height: 21,
    width: 20,
    position: "absolute",
    left: 0,
    marginLeft: 60,
    marginTop: 30,
  },
  Vectorimg: {
    width: 15,
    height: 17,
    color: "#CED5D7",
    position: "absolute",
    right: 0,
    marginTop: 35,
    marginRight: 30,
  },
  secondview:{
    alignItems: "center",
    top:45,
  }
});
