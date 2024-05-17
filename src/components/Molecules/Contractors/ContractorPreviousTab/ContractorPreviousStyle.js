import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const ContractorPreviousStyle = StyleSheet.create({

  mainContainer: { flex: 1 },
  text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
    alignSelf: "center"
  },
  IconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LightWhiteColor,
    marginLeft: 5,
    width: 35,
    marginTop: 10,
    height: 35,
    padding: 2
    // alignItems:"center",
    // justifyContent: "center",
  },
  Icons: { width: 40, height: 40, resizeMode: "cover" },
  upload_View: { flexDirection: "row", justifyContent: "space-between", 
borderTopLeftRadius:20},
  crossIconStyle: { alignSelf: "center", marginRight: 10 },
  uploadImgText: {
    // marginHorizontal:16,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold
  },
  content_View: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 16
  },
  
});
