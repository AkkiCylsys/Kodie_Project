import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
export const ContractorDashboardStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container:{
    marginHorizontal:25,
    marginTop:20 
  },
  TextContractor:{
    fontSize:16,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor
  },
  text:{
    marginTop:15,
    fontSize:12,
    alignItems:'center'
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  Line: {
    borderBottomWidth: 1,
    borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
    elevation: 4,
  },
  Button:{
    marginTop: 24
  }
});
