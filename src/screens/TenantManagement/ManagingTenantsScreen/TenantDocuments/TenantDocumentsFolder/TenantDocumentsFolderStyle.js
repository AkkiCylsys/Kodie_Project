import {StyleSheet} from 'react-native';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';

export const TenantDocumentsFolderStyle = StyleSheet.create({
  folderView: {
    borderWidth: 1,
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
