import {StyleSheet} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../Themes/index';
export const CreateJobFirstStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
  },
  heading: {
    color: _COLORS.Kodie_BlackColor,
    fontSize: 24,
    fontFamily: FONTFAMILY.K_Bold,
  },
  mainView: {
    marginHorizontal: 16,
    marginTop:15
  },
  servicestext: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    marginTop: 15,
  },
  formContainer: {
    marginHorizontal: 16,
    // marginTop: 15,
    marginBottom: 80,
  },
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_GrayColor,
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
    fontSize: 15,
  },
  jobDetailsView: {
    marginTop: 12,
  },
  input: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    color: '#333',
    paddingLeft: 10,
    fontFamily: FONTFAMILY.K_Medium,
    marginTop: 12,
  },
  jobD_: {height: 100},

  jobDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  locationInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    color: _COLORS.Kodie_BlackColor,
  },
  cardHeight: {marginBottom: 8},
  locationIcon: {
    alignSelf: 'center',
  },
  starIcon: {
    marginLeft: 15,
  },
  budgetView: {
    marginTop: 24,
  },
  budgetText: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
  },
  HomeText: {
    fontSize: 14,
    color: _COLORS.Kodie_MediumGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    marginLeft: 15,
  },
  servicesBoxView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 10,
  },
  spaceView: {margin: 8},
  box_style: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor,
    borderColor: _COLORS.Kodie_GrayColor,
    margin: 10,
  },
  box_Text_Style: {color: _COLORS.Kodie_MediumGrayColor},
  checkbox_View: {
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 18 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_BlackColor,
    marginTop: 4,
  },
  radioBg: {
    height: 12,
    width: 12,
    borderRadius: 12 / 2,
    borderColor: _COLORS.Kodie_BlackColor,
    borderWidth: 1,
    margin: 2,
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderColor: _COLORS.Kodie_BlackColor,
  },
  priority_Text: {
    marginLeft: 22,
    color: _COLORS.Kodie_BlackColor,
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: FONTFAMILY.K_Medium,
  },
  priority_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '8%',
    marginTop: 10,
  },
  priority_view: {flexDirection: 'row', justifyContent: 'space-between'},
  goBack_View: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 29,
    marginBottom:5
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
    marginRight:5
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  textItem: {
    marginLeft: 10,
    color: _COLORS.Kodie_BlackColor,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: _COLORS.Kodie_BlackColor,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedStyle: {
    color: _COLORS.Kodie_WhiteColor,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  icon: {
    alignSelf: 'center',
    marginRight: 5,
  },
  locationIconView: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginLeft: 10,
    width: '15%',
    height: 48,
    justifyContent: 'center',
  },
  BtnContainer: {
    backgroundColor: _COLORS.Kodie_lightGreenColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 3,
    borderRadius: 10,
    width: '30%',
    height: 50,
    bottom: 0,
    right: 20,
    marginBottom: 30,
    position: 'absolute',
  },
  c_locationBtn: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: "flex-end",
    paddingVertical: 3,
    borderRadius: 10,
    width: '25%',
    height: 60,
    bottom: 0,
    // right: 20,
    left: 20,
    marginBottom: 30,
    position: 'absolute',
  },
  error_text: {color: 'red', marginLeft: 15,},
});
