import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../../Themes";
export const EditDocumentsModalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 25,
  },
  Invite_tenant: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  Icons: { width: 40, height: 40, resizeMode: "cover" },
  Invite_Data_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 10,
    alignSelf: "center",
  },
  Main_View: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
  },
  All_Data_View: {
    // marginTop:15,
  },
});
