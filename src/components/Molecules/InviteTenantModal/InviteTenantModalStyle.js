import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const InviteTenantModalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  subContainer: {
    marginHorizontal: 16,
    marginTop: 25,
  },
  Invite_tenant: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Bold,
  },
  content_View: { flexDirection: "row", marginTop: 10, marginHorizontal: 16 },
  Icons: { width: 40, height: 40, resizeMode: "cover" },
  Invite_Data_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    // fontStyle: "500",
    fontWeight: "500",
    marginLeft: 10,
    alignSelf: "center",
  },
  Main_View: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
  },
  All_Data_View: {
    marginTop: 15,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
