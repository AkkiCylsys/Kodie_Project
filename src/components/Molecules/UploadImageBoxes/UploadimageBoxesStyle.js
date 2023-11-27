import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "./../../../Themes/index";
export const UploadImageBoxesStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  heading_View: { flexDirection: "row", marginTop: 10 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: _COLORS.Kodie_LightWhiteColor,
    paddingVertical: 20,
    marginTop: 12,
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    backgroundColor: _COLORS.Kodie_minLiteGrayColor,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  circleText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_GreenColor,
    justifyContent: "center",
    alignSelf: "center",
  },
  circleImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: 10,
  },
  plusIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 44,
    borderColor: _COLORS.Kodie_LightWhiteColor,
  },
});
