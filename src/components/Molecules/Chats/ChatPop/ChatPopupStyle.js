import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const ChatPopupStyle = StyleSheet.create({
  mainContainer: { flex: 1, marginVertical: 5 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    justifyContent:'center'
  },
  text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
    alignSelf: "center",
  },
  Icons: { width: 15, height: 15, resizeMode: "cover" },
  crossIconStyle: { alignSelf: "center", marginRight: 10 },
  content_View: { flexDirection: "row", marginTop: 10, marginHorizontal: 16 },
  // Bottomcontainer: {
  //   width: 32,
  //   height: 32,
  //   borderWidth: 0.4,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 8,
  //   borderColor: _COLORS.Kodie_LightGrayColor,
  // },
  IconView: {
    borderWidth: 0.8,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    marginTop:10,
    height: 35,
    padding:5,
  },
});
