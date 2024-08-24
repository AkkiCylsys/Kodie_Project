import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../Themes";

export const PaymentMethodStyle = StyleSheet.create({
    maincontainer:{
        marginVertical:10,
        marginTop:15,
    },
    bindview:{
        borderWidth:0.3,
        marginHorizontal:10,
        height:50,
        borderColor:_COLORS.Kodie_ExtraminLiteGrayColor,
        borderRadius:5,
        flex:1,
        justifyContent:'center',
        marginVertical:10   
    },
    btnview:{
        marginHorizontal:10,
        marginVertical:20
    },
    main:{
        backgroundColor:_COLORS.Kodie_WhiteColor,
        height:'100%'
    }
});
