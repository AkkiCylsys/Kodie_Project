import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useIsFocused,
  CommonActions,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';
import TopHeader from '../../../components/Molecules/Header/Header';
import {LandlordProfileStyle} from './LandlordProfileStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_COLORS, IMAGES} from '../../../Themes/index';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import RowTab from '../../../components/Molecules/RowTab/RowTab';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {logoutActionCreator} from '../../../redux/Actions/Authentication/AuthenticationApiCreator';
import {Config} from '../../../Config';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';

const LandlordProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const loginData = useSelector(state => state.authenticationReducer.data);
  const userId = loginData?.Login_details?.user_account_id;

  const [isLoading, setIsLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState([]);
  const refRBSheet = useRef();

  // List of all sections you want to display
  const sections = [
    {
      id: 1,
      icon: 'user-alt',
      library: 'FontAwesome5',
      text: 'Account',
      subText: 'Manage your account & payment settings',
      screen: 'AccountSetting',
      category: 'settings',
    },
    {
      id: 2,
      icon: 'video',
      library: 'Entypo',
      text: 'Manage Subscription',
      subText: 'Manage your Kodie subscription',
      screen: 'ManageSubscription',
      category: 'settings',
    },
    {
      id: 3,
      icon: 'lock',
      library: 'MaterialCommunityIcons',
      text: 'Privacy & Security',
      subText: 'View your privacy and security settings',
      screen: null,
      category: 'settings',
    },
    {
      id: 4,
      icon: 'storage',
      library: 'MaterialIcons',
      text: 'Storage & Data',
      subText: 'Manage storage and data settings',
      screen: null,
      category: 'settings',
    },
    {
      id: 5,
      icon: 'help-with-circle',
      library: 'Entypo',
      text: 'Help & Feedback',
      subText: 'Get help and leave feedback',
      screen: 'Help_FeedBack',
      category: 'Feedback',
    },
    {
      id: 6,
      icon: 'like1',
      library: 'AntDesign',
      text: 'Follow us on social media',
      subText: 'Follow us for news, insights, and more!',
      screen: 'SocialMedia',
      category: 'Feedback',
    },
    {
      id: 7,
      icon: 'user-plus',
      library: 'FontAwesome5',
      text: 'Tell a Friend',
      subText: 'Tell your friends about Kodie',
      screen: 'Invitefriend',
      category: 'Share',
    },
    {
      id: 8,
      icon: 'rate-review',
      library: 'MaterialIcons',
      text: 'Rate Kodie',
      subText: 'Rate your Kodie experience',
      screen: null,
      category: 'Share',
    },
    {
      id: 9,
      icon: 'logout',
      library: 'MaterialCommunityIcons',
      text: 'Logout',
      subText: 'Logout of your Kodie profile',
      screen: 'Logout',
      category: 'Share',
    },
  ];

  useEffect(() => {
    setFilteredSections(sections); // Initialize filtered sections
  }, []);

  useEffect(() => {
    if (userId && isFocused) {
      fetchAccountDetails();
    }
  }, [isFocused]);

  const fetchAccountDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${Config.BASE_URL}getAccount_details/${userId}`,
      );
      setAccountDetails(response?.data?.data[0]);
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert(
        'Warning',
        error?.response?.data?.message || 'Error fetching details',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    refRBSheet.current.close();
    setTimeout(() => {
      dispatch(logoutActionCreator());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'LoginScreen'}],
        }),
      );
    }, 500);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredSections(sections); // If search is cleared, show all sections
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = sections.filter(section => {
        const matchesText = section.text.toLowerCase().includes(lowerCaseQuery);
        const matchesSubText = section.subText
          .toLowerCase()
          .includes(lowerCaseQuery);
        const matchesCategory = section.category
          .toLowerCase()
          .includes(lowerCaseQuery);

        // Show sections that match any of the criteria
        return matchesText || matchesSubText || matchesCategory;
      });

      setFilteredSections(filtered); // Set filtered sections based on the query
    }
  };

  const renderProfileImage = () => {
    return accountDetails?.image_path?.[0] ? (
      <Image
        source={{uri: accountDetails.image_path[0]}}
        style={LandlordProfileStyle.usericon}
        resizeMode="cover"
      />
    ) : (
      <FontAwesome
        name="user-circle"
        size={76}
        color={_COLORS.Kodie_GrayColor}
      />
    );
  };

  const renderRowTab = (
    iconLibrary,
    iconName,
    tabText,
    tabSubText,
    onPress,
  ) => (
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
      <TopHeader
        onPressLeftButton={() => navigation.goBack()}
        MiddleText="Profile"
      />
      <ScrollView>
        <SearchBar
          frontSearchIcon
          height={48}
          marginTop={20}
          placeholder="Search..."
          searchData={handleSearch}
          textvalue={searchQuery}
        />
        <TouchableOpacity
          style={LandlordProfileStyle.profilemainView}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={LandlordProfileStyle.ProfileView}>
            {renderProfileImage()}
          </View>
          <View style={LandlordProfileStyle.nameView}>
            <Text style={LandlordProfileStyle.nameText}>
              {`${accountDetails?.UAD_FIRST_NAME || ''} ${
                accountDetails?.UAD_LAST_NAME || ''
              }`}
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
              />
              <Text style={LandlordProfileStyle.ratingText}>0</Text>
              <Text style={LandlordProfileStyle.subrating}>
                (No rating yet)
              </Text>
            </View>
          </View>
          <View style={LandlordProfileStyle.contactIconView}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          </View>
        </TouchableOpacity>

        <DividerIcon />
        {filteredSections.some(section => section.category === 'settings') && (
          <>
            <Text style={LandlordProfileStyle.AllcontactsText}>Settings</Text>
            {filteredSections
              .filter(section => section.category === 'settings')
              .map(section =>
                renderRowTab(
                  section.library,
                  section.icon,
                  section.text,
                  section.subText,
                  section.screen
                    ? () => navigation.navigate(section.screen)
                    : () => Alert.alert('Alert', 'Coming soon'),
                ),
              )}
          </>
        )}
        {filteredSections.filter(section => section.category === 'Feedback')
          .length > 0 && (
          <>
            <Text style={LandlordProfileStyle.AllcontactsText}>Feedback</Text>
            {filteredSections
              .filter(section => section.category === 'Feedback')
              .map(section =>
                renderRowTab(
                  section.library,
                  section.icon,
                  section.text,
                  section.subText,
                  section.screen
                    ? () => navigation.navigate(section.screen)
                    : () => Alert.alert('Alert', 'Coming soon'),
                ),
              )}
          </>
        )}
        {filteredSections.filter(section => section.category === 'Share')
          .length > 0 && (
          <>
            <Text style={LandlordProfileStyle.AllcontactsText}>Share</Text>
            {filteredSections
              .filter(section => section.category === 'Share')
              .map(section =>
                renderRowTab(
                  section.library,
                  section.icon,
                  section.text,
                  section.subText,
                  section.screen === 'Logout'
                    ? () => refRBSheet.current.open()
                    : section.screen
                    ? () => navigation.navigate(section.screen)
                    : () => Alert.alert('Alert', 'Coming soon'),
                ),
              )}
          </>
        )}
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        height={150}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
          draggableIcon: {backgroundColor: _COLORS.Kodie_LightGrayColor},
          container: LandlordProfileStyle.bottomModal_container,
        }}>
        <View style={LandlordProfileStyle.popupcantainer}>
          <Text style={LandlordProfileStyle.popuptext}>
            Logout from device?
          </Text>
          <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={() => refRBSheet.current.close()}
          />
        </View>
        <View style={LandlordProfileStyle.ViewBtn}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.close()}
            style={{height: 68}}>
            <Text style={LandlordProfileStyle.CancelBtn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={{height: 68, alignSelf: 'center'}}>
            <Text style={LandlordProfileStyle.LogoutBtn}>Logout</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {isLoading && <CommonLoader />}
    </SafeAreaView>
  );
};

export default LandlordProfile;
