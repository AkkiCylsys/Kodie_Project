import { StyleSheet } from 'react-native';
import { FONTFAMILY, _COLORS } from "./../../../Themes/index"
export const UserTypeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _COLORS.Kodie_WhiteColor
    },
    maintextView: {
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 170,
        height: 170,
        resizeMode: 'cover',
    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'left',
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_SemiBold
    },
    discription: {
        fontSize: 14,
        textAlign: 'left',
        color: _COLORS.Kodie_VeryLightGrayColor,
        marginTop: 10,
        fontFamily: FONTFAMILY.K_Medium
    },
    signupText: {
        fontSize: 14,
        textAlign: 'left',
        color: _COLORS.Kodie_VeryLightGrayColor,
        marginTop: 30,
        fontFamily: FONTFAMILY.K_SemiBold
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

});

