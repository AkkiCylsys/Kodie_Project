import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const Languagestyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  subConatainer: {
    marginHorizontal: 16,
  },
  translate_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 27,
  },
  premium_view: {
    flexDirection: "row",
    marginTop: 6,
  },
  translate_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  premium_Text: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    marginLeft: 5,
  },
  lock_Icon: { alignSelf: "center" },
  tranlateBtn_View: {
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop: 15,
    marginLeft: 14,
  },
  translateBtn_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
  },
  toggle_con:{
    width: 48,
    height: 25,
    borderRadius: 20,
    padding: 5,
    alignSelf: "center",
  },
  toggle_circle:{
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  language_view:{
    marginHorizontal:16
  },
  language_Text:{
    color:_COLORS.Kodie_BlackColor,
    fontSize:16,
    fontFamily:FONTFAMILY.K_SemiBold
  },
  deviderStyle:{ borderBottomWidth: 7, borderColor: _COLORS.Kodie_LiteWhiteColor }
});
