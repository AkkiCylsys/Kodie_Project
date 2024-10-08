import {StyleSheet} from 'react-native';
import {FONTFAMILY, IMAGES, _COLORS} from './../../../Themes/index';
export const DeshBoardNoticeCss = StyleSheet.create({
  MainView: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderRadius: 15,
    // flex:1,
    // alignItems:'center',
    width: '95%',
  },
  crossview: {alignSelf: 'flex-end', marginHorizontal: 5},
  percentageText: {
    alignSelf: 'center',
    flex: 1,
  },
  PercenView: {
    flexDirection: 'row',
  },
  progressView: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: '100%',
  },
  progressText: {
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    color: _COLORS.Kodie_WhiteColor,
  },
  progresBar: {
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
    marginTop: 5,
    // width: '100%',
    borderRadius: 5,
  },
  profileText: {
    flex: 1,
    color: _COLORS.Kodie_WhiteColor,
    marginTop: 5,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    width: '100%',
  },
  continueText: {
    color: _COLORS.Kodie_lightGreenColor,
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    marginTop:6
  },
  continueContainer: {
    // alignItems: 'center',
    // marginTop: 16, // Adjust this value as needed
  },
  spaceLine: {height: 3, backgroundColor: _COLORS.Kodie_lightGreenColor},
  trialView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 8,
    alignItems: 'center',
    width: '100%',
  },
  trialText: {
    color: _COLORS.Kodie_WhiteColor,
    // marginTop: 5,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Regular,
    marginRight: 8,
  },
  upgradeView: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  upgradeText: {
    color: _COLORS.Kodie_BlackColor,
    // marginTop: 5,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
