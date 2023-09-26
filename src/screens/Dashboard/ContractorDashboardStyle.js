import { StyleSheet } from "react-native";
import { _COLORS } from "../../Themes";
export const ContractorDashboardStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container:{
    marginHorizontal:35,
    marginTop:20 
  },
  TextCalendar:{
    fontSize:16,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor
  },
  text:{
    textAlign:"justify",
    marginTop:10,
    lineHeight:20,
    color:_COLORS.Kodie_BlackColor,
    fontSize:12,
    fontFamily:'Plus Jakarta Sans'
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
});
