import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const BidforJobStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  SubContainer: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  Subtext1: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
  },
  Subtext2: {
    fontSize: 14,
    marginTop: 10,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  Subtext3: {
    fontSize: 14,
    marginTop: 15,
    color: _COLORS.Kodie_MediumGrayColor,
  },
  Destext: {
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 20,
  },
  Destext1: {
    marginTop: 10,
  },
  Jobtext: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
  },
  atePickerView: { flexDirection: "row" },
  spaceView: { margin: 5 },
  calenderView: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 5,
    borderColor: _COLORS.Kodie_GrayColor,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    flex: 1,
  },
  datePickerView: { flexDirection: "row" },
  error_text: { color: "red", marginLeft: 10 },
  textInputStyle: {
    alignSelf: "center",
    paddingVertical: 6,
    fontSize: 14,
    paddingLeft: 10,
    flex: 1,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  jobDetailsView: {
    marginTop: 20,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  jobD_: { height: 50 },
  input1: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  jobD1_: { height: 100 },
  modalContainer: { marginHorizontal: 16, marginVertical: 16 },
  modalCloseIcon: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  modalMainText: {
    fontFamily: FONTFAMILY.K_Medium,
    fontSize: 21,
    color: _COLORS.Kodie_BlackColor,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  modalSubText: {
    fontFamily: FONTFAMILY.K_Regular,
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 19,
  },
  checkStl: {
    height: 120,
    width: 120,
    alignSelf: "center",
    marginVertical: 50,
  },
  itemView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});
