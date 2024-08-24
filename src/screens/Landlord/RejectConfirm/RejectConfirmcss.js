import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const RejectConfirmCss = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  titleContainer: {
    margin: 16,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 1,
    padding: 0,
    margin: 0,
  },
  shadowContainer: {
    // marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: _COLORS.Kodie_GrayColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:Platform.OS =='android'? 0.5:null,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  carouselText: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_GrayColor,
  },
  Container: {
    marginHorizontal: 16,
  },

  textStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginTop: 5,
  },
  CoverText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 10,
  },
  readMore: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
  },
  buttonView: {
    height: 70,

    shadowColor: _COLORS.Kodie_GrayColor,
    shadowOffset: { height: 5, width: 2 },
    shadowOpacity:Platform.OS =='android'? 1:null,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: "white",
  },
  button: { marginHorizontal: 16 },
  checkBox: { alignSelf: "center", marginTop: 10, marginRight: 5 },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
  },
});
