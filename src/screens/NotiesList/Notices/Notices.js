import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { NoticesStyle } from './NoticesStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import { _goBack } from '../../../services/CommonServices';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import { _COLORS, IMAGES, FONTFAMILY } from '../../../Themes';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import Notice from '../../../components/Molecules/Notice/Notice';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RBSheet from 'react-native-raw-bottom-sheet';
import NoticeBottomModal from '../../../components/Molecules/Select/NoticeBottomModal';
import { Config } from '../../../Config';
import axios from 'axios';
import { CommonLoader } from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars'; //calender
import { debounce } from 'lodash';
import { log } from 'react-native-reanimated';
const HorizontalData = [
  { filtername: 'All', filterId: 'All' },
  { filtername: 'General', filterId: '367' },
  { filtername: 'Inspection', filterId: '368' },
  { filtername: 'Rent', filterId: '369' },
  { filtername: 'Job', filterId: '370' },
];

const noticeData = [
  {
    day: '3/10',
    date: 'Mon',
    lineimg: IMAGES.redLine,
    heading: 'Lease agreement expiring in 30 days',
    locationimg: IMAGES.Location,
    address: '2118 Thornridge Cir. Syracuse,',
  },
  {
    day: '3/10',
    date: 'Mon',
    lineimg: IMAGES.redLine,
    heading: 'Lease agreement expiring in 30 days',
    locationimg: IMAGES.Location,
    address: '2118 Thornridge Cir. Syracuse,',
  },
  {
    day: '3/10',
    date: 'Mon',
    lineimg: IMAGES.blueLine,
    heading: 'Lease agreement expiring in 30 days',
    locationimg: IMAGES.Location,
    address: '2118 Thornridge Cir. Syracuse,',
  },
  {
    day: '3/10',
    date: 'Mon',
    lineimg: IMAGES.redLine,
    heading: 'Lease agreement expiring in 30 days',
    locationimg: IMAGES.Location,
    address: '2118 Thornridge Cir. Syracuse,',
  },
];
const Notices = props => {
  const [selectedDate, setSelectedDate] = useState(''); // calender state
  const isFocused = useIsFocused();
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse in notices.....', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [noticeRemiderDetails, setNoticeRemiderDetails] = useState([]);
  const [getNoticeRemiderDetails, setgetNoticeRemiderDetails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(['All']);
  const [noticeReminderid, setNoticeReminderid] = useState('');
  const refRBSheet = useRef();
  const [_MONTHS, set_MONTHS] = useState([
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleYear, setIsModalVisibleyear] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [_selectedMonthId, set_selectedMonthId] = useState(
    new Date().getMonth() + 1,
  ); // Initialize with current month ID
  const [_selectedYear, set_selectedYear] = useState(new Date().getFullYear()); // Initialize with current year
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order is descending

  const sortByDate = () => {
    const sortedData = [...noticeRemiderDetails].sort((a, b) => {
      const dateA = new Date(a.from_date);
      const dateB = new Date(b.from_date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setNoticeRemiderDetails(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };
  const searchNoticesList = query => {
    setSearchQuery(query);
    const filtered = query
      ? noticeRemiderDetails.filter(
        item =>
          item.type_notice && item.type_notice.toLowerCase().includes(query.toLowerCase()),
      )
      : noticeRemiderDetails;
    console.log('filtered.........', filtered);
    setFilteredUsers(filtered);
  };
  const generateYears = startYear => {
    return Array.from({ length: 12 }, (_, index) => startYear - index);
  };

  const generatetopYears = selectedYear => {
    const startYear = selectedYear - 11;
    const endYear = selectedYear;
    return `${startYear} - ${endYear}`;
  };
  const handleNextYears = () => {
    set_selectedYear(_selectedYear + 12); // Move to the previous 12 years
  };

  const handlePrevYears = () => {
    set_selectedYear(_selectedYear - 12); // Move to the next 12 years
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleYearModal = () => {
    setIsModalVisibleyear(!isModalVisibleYear);
  };

  const selectMonth = month => {
    set_selectedMonthId(month);
    toggleModal(); // Close the modal after selecting a month
  };
  const selectYear = year => {
    set_selectedYear(year);
    toggleYearModal(); // Close the modal after selecting a month
  };

  const onDayPress = day => {
    //......
    setSelectedDate(day.dateString);
  };
  useFocusEffect(
    useCallback(() => {
      getNoticesReminderDetails();

    }, [])
  );
  const getNoticesReminderDetails = (id) => {
    console.log(id);
    const url = Config.BASE_URL;
    const getNoticesReminderDetails_url = url + 'get_notices_reminder_details';
    console.log('Request URL:', getNoticesReminderDetails_url);
    setIsLoading(true);
    const notification_data = {
      notices_reminder_id: id,
    };

    const headers = {
      'Authorization': `Bearer ${loginData?.Login_details?.token}`,
      'uli-device-id': loginData?.Login_details?.device_id,
      'uli-device-os-type': loginData?.Login_details?.device_os_type,
    };
    axios
      .post(getNoticesReminderDetails_url, notification_data, { headers })
      .then(response => {
        console.log(
          'API Response getNoticesReminderDetailsData for duplicate...:',
          response?.data,
        );
        setgetNoticeRemiderDetails(response?.data?.data);
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
  const onClose = () => {
    refRBSheet.current.close();

  };
  const reloadDuplicateData = () => {
    getNoticesReminderDeatilsByFilter({
      monthId: _selectedMonthId,
      year: _selectedYear,
      selectedFilter: selectedFilter,
    });
  }

  useEffect(() => {
    if (isFocused) {
      getNoticesReminderDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
        selectedFilter: selectedFilter,
      });
    }
  }, [isFocused, selectedFilter]);

  const horizontal_render = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.filterId}
        style={[
          NoticesStyle.flatlistView,
          {
            backgroundColor: selectedFilter.includes(item.filterId)
              ? _COLORS?.Kodie_BlackColor
              : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        onPress={() => {
          setSelectedFilter([item.filterId]);
          getNoticesReminderDeatilsByFilter({
            monthId: _selectedMonthId,
            year: _selectedYear,
            selectedFilter: item.filterId,
          });
        }}>
        {selectedFilter.includes(item.filterId) ? null : (
          <View
            style={[
              NoticesStyle.round,
              {
                backgroundColor: selectedFilter.includes(item.filterId)
                  ? _COLORS?.Kodie_WhiteColor
                  : _COLORS?.Kodie_VeryLightGrayColor,
              },
            ]}
          />
        )}
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}></View>
        <Text
          style={[
            NoticesStyle.item_style,
            {
              color: selectedFilter.includes(item.filterId) ? _COLORS?.Kodie_WhiteColor
                : _COLORS?.Kodie_VeryLightGrayColor,
            },
          ]}>
          {item.filtername}
        </Text>
        {selectedFilter.includes(item.filterId) ? (
          <MaterialCommunityIcons
            name={'check'}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  const noticeRenderData = ({ item, index }) => {
    console.log(item?.type_notice_id);
    const lineImageSource = item?.type_notice_id == "366" || item?.type_notice_id == "367" || item?.type_notice_id == "370" ? IMAGES.greenLine : item?.type_notice_id == "368" ? IMAGES?.blueLine : IMAGES.redLine;

    return (
      <View style={NoticesStyle.mainContainer} key={item?.id}>
        <View style={NoticesStyle.dateDayview}>
          <Text style={NoticesStyle.datetext}>
            {moment(item.from_date).format('M/D ddd')}
          </Text>
        </View>
        <View style={NoticesStyle.middatabindview}>
          <View style={NoticesStyle.bindview}>

            <Image source={lineImageSource} style={NoticesStyle.lineimg} />
            <View style={NoticesStyle.headinglineview}>
              <Text style={NoticesStyle.headintext}>{item.type_notice}</Text>
              <View style={NoticesStyle.addressviewbind}>

                {item.location ? (
                  <><EvilIcons
                    name="location"
                    size={25}
                    color={_COLORS.Kodie_GrayColor}
                    style={{ alignSelf: 'center' }}
                  />

                    <Text numberOfLines={2} ellipsizeMode="tail" style={NoticesStyle.addresstext}>{item.location}</Text></>) : null}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={NoticesStyle.dotsview}
            onPress={() => {
              refRBSheet.current.open();
              setNoticeReminderid(item.id);
              console.log('noticereminderId....', item.id);
              getNoticesReminderDetails(item.id);
            }}>
            <Entypo
              name="dots-three-vertical"
              size={25}
              color={_COLORS.Kodie_LightGrayColor}
              style={NoticesStyle.dotimg}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Api intrigation...
  const getNoticesReminderDeatilsByFilter = async ({ monthId, year }) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const NoticesReminderDeatilsByFilter_url =
        url + 'get_details_by_account_id_notices_reminder';
      console.log(
        'NoticesReminderDeatilsByFilter...',
        NoticesReminderDeatilsByFilter_url,
      );
      const headers = {
        'Authorization': `Bearer ${loginData?.Login_details?.token}`,
        'uli-device-id': loginData?.Login_details?.device_id,
        'uli-device-os-type': loginData?.Login_details?.device_os_type,
      };
      const data = {
        notices_filter: selectedFilter,
        account_id: loginData?.Login_details?.user_account_id,
        limit: 10,
        order_wise: 'DESC',
        months: monthId,
        year: year,
      };
      console.log('monthdatae', data);
      const response = await axios.post(
        NoticesReminderDeatilsByFilter_url,
        data, { headers }
      ); // Use monthId and year received as parameters
      console.log(
        'NoticesReminderDeatilsByFilter_Data response...',
        response?.data,
      );
      setNoticeRemiderDetails(response?.data?.data);
      console.log(
        'NoticesReminderDeatilsByFilter_Data..',
        response?.data?.data,
      );
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Alert.alert("Warning", error.response.data.message || "Internal Server Error");
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      console.error('API Error NoticesReminderDeatilsByFilter_Data:', error);
      setIsLoading(false);
    }
  };

  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const noticedelete = url + `delete_notices_reminder_details`;
    console.log('noticedelete', noticedelete);
    const noticesDeleteData = {
      notices_reminder_id: noticeReminderid,
      // notices_reminder_id: 24,
    };
    // console.log('noticesDeleteData body.....', noticesDeleteData);
    const headers = {
      'Authorization': `Bearer ${loginData?.Login_details?.token}`,
      'uli-device-id': loginData?.Login_details?.device_id,
      'uli-device-os-type': loginData?.Login_details?.device_os_type,
    };
    try {
      const response = await axios.post(noticedelete, noticesDeleteData, { headers });
      // console.log('API Response:', response.data);
      if (response?.data?.status === true) {
        // Alert.alert("notice Deleted", response?.data?.message);
        alert(response?.data?.data);
        getNoticesReminderDeatilsByFilter({
          monthId: _selectedMonthId,
          year: _selectedYear,
          selectedFilter: selectedFilter,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error noticedelete:', error);
      setIsLoading(false);
    }
  };

  const navigateToPreviousMonth = async () => {
    let newMonthId = _selectedMonthId - 1;
    let newYear = _selectedYear;
    if (newMonthId < 1) {
      newMonthId = 12; // Set to December
      newYear -= 1; // Decrement year
    }
    set_selectedMonthId(newMonthId);
    set_selectedYear(newYear);
    await getNoticesReminderDeatilsByFilter({
      monthId: newMonthId, // Pass newMonthId instead of _selectedMonthId
      year: newYear, // Pass newYear instead of _selectedYear
    });
  };

  const navigateToNextMonth = async () => {
    let newMonthId = _selectedMonthId + 1;
    let newYear = _selectedYear;
    if (newMonthId > 12) {
      newMonthId = 1; // Set to January
      newYear += 1; // Increment year
    }
    set_selectedMonthId(newMonthId);
    set_selectedYear(newYear);
    await getNoticesReminderDeatilsByFilter({
      monthId: newMonthId, // Pass newMonthId instead of _selectedMonthId
      year: newYear, // Pass newYear instead of _selectedYear
    });
  };

  return (
    <SafeAreaView style={NoticesStyle.mainview}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Notices'}
      />
      <ScrollView style={NoticesStyle.scrollContainer}>
        <View style={NoticesStyle.btnview}>
          <CustomSingleButton
            borderColor={_COLORS.Kodie_TransparentColor}
            _ButtonText={'Add new notice'}
            backgroundColor={_COLORS.Kodie_BlackColor}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading ? true : false}
            onPress={() => {
              props.navigation.navigate('AddNotices');
            }}
            height={48}
          />
        </View>

        <DividerIcon style={NoticesStyle.divider} />

        <View style={NoticesStyle.searchview}>
          <SearchBar
            marginTop={1}
            frontSearchIcon
            // isFilterImage
            updownSearch
            height={40}
            placeholder="Search notices"
            searchData={searchNoticesList}
            SortedData={sortByDate}
            upArrow={sortOrder == 'asc' ? 'long-arrow-up' : 'long-arrow-down'}
            downArrow={sortOrder == 'asc' ? 'long-arrow-down' : 'long-arrow-up'}

          />
        </View>

        <View style={NoticesStyle.Container}>
          <View style={NoticesStyle.flat_MainView}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              keyExtractor={(index, item) => item.filterId}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 16,
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={navigateToPreviousMonth}
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Entypo name={'chevron-left'} size={22} color={'black'} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              // onPress={toggleModal}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontFamily: FONTFAMILY?.K_Bold,
                  color: _COLORS.Kodie_BlackColor,
                }}>
                {_MONTHS.find(month => month.id === _selectedMonthId)?.name}{' '}
              </Text>
            </View>
            <View
              // onPress={toggleYearModal}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontFamily: FONTFAMILY?.K_Bold,
                  color: _COLORS.Kodie_BlackColor,
                }}>
                {_selectedYear}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={navigateToNextMonth}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Entypo name={'chevron-right'} size={22} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20, alignSelf: 'center' }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={searchQuery ? filteredUsers : noticeRemiderDetails}
            keyExtractor={(index, item) => item?.id}
            renderItem={noticeRenderData}
          />
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
      <RBSheet
        ref={refRBSheet}
        height={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: NoticesStyle.bottomModal_container,
        }}>
        <NoticeBottomModal
          onchange={reloadDuplicateData}
          onClose={onClose}
          noticeReminderid={noticeReminderid}
          FinalDeleteProperty={FinalDeleteProperty}
          selectFile={null}
          getNoticeRemiderDetails={getNoticeRemiderDetails}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export default Notices;
