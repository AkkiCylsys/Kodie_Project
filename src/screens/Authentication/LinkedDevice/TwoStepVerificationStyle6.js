import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";
export const TwoStepVerificationStyle6 = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container:{
    marginHorizontal:25,
    marginTop:20 
  },
  img:{
   alignItems:"center",
   marginTop:40
},
divider:{
    borderColor:"#8AFBA5",
    borderWidth:5,
  },
  text:{
    marginTop:60,
    alignItems:'center',
    fontSize:14,
    lineHeight:20,
    padding:30,
    textAlign:"center"
  },
  text1:{
    fontSize:21
  },
  imgicon:{
    width:18,
    height:18,
  },
  mainbindview:{
    marginHorizontal:15,
    marginVertical:5
  },
  divider1:{
    marginTop:25,
    borderColor:'#CED5D7',
  },
  bindview:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
    alignItems:'center'
  },
  checkimgview:{
    width:32,
    height:32,
    borderWidth:1,
    borderColor:_COLORS.Kodie_GrayColor,
    borderRadius:8,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  innertextview:{
    marginLeft:20
  },
  textitem:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
  },
  Logouttext:{
    fontSize:20,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
  },
  item:{
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    marginHorizontal:25,
    marginTop:20,
   },
   btn:{
    flexDirection: "row",
    justifyContent:"space-between",
    marginHorizontal:30,
    marginTop:40,
    alignItems:'center'
   },
   Cancelbtn:{
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold,
    color:_COLORS.Kodie_BlackColor,
    marginLeft:190
   },
   Logoutbtnview:{
    width:'50%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
 
    
   },
   Logoutbtn:{
    fontSize:14,
    color:_COLORS.Kodie_WhiteColor,
    backgroundColor:'black',
    padding:10,
    borderRadius:5
   },

   bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },

});
