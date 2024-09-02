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
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:Platform.OS =='android'? 0.2:null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 4,
    marginVertical: 5,
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
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  submodalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 25,
  },
  Invite_tenant: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
});
