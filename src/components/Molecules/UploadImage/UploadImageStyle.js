import {StyleSheet} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../../Themes/index';
export const UploadImageStyle = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
    alignSelf: 'center',
  },
  Icons: {width: 36, height: 36, resizeMode: 'cover', alignSelf: 'center'},
  upload_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
  },
  crossIconStyle: {alignSelf: 'center', marginRight: 10, padding: 10},
  uploadImgText: {
    marginHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 10,
  },
  content_View: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    // marginTop: 10,
    height: 35,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
