import { StyleSheet, Dimensions, Platform, PixelRatio } from "react-native";

const { width, height, marginVertical } = Dimensions.get("window");
const scaleFactor = PixelRatio.get();

// Use scaleFactor to adjust styles dynamically
const adjustedWidth = width / scaleFactor;
const adjustedHeight = height / scaleFactor;
import { _COLORS, FONTFAMILY } from "../../Themes";
export const DrawerStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: { marginHorizontal: 20, marginVertical: 30 },
  HeaderText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  ImageStyle: { height: 35, width: "12%" },
  SubHeading: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  SubHeadingView: {
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 8,
  },
  rowFlex: { flexDirection: "row", borderRadius: 8, paddingVertical: 8 },
});
