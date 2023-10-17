import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const GeneralReportCommonStyle = StyleSheet.create({
    headerview:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:15,
        marginVertical:10,
        alignItems:'center'
    },
    headingtext:{
        fontSize:20,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold
    },
    optionsmenu:{
        flexDirection:'row',
        marginHorizontal:15,
        alignItems:'center',
        marginVertical:8
    },
    title:{
        marginLeft:10,
        fontSize:14,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold
    },
    image:{
        width:32,
        height:32
    },
    bottomModal_container: {
        borderWidth: 0.5,
        borderColor: _COLORS.Kodie_LightGrayColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10,
      },
});
