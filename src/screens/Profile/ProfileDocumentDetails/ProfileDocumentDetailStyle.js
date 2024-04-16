import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../Themes';

export default ProfileDocumentDetailStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  documentheadingText: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginHorizontal: 16,
    marginVertical: 15,
  },
  card: {
    width: '100%',
    backgroundColor: _COLORS.Kodie_TransparentColor,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: Platform.OS == 'android' ? 0.2 : null,
    shadowRadius: 2,
    // padding: 20,
    marginBottom: 20,
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
    flexDirection: 'column',
    marginLeft: 5,
    // borderWidth:1
  },

  pdfInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pdfName: {
    flex: 0.5,
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    width: 200,
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
    resizeMode: 'cover',
  },
  crossIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  upload_doc_text: {
    fontSize: 18,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_BlackColor,
  },
  upload_doc_sub: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: FONTFAMILY.K_SemiBold,
    color: _COLORS.Kodie_GrayColor,
  },
  // dropdown..
  dropdown: {
    borderWidth: 1,
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    marginTop: 12,
    borderRadius: 8,
  },

  placeholderStyle: {
    fontSize: 14,
    color: _COLORS.Kodie_LightGrayColor,
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
  // ...
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
  bottomModal_container: {
    borderWidth: 1,
    borderColor: _COLORS.Kodie_LightGrayColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
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
  error_text: {color: 'red', marginLeft: 10, marginTop: 5},
});
