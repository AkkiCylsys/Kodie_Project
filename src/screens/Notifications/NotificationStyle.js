import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../Themes";
export const NotificationStyle = StyleSheet.create({
  mainview: {
    top: 15,
  },
  divider: {
    top: 15,
    borderWidth: 0.3,
    borderColor: "#F1F1F1",
  },

  flatlistView: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 15,
    height: 30,
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
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  latesttext: {
    backgroundColor: _COLORS.Kodie_GrayColor,
  },
  Earliertextview: {
    backgroundColor: _COLORS.Kodie_GrayColor,
  },
  firstheadingtext: {
    fontSize: 20,
    lineHeight: 28,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  kodioimg: {
    width: 26,
    height: 30,
  },
  bindview: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  nametextview: {
    width: 230,
  },
  nametext: {
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  titletext: {
    fontSize: 13,
    lineHeight: 17,
    top: 2,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },

  starimageview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 5,
  },
  timetext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  starimg: {
    width: 16,
    height: 15,
    tintColor: _COLORS.Kodie_MediumGrayColor,
  },
  menuimg: {
    width: 4,
    height: 18,
    tintColor: _COLORS.Kodie_BlackColor,
  },
  secondtext: {
    fontSize: 20,
    lineHeight: 28,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 10,
  },
  Container: {
    marginHorizontal: 16,
    flexDirection:'row',
  },
  flat_MainView: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },

  AllView: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginTop: 28,
    width:60,
    height:30,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
