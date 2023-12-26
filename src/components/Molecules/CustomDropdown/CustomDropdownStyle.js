import { StyleSheet } from "react-native";
import { _COLORS, IMAGES, FONTFAMILY } from "../../../Themes";
export const CustomDropdownStyle = StyleSheet.create({
  bindview: {
    flex: 1,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor:_COLORS.Kodie_WhiteColor
  },
  dropmenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
  },
  placeholdertext: {
    fontSize: 14,
    color: _COLORS.Kodie_LightGrayColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  dropoptionsview:{
    borderWidth:0.1,
    borderRadius:3,
    paddingBottom:8,
    borderColor:_COLORS.Kodie_ExtraminLiteGrayColor,
    backgroundColor:_COLORS.Kodie_WhiteColor
  },
  bindselectmenu: {
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
    marginVertical: 8,
 
  },
  checkboxbind:{
    flexDirection:'row',
    alignItems:'center'
  },
  checkbox: {
    color: _COLORS.Kodie_GrayColor,
  },
  bindselecttext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },

  btnview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  cancleview: {
    width: 105,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight:5
  },
  canclebtn: {
    color: _COLORS.Kodie_BlackColor,
    fontSize:14,
    fontFamily:FONTFAMILY.K_Bold
  },

  applyview: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    width: 105,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:5
  },
  aaplybtn: {
    color: _COLORS.Kodie_WhiteColor,
    fontFamily:FONTFAMILY.K_Bold,
    fontSize:14
  },
  datavisiable:{
    flexDirection: 'row', 
    flexWrap: 'wrap',
  }
});
