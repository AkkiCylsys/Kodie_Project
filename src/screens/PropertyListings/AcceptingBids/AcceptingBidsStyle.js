import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const AcceptingBidsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  flat_MainView: { flex: 1, flexDirection: "row", alignItems: "center" },
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
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightOrange,
    backgroundColor: _COLORS.Kodie_LightOrange,
    borderRadius: 15,
    paddingHorizontal: 2,
    paddingVertical: 2,
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
    fontSize: 10,
    color: _COLORS.Kodie_DarkOrange,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
  },
  flatListContainer: { marginHorizontal: 30, flex: 1 },
  expandedContent: {
    marginHorizontal: 30,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
  },
  noteStyle: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },

  payButtonView: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },

  LeftText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
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
  share_sty: { marginRight: 17 },
  bidsButton: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GreenColor,
    backgroundColor: _COLORS.Kodie_GreenColor,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  bidsButtonText: {
    fontSize: 11,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_WhiteColor,
    alignSelf:"center"
  },
  biddingText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    marginLeft: 3,
  },
  daysViewStl: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    marginLeft: 3,
    paddingHorizontal: 2,
  },
});
