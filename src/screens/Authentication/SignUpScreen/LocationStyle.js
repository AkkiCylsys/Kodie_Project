import { StyleSheet } from "react-native";
import { _COLORS } from "../../../Themes";

export const LocationStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  shapeIcon: {
    top: -80,
    position: "relative",
    alignSelf: "flex-end",
    marginRight: 30,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
  },
  shapImg: { alignSelf: "center", height: 25, width: 25 },
  searchPlc: {
    flex: 1,
    // top: -500,
    // position: "relative",
  },
  mapsty: {
    // position: "relative",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  container: {
    position: "absolute",
    top: -350,
    width: "100%",
    zIndex: 1,
  },
});
