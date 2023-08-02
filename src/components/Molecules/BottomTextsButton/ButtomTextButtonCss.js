import { StyleSheet } from 'react-native';
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index"
export const BottomTextsStyles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:15
    },
    leftButtonText: {
        color: _COLORS.Kodie_MediumGrayColor,
        fontSize: 16,
        fontFamily: FONTFAMILY.K_Regular
    },
    rightButtonText: {
        color: _COLORS.Kodie_BlackColor,
        fontSize: 16,
        fontFamily: FONTFAMILY.K_SemiBold
    },

});