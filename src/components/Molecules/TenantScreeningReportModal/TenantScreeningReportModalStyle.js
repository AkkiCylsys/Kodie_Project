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
    alignSelf:"center"
  },
  AverageText: {
    // flex: 1,
    fontSize: 15,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.K_Bold,
    marginLeft: 5,
    alignSelf:'center'
  },
  AverageView:{
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    padding: 15,
    borderRadius: 8,
  }
});
