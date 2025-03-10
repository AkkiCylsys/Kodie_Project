import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
export const TomPropertyStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 25,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_GrayColor,
    elevation: 4,
    marginBottom: 5,
  },
  Line1: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_GrayColor,
    elevation: 4,
    marginTop: 10,
  },
  Line2: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_GrayColor,
    elevation: 4,
    marginTop: 35,
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  input1: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  alldayview: {
    flexDirection: 'row',
  },

  alldaytext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 25,
  },
  toggle_con: {
    width: 48,
    height: 25,
    borderRadius: 20,
    padding: 5,
    marginTop: 20,
  },
  toggle_circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  allday: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datetimeview: {
    marginHorizontal: 10,
    marginLeft: 50,
  },
  dateview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  datetext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginRight: 45,
  },
  timetext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginRight: -12,
  },
  mainreapeatview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
  },
  divider: {
    marginTop: 25,
    borderColor: '#CED5D7',
  },
  noticedropdownview: {
    width: 90,
  },
  dropdownNotice: {
    height: 35,
    paddingBottom: 4,
    borderWidth: 0,
  },
  repeattext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginRight: 140,
  },
  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_LightGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginHorizontal: 10,
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
    marginLeft: 10,
  },
  Describescpace: {
    marginTop: 20,
  },
});
