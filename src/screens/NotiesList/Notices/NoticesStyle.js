import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export const NoticesStyle = StyleSheet.create({
  mainview: {
    backgroundColor: _COLORS.Kodie_WhiteColor,
    height: '100%',
  },
  scrollContainer: {
    // marginHorizontal:15
  },
  btnview: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  Container: {
    marginHorizontal: 16,
  },
  searchview: {
    marginVertical: 5,
  },
  divider: {
    borderBottomWidth: 6,
    borderColor: _COLORS.Kodie_LightGrayColor,
  },
  flat_MainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  AllView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: _COLORS.Kodie_BlackColor,
    marginTop: 15,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
  },
  flatlistView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Regular,
    color: _COLORS.Kodie_VeryLightGrayColor,
    alignSelf: 'center',
  },
  calenderview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  monthtext: {
    fontSize: 20,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  mainviewcomponent: {
    marginHorizontal: 10,
  },
  componentview: {
    marginTop: 10,
  },
  // noticestyle...

  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    // width:'100%',
    marginHorizontal: 16,
    marginBottom:8
  },
  dateDayview: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  daytext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
  },
  datetext: {
    fontSize: 15,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_SemiBold,
    width: 40,
  },
  middatabindview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 10,
    borderWidth: 0.4,
    width: '85%',
    // height: 90,
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: _COLORS.Kodie_ExtraminLiteGrayColor,
    // padding: 15,
    
  },
  bindview: {
    flexDirection: 'row',
  },
  headinglineview: {
    // flexDirection:'row',
    marginHorizontal: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  lineimg: {
    width: 4,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // marginTop: 10,
  },
  headintext: {
    fontSize: 12,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    alignItem: 'center',
    justifyContent: 'center',
    marginLeft:5
  },
  addressviewbind: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: 3,
    alignSelf: 'center',
    alignItems: 'center',
  },
  addresstext: {
    fontSize: 12,
    color: _COLORS.Kodie_ExtraminLiteGrayColor,
    fontFamily: FONTFAMILY.K_Medium,
    width: 168,
    alignSelf: 'center',
  },
  locationimg: {},
  dotsview: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  dotimg: {},
  bottomModal_container: {
    borderWidth: 0.5,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  flatlistView: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: "center",
    borderWidth: 1,
    borderColor: _COLORS.Kodie_GrayColor,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  round: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    backgroundColor: _COLORS.Kodie_GrayColor,
    alignSelf: 'center',
    marginRight: 5,
  },
  item_style: {
    fontSize: 12,
    fontFamily: FONTFAMILY.K_Medium,
    color: _COLORS.Kodie_VeryLightGrayColor,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
