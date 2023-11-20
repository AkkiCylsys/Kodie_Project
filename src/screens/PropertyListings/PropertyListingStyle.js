import { StyleSheet } from "react-native";
import { _COLORS, IMAGES ,FONTFAMILY} from "../../Themes";

export const PropertyListingStyle = StyleSheet.create({
    mainview:{
        backgroundColor:_COLORS.Kodie_WhiteColor,
        height:'100%'
    },
  searchview: {
    marginVertical: 10,
    height:48,
  },
  Container: {
    marginHorizontal: 16,
  },
  flat_MainView: { flex: 1, flexDirection: "row", alignItems: "center" },
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
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
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
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
    marginRight: 5,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  divider:{
    borderBottomWidth:2,
    borderColor:_COLORS.Kodie_LightGrayColor
  }
});
