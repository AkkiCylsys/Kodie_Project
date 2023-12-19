import React, { useEffect } from "react";
import {
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  View,
  StatusBar,
} from "react-native";
// Screen no:1
import { logos } from "../../Themes/CommonVectors/Images";
import { SplashStyles } from "../../screens/SplashScreen/SplashScreenCss";
import { useSelector } from "react-redux";

const Splash = (props) => {
  const loginData = useSelector((state) => state.authenticationReducer.data);

  useEffect(() => {
    setTimeout(() => {
      if (
        loginData?.Login_details?.token == "" ||
        loginData?.Login_details?.token == undefined
      ) {
        props.navigation.navigate("LoginScreen");
      } else {
        props.navigation.navigate("DrawerNavigatorLeftMenu");
      }
    }, 3000);
  }, [loginData, props.navigation]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={logos.KodieSplash}
          resizeMode="cover"
          style={SplashStyles.mainIcon}
        >
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
              Foster strong relationships with transparent, simple, hassle-free
              property management.
            </Text>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default Splash;
