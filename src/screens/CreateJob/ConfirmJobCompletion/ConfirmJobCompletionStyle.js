import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const ConfirmJobCompletionStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 16,
    marginBottom:20
  },
  heading_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 24,
  },
  Sub_heading_Text: {
    color: _COLORS.Kodie_MediumGrayColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
  },
  job_Details_txt: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  job_billing: { marginTop: 16 },
  pdf_container: {
    flex: 1,
    // marginHorizontal: 16,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_minLiteGrayColor,
    borderRadius: 4,
    marginTop: 5,
  },
  pdfInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 5,
  },
  pdfName: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
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
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 25,
    right: 20,
    zIndex: 1,
  },
  crossIconStyle: {
    backgroundColor: _COLORS.Kodie_MediumGrayColor,
    borderRadius: 10,
  },
  confirmBtn_view:{ marginHorizontal: 16,marginBottom:10 },
  switchBtn_view:{marginTop:12}
});
