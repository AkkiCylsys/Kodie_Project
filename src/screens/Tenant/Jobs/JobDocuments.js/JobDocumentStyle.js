import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const JobDocumentsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  submodalContainer: {
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
  subContainer: {
    marginHorizontal: 16,
  },
  doc_Head_text: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 4,
  },
  card: {
    width: "100%",
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS == "android" ? 0.2 : null,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 15,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 10,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GreenColor,
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
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    borderRadius: 4,
    marginVertical: 5,
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 5,
    // borderWidth:1
  },

  pdfInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  pdfName: {
    flex: 0.5,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    width: 215,
    marginLeft: 10,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 10,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  crossIcon: {
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  recentDocView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 30,
  },
  reacentDocText: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignSelf: "center",
  },
  seeAllText: {
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    alignSelf: "center",
  },
  folderView: {
    borderWidth: 1,
    // marginLeft: 20,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    borderColor: _COLORS.Kodie_GrayColor,
    width: 145,
    height: 123,
    paddingHorizontal: 5,
    paddingVertical: 10,
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
  },
  files_text: {
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_GrayColor,
    marginTop: 4,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
});
