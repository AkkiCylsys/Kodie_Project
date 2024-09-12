import {StyleSheet, Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height, marginVertical} = Dimensions.get('window');
const scaleFactor = PixelRatio.get();

// Use scaleFactor to adjust styles dynamically
const adjustedWidth = width / scaleFactor;
const adjustedHeight = height / scaleFactor;
import {_COLORS, FONTFAMILY} from '../../Themes';
export const DrawerStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {marginHorizontal: 20, flex: 1, marginTop: 30},
  HeaderText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 15,
  },
  ImageStyle: {height: 35, width: '12%'},
  SubHeading: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  SubHeadingView: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingVertical: 4,
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    height: 35,
    justifyContent: 'center',
  },
  rowFlex: {flexDirection: 'row', borderRadius: 8, paddingVertical: 4},
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  popupcantainer: {
    marginHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popuptext: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    color: _COLORS.Kodie_BlackColor,
  },
  ViewBtn: {
    justifyContent: 'flex-end',
    // marginLeft:100,
    marginHorizontal: 16,
    flexDirection: 'row',
    marginTop: 48,
    alignItems: 'flex-end',
  },
  CancelBtn: {
    borderWidth: 0,
    color: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
  },
  LogoutBtn: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    color: _COLORS.Kodie_WhiteColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: 'center',
  },
});
