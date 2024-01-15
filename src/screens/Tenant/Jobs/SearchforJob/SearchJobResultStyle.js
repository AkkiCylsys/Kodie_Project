import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../../Themes";
export const SearchJobResultStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: { 
    marginHorizontal:16
  },
  Fixtext:{
    marginTop:10,
    justifyContent:"space-between",
    flexDirection:"row"
  },
  fixcontain:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  Budgetstyle:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:25
  },
  hearto:{
    marginLeft:100,
    // borderWidth:1,
    height:24,
    width:99,
    alignItems:"center",
    borderRadius:10,
    backgroundColor:"#FFEDB5"
  },
  heartotext:{
    color:"#F9A000"
  },
  locationstyle:{
    marginTop:5,
    justifyContent:"space-between",
    flexDirection:"row"
  },
  locationcurrent:{
    marginRight:90
  }
});
