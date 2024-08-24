import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY, IMAGES } from "../../../../Themes";

export const JobDetailsStyle = StyleSheet.create({
  container: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height: "100%",
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 16,
    // marginVertical: 25,
    marginBottom:10
  },
  slider_view: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  dotStyle: {
    width: 15,
    height: 10,
    borderRadius: 10,
  },
  bidsview: {
    width: 106,
    height: 23,
    backgroundColor: _COLORS.Kodie_GreenColor,
    borderRadius: 4,
    alignItems: "center",
    position: "absolute",
    right: 0,
    marginTop: 177,
  },
  bidstext: {
    color: _COLORS.Kodie_WhiteColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
    textAlign:"center"
  },
  mainView: {
    marginHorizontal: 15,
  },
  headingview: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  fixingtext: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginVertical: 5,
  },
  electricaltext: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  activeTab: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderBottomWidth: 1,
  },
  uploadtext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginVertical: 5,
  },
  filenametext: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    lineHeight: 15,
    marginTop: 3,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 16,
  },
  dropdownmainview: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  dropdownheading: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginBottom: 10,
  },
  buttonview: {
    marginVertical: 10,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  textContainer: {
    flexDirection: "column",
    borderWidth: 0.5,
    flex: 1,
    paddingHorizontal: 10,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bindfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  pdfName: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 5,
  },
  doticon: {
    color: _COLORS.Kodie_GrayColor,
  },
  pdfName: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 5,
  },
});
