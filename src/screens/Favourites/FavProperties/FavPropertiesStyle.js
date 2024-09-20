import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const FavPropertyStyle = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  subContainer: {
    marginHorizontal: 16,
    marginTop: 19,
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Property_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginTop:5

  },
  Property_rate: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop:5

  },
  share_View: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  share_sty: {marginHorizontal: 15},
  locationTextView: {
    flexDirection: 'row',
    marginTop:5
  },
  locationText: {
    fontSize: 12,
    color: _COLORS?.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY?.K_Regular,
    alignSelf: 'center',
  },
  statusView:{
    backgroundColor:_COLORS?.Kodie_mostLightGreenColor,
    padding: 10,
    borderRadius:20,
    width:150,
    marginTop:5
},
  StatusText:{
    fontSize: 10,
    color: _COLORS?.Kodie_DarkGreenColor,
    fontFamily: FONTFAMILY?.K_SemiBold,
    alignSelf: 'center',

  },
  bedcont: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: 'center',
    marginLeft: 5,
  },
  bedCountView: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  bedIconView: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 15,
    borderColor: _COLORS.Kodie_ExtraMinLightGrayColor,
    alignSelf: 'center',
    alignItems:"center"
  },
  locationView: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 23,
  },
});
