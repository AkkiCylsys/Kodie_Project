import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const TenantScreeningReportModalStyle = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  standOutText: {
    // flex: 1,
    fontSize: 15,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.K_Bold,
    marginLeft: 5,
    alignSelf: 'center',
  },
  AverageText: {
    // flex: 1,
    fontSize: 15,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.K_Bold,
    // marginLeft: 5,
    alignSelf: 'center',
  },
  AverageView: {
    flex: 1,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  backgroundReportText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 30,
  },
  ButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginTop: 20,
    marginBottom:30
  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
});
