import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';

export const TenantAllDocumentsFolderStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: _COLORS?.Kodie_WhiteColor,
  },
  subContainer: {
    marginHorizontal: 16,
  },
  AllFolderText: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.K_Bold,
    marginVertical: 19,
  },
  folderView: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    borderColor: _COLORS.Kodie_GrayColor,
    width: 170,
    height: 130,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  folder_icon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
