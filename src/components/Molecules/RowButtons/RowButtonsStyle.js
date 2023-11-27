import { StyleSheet } from 'react-native';
import { _COLORS } from "./../../../Themes/index"
export const RowButtonsStyle = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:55,
        width:'100%'
    },
    leftButtonView: {
        height:45,
        width:'48%'
    },
});