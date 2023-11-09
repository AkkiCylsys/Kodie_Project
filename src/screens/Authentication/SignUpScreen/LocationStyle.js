import { StyleSheet } from "react-native";
import { _COLORS } from "../../../Themes";

export const LocationStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  //  position:'absolute'
  },
  shapeIcon: {
    top: -150,
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
     top: -250,
    // top: -520,
    position: "relative",
  },
  mapsty: {
    position:'relative',
  },
});
