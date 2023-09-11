import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const PropertyImagesStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  headingView: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  slider_view: {
    flex: 0.5,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 25,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  phototextView: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 80,
  },
  upload_Heading_Text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop:10
  },
  formatted_property_text: {
    marginTop: 5,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  btnView: {
    marginTop: 24,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
