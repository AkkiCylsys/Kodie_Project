import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../Themes';

export const PropertyPopupStyle = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginBottom: 50,
  },
  // subContainer: {
  //   marginHorizontal: 16,
  // },
  heading_Text: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
  },
  heading_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: 18,
  },
  card: {
    width: '100%',
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    // marginBottom: 250,
  },
  inputContainer: {
    marginBottom: 15,
  },
  datePickerView: {
    flexDirection: 'row',
  },

  dropdown1: {
    flex: 1,
    borderWidth: 1,
    height: 45,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
    color: _COLORS.Kodie_BlackColor,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    height: 27,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
    color: _COLORS.Kodie_BlackColor,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
    // borderWidth: 1,
    marginRight: 16,
    color: _COLORS.Kodie_BlackColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
  },
  inputContainer: {
    marginTop: 15,
  },
  input: {
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  notification_view: {flexDirection: 'row', justifyContent: 'space-between',marginTop:10},
  notification_text: {
    // borderWidth:1,
    flex: 1,
    alignSelf: 'center',
    fontSize: 13,
  },
  toggle_con: {
    width: 35,
    height: 18,
    borderRadius: 20,
    padding: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  toggle_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  exp_reminder_text: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    alignSelf: 'center',
    color: _COLORS.Kodie_BlackColor,
    fontSize: 11.2,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  reminder_m_view: {
    flex: 0.9,
    flexDirection: 'row',
  },
  reminder_dropdown: {
    flex: 1,
    flexDirection: 'row',
  },
  reminder_dropdown_sty: {
    flex: 1,
    borderRadius: 8,
  },
  before: {
    // flex:1,
    marginLeft: 5,
    alignSelf: 'center',
    marginTop:8,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
  },
  after: {
    marginLeft: 14,
    alignSelf: 'center',
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
  },
  ButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginVertical: 20,

  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'center',
  },
  down_Arrow_icon: {
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  modalContainer: {marginHorizontal: 16,},
  checkStl: {
    height: 120,
    width: '50%',
    alignSelf: 'center',
    marginVertical: 30,
    resizeMode: 'contain',
  },
  modalMainText: {
    fontFamily: FONTFAMILY.K_Medium,
    fontSize: 21,
    color: _COLORS.Kodie_BlackColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalSubText: {
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
});
