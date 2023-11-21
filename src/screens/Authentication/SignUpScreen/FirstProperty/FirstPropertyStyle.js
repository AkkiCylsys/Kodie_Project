import { Platform, StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const FirstPropertyStyle = StyleSheet.create({
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
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
  },
  locationIcon: {
    marginLeft: 15,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  key_feature_Dropdownstyle: { flex: 1,height: 40, },
  additional:{flex:0.85},
  mainfeaturesview:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:12
  },
  key_feature_mainView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginVertical:10
  },
  key_feature_subView: { flex: 1,  },
  floorsizeview:{
    flex:0.5,
    justifyContent:'flex-end',
    flexDirection:'row'
  },
  flor_input_field:{
    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
    color: "#333",
    fontFamily: FONTFAMILY.K_Medium,
    textAlign:"center",
    width:105,
    height:36
  },
  key_feature_Text: {
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  key_feature_Text_view:{
    flex:1,
  },
  plus_minusview:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:0.7,
  },
  menusIconView:{
    borderWidth:0.5,
    width:32,
    height:32,
    borderRadius:8,
    borderColor:_COLORS.Kodie_ExtraLightGrayColor,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  countdata:{
    fontSize:16,
    fontFamily:FONTFAMILY.K_Regular,
    color:_COLORS.Kodie_BlackColor,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
  },
  addition_featureText: {
    marginTop: 10,
  },
  AutoList_text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
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
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  btnView: {
    marginTop: 24,
  },
  flor_input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    // paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    width: Platform.OS === "ios" ? "22.5%" : "20.5%",
    marginLeft: 12,
    marginTop: 9,
    textAlign: "center",
  },
  stepIndicator: {
    marginTop: 15,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 12,
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
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingVertical: 3,
    borderRadius: 10,

    // borderWidth: 1,
    width: "30%",
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 20,
    position: "absolute",
    //borderColor: Colors.appColor,
  },
});
