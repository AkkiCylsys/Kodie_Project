import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes/index";
export const LandlordProfileStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
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
    height: 76,
    width: 76,
    borderRadius: 76 / 2,
    // marginHorizontal: 16,
    // justifyContent: "center",
    // alignSelf: "center",
  },
  profilemainView: {
    flexDirection: "row",
  },
  nameView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  emailText: {
    marginTop: 5,
    fontSize: 10,
    color: _COLORS?.Kodie_ExtraLiteGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  staricon: { flexDirection: "row", marginTop: 8 },
  ratingText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  subrating: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  star: { alignSelf: "center" },
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
  AllcontactsText: {
    fontSize: 17,
    paddingHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop:20
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  popupcantainer:{
    marginHorizontal:16,
    marginTop:10,
    flexDirection:"row",
    justifyContent:"space-between"
  },
  popuptext:{
    fontSize:20,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,color: _COLORS.Kodie_BlackColor,
  },
  ViewBtn:{
    justifyContent:"flex-end",
    // marginLeft:100,
    marginHorizontal:16,
    flexDirection:"row",
    marginTop:48,
    alignItems:"flex-end"
  },
  CancelBtn:{
    borderWidth:0,
    color:_COLORS.Kodie_BlackColor,
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:5,
    fontSize:14,
    fontFamily:FONTFAMILY.K_Medium

  },
  LogoutBtn:{
    backgroundColor:_COLORS.Kodie_BlackColor,
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:5,
    color:_COLORS.Kodie_WhiteColor,
    fontSize:14,
    fontFamily:FONTFAMILY.K_Medium,
    alignSelf:'center'
  }
});
