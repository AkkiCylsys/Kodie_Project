import {StyleSheet} from 'react-native';
import { _COLORS,FONTFAMILY } from '../../../../Themes';
export const ManagingTenantDataStyle = StyleSheet.create({
  mainContanier: {
    flex: 1,
    backgroundColor: _COLORS?.Kodie_WhiteColor,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  usericon: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderColor: _COLORS.Kodie_GrayColor,
    borderWidth:1
  },
  userNameView: {
    marginLeft: 10,
  },
  username: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    fontSize: 16,
  },
  starIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  SubBio: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 14,
    marginTop: 8,
  },
  bioView: {
    marginHorizontal: 16,
    marginVertical: 15,
  },
  rentalProfileText: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 18,
    marginHorizontal: 16,
    marginVertical: 15,
  },
  readMore: {
    color: _COLORS.Kodie_GreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
  },
});
