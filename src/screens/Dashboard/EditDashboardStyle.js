import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../Themes";
export const EditDashboardStyle = StyleSheet.create({
  Mainview: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  Container: {
    marginHorizontal: 30,
  },
  maintext: {
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    fontSize: 16,
    marginTop: 10,
  },
  buttonview: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 20,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
    marginTop: 10,
    textAlign: "center",
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
    marginTop: 13,
  },
});
