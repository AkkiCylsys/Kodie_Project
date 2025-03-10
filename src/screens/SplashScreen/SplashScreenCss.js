import {StyleSheet, Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const scaleFactor = PixelRatio.get();

const adjustedWidth = width / scaleFactor;
const adjustedHeight = height / scaleFactor;
import {_COLORS, FONTFAMILY} from '../../Themes';
export const SplashStyles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainIcon: {
    flex: 1,
  },
  mainSmallIcon: {
    height: Platform.OS == 'android' ? 44 : '20%',
    width: '90%',
    resizeMode: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: _COLORS.Kodie_WhiteColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginBottom: 5,
    letterSpacing: 0.4,
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    color: _COLORS.Kodie_WhiteColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  logoContainer: {
    flex: 1,
    marginTop: '5%',
    alignItems: 'center',
  },
  bottomTextContainer: {
    flex: 0.8,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
