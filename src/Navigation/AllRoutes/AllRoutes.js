import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

// import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import MacIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MtIcon from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  bgGradientColor,
  headerGradientColor,
  colors,
} from "../../Themes/CommonColors/CommonColor";
import { CommonStyles } from "../../Themes/CommonStyles/CommonStyles";

import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomeDrawer from "../CustomeDrawer/CustomeDrawer";

import SplashScreen from "../../screens/SplashScreen/SplashScreen";
import Login from "./../../screens/Authentication/LoginScreen/Login";
import UserType from "./../../screens/Authentication/UserType/UserType";
import ContractorSignUpSecondScreen from "../../screens/Authentication/ContractorSignUp/ContractorSignUpSecondScreen";
import ContractorSignUpThirdScreen from "../../screens/Authentication/ContractorSignUp/ContractorSignUpThirdScreen";
import ContractorSignUpFirstScreen from "../../screens/Authentication/ContractorSignUp/ContractorSignUpFirstScreen";
import ContractorSignUpFinalScreen from "../../screens/Authentication/ContractorSignUp/ContractorSignUpFinalScreen";
import TenantSignup from "../../screens/Authentication/TenantSignup/TenantSignupScreen";
import CreateJobFirstScreen from "../../screens/CreateJob/CreateJobFirstScreen";
import CreateJobSecondScreen from "../../screens/CreateJob/CreateJobSecondScreen";
import Contractorlist from "../../screens/Contractor/Contractorlist";
import HireContractor from "../../screens/Contractor/HireContractor/HireContractor";
import JobCompletion from "../../screens/Contractor/JobCompletion/JobCompletion";
import ContractorProfile from "../../screens/Contractor/ContractorProfile";
const Tab = createBottomTabNavigator();
const BottomNav = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      // activeColor="#f0edf6"
      // inactiveColor="#3e2465"
      // barStyle={{backgroundColor: colors?.navyBlue}}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
        },
        tabBarBackground: () => (
          <LinearGradient colors={headerGradientColor} style={{ flex: 1 }} />
        ),
      }}
    >
      <Tab.Screen
        name="GeoTaggingAttendance"
        component={GeoTaggingAttendance}
        // name="MarkAttendance"
        // component={MarkAttendance}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Octicons
                name={"apps"}
                size={focused ? 30 : 25}
                color={focused ? colors?.fullWhite : colors?.chalkWhite}
              />
              <Text
                style={[
                  CommonStyles?.commText,
                  { color: focused ? colors?.fullWhite : colors?.chalkWhite },
                ]}
              >
                {"Attendance"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProjectScreen"
        component={ProjectScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MacIcon
                name={"clipboard-check-multiple"}
                size={focused ? 30 : 25}
                color={focused ? colors?.fullWhite : colors?.chalkWhite}
              />
              <Text
                style={[
                  CommonStyles?.commText,
                  { color: focused ? colors?.fullWhite : colors?.chalkWhite },
                ]}
              >
                {"Project"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarOnPress: () => {},
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MacIcon
                name={"home-outline"}
                size={focused ? 50 : 35}
                color={focused ? colors?.fullWhite : colors?.chalkWhite}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="HRMSScreen"
        component={HRMSScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name={"checkmark-done-circle-outline"}
                size={focused ? 30 : 25}
                color={focused ? colors?.fullWhite : colors?.chalkWhite}
              />
              <Text
                style={[
                  CommonStyles?.commText,
                  { color: focused ? colors?.fullWhite : colors?.chalkWhite },
                ]}
              >
                {"HRMS"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TimeSheetScreen"
        component={TimeSheetScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MtIcon
                name={"date-range"}
                size={focused ? 30 : 25}
                color={focused ? colors?.fullWhite : colors?.chalkWhite}
              />
              <Text
                style={[
                  CommonStyles?.commText,
                  { color: focused ? colors?.fullWhite : colors?.chalkWhite },
                ]}
              >
                {"Timesheet"}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigation = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomeDrawer {...props} />}
      drawerStyle={{
        backgroundColor: colors.white,
        width: "70%",
      }}
      initialRouteName="BottomNav"
    >
      <Drawer.Screen
        name="BottomNav"
        component={BottomNav}
        // initialParams={{screen:'BottomNav'}}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="LeaveTracker"
        component={LeaveTracker}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

const AuthStack = createNativeStackNavigator();
const AuthStackRouts = (props) => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"LoginVerify"}
    >
      <Stack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();
const AllStackRouts = (props) => {
  const [routeName, setRouteName] = useState();
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = navigationRef.getCurrentRoute().name;
        // console.log('previousRouteName...............', previousRouteName);
        // console.log('currentRouteName...............', currentRouteName);
        setRouteName(currentRouteName);
      }}
      onReady={() => {
        // isReadyRef.current = true;
        setRouteName(navigationRef.getCurrentRoute().name);
      }}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={"SplashScreen"}
      >
        <Stack.Screen
          name={"SplashScreen"}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"AuthStackRouts"}
          component={AuthStackRouts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"BottomNav"}
          component={BottomNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"DrawerNavigation"}
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"LoginScreen"}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"UserTypeScreen"}
          component={UserType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ContractorSignUpSecondScreen"}
          component={ContractorSignUpSecondScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ContractorSignUpThirdScreen"}
          component={ContractorSignUpThirdScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ContractorSignUpFirstScreen"}
          component={ContractorSignUpFirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ContractorSignUpFinalScreen"}
          component={ContractorSignUpFinalScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={"TenantSignupScreen"}
          component={TenantSignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"CreateJobFirstScreen"}
          component={CreateJobFirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"CreateJobSecondScreen"}
          component={CreateJobSecondScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Contractorlist"}
          component={Contractorlist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"ContractorProfile"}
          component={ContractorProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"HireContractor"}
          component={HireContractor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"JobCompletion"}
          component={JobCompletion}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});
export default AllStackRouts;
