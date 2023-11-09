import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const AddguestsComponentStyle = StyleSheet.create({
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
  headingView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  commontext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,

  },
  addguestetext: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  ButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginTop: 30,
  },
  applyText: {
    backgroundColor: _COLORS.Kodie_BlackColor,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 4,
  },
  closeButton: {
    padding: 10,
    marginRight:15
  },
  text: {
    color: _COLORS.Kodie_WhiteColor,
  },
  profileimage: {
    width: 40,
    height: 40,
  },
  Imageview: {
    justifyContent: "space-between",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
  },
  addbtn: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GreenColor,
    width: 56,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addbtn1: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    width: 56,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  camerontext:{
    marginLeft:5,
    color:_COLORS.Kodie_BlackColor,
    fontSize:15,
    fontFamily:FONTFAMILY.K_Bold
  },
  imagetext: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

});
