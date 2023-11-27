import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";

export const NoticesStyle = StyleSheet.create({
    mainview:{
        backgroundColor:_COLORS.Kodie_WhiteColor,
        height:'100%'
    },
    scrollContainer:{
        // marginHorizontal:15
    },
    btnview:{
        marginHorizontal:15,
        marginVertical:5
    },
    Container: {
        marginHorizontal: 16,
      },
      searchview:{
       marginVertical:5
      },
      divider:{
        borderBottomWidth:6,
        borderColor:_COLORS.Kodie_LightGrayColor
      },
      flat_MainView: { flex: 1, flexDirection: "row", alignItems: "center" },
      AllView: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: _COLORS.Kodie_BlackColor,
        marginTop: 15,
      },
      item_style: {
        fontSize: 12,
        fontFamily: FONTFAMILY.K_Regular,
        color: _COLORS.Kodie_VeryLightGrayColor,
      },
      flatlistView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginTop: 15,
        marginHorizontal: 5,
        borderRadius: 15,
      },
      round: {
        height: 8,
        width: 8,
        borderRadius: 8 / 2,
        borderWidth: 1,
        borderColor: _COLORS.Kodie_GrayColor,
        backgroundColor: _COLORS.Kodie_GrayColor,
        alignSelf: "center",
        marginRight: 5,
      },
      item_style: {
        fontSize: 12,
        fontFamily: FONTFAMILY.K_Regular,
        color: _COLORS.Kodie_VeryLightGrayColor,
      },
      calenderview:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:10
      },
      monthtext:{
        fontSize:20,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold
      },
      mainviewcomponent:{
        marginHorizontal:10
      },
      componentview:{
        marginTop:10,
      }
});
