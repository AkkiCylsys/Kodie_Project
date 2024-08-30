import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
export const BedroomCss = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    // marginVertical: 16,
  },
  HeaderText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 15,
  },
  RowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  RowText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    borderBottomWidth: 1,
  },
  TableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:10
  },
  minustextview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:5
  },
  crossrendermainview:{
    flexDirection: 'row',
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bedText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  boxView: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    width: '30%',
    height:40,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bindinputview: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.38,
    justifyContent: 'space-between',
  },
  messageview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  YText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'center',
  },
  rightIcon: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignSelf: 'center',
  },
  IconStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    // flex: 0.3,
  },
  dropdown1: {
    flex: 0.35,
    height: 30,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
  },
  dropdown: {
    height: 48,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_GrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  iconStyle: {
    width: 18,
    height: 18,
    // borderWidth: 1,
    marginRight: 8,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
  },
  goBack_View: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
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
    marginBottom:10
  },
  ShareText: {
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
  },
  inputContainer: {
    // marginVertical: 4,
  },
  cardHeight: {marginBottom: 15,marginTop:15},
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
    marginTop:36,
  },
  cancelView: {alignSelf: 'center'},
  cancelText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  SaveView: {
    borderRadius: 5,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginLeft: 40,
    paddingHorizontal: 35,
    paddingVertical: 12,
  },
  DoneText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_WhiteColor,
  },
  groupIconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupIcon: {
    position: 'absolute',
    left: 5,
    alignSelf: 'center',
  },
  secondModal: {flex: 1, marginHorizontal: 16},
  circleStyle: {height: 38, width: 38, borderRadius: 38 / 2},
  pluscirclestyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 27,
    borderColor: _COLORS.Kodie_LightWhiteColor,
  },
  input: {
    height: "20%",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    color: _COLORS.Kodie_BlackColor,
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
});
