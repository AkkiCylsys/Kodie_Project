import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const SearchBarStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  serchheaderView: {
    flexDirection: "row",
  },
  filterView: {
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 16,
    // marginTop: 18,
  },
  buttonView: {
    borderWidth: 1,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginTop: 18,
    marginRight: 16,
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_WhiteColor,
    textAlign: "center",
    alignSelf: "center",
  },
  groupIconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupIcon: {
    position: "absolute",
    left: 10,
    top: 10,
    alignSelf: "center",
  },
});
