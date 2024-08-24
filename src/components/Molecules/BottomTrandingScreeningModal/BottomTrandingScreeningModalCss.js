import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const BottomTrandingScreeningModalCss = StyleSheet.create({
  MainContainer: { marginHorizontal: 16 },
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  MainText: {
    fontSize: 17,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
  },
  closeIcon: {
    alignSelf: "center",
  },
  TopView: { marginTop: 10 },
  RowView: {
    flexDirection: "row",
  },
  restText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginLeft: 7,
  },
  reportText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_GreenColor,
    alignSelf: "center",
    marginLeft: 7,
  },
  managertext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
  },
  BoxView: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    elevation: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: "30%",
  },
  alreadyText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 10,
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  saveView: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 15,
  },
  SaveText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
  },
});
