import {StyleSheet} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../Themes/index';
export const CreateJobSecondStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  phototextView: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 80,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    // marginHorizontal: 1,
    padding: 0,
    margin: 0,
  },
  heading_Text: {
    flex: 1,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  heading_View: {flexDirection: 'row', marginTop: 10},
  goBack_View: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  next_Btn: {marginTop: 50},
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  slider_view: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    marginVertical: 25,
  },
  uploadImagebox: {flexDirection: 'row'},
  upload_Heading_Text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 10,
  },
  error_text: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 10,

    // borderWidth: 1,
  },
});
