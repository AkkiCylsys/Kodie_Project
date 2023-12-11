import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../Themes/index";
export const CreateJobFirstStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  mainView: {
    marginHorizontal: 16,
  },
  servicestext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 15,
  },
  formContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 80,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
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
  jobDetailsView: {
    marginTop: 12,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 20,
  },
  jobD_: { height: 100 },

  jobDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
  },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
  },
  cardHeight: { marginBottom: 8 },
  locationIcon: {
    marginLeft: 15,
  },
  starIcon: {
    marginLeft: 15,
  },
  budgetView: {
    marginTop: 24,
  },
  budgetText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  HomeText: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 15,
  },
  servicesBoxView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },
  spaceView: { margin: 8 },
  box_style: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  box_Text_Style: { color: _COLORS.Kodie_MediumGrayColor },
  checkbox_View: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 18 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_BlackColor,
    marginTop: 4,
  },
  radioBg: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    margin: 2,
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderColor: _COLORS.Kodie_BlackColor,
  },
  priority_Text: {
    marginLeft: 22,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    alignSelf: "center",
    fontFamily: FONTFAMILY.K_Medium,
  },
  priority_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "8%",
    marginTop: 10,
  },
  priority_view: { flexDirection: "row", justifyContent: "space-between" },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
});
