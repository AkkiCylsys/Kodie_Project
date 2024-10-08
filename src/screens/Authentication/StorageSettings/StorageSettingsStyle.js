import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY,IMAGES } from "../../../Themes";

export const StorageSettingsStyle = StyleSheet.create({
    maincontainer:{
        backgroundColor:_COLORS.Kodie_WhiteColor,
        height:'100%'
    },
    firstview:{
        marginVertical:8,
    },
    firstdivider:{
        marginVertical:8,
        height:1,
        marginHorizontal:15
    },
    seconddivider:{
        marginVertical:12,
        height:5,
        backgroundColor:_COLORS.Kodie_LightGrayColor
    },
    descview:{
        marginHorizontal:15
    },
    mediatext:{
        fontSize:16,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold
    },
    mainbindview:{
        marginVertical:15
    },
    bindview:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:5
    },
    headtext:{
        fontSize:14,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_SemiBold
    },
    destext:{
        fontSize:14,
        color:_COLORS.Kodie_ExtraminLiteGrayColor,
        fontFamily:FONTFAMILY.K_SemiBold
    },
});
