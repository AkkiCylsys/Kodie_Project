import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
import { fontFamily } from "../../../Themes/FontStyle/FontStyle";
export const HireContractorCSS = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  haddingText: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginTop: 5,
  },
  discription: { marginTop: 15 },
  Disc_Text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginTop: 5,
  },
  Cont_View: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
  },
  UserImageView: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  userName: { marginLeft: 25, alignSelf: "center" },
  terms: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: fontFamily.K_Bold,
    marginTop: 20,
  },
  calenderView: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    flex: 1,
  },
  textInputStyle: {
    paddingVertical: 10,
    fontSize: 14,
    paddingLeft: 10,
    flex: 1,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: fontFamily.K_Bold,
  },
  datePickerView: { flex: 1, flexDirection: "row" },
  spaceView: { margin: 5 },
  buttonView: {
    height: 70,

    shadowColor: _COLORS.Kodie_GrayColor,
    shadowOffset: { height: 5, width: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: "white",
  },
  button: { marginHorizontal: 16 },
});
