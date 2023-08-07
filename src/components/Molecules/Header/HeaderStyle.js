import { StyleSheet } from 'react-native';
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index"
export const HeaderStyle = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 55,
        width: '100%'
        // borderBottomWidth:5,
        // borderBottomColor:_COLORS.Kodie_lightGreenColor,
        //paddingHorizontal:10
    },
    leftButtonView: { width: '25%', alignSelf: 'center', },
    middleTextView: {
        alignSelf: 'center',
        width: '50%',

    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: _COLORS.Kodie_BlackColor,


    },
    LabelText: {
        color: _COLORS.Kodie_WhiteColor,
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: FONTFAMILY.K_SemiBold
    },
    leftIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    nullView: { width: '25%', }
});