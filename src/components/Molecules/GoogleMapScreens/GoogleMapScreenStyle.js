import {StyleSheet} from 'react-native';
import { _COLORS } from '../../../Themes';
export const GoogleMapScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
      },
      mapScreen: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 10,
      },
      searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '96%',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: '#E5E4E2',
        marginTop: 10,
        position: 'absolute',
      },
      searchInput: {
        backgroundColor: 'transparent',
        width: '90%',
        height: 45,
        alignSelf: 'center',
      },
      btnContainer: {
        backgroundColor:_COLORS.Kodie_lightGreenColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingVertical: 3,
        borderRadius: 10,
      
       // borderWidth: 1,
        width: '30%',
        height:55,
        bottom: 0,
        right:20,
        marginBottom: 20,
        position: 'absolute',
        //borderColor: Colors.appColor,
      },
      icon: {
        height: 25,
        width: 25,
      },
});
