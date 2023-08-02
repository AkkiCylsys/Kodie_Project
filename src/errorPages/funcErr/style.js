import {StyleSheet, Dimensions} from 'react-native';
let windowWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF6FF',
    flex: 1,
  },
  content: {
    marginTop: '40%',
  },
  yes_tick: {
    backgroundColor: '#EAF6FF',
    position: 'absolute',
    top: 50,
    right: 0,
    zIndex: 1,
    elevation: 0.1, // for android
  },
  errorLogo: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  heading: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    marginTop: -10,
  },
  message: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 7,
    width: windowWidth - windowWidth / 1.6,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  retryBtn: {
    position: 'absolute',
    bottom: 30,
    borderRadius: 28,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowColor: 'rgba(151, 173, 192, 0.34)',
    shadowOpacity: 1,
  },
  btn_text: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
  },
});
