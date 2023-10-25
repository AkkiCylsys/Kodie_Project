import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../Themes";
export const ContractorsImageStyle = StyleSheet.create({
    
  mainContainer: { flex: 1 },
  text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
    alignSelf:"center"
  },
  Icons: { width: 40, height: 40, resizeMode: "cover" },
  upload_View:{ flexDirection: "row", justifyContent: "space-between",marginTop:10 },
  crossIconStyle:{alignSelf:"center",marginRight:10},
  uploadImgText:{
    marginHorizontal:16,
    color:_COLORS.Kodie_BlackColor,
    fontSize:20,
    fontFamily:FONTFAMILY.K_Bold
  },
  content_View:{ flexDirection: "row",
  marginTop:10,
  marginHorizontal:16 }
});