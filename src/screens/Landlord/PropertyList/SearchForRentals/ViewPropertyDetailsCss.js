import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const ViewDetailCss = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: _COLORS.Kodie_WhiteColor,
    },
    headingView: {
        marginHorizontal: 16,
        marginTop: 10,
    },
    heading: {
        color: _COLORS.Kodie_BlackColor,
        fontSize: 24,
        fontFamily: FONTFAMILY.K_Bold,
    },
    slider_view: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 25,
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        padding: 0,
        margin: 0,
    },
    Container: {
        marginHorizontal: 16,
    },
    subContainer: {
        marginHorizontal: 32
    },
    apartment_View: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    share_View: { flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end' },
    share_sty: { marginRight: 10 },
    apartment_text: {
        fontSize: 14,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Regular,
    },
    melbourne_Text: {
        fontSize: 18,
        fontFamily: FONTFAMILY.K_Bold,
        color: _COLORS.Kodie_BlackColor,
    },
    welcome_Text: {
        color: _COLORS.Kodie_BlackColor,
        fontSize: 12,
        fontFamily: FONTFAMILY.K_Regular,
        alignSelf: "center",
        textAlign: 'center'
    },
    propery_det: {
        fontSize: 12,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Bold,
    },
    propety_details_view: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
    },
    down_Arrow_icon: {
        borderWidth: 1,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 5,
        borderColor: _COLORS.Kodie_GrayColor,
    },
    goBack_View: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 29,
    },
    goBack_Text: {
        color: _COLORS.Kodie_BlackColor,
        fontSize: 16,
        fontFamily: FONTFAMILY.K_SemiBold,
        marginLeft: 5,
    },
    backIcon: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: _COLORS.Kodie_LiteWhiteColor,
    },
    btnView: {
        marginTop: 24,
        marginHorizontal: 16,
    },

    availableButtonview: { borderWidth: 1, borderColor: _COLORS.Kodie_mostLightGreenColor, backgroundColor: _COLORS.Kodie_mostLightGreenColor, marginHorizontal: 10, paddingVertical: 3, borderRadius: 50, paddingHorizontal: 10 },
    availableButtonText: { fontSize: 11, fontFamily: FONTFAMILY.K_Regular, color: _COLORS.Kodie_GreenColor },
    locationView: { flexDirection: 'row' },
    LocationText: { fontSize: 12, alignSelf: 'center', fontFamily: FONTFAMILY.K_Regular, color: _COLORS.Kodie_MediumGrayColor },
    DetailsView: { flex: 1, flexDirection: "row", marginVertical: 5, marginLeft: 15 },
    DetailsIcon: { height: 30, width: 30 },
    details_text: {
        fontSize: 12,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Regular,
        alignSelf: "center",
        marginLeft: 5,
    },
    Details_Tab: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginVertical: 10,
    },
    inspections:{
        fontFamily:14,
        fontFamily:FONTFAMILY.K_Bold,
        color:_COLORS.Kodie_BlackColor,
        
    },
    bottomButtonMainView:{borderRadius:10,paddingHorizontal:12,paddingVertical:16,marginHorizontal:16,borderWidth:1,marginBottom:20,borderColor:_COLORS.Kodie_LiteWhiteColor}
});
