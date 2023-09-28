import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  ScrollView,
} from "react-native";
import { FONTFAMILY, IMAGES, _COLORS } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";

const CustomSidebarMenu = (props) => {
  const check = (data) => {
    switch (data) {
      case "PropertyLinking":
        setselectedId("Dashboard");
        props.navigation.navigate("LoginDashboard");
        break;
      case "Quiz":
        setselectedId("Quiz");
        props.navigation.navigate("Quiz");
        break;
      case "Courses":
        setselectedId("Courses");
        props.navigation.navigate("Courses");
        break;
      case "My Quiz":
        setselectedId("My Quiz");
        props.navigation.navigate("MyQuiz");
        break;
      case "My Courses":
        setselectedId("My Courses");
        props.navigation.navigate("MyCourses");
        break;
      case "Quizzes History":
        setselectedId("Quizzes History");
        props.navigation.navigate("QuizAttemptHistory");
        break;
      case "Contact us":
        setselectedId("Contact us");
        props.navigation.navigate("Contact");
        break;
      case "About us":
        setselectedId("About us");
        props.navigation.navigate("Aboutus");
        // Linking.openURL("https://advisecubeconsulting.com/about-us")
        break;
      case "Privacy Policy":
        setselectedId("Privacy Policy");
        props.navigation.navigate("Privacy");
        break;
      case "Home":
        setselectedId("Home");
        props.navigation.navigate("BottomNav");
        break;
      case "FAQ":
        setselectedId("FAQ");
        props.navigation.navigate("FAQScreen");
        break;

      default:
        setselectedId("Dashboard");
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginHorizontal: 20, marginVertical: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTFAMILY.K_Bold,
            color: _COLORS.Kodie_BlackColor,
          }}
        >
          {"Properties"}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Image
            source={IMAGES.PropertyListing}
            style={{ height: 40, width: 40, alignSelf: "center" }}
            resizeMode={"center"}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.K_Bold,
              color: _COLORS.Kodie_BlackColor,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          >
            {"Property listings"}
          </Text>
        </View>
        <DividerIcon marginBottom={0} marginTop={5} />
        <View style={{ flexDirection: "row" }}>
          <Image
            source={IMAGES.RentalOffers}
            style={{ height: 40, width: 40, alignSelf: "center" }}
            resizeMode={"center"}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.K_Bold,
              color: _COLORS.Kodie_BlackColor,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          >
            {"Rental offers"}
          </Text>
        </View>
        <DividerIcon marginBottom={0} marginTop={5} />

        <View style={{ flexDirection: "row" }}>
          <Image
            source={IMAGES.vacantProperties}
            style={{ height: 40, width: 40, alignSelf: "center" }}
            resizeMode={"center"}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.K_Bold,
              color: _COLORS.Kodie_BlackColor,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          >
            {"Vacant properties"}
          </Text>
        </View>
        <DividerIcon marginBottom={0} marginTop={5} />

        <View style={{ flexDirection: "row" }}>
          <Image
            source={IMAGES.Inspections}
            style={{ height: 40, width: 40, alignSelf: "center" }}
            resizeMode={"center"}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.K_Bold,
              color: _COLORS.Kodie_BlackColor,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          >
            {"Inspections"}
          </Text>
        </View>
        <DividerIcon marginBottom={0} marginTop={5} />

        <View style={{ flexDirection: "row" }}>
          <Image
            source={IMAGES.Tenants}
            style={{ height: 40, width: 40, alignSelf: "center" }}
            resizeMode={"center"}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTFAMILY.K_Bold,
              color: _COLORS.Kodie_BlackColor,
              alignSelf: "center",
              marginHorizontal: 10,
            }}
          >
            {"Tenants"}
          </Text>
        </View>
        <DividerIcon marginBottom={0} marginTop={5} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CustomSidebarMenu;
