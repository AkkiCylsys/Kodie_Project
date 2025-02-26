import {Platform, StyleSheet} from 'react-native';
import {FONTFAMILY, IMAGES, _COLORS} from './../../../Themes/index';
export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  logo: {
    width: 210,
    height: 70,
    resizeMode: 'contain',
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: FONTFAMILY.K_SemiBold,
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
    marginBottom: 60,
  },

  inputContainer: {
    marginBottom: 24,
    // flexDirection:'column',
    // justifyContent:'center',
    // alignItems:'center',
    // marginTop:100
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
  forgot: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_GreenColor,
    marginBottom: 10,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  Modaltitle: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 10,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 16,
  },
  crossIconStyle: {
    alignSelf: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  ModalMainView: {
    marginTop: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  passchange: {
    alignSelf: 'center',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: FONTFAMILY?.K_Medium,
  },
  checkicon: {
    alignSelf: 'center',
    height: '50%',
    width: '50%',
    marginTop: 20,
  },
  varifycode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  getButtonView: {
    // flex: 0.3,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    height: 48,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS== 'android'?35:  28,
    // marginBottom: Platform.OS == 'android' ? 28 : 20,
    marginLeft: 8,
  },
  codeMargin: {
    margin: 5,
  },
  getButton: {
    fontSize: 14,
    color: _COLORS.Kodie_WhiteColor,
    // fontFamily:FONTFAMILY.K_Bold,
    alignSelf: 'center',
    textAlign: 'center',
  },
  VerifyButtonView: {
    flex: 0.4,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  verifyButton: {
    fontSize: 14,
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: 'center',
    textAlign: 'center',
  },
  cardHeight: {marginBottom: 8},
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  eyeIcon: {
    padding: 10,
  },
  loderview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  secondloder: {
    flex: 1,
    marginVertical: 10,
    alignItems: 'center',
  },
  error_text: {
    color: 'red',
    marginLeft: 10,
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
  },
});
