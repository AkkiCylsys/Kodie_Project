import { StyleSheet } from 'react-native';
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index"
export const HeaderStyle = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:55,
       // borderBottomWidth:5,
       // borderBottomColor:_COLORS.Kodie_lightGreenColor,
        paddingHorizontal:10
    },
    button: {
        width: 40,
        height: 40,
        borderRadius:40/2,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: _COLORS.Kodie_BlackColor,
        alignSelf: 'center'
    },
    LabelText: {
        color: _COLORS.Kodie_WhiteColor,
        fontSize: 16,
        alignSelf:'center',
        textAlign:'center',
        fontFamily: FONTFAMILY.K_SemiBold
    },
    leftIcon: {
        width: 18,
        height: 18,
        resizeMode:'contain',
        alignSelf: 'center'
    }
});