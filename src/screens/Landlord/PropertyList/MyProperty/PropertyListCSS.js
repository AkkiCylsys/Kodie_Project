import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const PropertyListCSS = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_GrayColor,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  flat_MainView: { flex: 1, flexDirection: "row", marginTop: 5 },
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
  Container: {
    marginHorizontal: 16,
  },
  flexContainer: { flex: 1 },
  apartmentText: { fontSize: 12, color: _COLORS.Kodie_BlackColor },
  locationText: {
    flex: 1,
    fontSize: 10,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  imageStyle: {
    flex: 0.5,
    height: 65,
    width: 65,
    borderRadius: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: _COLORS?.Kodie_GrayColor,
  },
  Img_found: {
    fontSize: 12,
    color: _COLORS?.Kodie_BlackColor,
    textAlign: "center",
    alignSelf: "center",
  },
  buttonView: {
    // flex: 0.7,
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightOrange,
    backgroundColor: _COLORS.Kodie_LightOrange,
    borderRadius: 15,
    // paddingHorizontal: 10,
    paddingVertical: 1,
    marginLeft: "10%",
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
    color: _COLORS.Kodie_DarkOrange,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
  },
  flatListContainer: { marginHorizontal: 30 },
  expandedContent: {
    marginHorizontal: 30,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  noteStyle: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  noteIcon: { height: 25, width: 25, marginRight: 8 },
  rentView: { flex: 1, alignItems: "flex-end" },
  bottomModal_container: {
    // borderWidth: 0.5,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // elevation: 10,
  },
  propertyRentMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  payButtonMainView: { justifyContent: "flex-end", flex: 0.7 },
  payButtonView: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  payButtonText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
    textAlign: "center",
  },
  LeftTextView: {
    justifyContent: "flex-start",
    flex: 1,
    alignSelf: "center",
  },
  LeftText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
  },
  LeftTextRentText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_ExtraDarkGreen,
  },
  leftIconsView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  ImagesStyle: { height: 25, width: 25 },
  bedroomStl: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
    marginLeft: -10,
  },
  weeklyRent: { flex: 0.5, alignItems: "flex-end" },
});
