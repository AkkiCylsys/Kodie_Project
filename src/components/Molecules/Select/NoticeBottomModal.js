import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NoticeBottomModalStyle} from './NoticeBottomModalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import {_COLORS} from '../../../Themes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {CommonLoader} from '../ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
import axios from 'axios';
import {useSelector} from 'react-redux';
const NoticeBottomModal = props => {
  const [deleteData, setDeleteData] = useState('');
  const navigation = useNavigation();
  const [noticeRemiderDetails, setNoticeRemiderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [selectFile, setSelectFile] = useState([]);

  console.log('loginResponse.....', loginData);
  const notices_reminderId = props.noticeReminderid;
  console.log('notices_reminderId....', notices_reminderId);

  const FinalDeleteProperty = () => {
    props.FinalDeleteProperty();
    onClosemodal();
  };
  const onClosemodal = () => {
    props.onClose();
  };
  useEffect(() => {
    getNoticesReminderDetails();
    console.log('selectFile.....', selectFile);
  }, []);
  const getNoticesReminderDetails = () => {
    const url = Config.BASE_URL;
    const getNoticesReminderDetails_url = url + 'get_notices_reminder_details';
    console.log('Request URL:', getNoticesReminderDetails_url);
    setIsLoading(true);
    const notification_data = {
      notices_reminder_id: notices_reminderId,
    };
    axios
      .post(getNoticesReminderDetails_url, notification_data)
      .then(response => {
        console.log(
          'API Response getNoticesReminderDetailsData for duplicate...:',
          response?.data,
        );
        setNoticeRemiderDetails(response?.data?.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(
          'API failed getNoticesReminderDetails_url duplicate',
          error,
        );
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const createNoticeReminder = async () => {
    const formData = new FormData();
    formData.append('account_id', loginData?.Login_details?.user_account_id);
    formData.append('notice_type', noticeRemiderDetails.type_notice_id);
    formData.append('notice_title', noticeRemiderDetails.title);
    formData.append('notice_repeat', noticeRemiderDetails.notification_notice);
    formData.append('notice_notifications', noticeRemiderDetails.from_date);
    formData.append('notice_from_date', noticeRemiderDetails.from_time);
    formData.append('notice_from_time', noticeRemiderDetails.to_date);
    formData.append('notice_to_date', noticeRemiderDetails.to_time);
    formData.append('notice_to_time', noticeRemiderDetails.guests);
    formData.append('guests', noticeRemiderDetails.location);
    formData.append('location', noticeRemiderDetails.longitude);
    formData.append('longitude', noticeRemiderDetails.latitude);
    formData.append('latitude', noticeRemiderDetails.notifications);
    formData.append('notification', noticeRemiderDetails.type_id);
    formData.append(
      'notification_type',
      noticeRemiderDetails.notifications_type,
    );
    formData.append('custom', noticeRemiderDetails.custom);
    formData.append('notes', noticeRemiderDetails.notes);
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
      console.log('createNoticeReminder....', response?.data);
      if (response?.data?.status === true) {
        alert(response?.data?.message);
        // props.navigation.navigate("Notices");
      }
      // clearState();
      setIsLoading(false);
    } catch (error) {
      alert(error);
      console.log('createNoticeReminder_error...', error);
    } finally {
      setIsLoading(false);
    }
  };
  // const FinalDeleteProperty = async (notices_reminderId) => {
  //   setIsLoading(true);
  //   const url = Config.BASE_URL;
  //   const noticedelete = url + `delete_notices_reminder_details`;
  //   console.log("noticedelete", noticedelete);
  //   const noticesDeleteData = {
  //     notices_reminder_id: notices_reminderId,
  //   };
  //   try {
  //     const response = await axios.post(noticedelete, {
  //       data: noticesDeleteData,
  //     });

  //     console.log("API Response:", response?.data);
  //     if (response?.data?.status === true) {
  //       // Alert.alert("notice Deleted", response?.data?.message);
  //       alert(response?.data?.data);
  //       setIsLoading(false);
  //       onClosemodal();
  //     }
  //   } catch (error) {
  //     console.error("API Error noticedelete:", error);
  //     setIsLoading(false);
  //   }
  // };
  const modalData = [
    {
      id: 1,
      Data: 'View/edit notice',
      icon: (
        <MaterialCommunityIcons
          size={18}
          color={_COLORS.Kodie_GreenColor}
          name="alarm-snooze"
        />
      ),
    },
    {
      id: 2,
      Data: 'Duplicate notice',
      icon: <Fontisto size={18} color={_COLORS.Kodie_GreenColor} name="copy" />,
    },
    {
      id: 3,
      Data: 'Delete notice',
      icon: (
        <AntDesign size={18} color={_COLORS.Kodie_GreenColor} name="delete" />
      ),
    },
  ];
  const delete_data = [
    {
      id: 4,
      Data: 'Confirm delete job',
      icon: (
        <AntDesign size={18} color={_COLORS.Kodie_GreenColor} name="delete" />
      ),
    },
    {
      id: 5,
      Data: 'Archive instead',
      icon: (
        <Ionicons
          name="file-tray-full-outline"
          size={18}
          color={_COLORS.Kodie_GreenColor}
        />
      ),
    },
  ];

  const modalRenderData = ({item}) => {
    return item.id == 3 ? (
      <View style={NoticeBottomModalStyle.optionsmainview}>
        <TouchableOpacity
          style={NoticeBottomModalStyle.optionsview}
          onPress={() => {
            if (item.id == 3) {
              // alert("delete");
              setDeleteData(item.id == 3);
            }
          }}>
          <View style={NoticeBottomModalStyle.optionsiconview}>
            {item.icon}
          </View>
          <Text style={NoticeBottomModalStyle.textoption}>{item.Data}</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={NoticeBottomModalStyle.optionsmainview}>
        <TouchableOpacity
          style={NoticeBottomModalStyle.optionsview}
          onPress={() => {
            if (item.id == 1) {
              navigation.navigate('AddNewNotice', {
                noticeReminderid: props.noticeReminderid,
              });
              onClosemodal();
            }
            if (item.id == 2) {
              createNoticeReminder();
              // alert("create Notice");
            }
            if (item.id == 4) {
              FinalDeleteProperty(props.noticeReminderid);
            }
          }}>
          <View style={NoticeBottomModalStyle.optionsiconview}>
            {item.icon}
          </View>
          <Text style={NoticeBottomModalStyle.textoption}>{item.Data}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={deleteData ? delete_data : modalData}
        keyExtractor={item => item.id.toString()}
        renderItem={modalRenderData}
      />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default NoticeBottomModal;
