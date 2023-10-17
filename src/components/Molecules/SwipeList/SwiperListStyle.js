import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const SwiperListStyle = StyleSheet.create({
  bindview: {
    height: 60,
  },
  rowBack: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: _COLORS.Kodie_LightGrayColor,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: _COLORS.Kodie_GreenColor,
    right: 0,
  },
  backTextWhite: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_WhiteColor,
  },
});
