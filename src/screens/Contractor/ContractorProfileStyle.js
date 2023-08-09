import { StyleSheet } from "react-native";
import { FONTFAMILY, _COLORS } from "../../Themes/index";
export const ContractorProfileStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: "cover",
  },
  profileView: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  userName: {
    fontSize: 16,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    textAlign: "center",
    marginTop: 16,
  },
  profileName: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    textAlign: "center",
    marginTop: 16,
  },
  Propose_Con: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 8,
  },
  ProposeText: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 8,
    alignSelf: "center",
  },
  prize: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 8,
    alignSelf: "center",
  },
  autoView: {
    alignItems: "center",
  },
  button: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 5,
    marginTop: 7,
  },
  buttonText: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 13,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: "center",
  },
  ratingView: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Medium,
    alignSelf: "center",
  },
  hor_Line: {
    borderBottomWidth: 1,
    marginTop: 16,
    borderBottomColor: _COLORS.Kodie_GrayColor,
    marginHorizontal: 16,
  },
  proposalView: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  proposalText: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  descriptionText: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 179,
    width: 333,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 16,
  },
  playButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowBtnView: { marginHorizontal: 16, marginBottom: 20 },
  verticalLine: {
    height: "50%",
    width: 1,
    backgroundColor: _COLORS.Kodie_LightGrayColor,
    marginLeft: 5,
    alignSelf: "center",
    marginTop: 10,
  },
});
