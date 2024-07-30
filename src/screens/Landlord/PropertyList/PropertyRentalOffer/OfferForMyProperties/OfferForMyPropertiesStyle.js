import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';

export const OfferForMyPropertiesStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginHorizontal:16
  },
  selectPropertyText: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GreenColor,
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
  imageStyle: {
    flex: 0.5,
    height: 150,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: _COLORS?.Kodie_GrayColor,
  },
  SubContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flat_MainView: {
    flex: 1,
    flexDirection: 'row',
    width: 130,
  },
  locationText: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    marginLeft: 5,
    fontFamily: FONTFAMILY.K_Bold,
    // borderWidth:1
  },
  apartmentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
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
  amount: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_GreenColor,
    alignSelf: 'flex-end',
  },
  userImg: {
    flex: 0.5,
    height: 36,
    width: 36,
    borderRadius: 36 / 2,
    borderWidth: 1,
    borderColor: _COLORS?.Kodie_GrayColor,
  },
  userName: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_BlackColor,
    alignSelf:"center",
    marginLeft:10
  },
  userContainer:{flex: 1, flexDirection: 'row'},
});
