import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY} from "../../../Themes/index";
export const ReviewjobdetailsStyle = StyleSheet.create({

Mainview: {
 flex:1,
 backgroundColor:_COLORS.Kodie_WhiteColor,
},
img:{
    width: '100%', height: 200,resizeMode:"cover"
},
Container:{
    marginHorizontal:25,
    marginTop:20 
  },
  divider:{
    marginTop:25,
    borderColor:'#CED5D7',
    marginTop:-5
  },
  TextFixing:{
    fontSize:18,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
    marginBottom:8
  },
  ElectricalsText:{
marginBottom:20
  },
  TextUpload:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
    marginTop:10
  },
  text3:{
    fontSize:12,
    marginTop:5
  },
  activeTab: {
    backgroundColor: "white",
    borderBottomWidth: 1,
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },
  dropdown3: {
    borderWidth: 1,
    height: 40,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    marginBottom:20,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginHorizontal: 10,
  },

  selectedTextStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 16,
  },
  file:{
    fontFamily: FONTFAMILY.K_Italic,
  },
  pdfmainview:{
    marginVertical:5
  },
  bindfile:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    borderRadius: 6,
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    },
    pdfName: {
      fontSize: 14,
      color: _COLORS.Kodie_BlackColor,
      fontFamily: FONTFAMILY.K_Bold,
      marginHorizontal:5
    },
    pdfSize: {
      fontSize: 12,
      color: _COLORS.Kodie_MediumGrayColor,
      fontFamily: FONTFAMILY.K_Medium,
      marginHorizontal:5
    },
    doticon:{
      color:_COLORS.Kodie_GrayColor,
    },

    textContainer: {
      flexDirection: "column",
      borderWidth:0.5,
      marginHorizontal:15,
      flex:1,
      paddingHorizontal:10,
      padding:10,
      marginVertical:5,
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    Details_Tab: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 16,
      marginTop: 10,
    },
    Tab_text: {
      fontSize: 11,
      fontFamily: FONTFAMILY.K_SemiBold,
      color: _COLORS.Kodie_BlackColor,
    },
  
});
