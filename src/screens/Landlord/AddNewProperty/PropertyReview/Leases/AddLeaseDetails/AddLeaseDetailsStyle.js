import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../../Themes";

export const AddLeaseDetailsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  // subContainer: {
  //   marginHorizontal: 16,
  // },
  heading_Text: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center"
  },
  heading_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginHorizontal: 18,
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
    marginBottom: 250,
  },
  inputContainer: {
    marginBottom: 15,
  },
  datePickerView: {
    flexDirection: "row",
  },

  dropdown: {
    flex: 1,
    borderWidth: 1,
    height: 35,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
    color: _COLORS.Kodie_BlackColor,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GreenColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
    // borderWidth: 1,
    marginRight: 16,
    color: _COLORS.Kodie_BlackColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
  },
  inputContainer: {
    marginTop: 15,
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
  notification_view: { flexDirection: "row", justifyContent: "space-between" },
  notification_text: {
    // borderWidth:1,
    flex: 1,
    alignSelf: "center",
    fontSize: 13,
  },
  toggle_con: {
    width: 35,
    height: 18,
    borderRadius: 20,
    padding: 5,
    marginTop: 18,
    alignItems: "center",
  },
  toggle_circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  exp_reminder_text: {
    flex: 1,
    // marginLeft: 10,
    alignSelf: "center",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 11.2,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  reminder_m_view: {
    flex: 0.9,
    flexDirection: "row",
  },
  reminder_dropdown: {
    flex: 1,
    flexDirection: "row",
  },
  reminder_dropdown_sty: {
    flex: 1,
    borderRadius: 8,
  },
  before: {
    // flex:1,
    marginLeft: 5,
    alignSelf: "center",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
  },
  after: {
    marginLeft: 14,
    alignSelf: "center",
    color: _COLORS.Kodie_BlackColor,
    fontSize: 10,
    fontFamily: FONTFAMILY.K_Regular,
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 20,
  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: "center",
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  itemView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: 'center'
  },
  down_Arrow_icon: {
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_GrayColor,
  },
 probtn:{
  flexDirection: 'row',
  flex: 1,
  marginTop:15,
  justifyContent:'space-between'
},
Twobtn:{
  flex: 1, 
  flexDirection: 'row',
  justifyContent:'space-between'
},
Amountinput:{
  height: 38,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: _COLORS.Kodie_GrayColor,
  color: "#333",
  fontFamily: FONTFAMILY.K_Medium,
  marginTop: 12,
  paddingHorizontal: 35,
},
btn_main_view: {
  flexDirection: "row",
  justifyContent: "center",
  // marginLeft: 10,
  marginVertical: 10,
  borderWidth: 1,
  paddingHorizontal: 17,
  paddingVertical: 5,
  borderRadius: 10,
  borderColor: _COLORS.Kodie_GrayColor,
},
yes_view: {
  backgroundColor: _COLORS.Kodie_GreenColor,
  paddingHorizontal: 25,
  paddingVertical: 5,
  borderRadius: 5,
},
no_view: {
  // backgroundColor: _COLORS.Kodie_GreenColor,
  paddingHorizontal: 20,
  paddingVertical: 5,
  borderRadius: 5,
},
no_text: {
  color: _COLORS.Kodie_BlackColor,
  fontSize: 12,
  fontFamily: FONTFAMILY.K_Regular,
  alignSelf: "center",
},
yes_text: {
  color: _COLORS.Kodie_WhiteColor,
  fontSize: 12,
  fontFamily: FONTFAMILY.K_Regular,
  alignSelf: "center",
  marginLeft: 5,
},

});
