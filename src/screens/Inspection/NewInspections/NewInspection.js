import React, { useState, useEffect, useRef,useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import RBSheet from 'react-native-raw-bottom-sheet';
import TopHeader from "../../../components/Molecules/Header/Header";
import { _goBack } from "../../../services/CommonServices";
import { _COLORS, BANNERS, FONTFAMILY, IMAGES } from "../../../Themes";
import CustomSingleButton from "../../../components/Atoms/CustomButton/CustomSingleButton";
import DividerIcon from "../../../components/Atoms/Devider/DividerIcon";
import SearchBar from "../../../components/Molecules/SearchBar/SearchBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import { Config } from "../../../Config";
import { CommonLoader } from "../../../components/Molecules/ActiveLoader/ActiveLoader";
import { NewInspectionStyle } from "../../Inspection/NewInspections/NewInspectionStyle";
import moment from 'moment';
const HorizontalData = ["All", "Scheduled", "Progress", "Complete", "Cancelled"];
export default NewInspection = (props) => {
  const navigation = useNavigation();
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();
  const refRBSheet2 = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [inspectionfilter, setInspectionfilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [Tim_Key, setTim_key] = useState('');
  const [getinspection, setGetInspection] = useState([]);

  const [_selectedMonthId, set_selectedMonthId] = useState(
    new Date().getMonth() + 1,
  );
  const [_selectedYear, set_selectedYear] = useState(new Date().getFullYear());
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
  const [InspectionDetails, setInspectionDetails] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const getInspectionDeatils = useCallback(() => {
    // API call with the latest values
    getInspectionDeatilsByFilter({
      monthId: _selectedMonthId,
      year: _selectedYear,
      page: 1,
      filter: selectedFilter,
      sortOrder: sortOrder // Latest sortOrder state
    });
  }, [_selectedMonthId, _selectedYear, selectedFilter, sortOrder]); // Include dependencies
  
  useEffect(() => {
    getInspectionDeatils();
  }, [_selectedMonthId, _selectedYear, selectedFilter, sortOrder]);
 
  useEffect(() => {
    if (isFocused) {
      getInspectionDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
        filter: selectedFilter,
      });
      // getInspectionDetails();
    }
  }, [isFocused, _selectedMonthId, _selectedYear, selectedFilter]);
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  
  const sortByDate = debounce(() => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }, 300);
  const searchInspection = query => {
    setSearchQuery(query);
    const filtered = query
      ? InspectionDetails.filter(
        item =>
          item.location &&
          item.location.toLowerCase().includes(query.toLowerCase()),
      )
      : InspectionDetails;
    console.log('filtered.........', filtered);
    setFilteredUsers(filtered);
  }
  const getInspectionDeatilsByFilter = async ({
    monthId,
    year,
    page,
    filter,
  }) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const InspectionDeatilsByFilter_url = `${url}get/AllInspectionDetails/ByFilter`;
      const data = {
        v_Filter: filter,
        P_TIM_CREATED_BY: loginData?.Login_details?.user_account_id,
        p_limit: 10,
        p_order_wise: sortOrder === 'asc' ? 'ASC' : 'DESC',
        P_TIM_IS_MONTHS: monthId.toString(),
        P_TIM_IS_YEAR: year,
        p_page: 1,
      };
      console.log(data);
      const response = await axios.post(InspectionDeatilsByFilter_url, data);
      if (response?.data?.success === true) {
        setInspectionDetails(response?.data?.data);
        console.log('Updated inspection details:', response?.data?.data);
      } else {
        setInspectionDetails([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.response,'dssad');
      if (error.response && error.response.status === 500) {
        Alert.alert(
          'Warning',
          error.response.data.message || 'Internal server issue'
        );
      } else if (error.response.status === 404) {
        setInspectionDetails([]);
      }
      console.error('API Error InspectionDeatilsByFilter:', error);
      setIsLoading(false);
    }
  };

  const getInspectionDetails = (id) => {
    setIsLoading(true);
    const url = Config.BASE_URL;

    const apiUrl = url + `get_inspection_details/${id}`;

    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response: getinspection', response?.data?.data[0]);
        setGetInspection(response?.data?.data[0]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails CIP:', error);
      });
  };
  const handleDeleteInspection = async () => {
    refRBSheet2.current.close();

    console.log('Attempting to delete inspection...');
    const url = Config.BASE_URL;
    const deleteUrl = `${url}delete_inspection_details/${Tim_Key}`;
    setIsLoading(true)
    try {
      const response = await axios.delete(deleteUrl);
      console.log('Response from delete inspection:', response?.data);
      if (response?.data?.success) {
        Alert.alert('Success', response?.data?.message);
        // Alert.alert(JSON.stringify(response?.data))
        await getInspectionDeatilsByFilter({
          monthId: _selectedMonthId,
          year: _selectedYear,
          filter: selectedFilter,
        });
        setIsLoading(false)

      } else {
        Alert.alert('Error', 'Failed to delete inspection');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete inspection');
      console.error('Error:', error.response || error.message);
    }
  };


  const SubmitInspection = async () => {
    // alert(selectedAddress?.property_id)
    setIsLoading(true);
    try {
      const Inspectiondata = {
        UPD_KEY: getinspection.v_UPD_KEY,
        TIM_INSPECTION_TYPE: getinspection.v_TIM_INSPECTION_TYPE,
        TIM_SCHEDULE_TIME: getinspection.v_TIM_SCHEDULE_TIME,
        TIM_SCHEDULE_DATE: moment(getinspection.v_TIM_SCHEDULE_DATE).format(
          'YYYY-MM-DD',
        ),
        TIM_LOCATION: getinspection.v_TIM_LOCATION,
        TIM_LOCATION_LONGITUDE: parseFloat(
          getinspection.v_TIM_LOCATION_LONGITUDE,
        ),
        TIM_LOCATION_LATITUDE: parseFloat(
          getinspection.v_TIM_LOCATION_LATITUDE,
        ),
        TIM_ADD_ATTENDENCE: getinspection.v_TIM_ADD_ATTENDENCE == null ? "":getinspection.v_TIM_ADD_ATTENDENCE,
        TIM_IS_FURNISHED: getinspection.v_TIM_IS_FURNISHED,
        TIM_DESCRIPTION: getinspection.v_TIM_DESCRIPTION == null ? "" : getinspection.v_TIM_DESCRIPTION,
        TAM_AREA_KEYS: getinspection.cur_TAM_AREA_KEY,
        CREATED_BY: loginData?.Login_details?.user_account_id.toString(),
      };
      console.log('inspecdup', Inspectiondata);
      const Url = Config.BASE_URL;
      const Inspection_Url = Url + 'inspection_details/save';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axios.post(Inspection_Url, Inspectiondata);
      console.log('scheduule inspection....', res?.data);
      refRBSheet2.current.close();
      if (res?.data?.success == true) {
        alert(res?.data?.message);
        await getInspectionDeatilsByFilter({
          monthId: _selectedMonthId,
          year: _selectedYear,
          filter: selectedFilter,
        });
        setIsLoading(false);
      }
    } catch (error) {
      if (error?.response && error?.response?.status === 404) {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      } else {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreData = () => {
    if (!isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getInspectionDeatilsByFilter({
        monthId: _selectedMonthId,
        year: _selectedYear,
        page: nextPage,
        filter: selectedFilter,
      });
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
    await getInspectionDeatilsByFilter({
      monthId: newMonthId,
      year: newYear,
      filter: selectedFilter,
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
    await getInspectionDeatilsByFilter({
      monthId: newMonthId,
      year: newYear,
      filter: selectedFilter,
    });
  };

  const horizontal_render = ({ item }) => {
    console.log(item,'itemitemitem');
    return (
      <TouchableOpacity
        style={[
          NewInspectionStyle.flatlistView,
          selectedFilter === item && NewInspectionStyle.selectedFilter,
          {
            backgroundColor:
              selectedFilter === item
                ? _COLORS?.Kodie_BlackColor
                : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        onPress={() => {
          setSelectedFilter(item);
          setPage(1); // Reset to the first page when changing the filter
          getInspectionDeatilsByFilter({
            monthId: _selectedMonthId,
            year: _selectedYear,
            page: 1,
            filter: item,
          });
        }}>
        {selectedFilter == item ? null : (
          <View
            style={[
              NewInspectionStyle.round,
              {
                backgroundColor:
                  selectedFilter == item
                    ? _COLORS?.Kodie_WhiteColor
                    : _COLORS?.Kodie_VeryLightGrayColor,
              },
            ]}
          />
        )}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}></View>

        <Text
          style={[
            NewInspectionStyle.item_style,
            {
              color: selectedFilter == item ?  _COLORS?.Kodie_WhiteColor :_COLORS?. Kodie_VeryLightGrayColor,
            },
          ]}>
          {item}
        </Text>
        {selectedFilter == item ? (
          <MaterialCommunityIcons
            name={'check'}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  const Inspection_render = ({ item, index }) => {
    const getDate = new Date(item.scheduled_date);
    const dayOfMonth = getDate.getDate(); // Extracts the day of the month
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeek = daysOfWeek[getDate.getDay()];
    return (
      <>
      {item?.inspection_id == null ? null:
        <>
        <TouchableOpacity
          style={NewInspectionStyle.insp_data_View}
          onPress={() => {
            props.navigation.navigate('PropertyInspection', {
              TIM_KEY: item.tim_key,
              ViewInspection: 'ViewInspection',
              PropertyId: item?.inspection_id,
            });
          }}>
          <View style={NewInspectionStyle.insp_cld_main_view}>
            <Text style={NewInspectionStyle.insp_cld_date}>{dayOfMonth}</Text>
            <Text
              style={NewInspectionStyle.insp_cld_Text}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {dayOfWeek}
            </Text>
            <Text style={NewInspectionStyle.insp_cld_Text}>
              {item?.scheduled_time}
            </Text>
          </View>
          <View style={{ flex: 0.4 }}>
            {item.image_path && item.image_path.length > 0 ? (
              <Image
                source={{ uri: item?.image_path[0] }}
                style={NewInspectionStyle.img_Sty}
              />
            ) : (
              <View
                style={[
                  NewInspectionStyle.img_Sty,
                  { justifyContent: 'center' },
                ]}>
                <Text
                  style={{
                    fontSize: 12,
                    color: _COLORS?.Kodie_BlackColor,
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  {'Image not found'}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 2 }}>
            <View style={NewInspectionStyle.location_main_view}>
              <Entypo
                name="location-pin"
                size={18}
                color={_COLORS.Kodie_GreenColor}
                style={{marginTop:6 }}
              />
              <Text style={NewInspectionStyle.location_text}>
                {item.location}
              </Text>
              <View style={{ margin: 6 }} />
              <TouchableOpacity
                onPress={() => {
                  setTim_key(item?.tim_key);
                  refRBSheet2.current.open();
                  getInspectionDetails(item?.tim_key)
                }}>
                <Entypo
                  name="dots-three-horizontal"
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </View>
            <View style={NewInspectionStyle.user_main_view}>
              <View style={NewInspectionStyle.user_main_view}>
                <Image
                  source={item.userImg}
                  style={NewInspectionStyle.user_img_sty}
                />
                <Text style={NewInspectionStyle.user_name_text}>
                  {item.userName}
                </Text>
              </View>
              <TouchableOpacity style={[NewInspectionStyle.in_progress_view, {
                backgroundColor: 
                item.key === 'Complete' ? _COLORS.Kodie_lightGreenColor
                  :item.key === 'Scheduled' ? '#E7F1FF'
                    : item.key === 'Progress' ? _COLORS?.Kodie_LightOrange
                      : '#FFD9D9'

              }]}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  <View style={{height:7,width:7,borderRadius:7/2,margin:5,backgroundColor: 
                item.key === 'Complete' ? _COLORS.Kodie_ExtraDarkGreen
                  :item.key === 'Scheduled' ? '#336FC3'
                    : item.key === 'Progress' ? _COLORS?.Kodie_DarkOrange
                      : _COLORS.Kodie_redColor}}/>
                <Text style={[NewInspectionStyle.in_progress_txt,{color: 
                item.key === 'Complete' ? _COLORS.Kodie_ExtraDarkGreen
                  :item.key === 'Scheduled' ? '#336FC3'
                    : item.key === 'Progress' ? _COLORS?.Kodie_DarkOrange
                      : _COLORS.Kodie_redColor

              }]}>
                  {item.key}
                </Text>
                </View>
               
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View style={NewInspectionStyle.subContainer}>
          <DividerIcon />
        </View>
      </>
      }
     </>
    );
  };

  return (
    <SafeAreaView style={NewInspectionStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Inspections'}
      />

      <View style={NewInspectionStyle.subContainer}>
        <CustomSingleButton
          _ButtonText={'Create new inspection'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          onPress={() => {
            props.navigation.navigate('CreateNewInspection');
          }}
          disabled={isLoading ? true : false}
          marginTop={22}
          marginBottom={8}
        />
      </View>
      <DividerIcon borderBottomWidth={10} color={_COLORS.Kodie_LiteWhiteColor} />
      <SearchBar
        frontSearchIcon
        filterImage={IMAGES.up_down_Arrow}
        updownSearch
        height={48}
        marginTop={10}
        searchData={searchInspection}
        placeholder="Search inspections"
        SortedData={sortByDate}
        upArrow={sortOrder == 'asc' ? 'long-arrow-up' : 'long-arrow-down'}
        downArrow={sortOrder == 'asc' ? 'long-arrow-down' : 'long-arrow-up'}
      />
      <View style={NewInspectionStyle.flat_MainView}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={HorizontalData}
          renderItem={horizontal_render}
          keyExtractor={item => item}
        />
      </View>
      <DividerIcon />
      <ScrollView>
        <View style={NewInspectionStyle.containerStyle}>
          <TouchableOpacity
            onPress={navigateToPreviousMonth}
            style={NewInspectionStyle.leftButtonStyle}>
            <Entypo name={'chevron-left'} size={22} color={'black'} />
          </TouchableOpacity>
          <View style={NewInspectionStyle.textContainerStyle}>
            <View style={NewInspectionStyle.textItemStyle}>
              <Text style={NewInspectionStyle.textStyle}>
                {_MONTHS.find(month => month.id === _selectedMonthId)?.name}{' '}
              </Text>
            </View>
            <View style={NewInspectionStyle.textItemStyle}>
              <Text style={NewInspectionStyle.textStyle}>{_selectedYear}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={navigateToNextMonth}
            style={NewInspectionStyle.rightButtonStyle}>
            <Entypo name={'chevron-right'} size={22} color={'black'} />
          </TouchableOpacity>
        </View>
        <DividerIcon />
        <FlatList
          data={searchQuery ? filteredUsers : InspectionDetails}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          // keyExtractor={(item) => item.inspection_id.toString()}
          renderItem={Inspection_render}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
        // ListFooterComponent={isLoading && page > 1 ? <CommonLoader /> : null}
        />
      </ScrollView>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={210}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: NewInspectionStyle.bottomModal_container,
        }}>
        <View style={NewInspectionStyle.Container}>
          <TouchableOpacity
            style={NewInspectionStyle.modalFile}
            onPress={() => {
              refRBSheet2.current.close();
              props.navigation.navigate('CreateNewInspection', {
                TIM_KEY: Tim_Key,
                Ins_editMode: 'Ins_editMode',
              });
            }}>
            <View style={NewInspectionStyle.deleteIconView}>
              <SimpleLineIcons
                name="note"
                size={25}
                color={_COLORS.Kodie_GreenColor}
                resizeMode={'contain'}
              />
            </View>
            <Text style={NewInspectionStyle.editText}>Edit inspection</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={NewInspectionStyle.modalFile}
            onPress={SubmitInspection}>
            <View style={NewInspectionStyle.deleteIconView}>
              <MaterialCommunityIcons
                name="file-multiple-outline"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
            </View>
            <Text style={NewInspectionStyle.editText}>
              Duplicate inspection
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={NewInspectionStyle.modalFile}
            onPress={handleDeleteInspection}>
            <View style={NewInspectionStyle.deleteIconView}>
              <MaterialIcons
                name="delete-outline"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
            </View>
            <Text style={NewInspectionStyle.editText}>Delete inspection</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
