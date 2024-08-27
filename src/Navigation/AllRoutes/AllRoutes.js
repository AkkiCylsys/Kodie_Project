import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {_COLORS} from '../../Themes/CommonColors/CommonColor';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import LoginScreen from './../../screens/Authentication/LoginScreen/Login';
import UserType from './../../screens/Authentication/UserType/UserType';
import ContractorSignUpSecondScreen from '../../screens/Authentication/ContractorSignUp/ContractorSignUpSecondScreen';
import ContractorSignUpThirdScreen from '../../screens/Authentication/ContractorSignUp/ContractorSignUpThirdScreen';
import ContractorSignUpFirstScreen from '../../screens/Authentication/ContractorSignUp/ContractorSignUpFirstScreen';
import ContractorSignUpFinalScreen from '../../screens/Authentication/ContractorSignUp/ContractorSignUpFinalScreen';
import TenantSignup from '../../screens/Authentication/TenantSignup/TenantSignupScreen';
import CreateJobFirstScreen from '../../screens/CreateJob/CreateJobFirstScreen';
import CreateJobSecondScreen from '../../screens/CreateJob/CreateJobSecondScreen';
import Contractorlist from '../../screens/Contractor/ContractorList/Contractorlist';
import HireContractor from '../../screens/Contractor/HireContractor/HireContractor';
import JobCompletion from '../../screens/Contractor/JobCompletion/JobCompletion';
import ContractorProfile from '../../screens/Contractor/ContractorProfile/ContractorProfile';
import DocumentList from '../../screens/DocumentList/DocumentList';
import RejectConfirm from '../../screens/Landlord/RejectConfirm/RejectConfirm';
import ProspectsTenant from '../../screens/TenantManagement/ProspectsTenant/ProspectsTenant';
import Notice from '../../screens/NotiesList/Notice';
import Properties from '../../screens/Landlord/PropertyList/Properties';
import Jobs from '../../screens/Tenant/Jobs/Jobs';
import Dashboard from '../../screens/Dashboard/Dashboard';
import LandlordProfile from '../../screens/Landlord/Landlordprofile/LandlordProfile';
import {IMAGES, LABEL_STYLES} from '../../Themes';
import {fontFamily} from '../../Themes/FontStyle/FontStyle';
import Help_FeedBack from '../../screens/Landlord/Help&FeedBack/Help_FeedBack';
import Language from '../../screens/Landlord/Language/Language';
import SignUp from '../../screens/Authentication/SignUpScreen/SignUp';
import SignUpVerification from '../../screens/Authentication/SignUpScreen/SignUpVerification';
import Location from '../../screens/Authentication/SignUpScreen/Location';
import AboutYou from '../../screens/Authentication/SignUpScreen/AboutYou/AboutYou';
import CreateJobTermsScreen from '../../screens/CreateJob/CreateJobTermsScreen/CreateJobTermsScreen';
import ConfirmJobCompletion from '../../screens/CreateJob/ConfirmJobCompletion/ConfirmJobCompletion';
import Account from '../../screens/Authentication/SignUpScreen/Account/Account';
import FirstProperty from '../../screens/Authentication/SignUpScreen/FirstProperty/FirstProperty';
import PropertyDetails from '../../screens/Landlord/AddNewProperty/PropertyDetails/PropertyDetails';
import PropertyFeature from '../../screens/Landlord/AddNewProperty/PropertyFeature/PropertyFeature';
import PropertyImages from '../../screens/Landlord/AddNewProperty/PropertyImages/PropertyImages';
import PropertyReview from '../../screens/Landlord/AddNewProperty/PropertyReview/PropertyReview';
import PropertyExpenses from '../../screens/Landlord/AddNewProperty/PropertyReview/Expenses/PropertyExpenses/PropertyExpenses';
import HelpOrFeedback from '../../screens/Setting/Help & Feedback/HelpOrFeedback';
import Contactus from '../../screens/Setting/ContactUs/Contactus';
import AppInfo from '../../screens/Setting/AppInfo/AppInfo';
import ChangeContactInput from '../../screens/Setting/ChangeContactDetails/ChangeContactInput/ChangeContactInput';
import ChangeContactNotify from '../../screens/Setting/ChangeContactDetails/ChangeContactNotify/ChangeContactNotify';
import DeleteAccount from '../../screens/Setting/DeleteAccount/DeleteAccount';
import SearchResult from '../../screens/Landlord/PropertyList/SearchForRentals/SearchResult';
import ViewPropertyDetails from '../../screens/Landlord/PropertyList/SearchForRentals/ViewPropertyDetails';
import Invitefriend from './../../screens/InviteFriend/Invitefriend';
import SubmitApplication from '../../screens/Landlord/PropertyList/SearchForRentals/SubmitApplication';
import SearchUser from '../../screens/Authentication/BlockUser/SearchUser';
import AccountSetting from './../../screens/Setting/Account/AccountSetting';
import ManageSubscription from './../../screens/Subscription/ManageSubscription/ManageSubscription';
import BlockedUser from './../../screens/Authentication/BlockUser/BlockedUser';
import CustomSidebarMenu from './../CustomeDrawer/CustomSidebarMenu';
import AddTenantDetails from '../../screens/Landlord/AddNewProperty/PropertyReview/Leases/TenantDetails/AddTenantDetails/AddTenantDetails';
import SocialMedia from './../../screens/Setting/SocielMedia/SocialMedia';
import PropertyInspection from '../../screens/Inspection/PropertyInspection/PropertyInspection';
import CreateNewInspection from '../../screens/Inspection/NewInspections/CreateNewInspection';
import NewInspection from '../../screens/Inspection/NewInspections/NewInspection';
import Bedroom from '../../screens/Inspection/PropertyInspection/Inspection/Bedroom/Bedroom';
import EditProfile from '../../screens/Profile/EditProfile/EditProfile';
import Notifications from '../../screens/Notifications/Notifications';
import AddNewNotice from '../../screens/NotiesList/AddNewNotice/AddNewNotice';
import AccountStep from '../../screens/Authentication/SignUpScreen/OrganisationProfile/AccountStep';
import Billinginformation from '../../screens/CreateJob/JobCompletion/Billinginformation';
import GeneralSettings from '../../screens/Landlord/Landlordprofile/GeneralSettings/GeneralSettings';
import GeneralSetting from '../../screens/Setting/Account/GeneralSetting';
import ContractorDashboard from '../../screens/Dashboard/ContractorDashboard';
import LinkedDevice from '../../screens/Authentication/LinkedDevice/LinkedDevice';
import TwoStepVerification from '../../screens/Authentication/LinkedDevice/TwoStepVerification';
import Chats from '../../screens/ChatsScreens/Chats';
import JobDetails from '../../screens/Tenant/Jobs/JobDetails/JobDetails';
import StorageSettings from '../../screens/Authentication/StorageSettings/StorageSettings';
import PaymentMethod from '../../screens/PaymentMethod/PaymentMethod';
import ScheduleMeeting from '../../screens/ChatsScreens/ScheduleMeeting/ScheduleMeeting';
import SignUpSteps from '../../screens/Authentication/SignUpScreen/SignUpSteps/SignUpSteps';
import Notices from '../../screens/NotiesList/Notices/Notices';
import Reports from '../../screens/Reports/Reports';
import GenerateReport from '../../screens/Reports/GenerateReport/GenerateReport';
import PropertyListings from '../../screens/PropertyListings/PropertyListings';
import VacantPropertiesList from '../../screens/VacantProperties/VacantPropertiesList';
import PrivacySecurity from '../../screens/Authentication/PrivacyAndSecurity/PrivacySecurity';
import Managingcontractors from '../../screens/Managingcontractors/Managingcontractors';
import Contractors1 from '../../screens/Managingcontractors/Contractors1';
import Contractors2 from '../../screens/Managingcontractors/Contractors2';
import Contractors3 from '../../screens/Managingcontractors/Contractors3';
import Reviewjobdetails1 from '../../screens/CreateJob/ReviewJobDetails/Reviewjobdetails1';
import Reviewjobdetails2 from '../../screens/CreateJob/ReviewJobDetails/Reviewjobdetails2';
import Reviewjobdetails3 from '../../screens/CreateJob/ReviewJobDetails/Reviewjobdetails3';
import CompletedJobs from '../../screens/CreateJob/ReviewJobDetails/CompletedJobs';
import Ratingandfeedback from '../../screens/CreateJob/ReviewJobDetails/Ratingandfeedback';
import EditDashboard from '../../screens/Dashboard/EditDashboard';
import AddPropertyMainPage from '../../screens/Landlord/AddNewProperty/AddPropertyMainPage';
import SearchPlaces from '../../components/Molecules/SearchPlaces/SearchPlaces';
import DocumentDetails from '../../screens/Landlord/AddNewProperty/PropertyReview/Documents/DocumentDetails/DocumentDetails';
import ViewDocument from '../../screens/Landlord/AddNewProperty/PropertyReview/Documents/ViewDocuments/ViewDocument';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BiddingDetails from '../../screens/Tenant/Jobs/JobDetails/BiddingDetails/Biddingdetails';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PreScreening from '../../screens/Tenant/PreScreening/PreScreening';
import AddJobDetails from '../../screens/Tenant/Jobs/AddJobDetails';
import TenantList from '../../screens/Tenant/TenantList';
import CurrentTenant from '../../screens/Tenant/CurrentTenant/CurrentTenant';
import PreviousTenant from '../../screens/Tenant/PreviousTenant/PreviousTenant';
import JodBiddingDetails from '../../screens/CreateJob/ReviewJobDetails/JobBiddingDetails/JodBiddingDetails';
import JobDocumentDetails from '../../screens/Tenant/Jobs/JobDocuments.js/JobDocumentDetails';
import CompanyDetails from '../../screens/Landlord/Landlordprofile/CompanyDetails/CompanyDetails';
import AddContractorDetails from '../../screens/Managingcontractors/AddContractorDetails/AddContractorDetails';
import ProfileDocumentDetails from '../../screens/Profile/ProfileDocumentDetails/ProfileDocumentDetails';
import SearchDetail from '../../screens/Tenant/Jobs/SearchforContractor/SearchDetail';
import SearchJobResult from '../../screens/Tenant/Jobs/SearchforJob/SearchJobResult';
import BidforJob from '../../screens/Tenant/Jobs/BidforJob/BidforJob';
//import PaymentScreen from '../../screens/PaymentMethod/PaymentScreen';
import ApplePay from '../../screens/PaymentMethod/ApplePay/ApplePay';
import CreditCard from '../../screens/PaymentMethod/CreditCard/CreditCard';
//import SubscriptionScreen from '../../screens/Subscription/SubscriptionScreen';
import Chat from '../../screens/ChatsScreens/Chat';
import CompanyInProfile from '../../screens/Landlord/Landlordprofile/CompanyDetails/Company/CompanyInProfile';
import IndividualInProfile from '../../screens/Landlord/Landlordprofile/CompanyDetails/Individual/IndividualInProfile';
import IndividualSignup from '../../screens/Authentication/SignUpScreen/AboutYou/IndividualSignup/IndividualSignup';
import CompanySignup from '../../screens/Authentication/SignUpScreen/AboutYou/CompanySignup/CompanySignup';
import Partners from '../../screens/Partners/Partners';
import PropertyReviewDetails from '../../screens/Landlord/AddNewProperty/PropertyReview/PropertyReviewDetails';
import JobReviewDetails from '../../screens/Tenant/Jobs/JobDetails/JobReviewDetails';
// import {withIAPContext} from 'react-native-iap';
// import {Subscriptions} from '../../screens/Subscription/Subscription';
import MarketplacePropertyListing from '../../MarketplacePropertyListing/MarketplacePropertyListing';
import ViewRentalDetails from '../../screens/Landlord/PropertyList/SearchForRentals/ViewRentalDetails';
import RentalOffer from '../../screens/Landlord/PropertyList/SearchForRentals/RentalOffer/RentalOffer';
import AddNotices from '../../screens/NotiesList/AddNewNotice/AddNotices';
import PropertyRentalOffer from '../../screens/Landlord/PropertyList/PropertyRentalOffer/PropertyRentalOffer';
import PropertyViewApplication from '../../screens/Landlord/PropertyList/PropertyRentalOffer/PropertyViewApplication/PropertyViewApplication';
import MultipleDropDwonDummy from '../../screens/MultipleDropDwonDummy';
import CreateGroup from '../../screens/ChatsScreens/CreateGroup';
import GroupChat from '../../screens/ChatsScreens/GroupChat';
import TenantScreening from '../../screens/TenantManagement/TenantScreening/TenantScreening';
import PreScreeningQuestinnaire from '../../screens/TenantManagement/TenantScreening/PreScreeningQuestionnaire/PreScreeningQuestinnaire';
import TenantProfile from '../../screens/TenantManagement/TenantScreening/TenantProfile/TenantProfile';
import ManagingTenantsScreen from '../../screens/TenantManagement/ManagingTenantsScreen/ManagingTenantsScreen';
import TenantDocuments from '../../screens/TenantManagement/ManagingTenantsScreen/TenantDocuments/TenantDocuments';
const Tab = createBottomTabNavigator();
const BottomNav = props => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        gestureEnabled: false,
        tabBarStyle: {
          backgroundColor: _COLORS.Kodie_WhiteColor,
          height: Platform.OS == 'android' ? 65 : 80,
          flexDirection: 'row',
          paddingHorizontal: 10,
          width: '100%',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIconStyle: {flex: 1},
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
              }}>
              <MaterialIcons
                name="bar-chart"
                size={30}
                resizeMode={'contain'}
                color={
                  focused
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_MediumGrayColor
                }
              />

              <Text
                style={[
                  {
                    fontSize: 10,
                    fontFamily: fontFamily.K_Medium,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_MediumGrayColor,
                  },
                ]}>
                {'Dashboard'}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Properties"
        component={Properties}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: {flex: 1},
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
              }}>
              <MaterialCommunityIcons
                name="home-city-outline"
                size={30}
                resizeMode={'contain'}
                color={
                  focused
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_MediumGrayColor
                }
              />
              <Text
                style={[
                  {
                    fontSize: 10,
                    fontFamily: fontFamily.K_Medium,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_MediumGrayColor,
                  },
                ]}>
                {'Properties'}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIconStyle: {flex: 1},
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
              }}>
              <MaterialCommunityIcons
                name="hammer-wrench"
                size={30}
                resizeMode={'contain'}
                color={
                  focused
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_MediumGrayColor
                }
              />
              <Text
                style={[
                  {
                    fontSize: 10,
                    fontFamily: fontFamily.K_Medium,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_MediumGrayColor,
                  },
                ]}>
                {'Jobs'}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UserType"
        // component={UserType}
        component={Chats}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          // tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
              }}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={28}
                resizeMode={'contain'}
                color={
                  focused
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_MediumGrayColor
                }
              />
              <Text
                style={[
                  {
                    fontSize: 10,
                    fontFamily: fontFamily.K_Medium,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_MediumGrayColor,
                  },
                ]}>
                {'Chat'}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="LandlordProfile"
        component={LandlordProfile}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          // tabBarIconStyle: { flex: 1 },
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'transparent',
                width: '100%',
              }}>
              <Ionicons
                name={'settings-outline'}
                size={28}
                color={
                  focused
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_MediumGrayColor
                }
              />
              <Text
                style={[
                  {
                    fontSize: 10,
                    fontFamily: fontFamily.K_Medium,
                    color: focused
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_MediumGrayColor,
                  },
                ]}>
                {'Settings'}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigatorLeftMenu = props => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerStyle={{
        backgroundColor: _COLORS.Kodie_WhiteColor,
        width: '40%',
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="BottomNav"
        component={BottomNav}
        options={{
          title: 'Dashboard',
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="ContractorSignUpThirdScreen"
        component={ContractorSignUpThirdScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
const AuthStack = createNativeStackNavigator();
const AuthStackRouts = props => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'LoginVerify'}>
      <Stack.Screen
        name={'LoginScreen'}
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();
const AllStackRouts = props => {
  const [routeName, setRouteName] = useState();
  return (
    <NavigationContainer
      ref={navigationRef}
      // onStateChange={async () => {
      //   const previousRouteName = routeName;
      //   const currentRouteName = navigationRef.getCurrentRoute().name;
      //   // console.log('previousRouteName...............', previousRouteName);
      //   // console.log('currentRouteName...............', currentRouteName);
      //   setRouteName(currentRouteName);
      // }}
      // onReady={() => {
      //   // isReadyRef.current = true;
      //   setRouteName(navigationRef.getCurrentRoute().name);
      // }}
    >
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'SplashScreen'}>
        <Stack.Screen
          name={'SplashScreen'}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'AuthStackRouts'}
          component={AuthStackRouts}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'BottomNav'}
          component={BottomNav}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'DrawerNavigatorLeftMenu'}
          component={DrawerNavigatorLeftMenu}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'LoginScreen'}
          component={LoginScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'UserTypeScreen'}
          component={UserType}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ContractorSignUpSecondScreen'}
          component={ContractorSignUpSecondScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ContractorSignUpThirdScreen'}
          component={ContractorSignUpThirdScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ContractorSignUpFirstScreen'}
          component={ContractorSignUpFirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ContractorSignUpFinalScreen'}
          component={ContractorSignUpFinalScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name={'TenantSignupScreen'}
          component={TenantSignup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CreateJobFirstScreen'}
          component={CreateJobFirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CreateJobSecondScreen'}
          component={CreateJobSecondScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Contractorlist'}
          component={Contractorlist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ContractorProfile'}
          component={ContractorProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'HireContractor'}
          component={HireContractor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'JobCompletion'}
          component={JobCompletion}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'DocumentList'}
          component={DocumentList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'RejectConfirm'}
          component={RejectConfirm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ProspectsTenant'}
          component={ProspectsTenant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Notice'}
          component={Notice}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Properties'}
          component={Properties}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Jobs'}
          component={Jobs}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Help_FeedBack'}
          component={Help_FeedBack}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Language'}
          component={Language}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SignUp'}
          component={SignUp}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SignUpVerification'}
          component={SignUpVerification}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Location'}
          component={Location}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'AboutYou'}
          component={AboutYou}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'IndividualSignup'}
          component={IndividualSignup}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'CompanySignup'}
          component={CompanySignup}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'CreateJobTermsScreen'}
          component={CreateJobTermsScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ConfirmJobCompletion'}
          component={ConfirmJobCompletion}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SignUpSteps'}
          component={SignUpSteps}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'FirstProperty'}
          component={FirstProperty}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'AddPropertyMainPage'}
          component={AddPropertyMainPage}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyFeature'}
          component={PropertyFeature}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyImages'}
          component={PropertyImages}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyReview'}
          component={PropertyReview}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'SearchResult'}
          component={SearchResult}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ViewPropertyDetails'}
          component={ViewPropertyDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyDetails'}
          component={PropertyDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SubmitApplication'}
          component={SubmitApplication}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'AddTenantDetails'}
          component={AddTenantDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Invitefriend'}
          component={Invitefriend}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'HelpOrFeedback'}
          component={HelpOrFeedback}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'Contactus'}
          component={Contactus}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'AppInfo'}
          component={AppInfo}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'ChangeContactInput'}
          component={ChangeContactInput}
        />

        <Stack.Screen
          name={'NewInspection'}
          component={NewInspection}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyExpenses'}
          component={PropertyExpenses}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SocialMedia'}
          component={SocialMedia}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'SearchUser'}
          component={SearchUser}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'AccountSetting'}
          component={AccountSetting}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ManageSubscription'}
          component={ManageSubscription}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'BlockedUser'}
          component={BlockedUser}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyInspection'}
          component={PropertyInspection}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'CreateNewInspection'}
          component={CreateNewInspection}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Bedroom'}
          component={Bedroom}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'ChangeContactNotify'}
          component={ChangeContactNotify}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'DeleteAccount'}
          component={DeleteAccount}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'EditProfile'}
          component={EditProfile}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'Notifications'}
          component={Notifications}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'AddNewNotice'}
          component={AddNewNotice}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'AccountStep'}
          component={AccountStep}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'Billinginformation'}
          component={Billinginformation}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'GeneralSettings'}
          component={GeneralSettings}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'GeneralSetting'}
          component={GeneralSetting}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Chats'}
          component={Chats}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Chat'}
          component={Chat}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'ScheduleMeeting'}
          component={ScheduleMeeting}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'JobDetails'}
          component={JobDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'StorageSettings'}
          component={StorageSettings}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'PaymentMethod'}
          component={PaymentMethod}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'Notices'}
          component={Notices}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'Reports'}
          component={Reports}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'GenerateReport'}
          component={GenerateReport}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'PropertyListings'}
          component={PropertyListings}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'VacantPropertiesList'}
          component={VacantPropertiesList}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'TwoStepVerification'}
          component={TwoStepVerification}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PrivacySecurity'}
          component={PrivacySecurity}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Managingcontractors'}
          component={Managingcontractors}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Contractors1'}
          component={Contractors1}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Contractors2'}
          component={Contractors2}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Contractors3'}
          component={Contractors3}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Reviewjobdetails1'}
          component={Reviewjobdetails1}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Reviewjobdetails2'}
          component={Reviewjobdetails2}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Reviewjobdetails3'}
          component={Reviewjobdetails3}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'CompletedJobs'}
          component={CompletedJobs}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Ratingandfeedback'}
          component={Ratingandfeedback}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'EditDashboard'}
          component={EditDashboard}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'Account'}
          component={Account}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ContractorDashboard'}
          component={ContractorDashboard}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'LinkedDevice'}
          component={LinkedDevice}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SearchPlaces'}
          component={SearchPlaces}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'DocumentDetails'}
          component={DocumentDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'JobDocumentDetails'}
          component={JobDocumentDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ViewDocument'}
          component={ViewDocument}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PreScreening'}
          component={PreScreening}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'TenantList'}
          component={TenantList}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'CurrentTenant'}
          component={CurrentTenant}
          options={{headerShown: false, gestureEnabled: false}}
        />

        <Stack.Screen
          name={'PreviousTenant'}
          component={PreviousTenant}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'JodBiddingDetails'}
          component={JodBiddingDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'BiddingDetails'}
          component={BiddingDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'CompanyDetails'}
          component={CompanyDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'CompanyInProfile'}
          component={CompanyInProfile}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'IndividualInProfile'}
          component={IndividualInProfile}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'AddContractorDetails'}
          component={AddContractorDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ProfileDocumentDetails'}
          component={ProfileDocumentDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SearchDetail'}
          component={SearchDetail}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'SearchJobResult'}
          component={SearchJobResult}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'BidforJob'}
          component={BidforJob}
          options={{headerShown: false, gestureEnabled: false}}
        />
        {/* <Stack.Screen
          name={'PaymentScreen'}
          component={PaymentScreen}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name={'CreditCard'}
          component={CreditCard}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'ApplePay'}
          component={ApplePay}
          options={{headerShown: false, gestureEnabled: false}}
        />
        {/* <Stack.Screen
          name={'SubscriptionScreen'}
          component={SubscriptionScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={'Partners'}
          component={Partners}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'PropertyReviewDetails'}
          component={PropertyReviewDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name={'JobReviewDetails'}
          component={JobReviewDetails}
          options={{headerShown: false, gestureEnabled: false}}
        />
        {/* <Stack.Screen
          name={'Subscriptions'}
          component={withIAPContext(Subscriptions)}
          options={{headerShown: false, gestureEnabled: false}}
        /> */}
        <Stack.Screen
          name={'MarketplacePropertyListing'}
          component={MarketplacePropertyListing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ViewRentalDetails'}
          component={ViewRentalDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'RentalOffer'}
          component={RentalOffer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'AddNotices'}
          component={AddNotices}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'PropertyRentalOffer'}
          component={PropertyRentalOffer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'PropertyViewApplication'}
          component={PropertyViewApplication}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'MultipleDropDwonDummy'}
          component={MultipleDropDwonDummy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'CreateGroup'}
          component={CreateGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'GroupChat'}
          component={GroupChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'TenantScreening'}
          component={TenantScreening}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'PreScreeningQuestinnaire'}
          component={PreScreeningQuestinnaire}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'TenantProfile'}
          component={TenantProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'ManagingTenantsScreen'}
          component={ManagingTenantsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'TenantDocuments'}
          component={TenantDocuments}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});
export default AllStackRouts;
