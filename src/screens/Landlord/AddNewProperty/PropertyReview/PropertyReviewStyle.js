import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const PropertyReviewStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  headingView: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  slider_view: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 25,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  apartment_View: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  share_View: { flexDirection: "row" },
  share_sty: { marginRight: 10 },
  apartment_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  melbourne_Text:{
    fontSize:18,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor
  }
});
