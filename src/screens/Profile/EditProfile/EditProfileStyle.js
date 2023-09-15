import { StyleSheet } from "react-native";
import { IMAGES, _COLORS, FONTFAMILY } from "./../../../Themes/index";

export const EditProfileStyle = StyleSheet.create({
  profilviewmain: {
    alignItems: "center",
    top: 10,
  },
  profilelogo: {
    width: 100,
    height: 100,
  },
  // profileviewimg:{
  //   width: 95,
  //   height: 95,
  //   borderRadius: 95 / 2,
  //   backgroundColor: _COLORS.Kodie_MostLiteGreyColor,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 20,
  //   marginHorizontal: 16,
  // },
  editlogoview: {
    marginLeft: 95,
    backgroundColor: "#F5F5F5",
    top: 85,
    zIndex: 1,
    borderRadius: 20,
    width: 29,
    height: 29,
    alignItems: "center",
    paddingTop: 8,
  },
  editlogo: {
    width: 15,
    height: 13,
  },
  edittext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    top: 15,
  },
  firstdivider: {
    top: 45,
  },

  // input filed style here
  inputmainview: {
    marginTop: 40,
  },
  firstview: {
    alignItems: "flex-start",
    top: 25,
  },
  oldnumbertext: {
    fontSize: 13,
    fontWeight: "600",
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginRight: 15,
    marginLeft: 20,
  },
  simpleinput: {
    height: 50,
    margin: 12,
    borderWidth: 0.3,
    width: 330,
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    paddingLeft: 20,
    top: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    opacity: 0.5,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.3,
    width: 330,
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    paddingLeft: 68,
    top: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    opacity: 0.5,
  },
  simpleinputphysical: {
    height: 50,
    margin: 12,
    borderWidth: 0.3,
    width: 330,
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    paddingLeft: 50,
    top: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    opacity: 0.5,
  },
  numbercode: {
    position: "absolute",
    top: 28,
    marginLeft: 23,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontWeight: "400",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  downarrowimg: {
    width: 12,
    height: 6,
    position: "absolute",
    left: 0,
    marginLeft: 50,
    marginTop: 37,
  },
  lineimg: {
    height: 21,
    width: 45,
    position: "absolute",
    left: 0,
    marginLeft: 48,
    marginTop: 30,
    padding: 10,
  },
  locationimg: {
    position: "absolute",
    marginTop: 27,
    marginLeft: 30,
  },
  Vectorimg: {
    width: 15,
    height: 17,
    tintColor: "#CED5D7",
    position: "absolute",
    right: 0,
    marginTop: 35,
    marginRight: 30,
  },
  dropdownview: {
    marginLeft: 15,
    marginRight: 15,
    top: 15,
  },
  drop: {
    color: _COLORS.Kodie_ExtralightGreenColor,
  },
  uploadview: {
    marginTop: 35,
    marginLeft: 20,
  },
  uploadtext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  optionaltext: {
    fontSize: 12,
    color: "#21212180",
  },
  leasttext:{
    fontSize:12,
    fontFamily:FONTFAMILY.K_Regular,
    color:'#ABACAD',
    top:5
  },
  buttonview:{
    marginLeft:20,
    marginRight:20,
    top:10
  },
  secondbuttonview:{
  top:10
  }
});
