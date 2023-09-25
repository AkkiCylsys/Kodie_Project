import { StyleSheet, Dimensions, View, Image, SafeAreaView } from 'react-native';
import { _COLORS, FONTFAMILY } from '../../Themes';
export const SplashStyles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainIcon: {
    flex: 1,
    justifyContent: 'center',
  },
  mainSmallIcon: {
    height: 50,
    marginTop: 100,
    width: '90%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: _COLORS.Kodie_WhiteColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  subtext: {
    fontSize: 14,
    paddingHorizontal: 15,
    textAlign: 'center',
    color: _COLORS.Kodie_WhiteColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  }
});

