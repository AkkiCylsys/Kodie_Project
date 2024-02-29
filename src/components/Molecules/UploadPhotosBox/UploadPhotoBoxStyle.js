import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";

export const UploadPhotoBoxStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subCon:{
    borderWidth: 1,
    height: 90,
    width:'100%',
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: "#F6F6F8",
  },
  iconView:{ flex: 1, alignSelf: "center", justifyContent: "center" },
  textView:{
    backgroundColor: "#4E4C51",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical:5
  },textstyle:{
    color: _COLORS.Kodie_WhiteColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
  }
});
