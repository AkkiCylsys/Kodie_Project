import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
import { fontFamily } from "../../../Themes/FontStyle/FontStyle";

export const RowTabStyle = StyleSheet.create({

    Helpview: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 3,
    },

    Helpselctionview: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    Helpimgview: {
        padding: 8,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: _COLORS.Kodie_MediumGrayColor,
        backgroundColor: _COLORS.Kodie_TransparentColor,
    },

    imgbox: {
        width: 15,
        height: 15,
        resizeMode:'contain',
    },

    Helptext: {
        fontSize: 14,
        marginLeft: 15,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_SemiBold
    },
    SecondRowtext: {
        fontSize: 11,
        marginLeft: 15,
        color: _COLORS.Kodie_ExtraLightGrayColor,
        fontFamily: FONTFAMILY.K_Regular
    },
    TextViewMain:{
        flexDirection:'column',
        justifyContent:'center',
        marginBottom:5
    },
    rightarrowicon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },

    arrowiconview: {
        height: 30,
        width: 30,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: _COLORS.Kodie_MediumGrayColor,

    },

    hairlinebuttom: {
        backgroundColor: _COLORS.Kodie_LightGrayLineColor,
        height: 0.5,
        alignSelf: 'center',
        width: '94%',
        marginTop: 15,
        opacity: 0.7,

    },

});