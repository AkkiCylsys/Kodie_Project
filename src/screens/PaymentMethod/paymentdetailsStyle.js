import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY,} from "../../Themes";

export const paymentdetailsStyle = StyleSheet.create({
    Mainview:{
        flex:1,
        backgroundColor:_COLORS.Kodie_WhiteColor,
    },
    MainContainer:{
        
    },
    container:{
        marginHorizontal:16
    },
    PaymentView:{
        justifyContent:"space-between",
        flexDirection:"row",
        marginTop:16
    },
    Paymenttext:{
        fontSize:25.15,
        color:_COLORS.Kodie_BlackColor,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginTop:11,
        marginBottom:23
      },
      Input: {
        flex: 1,
        height: 48,
        paddingHorizontal: 10,
        color: _COLORS.Kodie_BlackColor,
      },
      inputtext:{
        color:_COLORS.Kodie_BlackColor,
        fontSize:14,
        fontFamily:FONTFAMILY.K_Bold,
      },
      cardIcon: {
        padding: 10,
      },
      inputCarddate:{
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginTop:11,
        marginBottom:23,
        width:152
      },
      ViewTextstyle:{
        marginHorizontal:11,
        marginTop:35,
        marginBottom:58
      },
      Textstyle:{
        // alignItems:"center",
        alignSelf:"center",
      },
      job_Details_txt: {
        color: _COLORS.Kodie_BlackColor,
        fontSize: 16,
        fontFamily: FONTFAMILY.K_SemiBold,
      },
      job_billing: { marginTop: 16 },
      switchBtn_view:{marginTop:12},
});