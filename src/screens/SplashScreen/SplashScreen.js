import React, { useEffect } from 'react';
import { Image, SafeAreaView } from 'react-native';

import { logos } from '../../Themes/CommonVectors/Images';
import { SplashStyles } from "../../screens/SplashScreen/SplashScreenCss"
import { useSelector } from 'react-redux';
const Splash = props => {
  const loginData = useSelector((state) => state.authenticationReducer.data);

  useEffect(() => {
    // setTimeout(() => {
    //   if (loginData?.data?.message?.iUserId == '' || loginData?.data?.message?.iUserId == undefined) {
    //     props.navigation.navigate('AuthNavigator');
    //   }
    //   else {
    //     props.navigation.navigate('DrawerStack');
    //   }
    // }, 3000);
    setTimeout(() => {
      props.navigation.navigate('LoginScreen');

    }, 3000);

  });

  return (
    <SafeAreaView style={SplashStyles.mainView}>
      <Image
        source={logos.mainLogo}
        style={SplashStyles.mainIcon}
      />
    </SafeAreaView>
  );
};

export default Splash;
