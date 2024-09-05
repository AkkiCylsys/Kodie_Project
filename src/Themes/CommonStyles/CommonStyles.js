import {StyleSheet} from 'react-native';

import {colors} from '../CommonColors/CommonColor';
import {FONTFAMILY, _COLORS} from '../index';
import {fontFamily} from '../FontStyle/FontStyle';
export const LABEL_STYLES = StyleSheet.create({
  // kodie Common label CSS
  _texinputLabel: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginBottom: 12,
  },
  commontext: {
    // flex: 1,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    letterSpacing: 0.3,
  },
  commonMidtext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
});
export const VIEW_STYLES = StyleSheet.create({
  // kodie Common View CSS
  _bottomButtonView: {
    bottom: 10,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 20,
  },
});

const LabelStyles = StyleSheet.create({
  minTextLight: {
    fontSize: 9,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  minText: {
    fontSize: 9,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Medium,
  },
  minTextBold: {
    fontSize: 9,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },

  smallTextLight: {
    fontSize: 10,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  smallText: {
    fontSize: 10,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Medium,
  },
  smallTextBold: {
    fontSize: 10,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },

  commTextLight: {
    fontSize: 12,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  commText: {
    fontSize: 12,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  commTextBold: {
    fontSize: 12,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },

  commonTitleTextLight: {
    fontSize: 14,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  commonTitleText: {
    fontSize: 14,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Medium,
  },
  commonTitleTextBold: {
    fontSize: 14,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },

  errorText: {
    marginLeft: 2,
    fontSize: 14,
    color: colors?.red,
    fontFamily: FONTFAMILY?.K_Medium,
  },

  midLightText: {
    fontSize: 16,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  midText: {
    fontSize: 16,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Medium,
  },
  midTextBold: {
    fontSize: 16,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },

  largeTextLight: {
    fontSize: 20,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Light,
  },
  largeText: {
    fontSize: 20,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Medium,
  },
  largeTextBold: {
    fontSize: 20,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },

  ExtralargeTextLight: {
    fontSize: 30,
    color: colors?.fullBlack,
    fontFamily: FONTFAMILY?.K_Bold,
  },
  ExtralargeTextBold: {
    fontSize: 30,
    color: colors?.fullBlack,
    fontFamily: fontFamily?.K_Bold,
  },
});

const CommonStyles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors?.fullWhite,
  },

  inputContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: colors?.Extralightgray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  minText: {fontSize: 8, fontWeight: '400', color: colors?.fullBlack},
  minTextBold: {fontSize: 8, fontWeight: '700', color: colors?.darkGray},

  smallText: {fontSize: 10, fontWeight: '500', color: colors?.fullBlack},
  smallTextBold: {fontSize: 10, fontWeight: '700', color: colors?.darkGray},

  commText: {fontSize: 12, color: colors?.fullBlack, fontWeight: '500'},
  commTextBold: {fontSize: 12, color: colors?.darkGray, fontWeight: '700'},

  normalText: {
    fontSize: 14,
    color: colors?.fullBlack,
  },
  errorText: {
    fontSize: 14,
    color: colors?.red,
    marginLeft: 3,
  },

  commonTitleText_2: {
    fontSize: 14,
    color: colors?.fullBlack,
    fontWeight: '400',
  },
  commonTitleText: {
    fontSize: 14,
    color: colors?.fullBlack,
    fontWeight: '500',
  },
  commonTitleTextBold: {
    fontSize: 14,
    color: colors?.darkGray,
    fontWeight: '900',
  },

  midTextLight: {
    fontSize: 15,
    color: colors?.fullBlack,
    fontWeight: '500',
  },
  midText: {
    fontSize: 15,
    color: colors?.darkGray,
    fontWeight: '700',
  },
  midTextBold: {
    fontSize: 15,
    color: colors?.bldarkGrayack,
    fontWeight: 'bold',
  },

  largeText: {
    fontSize: 17,
    color: colors?.fullBlack,
    fontWeight: '600',
  },
  largeTextBold: {
    fontSize: 18,
    color: colors?.darkGray,
    fontWeight: 'bold',
  },

  ExtralargeTextBold: {
    fontSize: 25,
    color: colors?.darkGray,
    fontWeight: 'bold',
  },

  mainHeading: {
    fontWeight: '500',
    fontSize: 20,
    color: colors?.fullBlack,
  },

  mainHeadingBold: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors?.darkGray,
  },

  mainButtonContainer: {
    backgroundColor: colors?.orange,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 5,
  },
  mainButtonText: {
    fontSize: 15,
    color: colors?.fullWhite,
    fontWeight: '700',
  },
  subButtonText: {
    fontSize: 12,
    color: colors?.fullWhite,
    fontWeight: '500',
  },
});

const LoderStyles = StyleSheet.create({
  loaderFrameStyle: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

const ModalViewStyles = StyleSheet.create({
  modalMainContainer: {
    borderWidth: 0.3,
    borderRadius: 10,
    backgroundColor: colors?.fullWhite,
    marginHorizontal: 7,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
});
const CommonViewStyles = StyleSheet.create({
  mainViewContainer: {flex: 1, backgroundColor: colors?.fullWhite},
  rowView: {flexDirection: 'row', alignItems: 'center'},
  rowViewCenter: {flexDirection: 'row', justifyContent: 'center'},
  rowViewSpread: {flexDirection: 'row', justifyContent: 'space-between'},
  LineHorizontal: {borderWidth: 0.3, borderColor: colors?.lightGray},
  LineVertical: {borderWidth: 0.3, borderColor: colors?.lightGray},
  shadowView: {
    shadowColor: colors?.fullBlack,
    shadowOpacity: Platform.OS == 'android' ? 0.3 : null,
    borderRadius: 2,
    shadowOffset: {
      height: 0.5,
      width: 0.5,
    },
    elevation: 2,
  },
  cardView: {
    borderRadius: 5,
    shadowColor: colors?.orange,
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    backgroundColor: colors?.lowlightgrey,
  },
  cardContentView: {
    elevation: 0.2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors?.lowlightgrey,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: colors?.grayShade,
  },
  squareView: {
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    padding: 2,
  },
});

const ScrollViewStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: '10%',
  },
  upperLayer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  lowerLayer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export {
  LabelStyles,
  CommonStyles,
  CommonViewStyles,
  LoderStyles,
  ModalViewStyles,
  ScrollViewStyles,
};
