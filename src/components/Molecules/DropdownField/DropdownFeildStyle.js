import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const DropdownFieldStyle = StyleSheet.create({
    section: {marginTop: 20 },
    dropdown: {
        borderWidth: 1,
        height: 50,
        borderColor: _COLORS.Kodie_GrayColor,
        // marginTop: 10,
        borderRadius: 8,
      },
    
      placeholderStyle: {
        fontSize: 14,
        color: _COLORS.Kodie_GreenColor,
        fontFamily: FONTFAMILY.K_Medium,
        marginLeft: 10,
      },
      selectedTextStyle: {
        fontSize: 14,
        color: _COLORS.Kodie_BlackColor,
        fontFamily: FONTFAMILY.K_Medium,
        marginLeft: 10,
      },
      iconStyle: {
        width: 20,
        height: 20,
        // borderWidth: 1,
        marginRight: 16,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
 
});
