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
        marginTop:30,
        marginBottom:45
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
      btnview:{
        marginBottom:43,
      },
      job_billing: { marginTop: 16 },
      switchBtn_view:{marginTop:12},
      bottomModal_container:{
        borderRadius:15,
      },
      modalContainer: { marginHorizontal: 16, marginVertical: 16},
      modalMainText: {
        fontFamily: FONTFAMILY.K_Medium,
        fontSize: 21,
        color: _COLORS.Kodie_BlackColor,
        textAlign: "center",
        alignSelf: "center",
        marginVertical: 10,
      },
      modalMainText2: {
        // fontFamily: FONTFAMILY.K_Medium,
        fontSize: 14,
        color: _COLORS.Kodie_LightGrayColor,
        textAlign: "center",
        alignSelf: "center",
        justifyContent:"center",
        textAlign:"center"
        // marginVertical: 10,
      },
      modalSubText: {
        fontFamily: FONTFAMILY.K_Regular,
        fontSize: 14,
        color: _COLORS.Kodie_MediumGrayColor,
        textAlign: "center",
        alignSelf: "center",
        marginTop: 19,
      },
      checkStl: {
        height: 120,
        width: 120,
        alignSelf: "center",
        marginVertical: 50,
        marginBottom:10
      },
});