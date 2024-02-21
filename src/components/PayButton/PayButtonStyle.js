import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
export const PayButtonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBox: {
    flexDirection: "row",
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    overflow: "hidden",
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    // marginVertical: 5,
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    height:69,
  },
  activeButton: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
  },
  buttonText: {
    flex: 1,
    color: _COLORS.Kodie_MediumGrayColor,
    fontSize: 18,
    alignSelf: "center",
    alignItems:"center",
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
