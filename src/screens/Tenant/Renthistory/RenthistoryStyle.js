import {StyleSheet} from 'react-native';
import {_COLORS,FONTFAMILY} from '../../../Themes';
export const RenthistoryStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    // padding: 20,
    backgroundColor:_COLORS.Kodie_WhiteColor,
  },
  flatlistView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
    marginRight: 5,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    marginBottom: 4,
    alignSelf: 'center',
    textAlign: 'center',
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  flat_MainView: {flex: 1, flexDirection: 'row', marginTop:15,marginHorizontal:16},

  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: _COLORS.Kodie_BlackColor,
  },
  titleother: {
    fontSize: 14,
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 14,
  },
  boxContainer1: {
    borderWidth: 1,
    borderColor:_COLORS.Kodie_LightGrayColor,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor:_COLORS.Kodie_minDarkGreenColor,
    width: 108,
    height:60,
    justifyContent: 'center',
    paddingHorizontal:5
  },
  boxContainer2: {
    borderWidth: 1,
    borderColor:_COLORS.Kodie_LightGrayColor,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor:_COLORS.Kodie_minLiteGrayColor,
    width: 108,
    height:60,
    justifyContent: 'center',
    paddingHorizontal:5
  },
  boxContainer3: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor:_COLORS.Kodie_WhiteColor,
    width: 108,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
  },
  label: {
    fontSize: 9.45,
    color: _COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Medium
  },
  valueGreen: {
    fontSize: 13,
    color: _COLORS.Kodie_GreenColor,
    fontFamily:FONTFAMILY.K_Bold,
  },
  valueOrange: {
    fontSize: 13,
    color: _COLORS.Kodie_DarkOrange,
    fontFamily:FONTFAMILY.K_Bold,
  },
  valueGrey: {
    fontSize: 9.45,
    color: _COLORS.Kodie_GrayColor,
    fontFamily:FONTFAMILY.K_Bold,
    textAlign: 'center',
  },
  datetext: {
    fontSize: 8,
    color:_COLORS.Kodie_GrayColor,
    // textAlign: 'center',
  },
  subContainer: {
    marginHorizontal: 16,
  },
  Account_main_View: {
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: _COLORS.Kodie_LiteWhiteColor,
    elevation:3,
  },
  account_view: { flexDirection: "row", justifyContent: "space-between" },
  Accounting_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
  },
  Paid_Text: {
    fontSize: 10,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  rent_received_view: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: _COLORS.Kodie_LightOrange,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginBottom: 5,
  },
  date_paid: {
    fontSize: 10,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  paidDate_subView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  paid_Date_View: {
    flexDirection: "row",
    marginLeft:5
  },
  rent_received_text: {
    color: _COLORS.Kodie_DarkOrange,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
    marginBottom:3
  },
  Amount_Text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  datePaid_main_view:{
    borderBottomWidth:0.3,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    elevation:2,
    marginBottom:5
  },
  invoiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height:64,
    padding:10,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth:1,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  fileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileInfo: {
    marginLeft: 10,
  },
  fileName: {
    fontSize: 14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor
  },
  fileSize: {
    fontSize: 12,
    color:_COLORS.Kodie_GrayColor,
  },
  header: {
    fontSize: 16,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    marginBottom: 10,
    marginHorizontal:16
  },
  
});
