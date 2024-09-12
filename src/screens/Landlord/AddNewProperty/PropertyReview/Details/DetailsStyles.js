import { StyleSheet } from "react-native";
import { _COLORS, FONTFAMILY } from "../../../../../Themes";
export const DetailsStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  headingView: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom:15
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  slider_view: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 25,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    padding: 0,
    margin: 0,
  },
  subContainer: {
    // flex:1,
    marginTop: '2%',
  },
  apartment_View: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  share_View: { flexDirection: "row" },
  share_sty: { marginRight: 10 },
  apartment_text: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
  },
  melbourne_Text: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_Bold,
    color: _COLORS.Kodie_BlackColor,
  },
  welcome_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    marginVertical: 10,
    alignSelf: "center",
    marginHorizontal: 16,
  },
  propery_det: {
    fontSize: 13,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  propety_details_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  down_Arrow_icon: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: _COLORS.Kodie_GrayColor,
  },
  goBack_View: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 29,
  },
  goBack_Text: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginLeft: 5,
  },
  backIcon: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: _COLORS.Kodie_LiteWhiteColor,
  },
  btnView: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  DetailsView: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
    marginLeft: 15,
  },
  DetailsIcon: { height: 30, width: 30 },
  details_text: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Regular,
    alignSelf: "center",
    marginLeft: 5,
  },
  Details_Tab: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  stepIndicator: {
    marginTop: 15,
  },
  p_rowTextView:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    // marginTop: 10,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: "#333",
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 1,
  },
  propertyDetailsContent:{marginHorizontal:16},
  ViewIconStyle:{ height: 28, width: 28, borderRadius: 12,borderWidth:1,justifyContent:'center',alignSelf:'center',borderColor:_COLORS.Kodie_LiteWhiteColor },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    // marginTop: 10,
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
    // borderWidth: 1,
    marginRight: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  section: {marginTop: 20 },
  itemView: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
    alignSelf: "center",
  },
  addition_featureView: {
    marginTop: 10,
    flexDirection:'row',
    justifyContent:'center',

  },
  container: {
    flex: 1,
    marginHorizontal:16
  },
  header: {
    fontSize: 15,
    fontFamily: FONTFAMILY?.K_Medium,
    color: _COLORS?.Kodie_BlackColor,
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: FONTFAMILY?.K_Medium,
    color: _COLORS?.Kodie_BlackColor,
    marginBottom: 10,
  },
  itemContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 13,
    marginLeft:15
  },
  itemDistance: {
    flex:1,
    fontSize: 13,
    color: _COLORS?.Kodie_BlackColor,
    textAlign:"right"
   
  },
  viewMore: {
    color: '#45B742',
    marginTop: 5,
  },
});
