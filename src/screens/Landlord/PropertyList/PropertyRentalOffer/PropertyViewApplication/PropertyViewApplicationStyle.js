import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
export const PropertyViewApplicationStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  flat_MainView: {
    // flex: 1,
    flexDirection: 'row',
  },
  locationText: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    marginLeft: 5,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 5,
  },
  apartmentText: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
  },
  cityText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  ApartmentMainView: {
    marginHorizontal: 30,
  },
  summaryView: {
    marginHorizontal: 16,
  },
  summaryText:{
    fontSize: 12,
    fontFamily: FONTFAMILY?.K_Regular,
    color: _COLORS?.Kodie_BlackColor,
    marginVertical: 15,
    alignSelf: 'center',
    textAlign:"center",
    marginHorizontal:42
  },
  readMoreTextContainer: {
    borderBottomWidth: 1,
    borderColor: _COLORS.Kodie_GreenColor,
    alignSelf: 'flex-start', // This makes the border span only the width of the text
    marginTop: 16,
  },
  readMoreText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_GreenColor,
  },
  inspections: {
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 4,
    marginVertical: 10,
  },
  textContainer: {
    // flex:1,
    flexDirection: "column",
    marginLeft: 10,
    // borderWidth:1
  },
  pdfInfo: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    padding:10,
  },
  pdfName: {
    flex: 0.5,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    width: 250,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  crossIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    right: 5,
    zIndex: 1,
  },
  readMore: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
  },
  textStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign: 'center',
    lineHeight: 18,  // Optional: improves readability
    marginHorizontal: 10,  // Optional: provides padding from the edges
  },
});
