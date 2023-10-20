import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const DeshBoardNoticeCss = StyleSheet.create({
  MainView: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderRadius: 30,
  },
  crossview: {
    alignItems: "flex-end",
    marginHorizontal: 13,
    marginTop: 5,
  },
  progressView: {
    padding:12,
    // width: 350,
    // height: 100,
  },
  progressText: {
    fontSize: 9,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign: "center",
    color: _COLORS.Kodie_WhiteColor,
  },
  progresBar: { backgroundColor: _COLORS.Kodie_GrayColor, alignSelf: "center",marginTop:5 },
  profileText: {
    color: _COLORS.Kodie_WhiteColor,
    marginTop: 5,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf:'center'
  },
  continueText: {
    color: _COLORS.Kodie_lightGreenColor,
    marginTop: 2,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
  },
  spaceLine: { height: 3, backgroundColor: _COLORS.Kodie_lightGreenColor },
  trialView: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 5,
    alignItems:'center'
  },
  trialText: {
    color: _COLORS.Kodie_WhiteColor,
    marginTop: 5,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
  },
  upgradeView: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    paddingHorizontal: 8,
    borderRadius: 5,
    paddingVertical: 4,
    justifyContent: "center",
  
  },
  upgradeText: {
    color: _COLORS.Kodie_BlackColor,
    marginTop: 5,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign: "center",
    alignSelf: "center",

  },
});
