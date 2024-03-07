import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../Themes';
export const AccountStyle = StyleSheet.create({
  headingView: {
    marginHorizontal: 16,
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  profilviewmain: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
  },
  ProfileView: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    // resizeMode: "cover",
  },
  profilelogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: _COLORS.Kodie_ExtraLiteGrayColor,
  },
  editlogoview: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 5,
    width: 35,
    height: 35,
    // borderWidth:1,
    borderRadius: 35 / 2,
    alignSelf: 'center',
  },
  edittext: {
    marginTop: 24,
    marginHorizontal: 16,
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  upload_View: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  uploadImgText: {
    marginHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  crossIconStyle: {alignSelf: 'center', marginRight: 10},
  bottomModal_container: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  inputContainerbio: {
    marginBottom: 15,
  },
  _texinputLabel: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginBottom: 12,
  },
  inputdescription: {
    height: 120,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  characterLimit: {
    marginTop: 5,
  },
  card: {
    width: '100%',
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    // marginBottom:5,
  },
  referralcode: {
    marginTop: 15,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  flor_input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    width: '23.5%',
    marginLeft: 12,
    marginTop: 9,
    textAlign: 'center',
  },
  locationConView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    // shadowColor: _COLORS.Kodie_LightWhiteColor,
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginLeft: 10,
    width: '15%',
    justifyContent: 'center',
  },
  locationIcon: {
    alignSelf: 'center',
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  org_desc: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginVertical: 16,
  },
  goBack_View: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  progresBar: {
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
    borderColor: _COLORS.Kodie_GrayColor,
  },
  errorText: {color: 'red', marginLeft: 10},
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 3,
    borderRadius: 10,

    // borderWidth: 1,
    width: '30%',
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 20,
    position: 'absolute',
    //borderColor: Colors.appColor,
  },
  error_text: {
    color: "red",
    marginLeft: 10,
    marginTop: 10,
    alignSelf: "center",
  },
});
