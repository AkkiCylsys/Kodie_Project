import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, CommonActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import TopHeader from '../../../components/Molecules/Header/Header';
import { _goBack } from '../../../services/CommonServices';
import { LandlordProfileStyle } from './LandlordProfileStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { _COLORS, IMAGES } from '../../../Themes/index';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import RowTab from '../../../components/Molecules/RowTab/RowTab';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import { logoutActionCreator } from '../../../redux/Actions/Authentication/AuthenticationApiCreator';
import { Config } from '../../../Config';

const LandlordProfile = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const loginData = useSelector(state => state.authenticationReducer.data);
  const userId = loginData?.Login_details?.user_account_id;

  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const refRBSheet = useRef();

  useEffect(() => {
    if (userId && isFocused) {
      fetchAccountDetails();
    }
  }, [isFocused]);

  const fetchAccountDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${Config.BASE_URL}getAccount_details/${userId}`);
      setAccountDetails(response?.data?.data[0]);
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Warning', error?.response?.data?.message || 'Error fetching details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      dispatch(logoutActionCreator());
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        }),
      );
    }, 500);
  };

  const handleOpenSettings = (screen) => {
    Alert.alert('Alert', 'Coming soon');
    // props.navigation.navigate(screen);
  };

  const renderProfileImage = () => {
    if (accountDetails?.image_path[0]) {
      return (
        <Image
          source={{ uri: accountDetails.image_path[0] }}
          style={LandlordProfileStyle.usericon}
          resizeMode="cover"
        />
      );
    }
    return <FontAwesome name="user-circle" size={76} color={_COLORS.Kodie_GrayColor} />;
  };

  const renderRowTab = (iconLibrary, iconName, tabText, tabSubText, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <RowTab
        LeftIconLibrary={iconLibrary}
        LeftIconName={iconName}
        IsDivider={false}
        isSecondRowText={true}
        TabTaxt={tabText}
        TabSubTaxt={tabSubText}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={LandlordProfileStyle.mainContainer}>
      <TopHeader onPressLeftButton={() => navigation.goBack()} MiddleText="Profile" />
      <ScrollView>
        <TouchableOpacity
          style={LandlordProfileStyle.profilemainView}
          onPress={() => props.navigation.navigate('EditProfile')}
        >
          <View style={LandlordProfileStyle.ProfileView}>
            {renderProfileImage()}
          </View>
          <View style={LandlordProfileStyle.nameView}>
            <Text style={LandlordProfileStyle.nameText}>
              {`${accountDetails?.UAD_FIRST_NAME || ''} ${accountDetails?.UAD_LAST_NAME || ''}`}
            </Text>
            <Text style={LandlordProfileStyle.emailText} numberOfLines={1} ellipsizeMode="tail">
              {loginData?.Login_details?.email}
            </Text>
            <View style={LandlordProfileStyle.staricon}>
              <AntDesign name="star" size={15} color={_COLORS.Kodie_GrayColor} />
              <Text style={LandlordProfileStyle.ratingText}>0</Text>
              <Text style={LandlordProfileStyle.subrating}>(No rating yet)</Text>
            </View>
          </View>
          <View style={LandlordProfileStyle.contactIconView}>
            <MaterialCommunityIcons name="account-edit-outline" size={25} color={_COLORS.Kodie_GreenColor} />
          </View>
        </TouchableOpacity>

        <DividerIcon />

        <Text style={LandlordProfileStyle.AllcontactsText}>Settings</Text>
        {renderRowTab('FontAwesome5', 'user-alt', 'Account', 'Manage your account & payment settings', () => props.navigation.navigate('AccountSetting'))}
        {renderRowTab('MaterialIcons', 'subscriptions', 'Manage Subscription', 'Manage your subscription plans', () => props.navigation.navigate('ManageSubscription'))}
        {renderRowTab('MaterialCommunityIcons', 'lock', 'Privacy & Security', 'View your privacy and security settings', handleOpenSettings)}
        {renderRowTab('MaterialIcons', 'storage', 'Storage & Data', 'Manage storage and data settings', handleOpenSettings)}

        <Text style={LandlordProfileStyle.AllcontactsText}>Feedback</Text>
        {renderRowTab('Entypo', 'help-with-circle', 'Help & Feedback', 'Get help and leave feedback', () => props.navigation.navigate('Help_FeedBack'))}
        {renderRowTab('AntDesign', 'like1', 'Follow us on social media', 'Follow us for news, insights, and more!', () => props.navigation.navigate('SocialMedia'))}

        <Text style={LandlordProfileStyle.AllcontactsText}>Share</Text>
        {renderRowTab('FontAwesome5', 'user-plus', 'Tell a Friend', 'Tell your friends about Kodie', () => props.navigation.navigate('Invitefriend'))}
        {renderRowTab('MaterialIcons', 'rate-review', 'Rate Kodie', 'Rate your Kodie experience', handleOpenSettings)}
        {renderRowTab('MaterialCommunityIcons', 'logout', 'Logout', 'Logout of your Kodie profile',()=> refRBSheet.current.open())}

      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        height={150}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          draggableIcon: { backgroundColor: _COLORS.Kodie_LightGrayColor },
          container: LandlordProfileStyle.bottomModal_container,
        }}
      >
        <View style={LandlordProfileStyle.popupcantainer}>
          <Text style={LandlordProfileStyle.popuptext}>Logout from device?</Text>
          <MaterialIcons name="close" size={24} color="black" onPress={() => refRBSheet.current.close()} />
        </View>
        <View style={LandlordProfileStyle.ViewBtn}>
          <TouchableOpacity onPress={() => refRBSheet.current.close()} style={{ height: 68 }}>
            <Text style={LandlordProfileStyle.CancelBtn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={{ height: 68, alignSelf: 'center' }}>
            <Text style={LandlordProfileStyle.LogoutBtn}>Logout</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {isLoading && <CommonLoader />}
    </SafeAreaView>
  );
};

export default LandlordProfile;
