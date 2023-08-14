import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "./../../../Themes/index";
export const uploadImageBoxStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:5
  },
  dashedBorder: {
    width: 150,
    height: 150,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: _COLORS.Kodie_MediumGrayColor,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  centeredText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
    alignSelf:"center",
    justifyContent:"center"
  },
});
