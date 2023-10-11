import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export const EditDashboardStyle = StyleSheet.create({
    Mainview:{
        elevation:1,
        backgroundColor:_COLORS.Kodie_WhiteColor,
        borderWidth:1,
        marginVertical:10,
        borderColor:_COLORS.Kodie_LightGrayColor,
        padding:8,
        borderRadius:8,
        width:360,
        height:170

    },
  Boxview: {
    flexDirection: "row",
    justifyContent:"space-between"
  },
  Textview: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Text: {
    color: _COLORS.Kodie_BlackColor,
    marginTop: 10,
  },
  firstbox: {
    marginTop: 10,
    borderWidth: 1,
    width: 60,
    height: 45,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  firstbox1: {
    marginTop: 10,
    borderWidth: 1,
    width: 110,
    height: 45,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    marginLeft: 45,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  boxtext: {
    color: _COLORS.Kodie_BlackColor,
    textAlign: "center",
  },
});
