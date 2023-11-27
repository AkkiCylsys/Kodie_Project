import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const GeneralReportStyle = StyleSheet.create({
    main:{
        backgroundColor:_COLORS.Kodie_WhiteColor,
        height:'100%'
    },
    container:{
        marginHorizontal:10
    },
    dropdownview:{
        marginVertical:15
    },
    headingtext:{
        fontSize:14,
        color:_COLORS.Kodie_BlackColor,
        fontFamily:FONTFAMILY.K_Bold
    },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
    paddingHorizontal:10
  },
  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
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
    width: 25,
    height: 20,
    borderWidth: 1,
    marginRight: 10,
    tintColor:_COLORS.Kodie_BlackColor
  },
  mainboxview:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  headtext:{
    fontSize:14,
    color:_COLORS.Kodie_BlackColor,
    fontFamily:FONTFAMILY.K_Bold
  },
  boxview:{
    width:165,
    height:55,
  },
  groupview:{
    marginTop:10
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
