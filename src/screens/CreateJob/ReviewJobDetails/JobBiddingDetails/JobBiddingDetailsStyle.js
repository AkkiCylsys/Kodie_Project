import { StyleSheet } from "react-native";
import { _COLORS,FONTFAMILY } from "../../../../Themes";
export const JobBiddingDetailsStyle = StyleSheet.create({
  add_Lease_view: {
    // alignSelf: "center",
    paddingVertical: 20,
    marginHorizontal:16
  },
  add_Lease_Text: {
    color: _COLORS.Kodie_ExtraLightGrayColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_Medium,
  },
  btn_View: {
    marginHorizontal: 16,
    marginBottom:30
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
