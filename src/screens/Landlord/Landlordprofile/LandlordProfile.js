import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import {LandlordProfileStyle} from './LandlordProfileStyle';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_COLORS, IMAGES} from '../../../Themes/index';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import LandlordProfileData from '../../../components/Molecules/LandlordProfileData/LandlordProfileData';
import {logoutActionCreator} from '../../../redux/Actions/Authentication/AuthenticationApiCreator';
import {useDispatch, useSelector} from 'react-redux';
import RowTab from '../../../components/Molecules/RowTab/RowTab';
import {Config} from '../../../Config';
import axios from 'axios';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useIsFocused, CommonActions} from '@react-navigation/native';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
export default LandlordProfile = props => {
  const dispatch = useDispatch();
  const signUp_account_response = useSelector(
    state => state?.authenticationReducer?.data,
  );
  const isvisible = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);

  const getPersonalDetails = () => {
    setIsLoading(true);

    const url = Config.BASE_URL;

    const apiUrl =
      url + `getAccount_details/${loginData.Login_details.user_id}`;

    // Make a GET request using Axios
    axios
      .get(apiUrl)
      .then(response => {
        // Handle successful response
        console.log('API Response:', response.data.data[0][0]);
        setAccountDetails(response.data.data[0][0]);
        setIsLoading(false);
      })
      .catch(error => {
        // Handle error
        console.error('API Error:', error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (isvisible) {
      getPersonalDetails();
    }
  }, [isvisible]);
  console.log('signUp_account_response.....', signUp_account_response);
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log(
    'loginResponse.....',
    loginData?.Login_details?.profile_photo_path,
  );

  const LogOut = () => {
    dispatch(logoutActionCreator());
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {name: 'LoginScreen'}, // Replace 'Home' with the name of your initial screen
        ],
      }),
    );

    // props.navigation.navigate("DrawerNavigatorLeftMenu");
    // props.navigation.navigate('LoginScreen');
  };
  const searchprofileMenu = () => {};
  const refRBSheet = useRef();
  // Alert_____
  const handleGeneralSettingsPress = () => {
    Alert.alert('Coming soon');
  };
  const CloseUp = () => {
    refRBSheet.current.close();
    setOverlayVisible(false);
  };
  const handleClose = () => {
    refRBSheet.current.close();
  };
  return (
    <View style={LandlordProfileStyle.mainContainer}>
      <TopHeader
        // onPressLeftButton={() => _goBack(props)}
        // isprofileImage
        onPressLeftButton={() => props.navigation.navigate('Dashboard')}
        MiddleText={'Profile'}
        // RightUserProfile={{
        //   uri:
        //     loginData?.Login_details?.profile_photo_path ||
        //     signUp_account_response?.Login_details?.profile_photo_path,
        // }}
      />
      <ScrollView>
        {/* <SearchBar
          frontSearchIcon={true}
          height={48}
          marginTop={20}
          searchData={searchprofileMenu}
        /> */}

        <View style={LandlordProfileStyle.profilemainView}>
          <TouchableOpacity style={LandlordProfileStyle.ProfileView}>
            <Image
              // source={IMAGES.Landlordprofile}
              source={{
                uri: accountDetails?.image_path[0],
                // uri: loginData.Login_details?.profile_photo_path,
              }}
              style={LandlordProfileStyle.usericon}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View style={LandlordProfileStyle.nameView}>
            <Text style={LandlordProfileStyle.nameText}>
              {`${accountDetails?.UAD_FIRST_NAME} ${accountDetails?.UAD_LAST_NAME}`}
              {/* loginData.Account_details[0]?.UAD_LAST_NAME */}
            </Text>
            <Text
              style={LandlordProfileStyle.emailText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {loginData?.Login_details?.email}
            </Text>
            <View style={LandlordProfileStyle.staricon}>
              <AntDesign
                name="star"
                size={15}
                color={_COLORS.Kodie_GrayColor}
                style={LandlordProfileStyle.star}
              />
              <Text style={LandlordProfileStyle.ratingText}>{'0'}</Text>
              <Text style={LandlordProfileStyle.subrating}>
                ({'No rating yet'})
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfile')}
            style={LandlordProfileStyle.contactIconView}>
            {/* <Image
              source={IMAGES.contactDetails}
              style={LandlordProfileStyle.contactIcon}
              resizeMode="contain"
            /> */}
            <MaterialCommunityIcons
              name={'account-edit-outline'}
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        <Text style={LandlordProfileStyle.AllcontactsText}>Settings</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('AccountSetting');
          }}>
          <RowTab
            LeftIconLibrary={'FontAwesome5'}
            IsDivider={false}
            LeftIconName={'user-alt'}
            isSecondRowText={true}
            LeftImage={IMAGES.Accountsetting}
            TabTaxt="Account"
            TabSubTaxt="Manage your account & payment settings"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ManageSubscription');
          }}>
          <RowTab
            LeftIconLibrary={'MaterialIcons'}
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'subscriptions'}
            TabTaxt="Manage Subscription"
            TabSubTaxt="Manage your subscription plans"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGeneralSettingsPress}
          // onPress={() => {//   props.navigation.navigate("PrivacySecurity");// }} // Navigate To PrivacySecurity
        >
          <RowTab
            LeftIconLibrary={'MaterialCommunityIcons'}
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'lock'}
            TabTaxt="Privacy & Security"
            TabSubTaxt="View your privacy and security settings"
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => {
          //   // props.navigation.navigate("ManageSubscription");
          // }}
          onPress={handleGeneralSettingsPress}>
          <RowTab
            LeftIconLibrary={'MaterialIcons'}
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'storage'}
            TabTaxt="Storage & Data"
            TabSubTaxt="Manage storage and data settings"
          />
        </TouchableOpacity>
        <Text style={LandlordProfileStyle.AllcontactsText}>Feedback</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Help_FeedBack');
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'help-with-circle'}
            LeftIconLibrary={'Entypo'}
            TabTaxt="Help & Feedback"
            TabSubTaxt="Get help and leave feedback"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SocialMedia');
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'like1'}
            LeftIconLibrary={'AntDesign'}
            TabTaxt="Follow us on social media"
            TabSubTaxt="Follow us for news, insights and more!"
          />
        </TouchableOpacity>

        <Text style={LandlordProfileStyle.AllcontactsText}>Share</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Invitefriend');
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'user-plus'}
            LeftIconLibrary={'FontAwesome5'}
            TabTaxt="Tell a Friend"
            TabSubTaxt="Tell your friends about Kodie"
          />
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => { props.navigation.navigate("GenerateReport");}}Navigate To Generate report
          onPress={handleGeneralSettingsPress}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'rate-review'}
            LeftIconLibrary={'MaterialIcons'}
            TabTaxt="Rate Kodie"
            TabSubTaxt="Rate your Kodie experience"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}>
          <RowTab
            IsDivider={false}
            isSecondRowText={true}
            LeftIconName={'logout'}
            LeftIconLibrary={'MaterialCommunityIcons'}
            TabTaxt="Logout"
            TabSubTaxt="Logout of your Kodie profile"
          />
        </TouchableOpacity>
        {/* <LandlordProfileData /> */}
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={150}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: LandlordProfileStyle.bottomModal_container,
        }}>
        <View style={LandlordProfileStyle.popupcantainer}>
          <Text style={LandlordProfileStyle.popuptext}>Logout from device</Text>
          <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={handleClose}
            style={{marginTop: 8}}
          />
        </View>
        <View style={LandlordProfileStyle.ViewBtn}>
          <TouchableOpacity onPress={handleClose} style={{height: 58}}>
            <Text style={LandlordProfileStyle.CancelBtn}>Cancel</Text>
          </TouchableOpacity>
          <View style={{margin: 5}} />
          <TouchableOpacity onPress={LogOut} style={{height: 58}}>
            <Text style={LandlordProfileStyle.LogoutBtn}>Logout</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
