import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY, IMAGES} from '../../Themes';

export const ChatsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  maincontainer: {
    flex: 1,
    // height:'100%',
  },
  componentview: {
    marginVertical: 15,
  },
  divider: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  searchview: {
    marginVertical: 10,
    height: 48,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
