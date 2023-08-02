import { StyleSheet} from 'react-native';
import {FONTFAMILY, IMAGES, _COLORS} from "./../../../Themes/index"
export const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:_COLORS.Kodie_WhiteColor
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
          fontFamily:FONTFAMILY.K_SemiBold
        },
        card: {
          width: '100%',
          backgroundColor: _COLORS.Kodie_TransparentColor,
          borderRadius: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          padding: 20,
          marginBottom: 20,
        },
        inputContainer: {
          marginBottom: 20,
        },

        input: {
          height: 48,
          borderRadius:6,
          borderWidth: 1,
          borderColor: _COLORS.Kodie_GrayColor,
          color: '#333',
          paddingLeft:10,
          fontFamily:FONTFAMILY.K_Medium
        },


  });
  
  