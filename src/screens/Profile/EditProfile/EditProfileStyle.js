import { StyleSheet } from "react-native";
import { IMAGES, _COLORS, FONTFAMILY } from "./../../../Themes/index";

export const EditProfileStyle = StyleSheet.create({
  profilviewmain: {
    alignItems: "center",
    marginTop: 10,
    paddingTop:10
  },
  profilelogo: {
    width: 100,
    height: 100,
  },

  editlogoview: {
    backgroundColor: "#F5F5F5",
    zIndex: 1,
    borderRadius: 20,
    width: 29,
    height: 29,
    alignItems: "center",
    paddingTop: 8,
    position:'absolute',
    marginHorizontal:80,
    marginTop:50
  },
  editlogo: {
    width: 15,
    height: 13,
  },
  edittext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  firstdivider: {
    marginTop: 20,
  },

  // input filed style here
  inputmainview: {
    marginTop: 20,
  },
  firstview: {
    alignItems: "flex-start",
    marginVertical: 10,
  },
  oldnumbertext: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 20,
  },
  simpleinputview: {
    height: 50,
    borderWidth: 0.3,
    borderRadius: 8,
    marginTop: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  phoneinputbindview: {
    width: "98%",
  },
  bindnumberview: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneinput: {
    height: 50,
    borderWidth: 0.3,
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    marginTop: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingHorizontal: 10,
  },
  simpleinputphysical: {
    height: 50,
    borderWidth: 0.3,
    borderRadius: 8,
    color: _COLORS.Kodie_MediumGrayColor,
    marginTop: 1,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 15,
  },
  physicalsecondview: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  numbercode: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontWeight: "400",
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  downarrowimg: {
    width: 12,
    height: 6,
    marginLeft:5
  },
  lineimg: {
    height: 21,
    width: 45,
  },
  Vectorimg: {
    width: 15,
    height: 17,
    tintColor: "#CED5D7",
  },
  dropdownview: {
    marginHorizontal: 15,
  },
  drop: {
    color: _COLORS.Kodie_ExtralightGreenColor,
  },
  uploadview: {
    marginTop: 30,
    marginHorizontal: 20,
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
  leasttext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: "#ABACAD",
    marginTop: 5,
  },
  buttonview: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  secondbuttonview: {
    marginTop: 10,
  },
});
