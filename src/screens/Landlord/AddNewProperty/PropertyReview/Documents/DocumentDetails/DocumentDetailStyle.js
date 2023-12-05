import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../../../Themes";
export const DocumentDetailStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainview: {
    justifyContent: "center",
    backgroundColor: "#9debd6",
    height: "100%",
  },
  heading: {
    color: "black",
    fontSize: 28,
    textAlign: "center",
    marginVertical: 40,
  },
  button: {
    borderWidth: 0.4,
    marginHorizontal: 40,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
  },
  placeholdertext: {
    color: "#8d9110",
  },
  selectedFileDetailsView: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedFileDetailsText: {
    fontSize: 16,
    color: "#9a9e11",
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
    // flex:1,
    flexDirection: "column",
    marginLeft: 5,
  },

  pdfInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  pdfName: {
    flex: 0.5,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  pdfSize: {
    fontSize: 12,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
  },
  pdfIcon: {
    width: 45,
    height: 45,
    resizeMode: "cover",
  },
  crossIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    top: 25,
    right: 5,
    zIndex: 1,
  },
  property_doc_text: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginTop: 10,
    marginBottom: 10,
  },
  upload_doc_text: {
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  upload_doc_sub: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_GrayColor,
  },
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },

});
