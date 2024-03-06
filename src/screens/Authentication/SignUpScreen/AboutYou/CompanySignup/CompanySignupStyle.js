import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../../../Themes";

export default CompanySignupStyle = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
    shadowRadius: 2,
    padding: 7,
    // marginBottom: 50,
    // marginBottom: 250,
  },
  input: {
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 15,
  },
  smstext:{
    fontSize:12,
    fontFamily:FONTFAMILY.K_SemiBold,
    color:_COLORS.Kodie_ExtraLightGrayColor,
    letterSpacing:0.5,
    lineHeight:20,
    marginVertical:8
  },
  box_style: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderColor: _COLORS.Kodie_GrayColor,
    // margin: 10,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  want_Heading: {
    marginTop: 24,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  simpleinputview: {
    flex:1,
    // height: 50,
    borderWidth: 1,
    // borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 8,
    fontFamily: FONTFAMILY.K_SemiBold,
    flexDirection: "row",
    alignItems: "center",
    // width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  box_Text_Style: { color: _COLORS.Kodie_MediumGrayColor },
  //   Dropdown Style..
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
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
    // borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  //   ........
  locationConView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    shadowColor: '#000',
  },
  locationIcon: {
    alignSelf: 'center',
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginLeft: 5,
    width: '15%',
    justifyContent: 'center',
    height: 50,
  },
  locationIcon: {
    alignSelf: "center",
  },
  saveBackButton: {
    elevation: 2,
    marginTop: 40,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  secondview: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
});
