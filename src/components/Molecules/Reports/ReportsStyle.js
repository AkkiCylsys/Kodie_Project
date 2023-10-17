import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../Themes";

export const ReportsStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginVertical:8
  },

  middatabindview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.4,
    width: '100%',
    height: 100,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
  },
  bindview: {
    flexDirection: "row",
  },
  headinglineview: {
    marginHorizontal: 15,
  },
  reportimgview:{
    flexDirection:'row',
    alignItems:'center',
  },
  reportimg: {
    width: 36,
    height: 36,

  },
  headintext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  addressviewbind: {
   width:213,
  },
  addresstext: {
    fontSize: 11,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 3,
  },

  dotsview: {
    // justifyContent:'flex-end',
    // flexDirection:'row'

  },
  heartimg:{
    marginTop:10
  }

});
