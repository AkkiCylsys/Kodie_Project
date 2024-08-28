import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';

export const TenantDocumentsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS?.Kodie_WhiteColor,
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
//   Documents...
recentDocView:{
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  reacentDocText:{
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
  },
  seeAllText:{
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
  },
  folderView:{
    borderWidth: 1,
    // marginLeft: 20,
    marginHorizontal:10,
    marginTop: 10,
    borderRadius: 15,
    borderColor: _COLORS.Kodie_GrayColor,
    width: 145,
    height: 123,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  folder_icon:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  propertyDocText:{
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
  files_text:{
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_GrayColor,
    marginTop: 4,
  }
});
