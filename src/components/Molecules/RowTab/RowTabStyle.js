import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";

export const RowTabStyle = StyleSheet.create({

    Helpview: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        alignItems: "center",
        // paddingHorizontal: 15,
        marginBottom: 3,
        flex:1,
        marginHorizontal:12,
   
    },

    Helpselctionview: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    Helpimgview: {
        // padding: 8,
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: _COLORS.Kodie_MediumGrayColor,
        backgroundColor: _COLORS.Kodie_TransparentColor,
        width:34,
        height:34,
        alignItems:'center',
        justifyContent:'center'
    },

    imgbox: {
        width: 15,
        height: 15,
        resizeMode:'contain',
    },

    Helptext: {
        fontSize: 15,
        marginLeft: 10,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_SemiBold,
        letterSpacing:0.3
    },
    SecondRowtext: {
        fontSize: 12,
        marginLeft: 10,
        color: _COLORS.Kodie_ExtraLightGrayColor,
        fontFamily: FONTFAMILY.K_Regular,
        letterSpacing:0.3,
        marginTop:2
    },
    TextViewMain:{
        flexDirection:'column',
        justifyContent:'center',
        marginBottom:5,
        // backgroundColor:'red',
        flex:0.9
    },
    rightarrowicon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },

    arrowiconview: {
        height: 28,
        width: 28,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: _COLORS.Kodie_MediumGrayColor,

    },

    hairlinebuttom: {
        backgroundColor: _COLORS.Kodie_LightGrayLineColor,
        height: 1.35,
        alignSelf: 'center',
        width: '94%',
        marginTop: 10,
        opacity: 0.7,

    },

});
