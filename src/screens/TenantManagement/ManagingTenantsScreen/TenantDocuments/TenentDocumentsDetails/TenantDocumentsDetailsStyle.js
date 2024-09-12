import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../../../Themes";

export const TenantDocumentsDetailsStyle = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:_COLORS?.Kodie_WhiteColor
    },
    card: {
        width: "100%",
        backgroundColor: _COLORS.Kodie_TransparentColor,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity:Platform.OS =='android'? 0.2:null,
        shadowRadius: 2,
        padding: 20,
      },
      container: {
        flex: 1,
        backgroundColor: _COLORS.Kodie_WhiteColor,
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        borderRadius: 4,
        marginVertical: 5,
      },
    
      textContainer: {
        // flex:1,
        flexDirection: "column",
        marginLeft: 10,
        // borderWidth:1
      },
    
      pdfInfo: {
        flex:1,
        flexDirection: "row",
        alignItems: "center",
        padding:10,
      },
      pdfName: {
        flex: 0.5,
        fontSize: 14,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Bold,
        width: 250,
      },
      pdfSize: {
        fontSize: 12,
        color: _COLORS.Kodie_MediumGrayColor,
        fontFamily: FONTFAMILY.K_Medium,
      },
      pdfIcon: {
        width: 45,
        height: 45,
        resizeMode: "cover",
      },
      crossIcon: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        position: "absolute",
        top: 20,
        right: 5,
        zIndex: 1,
      },
      reacentDocText:{
        fontSize: 18,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Bold,
        marginHorizontal:16,
        marginTop:19
      },
      upload_doc_text: {
        fontSize: 14,
        fontFamily: FONTFAMILY.K_SemiBold,
        color: _COLORS.Kodie_BlackColor,
      },
      upload_doc_sub: {
        fontSize: 12,
        fontFamily: FONTFAMILY.K_SemiBold,
        color: _COLORS.Kodie_GrayColor,
      },
      bottomModal_container: {
        borderWidth: 0.5,
        borderColor: _COLORS.Kodie_LightGrayColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10,
      },
      submodalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginTop: 25,
      },
      Invite_tenant: {
        color: _COLORS.Kodie_BlackColor,
        fontSize: 14,
        fontFamily: FONTFAMILY.K_SemiBold,
      },
})