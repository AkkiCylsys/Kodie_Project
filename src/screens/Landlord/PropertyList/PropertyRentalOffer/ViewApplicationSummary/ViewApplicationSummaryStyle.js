import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
export const ViewApplicationSummaryStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginHorizontal: 16,
  },
  applicationSumDet: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applicationSum_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 10,
  },
  rowStyle:{
    flexDirection: 'row',
  },
  down_Arrow_icon: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  headingText: {
    fontSize: 14,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily: FONTFAMILY?.K_Bold,
    marginVertical: 10,
  },
  toggleButtonView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  reasonRejectStyle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS?.Kodie_ExtraLightOrange,
    marginVertical: 10,
    paddingLeft: 10,
    height:100
  },
  occupantNumberStyle:{
    alignSelf: 'center',
    fontSize: 14,
    color: _COLORS?.Kodie_BlackColor,
    fontFamily: FONTFAMILY?.K_Medium,
    marginLeft: 100,
  },
  occupants_item_View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    padding: 10,
    marginTop: 10,
  },
  occupants_name: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    width: 160,
  },
  occupants_email: {
    flex: 1,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    width: 160,
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
});
