import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";

export const HelpOrFeedbackStyle = StyleSheet.create({

  Helpview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "center",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
  },

  Helpselctionview: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  Helpimgview: {
    padding: 8,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_MediumGrayColor,
    backgroundColor: _COLORS.Kodie_TransparentColor,
  },

  imgbox: {
    width: 20,
    height: 20,
    tintColor: "#45B742",
  },

  Helptext: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
    marginLeft: 20,
    letterSpacing:1
  },

  rightarrowicon: {
    width: 15,
    height: 15,
  },

  arrowiconview: {
    padding: 3,
    height: 25,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_MediumGrayColor,
    tintColor: _COLORS.Kodie_TransparentColor,
  },

  hairlinebuttom: {
    backgroundColor: "#A2A2A2",
    height: 2,
    opacity: 0.7,
    backgroundColor: "#d3d3d3",
  },

});
