import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";
export const ContractorsStyle = StyleSheet.create({
     
     startRating: { 
      paddingHorizontal: 1 
    },
    starView:{
        color:_COLORS.Kodie_BlackColor
    },
      userName: {
        fontSize: 12,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_SemiBold,
      },
        Jasontext:{
        color: _COLORS.Kodie_BlackColor,
        fontSize: 16,
        fontFamily: FONTFAMILY.K_SemiBold,
        marginLeft:23,
      },
      Nottext:{
        fontSize:10,
        marginLeft:8
      },
      text1234:{
        fontSize:12
      },
      
      
      text231:{
        color:_COLORS.Kodie_GrayColor
      },
      
      verifirdview:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:8
      },
      verifiedtext:{
        color:_COLORS.Kodie_GreenColor,
        fontFamily:FONTFAMILY.K_SemiBold,
        marginLeft:5,
        flexDirection:'row',
        marginBottom:3
      },

    //   --------------------
    mainview:{
    marginHorizontal:15
    },
    mainbindview:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:5,
    },
    databindview:{
        flexDirection:'row',
    },
    menuiconview:{
        flexDirection:'row',
        marginTop:10
    },
    heartimg:{
        marginRight:10
    },
    namebindview:{
        flexDirection:'row',
        alignItems:'center',
    },
    ratingbindview:{
        flexDirection:'row'
    },
    iconbindview:{
        flexDirection:'row'
    },
    imageview:{
        flexDirection:"row"
    },
    Container:{ flexDirection: "row", justifyContent: "space-between" },
})