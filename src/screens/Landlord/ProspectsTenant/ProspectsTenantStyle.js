import {StyleSheet} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../../Themes/index';
export const ProspectsTenantStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  usericon: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  usermainView: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  nameView: {
    marginLeft: 10,
    flex: 1,
    width: 40,
  },
  nameText: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  starStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  bindstarview: {
    flexDirection: 'row',
  },
  verifiedView: {
    paddingTop: 5,
  },
  starratingStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft:5
  },
  desc_View: {flexDirection: 'row', marginTop: 2},
  desc_heading: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  desc_value: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  description: {
    marginTop: 5,
    marginHorizontal: 16,
  },
  Maindescription: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  RowBtnView: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  readtext: {
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 12,
    textDecorationLine: 'underline',
    textDecorationColor: _COLORS.Kodie_GreenColor,
  },
  menuiconview: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  heartimg: {
    marginRight: 10,
  },
  buttonView: {
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  textcolor: {
    color: _COLORS.Kodie_DarkOrange,
  },
  textscore: {
    color: _COLORS.Kodie_BlackColor,
    marginLeft: 30,
  },
  textno: {
    borderWidth: 0.5,
    borderRadius: 8,
    width: 54,
    height: 25,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2.5,
    marginLeft: 70,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  screeningView: {
    flexDirection: 'row',
    backgroundColor: _COLORS?.Kodie_LightOrange,
    padding: 3,
    borderRadius: 16,
    width: 150,
    alignSelf: 'flex-end',
  },
  screeningText: {
    color: _COLORS?.Kodie_DarkOrange,
    fontSize: 12,
    fontFamily: FONTFAMILY?.K_Bold,
    alignSelf: 'center',
  },
  residentText: {
    color: _COLORS?.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY?.K_Regular,
    alignSelf: 'flex-end',
    marginVertical:5
  },
  residentScoreView: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderColor: _COLORS.Kodie_GrayColor,
    width: 50,
    flex: 1,
    alignSelf: 'flex-end',
  },
  scoretext:{
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf:"center"
  }
});
