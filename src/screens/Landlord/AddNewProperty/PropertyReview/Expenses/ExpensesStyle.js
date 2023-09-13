import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../../../Themes";
export const ExpensesStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    marginBottom: 50,
  },
  add_Expenses_view: {
    alignSelf: "center",
    paddingVertical: 20,
  },
  add_Expenses_Text: {
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
  },
  btn_View: {
    marginHorizontal: 16,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
