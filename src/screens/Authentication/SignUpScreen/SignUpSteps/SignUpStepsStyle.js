import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const SignUpStepStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  stepIndicator: {
    marginTop:30
  },
  progresBar: {
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: "center",
    borderColor: _COLORS.Kodie_GrayColor,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 12,
    justifyContent:'center'
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    alignSelf:'center',
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  BtnContainer: {
    backgroundColor:_COLORS.Kodie_lightGreenColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 3,
    borderRadius: 10,
  
   // borderWidth: 1,
    width: '30%',
    height:55,
    bottom: 0,
    right:20,
    marginBottom: 20,
    position: 'absolute',
    //borderColor: Colors.appColor,
  },
  labeltxt: { textAlign: 'center', fontSize: 18, color: _COLORS.Kodie_WhiteColor, fontWeight: 'bold' },
  c_locationBtn:{
    backgroundColor: _COLORS.Kodie_WhiteColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-end",
    paddingVertical: 3,
    borderRadius: 10,
    width: "20%",
    height: 55,
    bottom: 0,
    // right: 20,
    left: 20,
    marginBottom: 30,
    position: "absolute",
  },
});
