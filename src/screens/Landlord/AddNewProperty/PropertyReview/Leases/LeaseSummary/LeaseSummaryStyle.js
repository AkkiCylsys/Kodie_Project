import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../../Themes";

export const LeaseSummaryStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  heading_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  note_b_img_sty: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  Days_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    marginLeft: 5,
    alignSelf: "center",
  },
  Due_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
  },
  date_cld_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
  },
  summary_view: { flexDirection: "row", justifyContent: "space-between" },
  due_View: {
    flexDirection: "row",
  },
  sub_View:{ flexDirection: "row" },
  freq_View:{ marginTop: 14 },
  Due_Summary_main_View: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: _COLORS.Kodie_LiteWhiteColor,
  },
  lease_term_Text: {
    color: _COLORS.Kodie_MediumGrayColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
  },
  date_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
    marginRight: 8,
    marginTop: 5,
  },
  lease_term_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  Lease_Term_main_View: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  rent_received_text: {
    color: _COLORS.Kodie_DarkGreenColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
  },
  rent_received_view: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: _COLORS.Kodie_minDarkGreenColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  invite_tenant_Text: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_ExtraLightGrayColor,
    alignSelf: "center",
    marginTop: 9,
  },
  btn_View: {
    marginTop: 24,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});