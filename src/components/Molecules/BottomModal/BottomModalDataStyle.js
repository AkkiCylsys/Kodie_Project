import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const BottomModalDataStyle = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: "1%",
    marginHorizontal: 10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  text: {
    fontSize: 14,
    marginTop: 6,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },
  // Icons: { width: 40, height: 40, resizeMode: "cover" },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    marginTop: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
