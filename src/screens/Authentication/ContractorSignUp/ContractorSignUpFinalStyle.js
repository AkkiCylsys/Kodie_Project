import { StyleSheet } from 'react-native';
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index"
export const C_SignUpFinalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _COLORS.Kodie_WhiteColor
    },
    discription: {
        fontSize: 12,
        textAlign: 'left',
        color: _COLORS.Kodie_MediumGrayColor,
        marginTop: 0,
        fontFamily: FONTFAMILY.K_Medium
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
    AccountNumberContainer: {
        marginBottom: 5,
    },
    ABNContainer: {
        marginTop:10,
        marginBottom: 5,
    },
    input: {
        height: 48,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        color: '#333',
        paddingLeft: 10,
        fontFamily: FONTFAMILY.K_Medium
    },
inputContainer: {
  marginBottom: 20,
},
});

