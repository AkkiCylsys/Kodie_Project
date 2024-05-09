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
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {NoticesStyle} from './NoticesStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {_COLORS, IMAGES, FONTFAMILY} from '../../../Themes';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import Notice from '../../../components/Molecules/Notice/Notice';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RBSheet from 'react-native-raw-bottom-sheet';
import NoticeBottomModal from '../../../components/Molecules/Select/NoticeBottomModal';
import {Config} from '../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import moment from 'moment/moment';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars'; //calender
import {debounce} from 'lodash';
const HorizontalData = [
  {filtername: 'All', filterId: 'All'},
  {filtername: 'General', filterId: '367'},
  {filtername: 'Inspection', filterId: '368'},
  {filtername: 'Rent', filterId: '369'},
  {filtername: 'Job', filterId: '370'},
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
  console.log('loginResponse.....', loginData);
  const [isLoading, setIsLoading] = useState(false);
  const [noticeRemiderDetails, setNoticeRemiderDetails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(['All']);
  const [noticeReminderid, setNoticeReminderid] = useState('');
  const refRBSheet = useRef();
  const [_MONTHS, set_MONTHS] = useState([
    {id: 1, name: 'January'},
    {id: 2, name: 'February'},
    {id: 3, name: 'March'},
    {id: 4, name: 'April'},
    {id: 5, name: 'May'},
    {id: 6, name: 'June'},
    {id: 7, name: 'July'},
    {id: 8, name: 'August'},
    {id: 9, name: 'September'},
    {id: 10, name: 'October'},
    {id: 11, name: 'November'},
    {id: 12, name: 'December'},
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleYear, setIsModalVisibleyear] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [_selectedMonthId, set_selectedMonthId] = useState(
    new Date().getMonth() + 1,
  ); // Initialize with current month ID
  const [_selectedYear, set_selectedYear] = useState(new Date().getFullYear()); // Initialize with current year

  const generateYears = startYear => {
    return Array.from({length: 12}, (_, index) => startYear - index);
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
  const searchNoticesList = () => {};
  const onDayPress = day => {
    //......
    setSelectedDate(day.dateString);
  };

  const onClose = () => {
    refRBSheet.current.close();
  };

  useEffect(() => {
    if (isFocused) {
      getNoticesReminderDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
        selectedFilter: selectedFilter,
      });
    }
  }, [isFocused, selectedFilter]);
  const horizontal_render = ({item}) => {
    return (
      <TouchableOpacity
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
                  : _COLORS?.Kodie_BlackColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            NoticesStyle.item_style,
            {
              color: selectedFilter.includes(item.filterId) ? 'white' : 'black',
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

  const noticeRenderData = ({item, index}) => {
    return (
      <View style={NoticesStyle.mainContainer}>
        <View style={NoticesStyle.dateDayview}>
          <Text style={NoticesStyle.datetext}>
            {moment(item.to_date).format('M/D ddd')}
          </Text>
        </View>
        <View style={NoticesStyle.middatabindview}>
          <View style={NoticesStyle.bindview}>
            <Image source={IMAGES.redLine} style={NoticesStyle.lineimg} />
            <View style={NoticesStyle.headinglineview}>
              <Text style={NoticesStyle.headintext}>{item.type_notice}</Text>
              <View style={NoticesStyle.addressviewbind}>
                <EvilIcons
                  name="location"
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                />
                <Text style={NoticesStyle.addresstext}>{item.location}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={NoticesStyle.dotsview}
            onPress={() => {
              refRBSheet.current.open();
              setNoticeReminderid(item.id);
              console.log('noticereminderId....', item.id);
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
  const getNoticesReminderDeatilsByFilter = async ({monthId, year}) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const NoticesReminderDeatilsByFilter_url =
        url + 'get_details_by_account_id_notices_reminder';
      console.log(
        'NoticesReminderDeatilsByFilter...',
        NoticesReminderDeatilsByFilter_url,
      );
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
        data,
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
        alert(error.response.message);
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
    console.log('noticesDeleteData body.....', noticesDeleteData);
    try {
      const response = await axios.post(noticedelete, noticesDeleteData);
      console.log('API Response:', response.data);
      if (response?.data?.status === true) {
        // Alert.alert("notice Deleted", response?.data?.message);
        alert(response?.data?.data);
        getNoticesReminderDeatilsByFilter(selectedFilter);
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
              props.navigation.navigate('AddNewNotice');
            }}
          />
        </View>

        <DividerIcon style={NoticesStyle.divider} />

        <View style={NoticesStyle.searchview}>
          <SearchBar
            marginTop={1}
            frontSearchIcon
            isFilterImage
            filterImage={IMAGES.up_down_Arrow}
            height={40}
            placeholder="Search notices"
            searchData={searchNoticesList}
          />
        </View>

        <View style={NoticesStyle.Container}>
          <View style={NoticesStyle.flat_MainView}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              keyExtractor={(index, item) => item}
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
              style={{justifyContent: 'center', alignItems: 'center'}}>
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
              style={{justifyContent: 'center', alignItems: 'center'}}>
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
        <View style={{marginTop: 20, alignSelf: 'center'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={noticeRemiderDetails}
            keyExtractor={(index, item) => index.toString()}
            renderItem={noticeRenderData}
          />
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        height={220}
        closeOnDragDown={true}
        // closeOnPressMask={false}
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
          onClose={onClose}
          noticeReminderid={noticeReminderid}
          FinalDeleteProperty={FinalDeleteProperty}
          selectFile={null}
        />
      </RBSheet>
      {/* <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',

            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <FlatList
              data={_MONTHS}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      item.id === _selectedMonthId
                        ? _COLORS?.Kodie_GreenColor
                        : _COLORS?.Kodie_WhiteColor,
                    paddingHorizontal: 7,
                    paddingVertical: 8,
                    borderRadius: 8,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor:
                      item.id === _selectedMonthId
                        ? _COLORS?.Kodie_GreenColor
                        : _COLORS?.Kodie_GrayColor,
                    margin: 5,
                  }}
                  onPress={() => selectMonth(item.id)}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        item.id === _selectedMonthId
                          ? _COLORS?.Kodie_WhiteColor
                          : _COLORS?.Kodie_BlackColor,
                      fontFamily: FONTFAMILY?.K_Bold,
                      alignSelf: 'center',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            /> */}
      {/* <TouchableOpacity
              onPress={toggleModal}
              style={{
                backgroundColor: _COLORS?.Kodie_GreenColor,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingHorizontal: 10,
                paddingVertical: 8,
                marginHorizontal: '30%',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: _COLORS?.Kodie_WhiteColor,
                  fontFamily: FONTFAMILY?.K_Bold,
                  alignSelf: 'center',
                }}>
                {'Done'}
              </Text>
            </TouchableOpacity> */}
      {/* </View>
        </View>
      </Modal> */}
      {/* <Modal
        visible={isModalVisibleYear}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleYearModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',

            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              {_selectedYear > 1803 && (
                <TouchableOpacity onPress={handlePrevYears}>
                  <Entypo name={'chevron-left'} size={22} color={'black'} />
                </TouchableOpacity>
              )}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: _COLORS?.Kodie_BlackColor,
                    fontFamily: FONTFAMILY?.K_Bold,
                    alignSelf: 'center',
                  }}>
                  {generatetopYears(_selectedYear)}
                </Text>
              </View>
              <TouchableOpacity onPress={handleNextYears}>
                <Entypo name={'chevron-right'} size={22} color={'black'} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={generateYears(_selectedYear)}
              keyExtractor={item => item}
              numColumns={3}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor:
                      item === _selectedYear
                        ? _COLORS?.Kodie_GreenColor
                        : _COLORS?.Kodie_WhiteColor,
                    paddingHorizontal: 7,
                    paddingVertical: 8,
                    borderRadius: 8,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor:
                      item === _selectedYear
                        ? _COLORS?.Kodie_GreenColor
                        : _COLORS?.Kodie_GrayColor,
                    margin: 5,
                  }}
                  onPress={() => {
                    selectYear(item);
                    getNoticesReminderDeatilsByFilter(item);
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color:
                        item === _selectedYear
                          ? _COLORS?.Kodie_WhiteColor
                          : _COLORS?.Kodie_BlackColor,
                      fontFamily: FONTFAMILY?.K_Bold,
                      alignSelf: 'center',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal> */}
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default Notices;
