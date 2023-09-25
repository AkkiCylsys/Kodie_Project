import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const BlockedUserstyle = StyleSheet.create({
    mainContainer: {
        //flex: 1,
        backgroundColor: _COLORS.Kodie_WhiteColor,
    },
    shareMainView: {
        flexDirection: 'row', justifyContent: 'flex-start'
    },
    searchandShareMainView: { backgroundColor: _COLORS.Kodie_WhiteColor, paddingVertical: 5 },
    shareTextView: {
        alignSelf: 'center'
    },
    AllcontactsText: {
        fontSize: 16,
        paddingHorizontal: 16,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_SemiBold,
    },
    shareText: {
        fontSize: 13,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_SemiBold,
    },
    ProfileView: {
        width: 95,
        height: 95,
        borderRadius: 95 / 2,
        backgroundColor: _COLORS.Kodie_MostLiteGreyColor,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 16,
    },
    usericon: {
        height: 45,
        width: 45,
        marginHorizontal: 10,
        justifyContent: "center",
        alignSelf: "center",
    },

    contactIconView: {
        alignSelf: "center",
        marginHorizontal: 16,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: _COLORS.Kodie_LightGrayColor,
        marginTop: 10,
    },
    contactIcon: { height: 16, width: 16 },


    FlatlistContainer: {
        backgroundColor: _COLORS.Kodie_WhiteColor,
        marginTop: 8,
        //backgroundColor:'green',

    },

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 8,
        backgroundColor: _COLORS.Kodie_WhiteColor,
        marginBottom: 5
    },
    profileView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    profileIcon: {
        width: 45,
        height: 45,
        resizeMode: "cover",
    },
    textContainer: {
        flexDirection: "column",
        marginLeft: 30,
    },
    profile_Heading: {
        fontSize: 14,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Medium,
    },
    AddNew_Text: {
        fontSize: 14,
        alignSelf: 'center',
        color: _COLORS.Kodie_GreenColor,
        fontFamily: FONTFAMILY.K_Bold,
    },
    profile_SubHeading: {
        fontSize: 12,
        color: _COLORS.Kodie_MediumGrayColor,
        fontFamily: FONTFAMILY.K_Medium,
    },
    ArrowIcon: {
        width: '18%',
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: _COLORS.Kodie_LightGrayColor,
        marginTop: 10,
    },
    ArrowIconStyle: {
        backgroundColor: _COLORS.Kodie_WhiteColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: _COLORS.Kodie_LightGrayColor,
        alignSelf: "center"

    },
    ShadowLine: {
        height: 1,
        width: '94%',
        alignSelf: 'center',
        backgroundColor: _COLORS.Kodie_LightGrayLineColor,

    },
    arrowiconview: {
        height: 30,
        width: 30,
        borderWidth: 0.5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: _COLORS.Kodie_MediumGrayColor,

    },
    rightarrowicon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    bottomText: {
        fontSize: 12,
        marginTop: 10,
        paddingHorizontal: 5,
        alignSelf: 'center',
        color: _COLORS.Kodie_ExtraLightGrayColor,
        fontFamily: FONTFAMILY.K_Medium,
    },
    addnewView: {
        flexDirection: 'row', justifyContent: 'space-between', height: 55, paddingHorizontal: 10
    }
});
