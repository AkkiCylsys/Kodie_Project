import React, { useEffect } from "react";
import { Text, Image, ImageBackground, SafeAreaView, View } from "react-native";
// Screen no:1
import { logos } from "../../Themes/CommonVectors/Images";
import { SplashStyles } from "../../screens/SplashScreen/SplashScreenCss";
import { useSelector } from "react-redux";
const Splash = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);

  useEffect(() => {
  //  alert(JSON.stringify(loginData))
    setTimeout(() => {
      if (loginData?.token == '' || loginData?.token == undefined) {
        props.navigation.navigate("LoginScreen");
      }
      else {
        props.navigation.navigate("DrawerNavigatorLeftMenu");
      }
    }, 3000);
    // setTimeout(() => {
     
    // }, 3000);
  });

  return (
    <SafeAreaView style={SplashStyles.mainView}>
      <ImageBackground
        source={logos.KodieSplash}
        resizeMode="cover"
        style={SplashStyles.mainIcon}
      >
        <View style={SplashStyles.logoContainer}>
          <Image
            source={logos.MainLogoWhite}
            style={SplashStyles.mainSmallIcon}
          />
        </View>
        <View style={SplashStyles.bottomTextContainer}>
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
