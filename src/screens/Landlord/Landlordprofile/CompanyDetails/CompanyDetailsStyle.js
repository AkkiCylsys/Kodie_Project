import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../Themes";
export const CompanyDetailsStyle = StyleSheet.create({
  mainContaier: {
    flex: 1,
  },
  profilviewmain: {
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
  },
  profilelogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLiteGrayColor,
  },

  editlogoview: {
    backgroundColor: "#F5F5F5",
    zIndex: 1,
    borderRadius: 20,
    width: 29,
    height: 29,
    alignItems: "center",
    paddingTop: 8,
    position: "absolute",
    marginHorizontal: 80,
    marginTop: 50,
  },
  edittext: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  firstdivider: {
    marginTop: 20,
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
    // marginBottom: 50,
    // marginBottom: 250,
  },
  input: {
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 15,
  },
  box_style: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderColor: _COLORS.Kodie_GrayColor,
    margin: 10,
  },
  box_Text_Style: { color: _COLORS.Kodie_MediumGrayColor },
  //   Dropdown Style..
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
    // borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  //   ........
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,

  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
    marginLeft: 10,
    width: "15%",
    height: 48,
    justifyContent: "center",
  },
  locationIcon: {
    alignSelf: "center",
  },
  saveBackButton: {
    elevation: 2,
    marginTop: 40,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  secondview: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    paddingVertical: 3,
    borderRadius: 10,
    width: "30%",
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 20,
    position: "absolute",
  },
  itemView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  bottomModal_container: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  upload_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  uploadImgText: {
    marginHorizontal: 16,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 20,
    fontFamily: FONTFAMILY.K_Bold,
  },
  crossIconStyle: { alignSelf: "center", marginRight: 10 },
  logo: {
    width: 110,
    height: 110,
    // resizeMode: "cover",
  },
});
