import React, { useEffect } from "react";
import { Text, Image, ImageBackground, SafeAreaView, View } from "react-native";
// Screen no:1
import { logos } from "../../Themes/CommonVectors/Images";
import { SplashStyles } from "../../screens/SplashScreen/SplashScreenCss";
import { useSelector } from "react-redux";
const Splash = (props) => {
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
      props.navigation.navigate("LoginScreen");
    }, 3000);
  });

  return (
    <SafeAreaView style={SplashStyles.mainView}>
      <ImageBackground
        source={logos.KodieSplash}
        resizeMode="cover"
        style={SplashStyles.mainIcon}
      >
        <Image
          source={logos.MainLogoWhite}
          style={SplashStyles.mainSmallIcon}
        />
        <View style={{ top: 150 }}>
          <Text style={SplashStyles.text}>Welcome to Kodie!</Text>
          <Text style={SplashStyles.subtext}>
            Foster strong relationships with transparent, simple, hassle free
            property management.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;
