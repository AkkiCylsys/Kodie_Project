import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";

export const AccountStepStyle = StyleSheet.create({
  maincontainer: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  topheading: {
    alignItems: "center",
    marginVertical: 15,
  },
  mainimg: {
    width: 88,
    height: 100,
  },
  toptextheading: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold,
    marginTop: 6,
  },
  organisationview:{
    marginHorizontal:15
  },
  organisationtext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginVertical:10
  },
  inputfiledbind: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },


  pencleimg: {
    width: 16,
    height: 16,
    marginLeft:8,
    tintColor:_COLORS.Kodie_BlackColor
  },
  buttomlineimg: {
    width: 28,
    height: 5,
    tintColor:_COLORS.Kodie_GrayColor
  },
  companyemailview:{
    marginVertical:10,
  },

  companyinputbind:{
    borderWidth:0.4,
    borderColor:_COLORS.Kodie_ExtraminLiteGrayColor,
  },
  bindphonenumberview:{
  flexDirection:'row',
  alignItems:'center',
  paddingHorizontal:5
  },
  numbercode:{
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_SemiBold,
    fontSize:13,
    marginBottom:5
  },
  downarrowimg: {
    width: 12,
    height: 7,
    marginHorizontal:4,
  },
  lineimg: {
    height: 20,
    width: 10,
  },
  locationbindfield:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:4
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },
  inputemailbox:{
    fontSize:14,
    lineHeight:20,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_SemiBold,
    width:150
  },
  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_ExtraDarkGreen,
    fontFamily: FONTFAMILY.K_Regular,
    marginHorizontal:15
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginHorizontal:10
  },
  uploadDocumentview:{
    marginHorizontal:15
  },
  updloadtext:{
    fontSize:14,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_SemiBold
  },
  uploadDescriptionview:{
  marginTop:5
  },
  uploadDescription:{
    textAlign:'justify',
    fontSize:12,
    fontFamily:FONTFAMILY.K_Regular,
    color:_COLORS.Kodie_ExtraLightGrayColor
  },
  buttonview: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  secondbuttonview: {
    marginTop: 10,
    marginVertical:60
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },

  textContainer: {
    flexDirection: "column",
    borderWidth:0.5,
    marginHorizontal:15,
    flex:1,
    paddingHorizontal:10,
    padding:10,
    marginVertical:5,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  bindfile:{
  flexDirection:'row',
  alignItems:'center'
  },
  doticon:{
    color:_COLORS.Kodie_GrayColor
  },
  pdfName: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal:5
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginHorizontal:5
  },

});
