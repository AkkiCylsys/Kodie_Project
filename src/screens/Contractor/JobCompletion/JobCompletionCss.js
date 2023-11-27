import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
import { fontFamily } from "../../../Themes/FontStyle/FontStyle";
export const JobCompletionCss = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  HeadingText: {
    fontSize: 24,
    fontFamily: fontFamily.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  starStyle: { marginTop: 10, marginHorizontal: 5 },

  review: { marginTop: 15 },
  input: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    marginTop: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  TextView: { flex: 1, flexDirection: "row", marginTop: 10 },
  leftText: { flex: 1, alignSelf: "center" },
  photo: {
    fontSize: 16,
    fontFamily: fontFamily.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  image: {
    flex: 1,
    height: 180,
    width: 330,
    borderRadius: 5,
    marginTop: 10,
    resizeMode: "cover",
  },
  ButtonView: { marginHorizontal: 16, marginBottom: 10 },
  SkipText: {
    fontSize: 16,
    fontFamily: fontFamily.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginVertical: 15,
    textAlign: "center",
  },
});
