import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../../../Themes";
export const PropertyViewApplicationStyle = StyleSheet.create({
  mainContainer:{
backgroundColor:_COLORS.Kodie_WhiteColor
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
        marginTop:5
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
      ApartmentMainView:{
        marginHorizontal:30
      },
      summaryView:{
        marginHorizontal:16
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
})