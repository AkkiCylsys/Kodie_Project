import { StyleSheet } from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "./../../../Themes/index";
export const CalenderCss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  calenderView: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    flex: 1,
    paddingVertical: 10,
  },
  textInputStyle: {
    alignSelf: "center",
    fontSize: 14,
    paddingLeft: 10,
    flex: 1,
    color: _COLORS.Kodie_LightGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  Select_date_text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  calenderSty: { alignSelf: "center", marginHorizontal: 5 },
  headingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 5,
  },
  closeText: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 4,
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
  },
});
