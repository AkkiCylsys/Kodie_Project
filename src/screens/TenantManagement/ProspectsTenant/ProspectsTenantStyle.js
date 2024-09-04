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
    borderWidth:1
  },
  usermainView: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  RowBtnView: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  buttonView: {
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 1,
    paddingVertical: 1,
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
    backgroundColor: _COLORS?.Kodie_ExtraMinLightGrayColor,
    padding: 3,
    borderRadius: 16,
    width: 155,
    alignSelf: 'flex-end',
    marginTop:10
  },
  screeningText: {
    color: _COLORS?.Kodie_boldGrayColor,
    fontSize: 11,
    fontFamily: FONTFAMILY?.K_Bold,
    alignSelf: 'center',
  },
  flexRowView:{flexDirection: 'row'},
  subContainer:{
    // flex: 1,
    marginHorizontal: 16,
    marginVertical:11
  },
  userMainView:{
    flexDirection: 'row',
    padding: 11,
  },
  userName:{
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: 'center',
  },
  checkIconStyle:{
    marginHorizontal:5,
    alignSelf:'center'
  },
  verifyText:{
    fontSize: 12,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: 'center',
  },
  ratingView:{flexDirection: 'row', marginTop: 10},
  ratingText:{
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: 'center',
    marginLeft:4
  },
  threeDotView:{flex: 1, alignItems: 'flex-end'},
  Img_found: {
    fontSize: 12,
    color: _COLORS?.Kodie_BlackColor,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

