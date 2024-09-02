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
  
});
