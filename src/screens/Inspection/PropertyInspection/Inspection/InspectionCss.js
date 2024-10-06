import {Platform, StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
export const InspectionCss = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    flex:1,
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
    marginTop: 5,
    alignSelf: 'center',
    justifyContent: 'center',
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
    flex:1,
    marginVertical: 16,
  },
  errorText: {color: 'red',},
  cardHeight: {marginBottom: 8},
  emailinput: {
    borderWidth: 1,
    height: 45,
    padding: 8,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 5,
    marginTop:6
  },
  ButtonView: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: 25,
    marginHorizontal:16
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
  },
  cancelView: {alignSelf: 'center'},
  cancelText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    marginTop:10,
    // marginBottom:8
  },
  SaveView: {
    borderRadius: 5,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginLeft: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    marginBottom: 2,
    marginTop:4,
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
