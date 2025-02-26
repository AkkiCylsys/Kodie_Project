import React, {useEffect} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  View,
  StatusBar,
} from 'react-native';
// Screen no:1
import {logos} from '../../Themes/CommonVectors/Images';
import {SplashStyles} from '../../screens/SplashScreen/SplashScreenCss';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const Splash = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);

  useEffect(() => {
    setTimeout(() => {
      StatusBar.setHidden(false);
      if (
        loginData?.Login_details?.token == '' ||
        loginData?.Login_details?.token == undefined
      ) {
        props.navigation.navigate('LoginScreen');
      } else {
        props.navigation.navigate('DrawerNavigatorLeftMenu');
      }
    }, 3000);
  }, [loginData, props.navigation]);

  return (
    <>
      <StatusBar hidden={true} />
      <View style={{flex: 1}}>
        <ImageBackground
          source={logos.KodieSplash}
          resizeMode="cover"
          style={SplashStyles.mainIcon}>
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.05)',
              'rgba(4, 4, 4, 0.9)',
              'rgba(0, 0, 0, 1)',
            ]}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
            }}>
            <View style={SplashStyles.logoContainer}>
              <Image
                source={logos.MainLogoWhite}
                style={SplashStyles.mainSmallIcon}
                resizeMode="contain"
              />
            </View>
            <View style={SplashStyles.bottomTextContainer}>
              <Text style={SplashStyles.text}>Welcome to Kodie!</Text>
              <Text style={SplashStyles.subtext}>
                Foster strong relationships with transparent, simple,
                hassle-free property management.
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </>
  );
};

export default Splash;
