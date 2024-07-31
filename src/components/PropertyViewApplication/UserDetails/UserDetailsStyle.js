import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const UserDetailsStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    marginHorizontal: 16,
  },
  userImg: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
  },
  userNameView: {
    // alignSelf: 'center',
    marginLeft: 10,
  },
  username: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    fontSize: 15,
  },
  starIcon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  flat_MainView: {
    // flex: 1,
    flexDirection: 'row',
  },
  locationText: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    marginLeft: 5,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop:5
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
  ApartmentMainView:{
    marginHorizontal:34
  }
});
