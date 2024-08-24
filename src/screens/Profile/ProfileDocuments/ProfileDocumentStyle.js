import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../Themes";
export default ProfileDocumentStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  btnContainer: {
    marginVertical: 20,
    marginHorizontal: 16,
  },
  reacentDocText: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 16,
    marginVertical: 15,
  },
  folderView: {
    borderWidth: 2,
    // marginLeft: 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    borderColor: _COLORS.Kodie_GrayColor,
    width: 160,
    height: 123,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom:15
  },
  folder_icon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  propertyDocText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_BlackColor,
    width:100
  },
  files_text: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_GrayColor,
    marginTop: 4,
  },
  saveBackButton: {
    flex:1,
    elevation: 2,
    marginTop: 40,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  secondview: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
 
});
