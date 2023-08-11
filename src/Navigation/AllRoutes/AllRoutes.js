import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

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
  _COLORS,
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
import Contractorlist from "../../screens/Contractor/ContractorList/Contractorlist";
import HireContractor from "../../screens/Contractor/HireContractor/HireContractor";
import JobCompletion from "../../screens/Contractor/JobCompletion/JobCompletion";
import ContractorProfile from "../../screens/Contractor/ContractorProfile/ContractorProfile";
import DocumentList from "../../screens/DocumentList/DocumentList";
import RejectConfirm from "../../screens/Landlord/RejectConfirm/RejectConfirm";
import InviteTenant from "../../screens/Landlord/InviteTenant/InviteTenant";
import Notice from "../../screens/NotiesList/Notice";
import PropertyList from "../../screens/Landlord/PropertyList/PropertyList";
import Dashboard from "../../screens/Dashboard/Dashboard";
import { IMAGES, LABEL_STYLES } from "../../Themes";
import { fontFamily } from "../../Themes/FontStyle/FontStyle";
const Tab = createBottomTabNavigator();
const BottomNav = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: _COLORS.Kodie_WhiteColor,
          height: 65,
        },
      }}
    >
      <Tab.Screen
        name="UserType"
        component={UserType}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              {/* <MacIcon
                name={"clipboard-check-multiple"}
                size={focused ? 30 : 25}
                color={
                  focused ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_GrayColor
                }
              /> */}
              <Image
                source={focused ? IMAGES.greenDeshboard : IMAGES.dashboard}
                style={{
                  height: 30,
                  width: 30,
                }}
              />

              <Text
                style={[
                  {
                    fontSize: 12,
                    fontFamily: fontFamily.K_Bold,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
              >
                {"Dashboard"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PropertyList"
        component={PropertyList}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              {/* <MacIcon
                name={"clipboard-check-multiple"}
                size={focused ? 30 : 25}
                color={
                  focused ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_GrayColor
                }
              /> */}
              <Image
                source={focused ? IMAGES.greenproperty : IMAGES.property}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontFamily: fontFamily.K_Bold,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
              >
                {"Properties"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="RejectConfirm"
        component={RejectConfirm}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              {/* <MacIcon
                name={"clipboard-check-multiple"}
                size={focused ? 30 : 25}
                color={
                  focused ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_GrayColor
                }
              /> */}
              <Image
                source={focused ? IMAGES.greenRepair : IMAGES.repair}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontFamily: fontFamily.K_Bold,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
              >
                {"Repair"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notice"
        component={Notice}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              {/* <MacIcon
                name={"chat-processing-outline"}
                size={focused ? 30 : 25}
                color={
                  focused ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_GrayColor
                }
              /> */}
              <Image
                source={focused ? IMAGES.greenChat : IMAGES.chat}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontFamily: fontFamily.K_Bold,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
              >
                {"Chat"}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="DocumentList"
        component={DocumentList}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MacIcon
                name={"account-outline"}
                size={30}
                color={
                  focused ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_GrayColor
                }
              />
              <Text
                style={[
                  {
                    fontSize: 12,
                    fontFamily: fontFamily.K_Bold,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_GrayColor,
                  },
                ]}
              >
                {"Profile"}
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
        <Stack.Screen
          name={"DocumentList"}
          component={DocumentList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"RejectConfirm"}
          component={RejectConfirm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"InviteTenant"}
          component={InviteTenant}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"Notice"}
          component={Notice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={"PropertyList"}
          component={PropertyList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});
export default AllStackRouts;
