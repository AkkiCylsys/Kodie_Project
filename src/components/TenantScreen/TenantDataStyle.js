import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../Themes";
export const TenantDataStyle = StyleSheet.create({
  mainContainer: { flex: 1 },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginHorizontal:10,
    backgroundColor:_COLORS.Kodie_WhiteColor
    
  },
  text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
  },
  Icons: { width: 40, height: 40, resizeMode: "cover" },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
