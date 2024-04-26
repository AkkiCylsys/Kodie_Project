import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const PropertyList2Css = StyleSheet.create({
  scrollViewStl: { marginBottom:'50%' },
  Container: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom:'20%'
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 7,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  iconStyle: {
    width: 22,
    height: 22,
    marginRight: 16,
    color: _COLORS.Kodie_BlackColor,
  },
  inputText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  rowView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexContainer: {
    flex: 1,
  },
  spaceView: { margin: 5 },
  dropdown: {
    height: 48,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop:10
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color:_COLORS.Kodie_GrayColor
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color:_COLORS.Kodie_GrayColor

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: _COLORS.Kodie_BlackColor,
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity:Platform.OS =='android'? 0.2:null,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 12,
    color:_COLORS.Kodie_WhiteColor
  },
  select_item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  key_selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: _COLORS.Kodie_BlackColor,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  // 
  mainfeaturesview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  key_feature_mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  key_feature_subView: {flex: 1},
  floorsizeview: {
    flex: 0.5,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  flor_input_field: {
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
    color: '#333',
    fontFamily: FONTFAMILY.K_Medium,
    textAlign: 'center',
    alignItems: 'center',
    width: 105,
    height: 36,
  },
  key_feature_Text: {
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  key_feature_Text_view: {
    flex: 1,
  },
  plus_minusview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.7,
  },
  menusIconView: {
    borderWidth: 0.5,
    width: 32,
    height: 32,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
