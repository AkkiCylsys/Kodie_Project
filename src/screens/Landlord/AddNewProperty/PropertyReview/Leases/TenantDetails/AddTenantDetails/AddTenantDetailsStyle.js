import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../../../../Themes";
export const AddTenantDetailsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  heading_Text: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  heading_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 16,
  },
  btn_main_view:{
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 150,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  person_view:{
    backgroundColor: _COLORS.Kodie_GreenColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  person_text: {
    color: _COLORS.Kodie_WhiteColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf:"center"
  },
  company_text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf:"center",
    marginLeft:5
  },
});
