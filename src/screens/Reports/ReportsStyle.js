import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../Themes";

export const ReportsStyle = StyleSheet.create({
    mainContainer:{
        backgroundColor:_COLORS.Kodie_WhiteColor,
        height:'100%'
    },
    searchview:{
        marginVertical:10
    },
    divider:{
        borderBottomWidth:7,
    },
    dropdownview:{
        flexDirection:'row',
        borderWidth:0.4,
        width:'100%',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        borderColor:_COLORS.Kodie_ExtraminLiteGrayColor,
        borderRadius:5,
        marginVertical:10
    },
    dropdownbindview:{
        marginHorizontal:10
    },
    placeholderdroptext:{
        fontSize:14,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_SemiBold
    }
});
