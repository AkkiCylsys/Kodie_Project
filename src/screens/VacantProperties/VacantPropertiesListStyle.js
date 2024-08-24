import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";

export const VacantPropertiesListStyle = StyleSheet.create({
  maincontainer:{
    backgroundColor:_COLORS.Kodie_WhiteColor,
    height:'100%'
  },
  searchview: {
    marginTop: 10,
  },
  divider:{
    borderBottomWidth:1.5,
    borderColor:_COLORS.Kodie_LightGrayColor, 
  }
});
