import { StyleSheet, Platform } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const ServicesBoxStyle = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  boxcontainer: {
    flex: 1,
    height: 76,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GreenColor,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
