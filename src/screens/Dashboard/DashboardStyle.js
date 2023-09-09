import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../Themes";
export const DashboardStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  container: {
    marginHorizontal: 16,
  },
  Name_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 22,
    fontFamily: FONTFAMILY.K_Bold,
  },
  welcome_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Regular,
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
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
    borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 16,
    marginVertical: 16,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
  },
  lineChartStl: {
    borderRadius: 16,
    marginVertical: 16,
  },
  icon: { alignSelf: "center" },
  chartfooterView: { flexDirection: "row", justifyContent: "space-evenly" },
  incomeBox: {
    height: 8,
    width: 8,
    alignSelf: "center",
    backgroundColor: _COLORS.Kodie_lightGreenColor,
  },
  incomeText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    textAlign: "center",
    marginLeft: 5,
  },
  expBox: {
    height: 8,
    width: 8,
    alignSelf: "center",
    backgroundColor: _COLORS.Kodie_BlackColor,
  },
});
