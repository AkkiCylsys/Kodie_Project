//ScreenNo:159
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import { AddNewNoticeStyle } from './AddNewNoticeStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import { Dropdown } from 'react-native-element-dropdown';
import { _COLORS, FONTFAMILY, IMAGES, LABEL_STYLES } from '../../../Themes';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import { _goBack } from '../../../services/CommonServices';
import SwitchToggle from 'react-native-switch-toggle';
import { Config } from '../../../Config';
import axios from 'axios';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapScreen from '../../../components/Molecules/GoogleMap/googleMap';
import SearchPlaces from '../../../components/Molecules/SearchPlaces/SearchPlaces';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import CalendarModal from '../../../components/Molecules/CalenderModal/CalenderModal';
import TimePicker from '../../../components/Molecules/ClockPicker/TimePicker';
import moment from 'moment/moment';
import debounce from 'lodash/debounce';
import RBSheet from 'react-native-raw-bottom-sheet';
import NoticesUploadDocument from '../../../components/NoticesUploadDocument/NoticesUploadDocument'
import CustomNotificationPicker from '../../../components/CustomNotificationPicker/CustomNotificationPicker';
import GuestSelectionContent from '../../../components/GuestSelectionContent/GuestSelectionContent';
const AddNewNotice = props => {
  const noticeReminderid = props.route.params?.noticeReminderid;
  const editNotice = props.route.params?.editNotice;
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [location, setLocation] = useState('');
  const [noticeTittle, setNoticeTittle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [addGuest, setAddGuest] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDay, setToggleDay] = useState(false);
  const [toggleDayValue, setToggleDayValue] = useState(0);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [toggleNotificationValue, setToggleNotificationValue] = useState(0);
  const [noticeTypeData, setNoticeTypeData] = useState([]);
  const [noticeTypeDataValue, setNoticeTypeDataValue] = useState('');
  const [repeatData, setRepeatData] = useState([]);
  const [repeatDataValue, setRepeatDataValue] = useState('');
  const [notification_type_Data, setNotification_type_Data] = useState([]);
  const [notification_type_value, setNotification_type_value] = useState('');
  const [UserCurrentCity, setUserCurrentCity] = useState('');
  const [UserZip_Code, setUserZip_Code] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [selectFile, setSelectFile] = useState([]);
  const [fileName, setFileName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [isModalToDateVisible, setModalToDateVisible] = useState(false);
  const [currentfromTime, setCurrentfromTime] = useState('');
  const [currentToTime, setCurrentToTime] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([]);
  const [guestError, setguestError] = useState('');
  const [selectedDateError, setSelectedDateError] = useState('');
  const [selectedToDateError, setSelectedToDateError] = useState('');
  const [selectedFromTimeError, setSelectedFromTimeError] = useState('');
  const [selectedToTimeError, setSelectedToTimeError] = useState('');
  const [showNoticeTypeError, setShowNoticeTypeError] = useState(false);
  const [selectedCustemValue, setSelectedCustemValue] = useState('');
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const UploadrbSheetRef = useRef();

  const handleApply = (value) => {
    setSelectedCustemValue(value);
    refRBSheet1.current.close();
  };
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (fileUri, type) => {
    console.log("fileUri, type",fileUri, type);
    setUploadedFiles(prevFiles => [...prevFiles, { uri: fileUri, type }]);
    UploadrbSheetRef.current.close();
  };
console.log("uploadedFiles",JSON.stringify(uploadedFiles));
  useEffect(() => {
    handle_notice();
    handle_Repeat();
    handle_notification_type();
    noticeReminderid ? getNoticesReminderDetails() : null;

    Geocoder.init('AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw', {
      language: 'en',
    });
    CheckIOSMapPermission();
  }, []);

  // Validation..

  const handleToDate = text => {
    setSelectedToDate(text);
    if (text.trim() === '') {
      setSelectedToDateError('End date is required.');
    } else {
      const startDate = moment(selectedDate, 'YYYY-MM-DD');
      const endDate = moment(text, 'YYYY-MM-DD');
      if (endDate.isBefore(startDate)) {
        setSelectedToDateError('Start date should not be greater than end date.');

      } else {
        setSelectedToDateError('');
      }
    }
  };

  const handleToTime = text => {
    setCurrentToTime(text);
    if (text.trim() === '') {
      setSelectedToTimeError('End time is required.');
    } else {
      const startDateTime = moment(`${selectedDate} ${currentfromTime}`, 'YYYY-MM-DD HH:mm');
      const endDateTime = moment(`${selectedToDate} ${text}`, 'YYYY-MM-DD HH:mm');
      if (endDateTime.isSame(startDateTime)) {
        setSelectedToTimeError('End time cannot be the same as start time.');
      } else {
        setSelectedToTimeError('');
      }
    }
  };

  const handleFromTime = text => {
    setCurrentfromTime(text);
    if (text.trim() === '') {
      setSelectedFromTimeError('Start Time is required.');
    } else {
      setSelectedFromTimeError('');
    }
  };
  const handleRequestDate = text => {
    setSelectedDate(text);
    if (text.trim() === '') {
      setSelectedDateError('Start date is required.');
    } else {
      setSelectedDateError('');
    }
  };
  const validateTitle = text => {
    if (text === '') {
      setTitleError('Notice title is required');
      // } else if (!/^[A-Za-z]+$/.test(text)) {
    } else {
      setTitleError('');
    }
    setNoticeTittle(text);
  };
  const validateguestSelection = () => {
    if (tempSelectedValues.length === 0) {
      setguestError('Please select at least one guest.');
      return false;
    }
    setguestError('');
    return true;
  };
  // calender..
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedDate('');
  };
  const apply_toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log('date...', selectedDate);
  };
  const toggleToDateModal = () => {
    setModalToDateVisible(!isModalToDateVisible);
    setSelectedToDate('');
  };
  const apply_toggleToDateModal = () => {
    setModalToDateVisible(!isModalToDateVisible);
    // console.log("date...", selectedDate);
  };
  // For map screen.....
  const ConfirmAddress = () => {
    setIsMap(false);
  };
  const openMapandClose = text => {
    setIsMap(false);
    setIsSearch(true);
  };
  const onRegionChange = Region => {
    // alert(JSON.stringify(Region))
    setlatitude(Region.latitude);
    setlongitude(Region.longitude);
    getAddress(Region.latitude, Region.longitude);
    getAddress();
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        // alert("You can use the location");
        getAddressWithCordinates();
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getAddressWithCordinates();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getAddressWithCordinates = () => {
    Geolocation.watchPosition(
      position => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
        getAddress(position.coords.latitude, position.coords.longitude);
      },
      error => {
        alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  };
  const getAddress = (latitude, longitude) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        console.log('json location.......', json);
        console.log('current address...', json.results[0].formatted_address);
        setLocation(json.results[0].formatted_address);
        let MainFullAddress =
          json.results[0].address_components[1].long_name +
          ', ' +
          json.results[0].address_components[2].long_name +
          ', ' +
          json.results[0].address_components[3].long_name +
          ', ' +
          json.results[0].address_components[4].long_name +
          ', ' +
          json.results[0].address_components[5].long_name +
          ', ' +
          json.results[0].address_components[6].long_name +
          ', ' +
          json.results[0].address_components[7].long_name +
          ', ' +
          json.results[0].address_components[8].long_name;

        var addressComponent2 = json.results[0].address_components[1];
        // alert(addressComponent2)
        setUserCurrentCity(addressComponent2.long_name);
        setUserZip_Code(json.results[1]?.address_components[6]?.long_name);
        setLocation(MainFullAddress);
        // alert(location)

        //setAddress(MainFullAddress);
      })
      .catch(error => console.warn(error));
  };

  // Api intrrigation....
  const handle_notice = () => {
    const url = Config.BASE_URL;
    const noticeType_url = url + 'lookup_details';
    console.log('Request URL:', noticeType_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'TYPE_OF_NOTICE',
      P_TYPE: 'OPTION',
    };
    axios
      .post(noticeType_url, notification_data)
      .then(response => {
        console.log('API Response noticeType_url:', response.data);
        if (response?.data?.status === true) {
          setNoticeTypeData(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed handle_notice', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_Repeat = () => {
    const url = Config.BASE_URL;
    const Repear_url = url + 'lookup_details';
    console.log('Request URL:', Repear_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'REPEAT',
      P_TYPE: 'OPTION',
    };
    axios
      .post(Repear_url, notification_data)
      .then(response => {
        console.log('API Response Repear_url:', response.data);
        if (response?.data?.status === true) {
          setRepeatData(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed handle_Repeat', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handle_notification_type = () => {
    const url = Config.BASE_URL;
    const notification_url = url + 'lookup_details';
    console.log('Request URL:', notification_url);
    setIsLoading(true);
    const notification_data = {
      P_PARENT_CODE: 'SNT',
      P_TYPE: 'OPTION',
    };

    axios
      .post(notification_url, notification_data)
      .then(response => {
        console.log('API Response notification_type:', response.data);
        if (response?.data?.status === true) {
          setNotification_type_Data(response?.data?.lookup_details);
          // alert(JSON.stringify(response?.data?.lookup_details));
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed notification_type', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // clearState ..
  const clearState = () => {
    setNoticeTypeDataValue(''),
      setNoticeTittle(''),
      setRepeatDataValue(''),
      setToggleDayValue('');
    setNotes(''),
      setAddGuest(''),
      setToggleDay(false),
      setToggleNotification(false),
      setToggleNotificationValue('');
    setNotification_type_value('');
    setLocation(''),
      setSelectedDate(''),
      setSelectedToDate(''),
      setCurrentfromTime(''),
      setCurrentToTime('');
  };
  // alert(selectFile[0].name)
  const createNoticeReminder = async () => {
    const formData = new FormData();
    formData.append('account_id', loginData?.Login_details?.user_account_id);
    formData.append('notice_type', noticeTypeDataValue);
    formData.append('notice_title', noticeTittle);
    formData.append('notice_repeat', repeatDataValue);
    formData.append('notice_notifications', toggleDayValue);
    formData.append('notice_from_date', selectedDate);
    formData.append('notice_from_time', currentfromTime);
    formData.append('notice_to_date', selectedToDate);
    formData.append('notice_to_time', currentToTime);
    formData.append('guests', displaySelectedValues);
    formData.append('location', location);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    formData.append('notification', toggleNotificationValue);
    formData.append('notification_type', notification_type_value);
    formData.append('custom', selectedCustemValue);
    formData.append('notes', notes);
    // formData.append("file_name", fileName);
    if (selectFile.length > 0 && selectFile[0]) {
      formData.append('file_name', {
        uri: selectFile[0].uri || null,
        name: selectFile[0].name || null,
        type: selectFile[0].type || null,
      });
    }
    console.log('formData', formData);
    const url = Config.BASE_URL;
    const createNoticeReminder_url = url + 'create_notices_reminder';
    setIsLoading(true);
    try {
      console.log('Request URL:', createNoticeReminder_url);
      const response = await axios.post(createNoticeReminder_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('hello deependra');
      console.log('createNoticeReminder....', response.data);
      if (response?.data?.status === true) {
        alert(response?.data?.message);
        props.navigation.navigate('Notices', {
          selectFile: selectFile,
        });
      }
      clearState();
      setIsLoading(false);
    } catch (error) {
      // alert(error);
      console.log('createNoticeReminder_error...', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNoticesReminderDetails = () => {
    const url = Config.BASE_URL;
    const getNoticesReminderDetails_url = url + 'get_notices_reminder_details';
    console.log('Request URL:', getNoticesReminderDetails_url);
    setIsLoading(true);
    const notification_data = {
      notices_reminder_id: noticeReminderid,
    };
    console.log(notification_data, 'notification_datakhds');
    axios
      .post(getNoticesReminderDetails_url, notification_data)
      .then(response => {
        console.log(
          'API Response getNoticesReminderDetailsData...:',
          response.data,
        );
        if (response?.data?.status === true) {
          setNoticeTypeDataValue(parseInt(response?.data?.data.type_notice_id));
          setNoticeTittle(response?.data?.data.title);
          setRepeatDataValue(parseInt(response?.data?.data.Repeat_id));
          setToggleDay(String(response?.data?.data.notification_notice));
          setSelectedDate(response?.data?.data.from_date);
          setSelectedToDate(response?.data?.data.to_date);
          setCurrentfromTime(response?.data?.data.from_time);
          setCurrentToTime(response?.data?.data.to_time);
          setAddGuest(response?.data?.data.guests);
          setLocation(response?.data?.data.location);
          setToggleNotification(response?.data?.data.notifications);
          setNotification_type_value(parseInt(response?.data?.data.type_id));
          setNotes(response?.data?.data.notes);
          set(response?.data?.data?.custom)
          // setFileName(response?.data?.data.file_name)
          setSelectFile(response?.data?.data.file_name);
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed getNoticesReminderDetails_url', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const update_createNoticeReminder = async () => {
    const formData = new FormData();
    formData.append('notices_reminder_id', noticeReminderid);
    formData.append('notice_type', noticeTypeDataValue);
    formData.append('notice_title', noticeTittle);
    formData.append('notice_repeat', repeatDataValue);
    formData.append('notice_notifications', toggleDayValue);
    formData.append('notice_from_date', selectedDate);
    formData.append('notice_from_time', currentfromTime);
    formData.append('notice_to_date', selectedToDate);
    formData.append('notice_to_time', currentToTime);
    formData.append('guests', addGuest);
    formData.append('location', location);
    formData.append('longitude', longitude);
    formData.append('latitude', latitude);
    formData.append('notification', toggleNotificationValue);
    formData.append('notification_type', notification_type_value);
    formData.append('custom', selectedCustemValue);
    formData.append('notes', notes);
    // formData.append("file_name", fileName);
    if (selectFile) {
      formData.append('file_name', {
        uri: selectFile[0].uri || null,
        name: selectFile[0].name || selectFile,
        type: selectFile[0].type || null,
      });
    }
    console.log('formData', formData);
    const url = Config.BASE_URL;
    const update_createNoticeReminder_url = url + 'update_notices_reminder';
    setIsLoading(true);
    try {
      console.log('Request URL:', update_createNoticeReminder_url);
      const response = await axios.put(
        update_createNoticeReminder_url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('update_createNoticeReminderResponse....', response.data);
      if (response?.data?.status === true) {
        alert(response?.data?.message);
        props.navigation.navigate('Notices');
      }
      clearState();
      setIsLoading(false);
    } catch (error) {
      // alert(error);
      console.log('update_createNoticeReminder_url...', error);
    } finally {
      setIsLoading(false);
    }
  };
  // Documents....
  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          // DocumentPicker.types.doc,
          // DocumentPicker.types.docx,
          // DocumentPicker.types.images,
        ],
        // allowMultiSelection: true,
      });
      //   const doc = await DocumentPicker.pickSingle({
      //     type: [
      //       DocumentPicker.types.pdf,
      //       DocumentPicker.types.doc,
      //       DocumentPicker.types.docx,
      //     ],
      //   });
      console.log('doc......', doc);
      setSelectFile(doc);
      setFileName(doc[0].name.replace(/\s/g, ''));
      console.log('filename...', doc[0].name.replace(/\s/g, ''));
      // await uploadDocument(doc);
      // console.log("Documents.....", doc);
      // console.log("selectFile.....", selectFile);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };
  const TypeOfNotices = item => {
    return (
      <View
        key={item.lookup_key}
        style={[
          AddNewNoticeStyle.itemView,
          {
            backgroundColor:
              item.lookup_key === noticeTypeDataValue
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === noticeTypeDataValue ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={AddNewNoticeStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const repeatRender = item => {

    return (
      <View
        key={item.lookup_key}
        style={[
          AddNewNoticeStyle.itemView,
          {
            backgroundColor:
              item.lookup_key === repeatDataValue
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === repeatDataValue ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={AddNewNoticeStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const NotificationRender = item => {
    return (
      <View
        key={item.lookup_key}
        style={[
          AddNewNoticeStyle.itemView,
          {
            backgroundColor:
              item.lookup_key === notification_type_value
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item.lookup_key === notification_type_value ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={AddNewNoticeStyle.textItem}>
          {item.lookup_description}
        </Text>
      </View>
    );
  };
  const fetchResults = async (searchQuery) => {
    // alert(searchQuery)
    setIsLoading(true);

    try {
      const Url = Config.BASE_URL
      const search_Url = Url + "add_attendees/search"
      console.log("Inspection_Url", search_Url);
      const response = await axios.post(search_Url, {
        search: searchQuery,
      });
      if (response?.data?.success == true) {
        setResults(response?.data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const debouncedFetchResults = debounce((searchQuery) => {
    if (searchQuery) {
      fetchResults(searchQuery);
    } else {
      setResults([]);
    }
  }, 100); // Delay in milliseconds

  useEffect(() => {
    debouncedFetchResults(query);
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [query]);

  const handleSelect = (user) => {
    setTempSelectedValues((prevSelectedUsers) => {
      const isSelected = prevSelectedUsers.find(selectedUser => selectedUser.UAD_KEY === user.UAD_KEY);
      if (isSelected) {
        return prevSelectedUsers.filter((selectedUser) => selectedUser.UAD_KEY !== user.UAD_KEY);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const handleClosePopup = () => {
    refRBSheet.current.close();
  };
  const displaySelectedValues = selectedValues.map(user => `${user.UAD_FIRST_NAME} ${user.UAD_LAST_NAME}`).join(', ');;



  const applySelection = () => {
    if (validateguestSelection()) {
      setSelectedValues(tempSelectedValues);
      refRBSheet.current.close();
    } else {
      setguestError('Please select at least one guest.');
    }
  };
  const handlevalidUpdation = () => {
    if (noticeTypeDataValue == '') {
      setShowNoticeTypeError(true)
    } else
      if (noticeTittle.trim() == '') {
        setTitleError('Notice title is required');
      } else if (selectedDate.trim() === '' || currentfromTime.trim() === '') {
        setSelectedDateError('Select start date is required.');
        setSelectedFromTimeError('Select start time is required.');
      } else if (selectedToDate.trim() === '' || currentToTime.trim() === '') {
        setSelectedToDateError('Select end date is required.');
        setSelectedToTimeError('Select end time is required.');
      } else if (selectedValues.length == 0) {
        setguestError('At least one guest can be added in this field.');
      } else {
        const startDate = moment(`${selectedDate} ${currentfromTime}`, 'YYYY-MM-DD HH:mm');
        const endDate = moment(`${selectedToDate} ${currentToTime}`, 'YYYY-MM-DD HH:mm');

        if (startDate.isAfter(endDate)) {
          setSelectedDateError('Start date and time should not be greater than end date and time.');
          setSelectedToDateError('End date and time should not be less than start date and time.');
        } else if (startDate.isSame(endDate)) {
          setSelectedFromTimeError('Start time should not be equal to end time.');
          setSelectedToTimeError('End time should not be equal to start time.');
        } else {
          setSelectedDateError('');
          setSelectedFromTimeError('');
          setSelectedToDateError('');
          setSelectedToTimeError('');

          noticeReminderid
            ? update_createNoticeReminder()
            : createNoticeReminder();
        }
      }
  };
  const handleRemoveFile = (index) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  const renderImageItem = ({ item,index }) => (
    <View style={AddNewNoticeStyle.uploadedImageContainer}>
      <Image source={{ uri: item.uri }} style={AddNewNoticeStyle.uploadedImage} />
      <TouchableOpacity
        style={{flex: 1,
          alignItems: "flex-end",
          justifyContent: "center",
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 1,
        }}
        onPress={() => handleRemoveFile(index)}
      >
        <View style={{width:20,height:20,borderRadius:5,backgroundColor:_COLORS?.Kodie_GrayColor}}>
        <AntDesign
          name="close"
          size={20}
          color={_COLORS.Kodie_BlackColor}
        />
      </View>
      </TouchableOpacity>
    </View>
  );

  const renderDocumentItem = ({ item,index }) => (
    <View style={AddNewNoticeStyle.container}>
    <View style={AddNewNoticeStyle.pdfInfo}>
      <FontAwesome
        name="file-pdf-o"
        size={35}
        color={_COLORS.Kodie_BlackColor}
        resizeMode={'contain'}
      />
      <View style={AddNewNoticeStyle.textContainer}>
        <Text style={AddNewNoticeStyle.pdfName}>
          {item?.uri[0].name}
        </Text>
      </View>
    </View>
    <TouchableOpacity
      style={AddNewNoticeStyle.crossIcon}
      onPress={()=>{handleRemoveFile(index)}}>
      <AntDesign
        name="close"
        size={20}
        color={_COLORS.Kodie_GrayColor}
      />
    </TouchableOpacity>
  </View>
    
  );

  const images = uploadedFiles.filter(file => file.type === 'image');
  const documents = uploadedFiles.filter(file => file.type === 'document');
  return (
    <SafeAreaView style={AddNewNoticeStyle.MainContainer}>
      <TopHeader
        onPressLeftButton={() => IsMap ? setIsMap(false) : IsSearch ? setIsSearch(false): _goBack(props)}
        MiddleText={IsMap || IsSearch ? 'Location' : editNotice ? "Edit notice" : 'Add new notice'}
      />
      {IsMap ? (
        <View
          style={{
            flex: 1,
            // paddingHorizontal: 10,
            backgroundColor: 'transparent',
          }}>
          <MapScreen
            style={{
              height: '100%',
              width: '100%',
              // borderRadius: 20,
              // borderWidth: 1,
              //borderColor: .greenAppColor,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            onRegionChange={onRegionChange}
            Maplat={latitude}
            Maplng={longitude}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '96%',
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: 'white',
              borderColor: '#E5E4E2',
              marginTop: 10,
              position: 'absolute',
            }}>
            <TextInput
              style={{
                backgroundColor: 'transparent',

                width: '90%',
                height: 45,
                alignSelf: 'center',
                //marginTop: 10,
              }}
              onFocus={() => openMapandClose()}
              placeholder={'Search Place'}
              placeholderTextColor={_COLORS.Kodie_BlackColor}
            />
          </View>
          <TouchableOpacity
            style={AddNewNoticeStyle.BtnContainer}
            onPress={ConfirmAddress}>
            <Image source={IMAGES?.Shape} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
        </View>
      ) : IsSearch ? (
        <SearchPlaces
          onPress={(data, details = null) => {
            console.log('LocationData....', details);
            setlatitude(details.geometry.location.lat);
            setlongitude(details.geometry.location.lng);
            setIsSearch(false);
            setIsMap(true);
            setLocation(details.formatted_address);
          }}
        />
      ) : (
        <KeyboardAvoidingView
          style={AddNewNoticeStyle.MainContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={{ marginBottom: 50 }}>
            <View style={AddNewNoticeStyle.mainview}>
              <View style={AddNewNoticeStyle.jobDetailsView}>
                <Text style={LABEL_STYLES.commontext}>
                  {'Select the type of notice you want to create'}
                </Text>
                <Dropdown
                  style={AddNewNoticeStyle.dropdown}
                  placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                  selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                  inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                  iconStyle={AddNewNoticeStyle.iconStyle}
                  data={noticeTypeData}
                  search
                  maxHeight={300}
                  labelField="lookup_description"
                  valueField="lookup_key"
                  placeholder="Select notice type"
                  searchPlaceholder="Search..."
                  value={noticeTypeDataValue}
                  onChange={item => {
                    setNoticeTypeDataValue(item.lookup_key);
                    setShowNoticeTypeError(false)
                    // alert(item.lookup_key)
                  }}
                  renderItem={TypeOfNotices}
                />
              </View>
              {showNoticeTypeError ? <Text style={AddNewNoticeStyle.errorText}>{"Please select a notice type."}</Text> : null}

              <View style={AddNewNoticeStyle.jobDetailsView}>
                <Text style={LABEL_STYLES.commontext}>{'Notice title'}</Text>
                <TextInput
                  style={[AddNewNoticeStyle.input]}
                  value={noticeTittle}
                  onChangeText={validateTitle}
                  onBlur={() => validateTitle(noticeTittle)}
                  placeholder="Notice title"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                />
              </View>
              {titleError ? (
                <Text style={AddNewNoticeStyle.errorText}>
                  {titleError}
                </Text>
              ) : null}

              <Divider style={AddNewNoticeStyle.divider} />
              <View style={AddNewNoticeStyle.mainreapeatview}>
                <MaterialCommunityIcons
                  name="repeat"
                  size={35}
                  color={_COLORS.Kodie_ExtraLiteGrayColor}
                  style={{ alignSelf: 'center' }}
                />
                <Text style={AddNewNoticeStyle.repeattext}>Repeat</Text>
                <View style={AddNewNoticeStyle.noticedropdownview}>
                  <Dropdown
                    style={[
                      AddNewNoticeStyle.dropdown,
                      { borderRadius: 8, height: 28, alignItems: 'center', marginTop: 0 },
                    ]}
                    placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                    selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                    inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                    iconStyle={AddNewNoticeStyle.iconStyle}
                    data={repeatData}
                    search
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="select"
                    searchPlaceholder="Search..."
                    value={repeatDataValue}
                    onChange={item => {
                      setRepeatDataValue(item.lookup_key);
                      // alert(item.lookup_key)
                    }}
                    renderItem={repeatRender}
                  />
                </View>
              </View>
              <Divider style={AddNewNoticeStyle.dividersecond} />
              {/* fourth part start here */}
              <View style={AddNewNoticeStyle.alldayviewmain}>
                <View style={AddNewNoticeStyle.alldayview}>
                  <MaterialCommunityIcons name="alarm-plus" size={35}
                    color={_COLORS.Kodie_ExtraLiteGrayColor}
                  />
                  <Text style={AddNewNoticeStyle.alldaytext}>All Day</Text>
                </View>
                <SwitchToggle
                  switchOn={toggleDay}
                  onPress={() => {
                    setToggleDay(!toggleDay);
                    setToggleDayValue(toggleDay ? 0 : 1);
                    // alert(toggleDayValue);
                  }}
                  circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                  circleColorOn={_COLORS.Kodie_GreenColor}
                  backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                  backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                  containerStyle={AddNewNoticeStyle.toggle_con}
                  circleStyle={AddNewNoticeStyle.toggle_circle}

                />
              </View>
              <View style={AddNewNoticeStyle.datetimeview}>
                <View style={AddNewNoticeStyle.dateview}>

                  <CalendarModal
                    // SelectDate={selectedDate ? selectedDate : "Select Date"}
                    SelectDate={
                      selectedDate
                        ? moment(selectedDate).format('ddd, MMM DD YYYY')
                        : 'Select from Date'
                    }
                    _textInputStyle={{
                      color: selectedDate
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_BlackColor,
                    }}
                    calenderStyle={{
                      borderWidth: 0,
                      marginTop: 0,
                    }}
                    calenderIcons
                    calenderIcon={toggleModal}
                    // onDayPress={day => setSelectedDate(day.dateString)}
                    // onChangeText={() => setSelectedDate(selectedDate)}
                    onDayPress={day => handleRequestDate(day.dateString)}
                    onChangeText={() => handleRequestDate(selectedDate)}
                    Visible={isModalVisible}
                    onRequestClose={toggleModal}
                    markedDates={{
                      [selectedDate]: {
                        selected: true,
                        selectedColor: _COLORS.Kodie_lightGreenColor,
                        selectedTextColor: _COLORS.Kodie_BlackColor,
                      },
                    }}
                    _closeButton={toggleModal}
                    _ApplyButton={apply_toggleModal}
                  />


                  <TimePicker
                    selectedTime={
                      currentfromTime && currentfromTime != ''
                        ? String(currentfromTime)
                        : 'Select from time'
                    }
                    timerConStyle={{
                      borderWidth: 0,
                      marginTop: 0,
                    }}
                    _TextTimeColor={
                      currentfromTime
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_BlackColor
                    }
                    timerIcons
                    data={new Date()}
                    getData={date => {
                      handleFromTime(moment(date).format('hh:mm A'));
                    }}
                    onChange={() => handleFromTime(currentfromTime)}
                  />


                </View>
                <View style={AddNewNoticeStyle.dateview}>
                  <View style={{ flex: 1 }}>
                    <CalendarModal
                      // SelectDate={selectedDate ? selectedDate : "Select Date"}
                      SelectDate={
                        selectedToDate
                          ? moment(selectedToDate).format('ddd, MMM DD YYYY')
                          : 'Select to Date'
                      }
                      _textInputStyle={{
                        color: selectedToDate
                          ? _COLORS.Kodie_BlackColor
                          : _COLORS.Kodie_BlackColor,
                      }}
                      calenderStyle={{
                        borderWidth: 0,
                        marginTop: 0,
                      }}
                      calenderIcons
                      calenderIcon={toggleToDateModal}
                      onDayPress={day => handleToDate(day.dateString)}
                      onChangeText={() => handleToDate(selectedToDate)}
                      Visible={isModalToDateVisible}
                      onRequestClose={toggleToDateModal}
                      markedDates={{
                        [selectedToDate]: {
                          selected: true,
                          selectedColor: _COLORS.Kodie_lightGreenColor,
                          selectedTextColor: _COLORS.Kodie_BlackColor,
                        },
                      }}
                      _closeButton={toggleToDateModal}
                      _ApplyButton={apply_toggleToDateModal}
                    />
                  </View>
                  <TimePicker
                    selectedTime={
                      currentToTime && currentToTime != ''
                        ? String(currentToTime)
                        : 'Select time'
                    }
                    timerConStyle={{
                      borderWidth: 0,
                      marginTop: 0,
                    }}
                    _TextTimeColor={
                      currentToTime
                        ? _COLORS.Kodie_BlackColor
                        : _COLORS.Kodie_BlackColor
                    }
                    timerIcons
                    data={new Date()}
                    getData={date => {
                      handleToTime(moment(date).format('hh:mm A'));
                    }}
                    onChange={() => handleToTime(currentToTime)}

                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {selectedDateError ? (
                  <Text style={AddNewNoticeStyle.errorText}>
                    {selectedDateError}
                  </Text>
                ) : null}
                {selectedFromTimeError ? (
                  <Text style={[AddNewNoticeStyle.errorText, { textAlign: 'right' }]}>
                    {selectedFromTimeError}
                  </Text>
                ) : null}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {selectedToDateError ? (
                  <Text style={AddNewNoticeStyle.errorText}>
                    {selectedToDateError}
                  </Text>
                ) : null}
                {selectedToTimeError ? (
                  <Text style={[AddNewNoticeStyle.errorText]}>
                    {selectedToTimeError}
                  </Text>
                ) : null}
              </View>

              <Divider style={AddNewNoticeStyle.dividerthird} />
              <View style={AddNewNoticeStyle.secondmainview}>
                {/* <AddGuest /> */}
                <View style={AddNewNoticeStyle.jobDetailsView}>
                  <Text style={LABEL_STYLES.commontext}>{'Add guests'}</Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={[
                        AddNewNoticeStyle.input,
                        AddNewNoticeStyle.input_guest,
                      ]}
                      onPress={() => refRBSheet.current.open()}>
                      <TextInput
                        style={{ flex: 1 }}
                        value={displaySelectedValues}
                        placeholder="Add guests"
                        placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                        editable={false}
                      />
                      <Feather
                        name="user-plus"
                        size={30}
                        color={_COLORS.Kodie_GrayColor}
                        style={{ alignSelf: 'center', marginHorizontal: 10 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={AddNewNoticeStyle.chatBtn}>
                      <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={30}
                        color={_COLORS.Kodie_WhiteColor}
                        style={{ alignSelf: 'center' }}
                      />
                      <Text style={AddNewNoticeStyle.ChatText}>{'Chat '}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {guestError ? (
                  <Text style={AddNewNoticeStyle.errorText}>
                    {guestError}
                  </Text>
                ) : null}
                <View style={AddNewNoticeStyle.firstview}>
                  <Text style={AddNewNoticeStyle.oldnumbertext}>
                    Add location
                  </Text>

                  <View style={AddNewNoticeStyle.locationContainer}>
                    <TextInput
                      style={AddNewNoticeStyle.locationInput}
                      value={location}
                      onChangeText={setLocation}
                      onFocus={() => {
                        setIsSearch(true);
                      }}
                      // editable={false}
                      placeholder="Enter new location"
                      placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                    />
                    <TouchableOpacity
                      style={AddNewNoticeStyle.locationIconView}
                      onPress={() => {
                        Platform.OS == 'ios'
                          ? CheckIOSMapPermission
                          : checkpermissionlocation();
                        setIsMap(true);
                      }}>
                      <Octicons
                        name={'location'}
                        size={22}
                        color={_COLORS.Kodie_GreenColor}
                        style={AddNewNoticeStyle.locationIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Divider style={AddNewNoticeStyle.dividerfourth} />

                {/*seven part start here */}
                <View style={AddNewNoticeStyle.setnotificationview}>
                  <View style={AddNewNoticeStyle.notificationbind}>
                    <FontAwesome name="bell-o" size={35}
                      color={_COLORS.Kodie_ExtraLiteGrayColor}
                    />
                    <Text style={AddNewNoticeStyle.settext}>
                      Set notification{' '}
                    </Text>
                  </View>
                  <SwitchToggle
                    switchOn={toggleNotification}
                    onPress={() => {
                      setToggleNotification(!toggleNotification);
                      setToggleNotificationValue(toggleNotification ? 1 : 0);
                      // alert(toggle_lease_expire);
                    }}
                    circleColorOff={_COLORS.Kodie_ExtraLightGrayColor}
                    circleColorOn={_COLORS.Kodie_GreenColor}
                    backgroundColorOn={_COLORS.Kodie_LiteWhiteColor}
                    backgroundColorOff={_COLORS.Kodie_LiteWhiteColor}
                    containerStyle={AddNewNoticeStyle.toggle_con}
                    circleStyle={AddNewNoticeStyle.toggle_circle}
                  />
                </View>
                {/*eight part start here */}
                <View style={AddNewNoticeStyle.setnoticeviewdrop}>
                  <Text style={AddNewNoticeStyle.Notificationtypetext}>
                    Set notification type
                  </Text>
                  <Dropdown
                    style={[AddNewNoticeStyle.setnotificationdrop, { width: 130 }]}
                    placeholderStyle={AddNewNoticeStyle.placeholderStyle}
                    selectedTextStyle={AddNewNoticeStyle.selectedTextStyle}
                    inputSearchStyle={AddNewNoticeStyle.inputSearchStyle}
                    iconStyle={AddNewNoticeStyle.iconStyle}
                    data={notification_type_Data}
                    maxHeight={300}
                    labelField="lookup_description"
                    valueField="lookup_key"
                    placeholder="Select"
                    value={notification_type_value}
                    onChange={item => {
                      setNotification_type_value(item.lookup_key);
                      // alert(item.lookup_key)
                    }}
                    renderItem={NotificationRender}
                  />
                </View>
                {/*nine part start here */}
                <View style={AddNewNoticeStyle.setcustomview}>
                  <Text style={AddNewNoticeStyle.setcustometext}>Set custom</Text>
                  <View style={{ flexDirection: 'row' }}
                  >
                    <Text style={[AddNewNoticeStyle.setcustometext, { marginRight: 15 }]}>{selectedCustemValue}</Text>

                    <TouchableOpacity
                      onPress={() => refRBSheet1.current.open()}
                      style={AddNewNoticeStyle.customIcon}>
                      <Entypo
                        name="chevron-small-right"
                        size={22}
                        color={_COLORS.Kodie_GrayColor}
                        style={{ flex: 1, alignItems: 'center' }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>


              <Divider style={AddNewNoticeStyle.dividerfourth} />
              <View style={AddNewNoticeStyle.jobDetailsView}>
                <Text style={LABEL_STYLES.commontext}>{'Notes'}</Text>
                <TextInput
                  style={[AddNewNoticeStyle.input, { height: 100 }]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add additional notes"
                  placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  multiline
                  numberOfLines={5}
                  textAlignVertical={'top'}
                />
              </View>
              <View style={AddNewNoticeStyle.addattachmentbtnview}>
                <Text style={AddNewNoticeStyle.addattachment}>
                  Add attachment
                </Text>
                {/* Display uploaded images in a horizontal FlatList */}
                {images.length > 0 && (
                <FlatList
                  data={images}
                  renderItem={renderImageItem}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal
                  style={AddNewNoticeStyle.uploadedImagesContainer}
                />
                )}
                {/* Display uploaded documents in a vertical FlatList */}
                {documents.length > 0 && (
                <FlatList
                  data={documents}
                  renderItem={renderDocumentItem}
                  keyExtractor={(item, index) => index.toString()}
                  style={AddNewNoticeStyle.uploadedDocumentsContainer}
                />
                )}

                <CustomSingleButton
                  leftImage={IMAGES.uploadIcon}
                  isLeftImage={true}
                  _ButtonText={'Upload'}
                  backgroundColor={_COLORS.Kodie_lightGreenColor}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  disabled={isLoading ? true : false}
                  // onPress={() => {
                  //   selectDoc();
                  // }}
                  onPress={() => UploadrbSheetRef.current.open()}
                />
                <Divider style={AddNewNoticeStyle.dividerfourth} />
                <CustomSingleButton
                  _ButtonText={editNotice ? "Edit notice" : 'Add notice'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  disabled={isLoading ? true : false}
                  onPress={handlevalidUpdation}
                />
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <RBSheet
        ref={refRBSheet}
        height={500}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: AddNewNoticeStyle.bottomModal_container,
        }}
      >
        <GuestSelectionContent
          query={query}
          setQuery={setQuery}
          results={results}
          handleSelect={handleSelect}
          tempSelectedValues={tempSelectedValues}
          selectedValues={selectedValues}
          refRBSheet={refRBSheet}
          applySelection={applySelection}
          handleClosePopup={handleClosePopup}
        />


        {
          isLoading ? <CommonLoader /> : null
        }

      </RBSheet>
      <RBSheet
        ref={UploadrbSheetRef}
        height={250}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: AddNewNoticeStyle.bottomModal_container,
        }}
      >
        <NoticesUploadDocument onFileUpload={handleFileUpload} rbSheetRefclose={() => UploadrbSheetRef.current.close()} />

      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
      <RBSheet
        ref={refRBSheet1}
        height={350}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: AddNewNoticeStyle.bottomModal_container,
        }}
      >
        <CustomNotificationPicker onApply={handleApply} onClose={() => refRBSheet1.current.close()} />
      </RBSheet>

    </SafeAreaView>
  );
};

export default AddNewNotice;
