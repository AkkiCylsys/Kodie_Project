import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";

export const NewInspectionStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  flat_MainView: { flexDirection: "row", marginHorizontal: 16 },
  AllView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
    marginRight: 5,
  },
  flatlistView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  Month_Text: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  month_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  backIconSty: {
    alignSelf: "center",
  },
  location_text: {
    flex: 1,
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginLeft: 2,
    alignSelf: 'center'
  },
  insp_data_View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  insp_cld_Text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: 'center'
  },
  insp_cld_date: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
    marginBottom: 10
  },
  insp_cld_main_view: {
    flex: 0.3,
    marginRight: 8,
    marginTop: 10,
  },
  img_Sty: {
    height: 80,
    width: 80,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: _COLORS?.Kodie_GrayColor,
  },
  note_b_img_sty: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  location_main_view: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  user_main_view: { flex: 1, flexDirection: "row" },
  user_img_sty: {
    height: 38,
    width: 38,
    borderRadius: 38 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  user_name_text: {
    flex: 1,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular
  },
  in_progress_txt: {
    fontSize: 12,
    alignSelf: "center",
  },
  in_progress_view: {
    flex: 1, alignSelf: "center", backgroundColor: _COLORS.Kodie_LightOrange,
    paddingVertical: 5,
    paddingHorizontal: 15, borderRadius: 15
  },
  containerStyle  :{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 10,
  },

  leftButtonStyle  :{
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  rightButtonStyle  :{
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  textContainerStyle  :{
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textItemStyle  :{
    justifyContent: "center",
    alignItems: "center",
  },

  textStyle  :{
    fontSize: 18,
    alignSelf: "center",
    fontFamily: FONTFAMILY?.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },

  in_progress_view:{ flex:1,alignSelf: "center",
  paddingVertical: 5,
  paddingHorizontal: 15,borderRadius:15 },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  ModalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ShareText: {
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
  },
  modalFile: { flexDirection: "row", marginTop: 16 },
  deleteIconView: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
  },
  editText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
    marginLeft: 10,
    marginBottom:5
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
