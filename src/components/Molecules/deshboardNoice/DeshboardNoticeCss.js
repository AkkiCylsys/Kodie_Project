import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const DeshBoardNoticeCss = StyleSheet.create({
  MainView: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderRadius: 15,
    // flex:1,
    // alignItems:'center',
    width:'95%'
  },
  crossview: { alignSelf: "flex-end", marginHorizontal: 5 },
  percentageText: {
    alignSelf: "center",
    flex: 1,
  },
  PercenView: {
    flexDirection: "row",
  },
  progressView: {
    paddingHorizontal: 4,
    // marginHorizontal:15,
    paddingVertical: 4,
    width: "100%",
  },
  progressText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    color: _COLORS.Kodie_WhiteColor,
  },
  progresBar: {
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
    marginTop: 5,
  },
  profileText: {
    flex:1,
    color: _COLORS.Kodie_WhiteColor,
    marginTop: 5,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign:'justify',
    lineHeight:18,
    alignSelf:'center',
    paddingHorizontal:5
  },
  continueText: {
    color: _COLORS.Kodie_lightGreenColor,
    marginTop: 2,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
  },
  spaceLine: { height: 3, backgroundColor: _COLORS.Kodie_lightGreenColor },
  trialView: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 8,
    alignItems: "center",
  },
  trialText: {
    color: _COLORS.Kodie_WhiteColor,
    // marginTop: 5,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    marginRight:8
  },
  upgradeView: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 4,
    justifyContent: "center",
  },
  upgradeText: {
    color: _COLORS.Kodie_BlackColor,
    // marginTop: 5,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign: "center",
    alignSelf: "center",
  },
});
