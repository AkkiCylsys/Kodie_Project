import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes/index";

export const PreviousTenantStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
  },
  usericon: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  usermainView: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  nameView: {
    marginLeft: 10,
    flex: 1,
    width: 40,
  },
  nameText: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  starStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  bindstarview: {
    flexDirection: 'row',
  },
  verifiedView: {},
  verifiedtext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_GrayColor,
  },
  starratingStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft:3
  },
  RowBtnView: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  menuiconview: {
    flexDirection: 'row',
  },
  heartimg: {
    marginRight: 10,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
