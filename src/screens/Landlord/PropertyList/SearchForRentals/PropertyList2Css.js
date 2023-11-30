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
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 6,
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
});
