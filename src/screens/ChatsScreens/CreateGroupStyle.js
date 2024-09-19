import { StyleSheet } from 'react-native';
import { _COLORS } from '../../Themes';

export const CreateGroupStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: _COLORS.white,
    marginHorizontal:16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: _COLORS.Kodie_GrayColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: _COLORS.lightGrayColor,
  },
  selectedUserItem: {
    backgroundColor: _COLORS.Kodie_MidLightGreenColor,
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    alignItems:'center',
  color:_COLORS.Kodie_BlackColor
  },
  EmailStyle: {
    marginLeft: 10,
    fontSize: 13,
    alignItems:'center',
    color:_COLORS.Kodie_DarkGrayColor

  },
  createButton: {
    backgroundColor: _COLORS.Kodie_OrangeColor,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: _COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
