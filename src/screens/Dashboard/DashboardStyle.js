import {StyleSheet} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../Themes';
export const DashboardStyle = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: _COLORS.Kodie_ExtraLiteWhiteColor,
  },
  container: {
    marginHorizontal: 16,
  },
  Name_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 22,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 15,
  },
  welcome_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
  },
  dropdown_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: 6,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
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
  iconStyle: {
    width: 20,
    height: 20,
    // borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  },
  income_Box_View: {
    borderWidth: 1,
    // height: 130,
    width: 160,
    marginTop: 16,
    borderRadius: 15,
    shadowColor: _COLORS.Kodie_GrayColor,
    // shadowOffset: { width: 1, height: 2 },
    // shadowOpacity: Platform.OS == "android" ? 0.2 : 0.2,
    // shadowRadius: 2,
    shadowOffset: {width: 0, height: 2}, // iOS shadow
    shadowOpacity: 0.5, // iOS shadow
    shadowRadius: 3, // iOS shadow
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginHorizontal: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    padding: 15,
    elevation: 2,
  },
  inc_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  income_text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  income_percent: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtralightGreenColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Price_Text: {
    fontSize: 22,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },
  compare_Text: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginHorizontal: 10,
    marginTop: 7,
  },
  maintenance_statusView: {
    flex: 1,
    marginTop: 15,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    paddingVertical: 18,
  },
  floating_action_btn_view: {
    // flex:1,
    marginLeft: 373,
  },
  maintenance_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maintenance_Text: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  maintenance_main_menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  maintenance_menu: {flexDirection: 'row', justifyContent: 'space-between'},
  request_Text: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 4,
  },
  // maintenance_sts_NOView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginHorizontal: 8,
  // },
  maintenance_sts_NOText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 5,
    marginTop: 2,
  },
  Notice_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  Noticemain_View: {
    flex: 1,
    marginTop: 15,
    marginBottom: 110,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    paddingVertical: 18,
  },
  pdf_container: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 4,
    marginVertical: 5,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
  },
  pdfInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  note: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    justifyContent: 'center',
  },
  lines: {
    width: 5,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  crossIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    right: 3,
    zIndex: 1,
  },
  btnView: {
    marginHorizontal: 15,
  },
  card: {
    // borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 16,
    marginVertical: 16,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'center',
  },
  lineChartStl: {
    borderRadius: 16,
    marginVertical: 16,
  },
  icon: {alignSelf: 'center'},
  chartfooterView: {flexDirection: 'row', justifyContent: 'space-evenly'},
  incomeBox: {
    height: 8,
    width: 8,
    alignSelf: 'center',
    backgroundColor: _COLORS.Kodie_lightGreenColor,
  },
  incomeText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 5,
  },
  expBox: {
    height: 8,
    width: 8,
    alignSelf: 'center',
    backgroundColor: _COLORS.Kodie_BlackColor,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
