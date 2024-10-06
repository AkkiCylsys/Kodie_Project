//ScreenNo:228
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices/CommonMethods';
import {InviteStyles} from './InviteStyles';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {_COLORS, IMAGES} from '../../Themes/index';
import Entypo from 'react-native-vector-icons/Entypo';
import Contacts from 'react-native-contacts';
import {CommonLoader} from '../../components/Molecules/ActiveLoader/ActiveLoader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Share from 'react-native-share';
import {Config} from '../../Config';
import axios from 'axios';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

const LandlordData = [
  {
    id: '1',
    Heading: 'Akshay',
    Sub_heading: '+124253 152425',
    img: IMAGES.Account,
  },
  {
    id: '2',
    Heading: 'Asma',
    Sub_heading: '+124253 152425',
    img: IMAGES.Subscription,
  },
  {
    id: '3',
    Heading: 'Jason',
    Sub_heading: '+124253 152425',
    img: IMAGES.Privacy,
  },
  {
    id: '4',
    Heading: 'Jack',
    Sub_heading: '+124253 152425',
    img: IMAGES.Notification,
  },
  {
    id: '5',
    Heading: 'Marina',
    Sub_heading: '+124253 152425',
    img: IMAGES.Storage,
  },
  {
    id: '6',
    Heading: 'jackson',
    Sub_heading: '+124253 152425',
    img: IMAGES.language,
  },
  {
    id: '7',
    Heading: 'Mumtaz',
    Sub_heading: '+124253 152425',
    img: IMAGES.FeedBack,
  },
  {
    id: '8',
    Heading: 'Tell a Friend',
    Sub_heading: '+124253 152425',
    img: IMAGES.Contact,
  },
  {
    id: '9',
    Heading: 'Switch Account',
    Sub_heading: 'Switch to another Kodie account',
    img: IMAGES.SwitchAcc_,
  },
  {
    id: '10',
    Heading: 'Logout',
    Sub_heading: 'Logout of your Kodie profile',
    img: IMAGES.Logout,
  },
];

export default Invitefriend = props => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteFriendData, setInviteFriendData] = useState('');
  const [inviteFriendPath, setInviteFriendPath] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  useEffect(() => {
    Platform.OS == 'ios'
      ? requestContactsPermissionIOS()
      : requestContactsPermission(); // Request permission when component mounts
    inviteFriend();
  }, []);

  const shareDocFile = async () => {
    setTimeout(() => {
      Share.open({url: inviteFriendPath})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    }, 300);
    // try {
    //   await Share.open({url: inviteFriendPath});
    // } catch (error) {
    //   console.error('Error sharing PDF file:', error);
    // }
  };

  const inviteFriend = () => {
    const url = Config.BASE_URL;
    const invite_url = url + 'lookup_details';
    console.log('Request URL:', invite_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'INVITE',
      P_TYPE: 'QUESTION',
    };

    axios
      .post(invite_url, notification_data)
      .then(response => {
        console.log('API Response invite friend:', response?.data);
        if (response?.data?.status === true) {
          setInviteFriendData(response?.data?.lookup_details);
          console.log('invite data ...', response?.data?.lookup_details);
          setInviteFriendPath(
            response?.data?.lookup_details[0].lookup_description,
          );
          console.log(
            'inviteFriendPath....',
            response?.data?.lookup_details[0].lookup_description,
          );
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed invite_url', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission granted, fetch contacts
        fetchContacts();
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
    }
  };
  const requestContactsPermissionIOS = async () => {
    request(PERMISSIONS.IOS.CONTACTS)
      .then(result => {
        // alert(JSON.stringify(result))
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log('Contacts permission denied');
            break;

          case RESULTS.GRANTED:
            console.log('Contacts permission granted');
            fetchContacts();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };

  const fetchContacts = async () => {
    try {
      const data = await Contacts.getAll();
      console.log('contact..', data);
      setContacts(data);
      setFilteredContacts(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setIsLoading(false);
    }
  };
  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = contacts.filter(contact =>
      (contact.displayName && contact.displayName.toLowerCase().includes(query.toLowerCase())) ||
      (contact.givenName && contact.givenName.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredContacts(filtered);
  };
  const UserList_renderItem = ({item, index}) => {
    return (
      <>
        <View style={InviteStyles.container}>
          <View style={InviteStyles.profileView}>
            {item.thumbnailPath ? (
              <Image
                // source={IMAGES.Landlordprofile}
                source={{uri: item.thumbnailPath}}
                style={InviteStyles.usericon}
                resizeMode="contain"
              />
            ) : (
              <EvilIcons
                name="user"
                size={65}
                color={_COLORS.Kodie_GreenColor}
                style={{
                  alignSelf: 'center',
                }}
              />
            )}
            <View style={InviteStyles.textContainer}>
              <Text style={InviteStyles.profile_Heading}>
                {Platform.OS == 'ios' ? item?.givenName : item.displayName}
              </Text>
              <Text style={InviteStyles.profile_SubHeading}>
                {item.phoneNumbers?.[0]?.number || 'No phone number available'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={InviteStyles.ArrowIcon}
            onPress={shareDocFile}>
            <Text style={InviteStyles.profile_SubHeading}>{'Invite'}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const ListHeader = () => {
    return (
      <View style={InviteStyles.shareMainView}>
        <Text style={InviteStyles.AllcontactsText}>All Contacts</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={InviteStyles.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Invite a friend'}
      />
      <View style={InviteStyles.searchandShareMainView}>
        <SearchBar
          backSearchIcon={true}
          height={48}
          marginTop={20}
          searchData={handleSearch}
          textvalue={searchQuery}
        />
        <View style={InviteStyles.shareMainView}>
          <TouchableOpacity
            onPress={shareDocFile}
            style={InviteStyles.contactIconView}>
            <Entypo name="share" size={20} color={_COLORS.Kodie_GreenColor} />
            <View style={InviteStyles.shareTextView}>
              <Text style={InviteStyles.shareText}>{'Share Link'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={InviteStyles.FlatlistContainer}
        // data={contacts}
        data={filteredContacts}
        scrollEnabled
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={UserList_renderItem}
      />
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
