
import { StyleSheet } from 'react-native';
import { FONTFAMILY, _COLORS } from '../../Themes';

export const ChatsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.Kodie_WhiteColor, // Add the appropriate color
  },
  searchview: {
    padding: 10,
    marginVertical:10,
            height:48,
    backgroundColor: _COLORS.WhiteColor, // Add the appropriate color
  },
  chatItem: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  chatItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
  userIcon: {
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    color: _COLORS.Kodie_BlackColor,
    fontFamily: FONTFAMILY.bold,
  },
  userMessage: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
    marginLeft: 2,
  },
  messageTime: {
    fontSize: 14,
    fontFamily: FONTFAMILY.bold,
    alignItems:'center'
  },
  unseenCountContainer: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: _COLORS.Kodie_GreenColor,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  unseenCountText: {
    fontSize: 14,
    color: _COLORS.Kodie_WhiteColor,
    alignSelf: 'center',
    fontFamily: FONTFAMILY.bold,
  },
  bottomButton: {
    flex:1,
    marginRight: 15,
    justifyContent: 'flex-end',
    marginBottom: 10,
    alignSelf: 'flex-end',
    width: 60,
    height: 60,
    borderRadius: 60 / 3,
  },
  bottomButtonTouchable: {
    justifyContent: 'center',
    marginBottom: '5%',
    borderWidth: 1,
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 60 / 3,
    marginRight: 15,
    borderColor: _COLORS.Kodie_GreenColor,
    backgroundColor: _COLORS.Kodie_GreenColor,
  },
  bottomButtonIcon: {
    alignSelf: 'center',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontFamily: FONTFAMILY.bold,
    textAlign: 'center',
  },
  bottomSheetUserItem: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
  bottomSheetUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: _COLORS.Kodie_ExtraLightGrayColor,
  },
  bottomSheetUserIcon: {
    marginRight: 10,
  },
  bottomSheetUserInfo: {
    fontSize: 18,
    color: 'black',
  },
  bottomSheetUserEmail: {
    fontSize: 14,
    color: _COLORS.Kodie_BlackColor,
  },
});
