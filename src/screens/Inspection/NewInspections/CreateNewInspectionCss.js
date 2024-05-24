import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";

export const CreateNewInspectionStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  HeadingText: {
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginBottom: 26,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginVertical: 12,
    borderRadius: 8,
  },
  errorText:{color:'red'},
  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GrayColor,
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
    borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  datePickerView: { flexDirection: "row", marginBottom: 15 },
  calenderView: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    flex: 1,
  },
  textInputStyle: {
    alignSelf: "center",
    paddingVertical: 6,
    fontSize: 14,
    paddingLeft: 10,
    flex: 1,
    color: _COLORS.Kodie_LightGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  spaceView: { margin: 5 },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  // marginBottom:15,
  backgroundColor:_COLORS?.Kodie_GrayColor,
  borderWidth: 1,
  borderRadius: 8,
  flex: 1,
  height: 48,
  paddingHorizontal: 6,
  borderColor: '#ccc'
  },
  locationInput: {
   fontSize:14,
   fontFamily:FONTFAMILY?.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    alignSelf:'center',
    marginLeft:5
  },
  locationIcon: {
    alignSelf:'center'
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginLeft: 10,
    width: '15%',
    height: 48,
    justifyContent: 'center',
  },
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 3,
    borderRadius: 10,
    width: '30%',
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 30,
    position: 'absolute',
  },
  TextInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    height:48
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  
  },
  userStyle: { height: 20, width: 20, marginHorizontal: 10 },
  margin: { marginBottom: 15 },
  DetailsView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 2,
    marginLeft: 15,
  },
  DetailsIcon: { height: 30, width: 30 },
  details_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    marginLeft: 5,
  },
  NotesInput: {
    height: 100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginVertical: 12,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GrayColor,
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
  itemView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  bottomModal_container:{
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    paddingHorizontal:20,
    paddingVertical:20,
    paddingBottom:30
  }
});
