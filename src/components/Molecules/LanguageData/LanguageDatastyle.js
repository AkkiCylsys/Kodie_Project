import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const LanguageDataStyle = StyleSheet.create({
    Container:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 16,
        marginTop:5
      },
      radioBtn:{ flexDirection: "row" },
      languageText:{
        color:_COLORS.Kodie_BlackColor,
        fontSize:15,
        fontFamily:FONTFAMILY.K_Medium,
        alignSelf:"center"
      },
      sublanguage:{
        color:_COLORS.Kodie_BlackColor,
        fontSize:12,
        fontFamily:FONTFAMILY.K_Medium,
        alignSelf:"center"
      }
});
