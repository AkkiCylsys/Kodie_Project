import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const ArchivePropertiesStyle = StyleSheet.create({
  Container: {
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  flat_MainView: { flexDirection: "row" },
  AllView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  flatlistView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
    marginRight: 5,
  },
  RightContainer: { flex: 0.5, alignSelf: "flex-end" },
  flexContainer: { flex: 1 },
  flatListContainer: { marginHorizontal: 30 },
  propertyView: { flex: 1, flexDirection: "row", marginTop: 15 },
  propertyImage: {
    height: 35,
    width: 35,
    alignSelf: "center",
    marginRight: 10,
  },
  tom: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  locationView: { flex: 1, flexDirection: "row" },
  locationText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginLeft: 5,
  },
  BudgetView: { marginLeft: 20, flex: 1, flexDirection: "row", marginTop: 15 },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightOrange,
    backgroundColor: _COLORS.Kodie_LightOrange,
    borderRadius: 15,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginLeft: 10,
  },
  roundButton: {
    height: 6,
    width: 6,
    borderRadius: 6 / 2,
    alignSelf: "center",
    marginRight: 5,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
  },
  spend: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    textAlign: "right",
  },
  commontext: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  bugetText: {
    textAlign: "right",
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  //  -------------------------- swipeList css-----------
  rowFront: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderBottomColor: _COLORS.Kodie_GrayColor,
    borderBottomWidth: 1,
    flex: 1,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: _COLORS.Kodie_WhiteColor,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backBtn: {
    position: "absolute",
    bottom: 0,
    top: 0,
    justifyContent: "center",
  },
  backLeftBtn: {
    alignItems: "flex-end",
    backgroundColor: _COLORS.Kodie_BlueColor,
    paddingRight: 16,
  },
  backRightBtn: {
    right: 0,
    alignItems: "flex-start",
    paddingLeft: 12,
  },
  backRightBtnLeft: {
    backgroundColor: _COLORS.Kodie_GrayColor,
  },
  backRightBtnRight: {
    backgroundColor: _COLORS.Kodie_GreenColor,
  },
  backBtnInner: {
    alignItems: "center",
  },
  backBtnText: {
    color: _COLORS.Kodie_WhiteColor,
    marginTop: 2,
  },
});
