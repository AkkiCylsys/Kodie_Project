import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
export const InspectionCss = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areasText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  editView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  IconView: {alignSelf: 'center', marginHorizontal: 16},
  editText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'center',
    marginLeft: 10,
  },
  flatListContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  ImageStyle: {
    height: 35,
    width: 35,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS?.Kodie_MediumGrayColor,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rightIcon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 2,
    height: 25,
    alignSelf: 'center',
  },
  IconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  rightIconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  ModalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ShareText: {
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
  },
  inputContainer: {
    marginVertical: 16,
  },
  cardHeight: {marginBottom: 8},
  emailinput: {
    borderWidth: 1,
    height: 45,
    padding: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 5,
  },
  ButtonView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 20,
  },
  cancelView: {alignSelf: 'center'},
  cancelText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    // marginTop:10
  },
  SaveView: {
    borderRadius: 5,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginLeft: 40,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  DoneText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_WhiteColor,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginBottom: 24,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
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
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  modalFile: {flexDirection: 'row', marginTop: 15},
  deleteIconView: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
  },
});
