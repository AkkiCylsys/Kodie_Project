//ScreenNo:107
//ScreenNo:108
//ScreenNo:109
//ScreenNo:112
//ScreenNo:113
//ScreenNo:114
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {_COLORS, LABEL_STYLES} from '../../../../Themes';
import {RepairCss} from './RepairCss';
import {_goBack} from '../../../../services/CommonServices/index';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import Entypo from 'react-native-vector-icons/Entypo';
import ArchiveJob from '../../../../components/Molecules/Archive/ArchiveJob/ArchiveJob';
import {Config} from '../../../../Config';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {ArchiveJobStyle} from '../../../../components/Molecules/Archive/ArchiveJob/ArchiveJobStyle';
import BottomModalData from '../../../../components/Molecules/BottomModal/BottomModalData';
import BottomJobModal from '../../../../components/Molecules/BottomModal/BottomJobModal';
import Modal from 'react-native-modal';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';

const HorizontalData = ['All', 'Scheduled', 'Pending', 'Complete - Paid', 'Completed'];

const property_List1 = [
  {
    id: '1',
    name: 'Electricals',
    location: '1729 Melbourne St Australia',
    buttonName: 'Awaiting payment',
    tanentname: 'Tom',
    budget: 'Budget',
    spend: '$500',
    readText:
      'My door handle is broken and need some simple repairmen for this and need some Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    isPosted: true,
    isongoing: false,
    isCompleted: false,
    refno: 'Ref #16694',
  },
];
export default Repair = props => {
  const isvisible = useIsFocused();
  const loginData = useSelector(state => state.authenticationReducer.data);
  // console.log('loginResponse.....', loginData);
  // console.log(
  //   'loginresponse_jobdetails..',
  //   loginData?.Login_details?.user_account_id,
  // );
  // const user_role_id = loginData?.Account_details[0]?.user_role_id;
  // alert(user_role_id);

  const account_id = loginData?.Login_details?.user_account_id;
  const [isLoading, setIsLoading] = useState(false);
  const [activeScreen, setActiveScreen] = useState(false);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const [JobId, setJobId] = useState(0);
  const [Job_Id, setJob_Id] = useState(0);
  const [job_sub_type, setJob_sub_type] = useState(0);
  const [job_sub_type_services, setJob_sub_type_services] = useState(0);
  const [Address, setAddress] = useState();
  const [isDeleteBottomSheetVisible, setIsDeleteBottomSheetVisible] =
    useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [JobData, setJobData] = useState([]);
  const [servicingJobData, setServicingJobData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServicingpropertyData, setFilteredServicingpropertyData] =
    useState([]);
  const [filteredRequestpropertyData, setFilteredRequestpropertyData] =
    useState([]);

  const myJob_Type = props.myJob_Type;
  // console.log('myJob_Type in job module', myJob_Type);
  const job_sub_type_req = props.job_sub_type_req;
  console.log('job_sub_type_ser_req....', job_sub_type_req);
  const handleCloseModal = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };

  // search propertyList....
  const searchJobList = query => {
    if (activeScreen) {
      setSearchQuery(query);
      const filtered = query
        ? JobData.filter(
            item =>
              item.service_looking &&
              item.service_looking.toLowerCase().includes(query.toLowerCase()),
          )
        : JobData;
      console.log('filtered job.........', filtered);
      setFilteredRequestpropertyData(filtered);
    } else {
      setSearchQuery(query);
      const filtered = query
        ? servicingJobData.filter(
            item =>
              item.service_looking &&
              item.service_looking.toLowerCase().includes(query.toLowerCase()),
          )
        : servicingJobData;
      console.log('filtered job.........', filtered);
      setFilteredServicingpropertyData(filtered);
    }
  };

  const CloseUp = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };
  // job i have requested...
  const getJobDetailsByFilter = async filter => {
    setIsLoading(true);
    // alert(JSON.stringify(loginData?.Login_details?.user_account_id));
    try {
      const url = Config.BASE_URL;
      const filter_apiUrl = url + 'job/getJobbyFilter';
      console.log('filter_apiUrl...', filter_apiUrl);
      const response = await axios.post(filter_apiUrl, {
        job_filter: filter,
        user_account_id: loginData?.Login_details?.user_account_id,
        page_no: 1,
        limit: filter == 'Recent' ? 5 : 10,
        order_col: '8',
        order_wise: 'DESC',
      });

      setJobData(response?.data?.job_details);
      // console.log('listJobdata', response?.data?.job_details);
      // setJob_sub_type(response?.data?.job_details.job_sub_type);
      console.log('Job_sub_type....', response?.data?.job_details.job_sub_type);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // alert(error.response.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      console.error('API Error JobDetailsByFilter:', error);
      setIsLoading(false);
    }
  };
  // job i have servicing...
  const getJobDetails_Filter_Service = async filter => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const Filter_Service_url = url + 'job/getJobbyFilter_Service';
      console.log('Filter_Service_url...', Filter_Service_url);
      const response = await axios.post(Filter_Service_url, {
        job_filter: filter,
        user_account_id: loginData?.Login_details?.user_account_id,
        page_no: 1,
        limit: filter == 'Recent' ? 5 : 10,
        order_col: '8',
        order_wise: 'DESC',
      });
      // console.log('response.. job by filter ser....', response?.data);
      setServicingJobData(response?.data?.job_details);
      console.log(
        'listJobdata for servicing.....',
        response?.data?.job_details,
      );
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // alert(error.response.message);
        setIsLoading(false);
      } else {
        // alert('An error occurred. Please try again later.');
        setIsLoading(false);
      }
      console.error('API Error JobDetails_Filter_Service:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // if (isvisible) {
    //   getJobDetailsByFilter(selectedFilter);
    //   getJobDetails_Filter_Service(selectedFilter);
    // }
    if (isvisible) {
      fetch_filterData();
    }
  }, [selectedFilter, isvisible]);
  const fetch_filterData = async () => {
    await getJobDetailsByFilter(selectedFilter);
    await getJobDetails_Filter_Service(selectedFilter);
  };

  useEffect(() => {
    setActiveScreen(myJob_Type == 1 || job_sub_type_req == 1 ? true : false);
  }, []);
  const jobDelete = async () => {
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
    const url = Config.BASE_URL;
    const jobdelete = url + `job/deletejob/${JobId}`;
    console.log('jobdelete', jobdelete);
    try {
      const response = await axios.delete(jobdelete);

      // console.log('API Response:', response.data);
      if (response?.data?.success === true) {
        Alert.alert('Job Deleted', response?.data?.message);
        getJobDetailsByFilter(selectedFilter);
        getJobDetails_Filter_Service(selectedFilter);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteProperty :', error);
      setIsLoading(false);
    }
  };
  const horizontal_render = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          RepairCss.flatlistView,
          {
            backgroundColor:
              selectedFilter === item
                ? _COLORS?.Kodie_BlackColor
                : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        // onPress={() => setSelectedFilter(item)}>
        onPress={() => {
          if (activeScreen) {
            setSelectedFilter(item);
          } else {
            setSelectedFilter(item);
          }
        }}>
        {selectedFilter === item ? null : (
          <View
            style={[
              RepairCss.round,
              {
                backgroundColor:
                  selectedFilter === item
                    ? _COLORS?.Kodie_WhiteColor
                    : _COLORS?.Kodie_GrayColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            RepairCss.item_style,
            {color: selectedFilter === item ? 'white' : 'gray'},
          ]}>
          {item}
        </Text>
        {selectedFilter === item ? (
          <MaterialCommunityIcons
            name={'check'}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  <ArchiveJob />;
  const propertyData_render1 = ({item}) => {
    setJob_Id(item?.job_id);
    setJob_sub_type(item.job_sub_type);
    // console.log("job type servicing and request .....", item.job_sub_type);
    return (
      <>
        {item.result ? null : (
          <TouchableOpacity
            onPress={() => {
              props.create_job_id?.(item.job_id);
              console.log('check job id in view mode...', item.job_id);
            }}>
            <View style={RepairCss.Container}>
              <View style={RepairCss.flat_MainView}>
                <View style={RepairCss.flexContainer}>
                  <Text style={LABEL_STYLES.commontext}>
                    {item.service_looking}
                  </Text>
                </View>
                <View style={RepairCss.RightContainer}>
                  <TouchableOpacity
                    style={[
                      RepairCss.buttonView,
                      {
                        backgroundColor: item.isPosted
                          ? _COLORS.Kodie_mostLightBlueColor
                          : item.isongoing
                          ? _COLORS.Kodie_LightOrange
                          : _COLORS.Kodie_mostLightGreenColor,
                      },
                    ]}>
                    <View
                      style={[
                        RepairCss.roundButton,

                        {
                          backgroundColor: item.isPosted
                            ? _COLORS.Kodie_BlueColor
                            : item.isongoing
                            ? _COLORS.Kodie_DarkOrange
                            : _COLORS.Kodie_GrayColor,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        RepairCss.buttonText,
                        {
                          color: item.isPosted
                            ? _COLORS.Kodie_BlueColor
                            : item.isongoing
                            ? _COLORS.Kodie_DarkOrange
                            : _COLORS.Kodie_GrayColor,
                        },
                      ]}>
                      {'Pending'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteBottomSheetVisible(true);
                    setJobId(item.job_id);
                    setAddress(`Ref #${item?.job_reference}`);
                  }}>
                  <Entypo
                    name={'dots-three-horizontal'}
                    size={20}
                    color={_COLORS.Kodie_GrayColor}
                    style={{marginLeft: 15}}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={
                  [LABEL_STYLES.commonMidtext]
                }>{`Ref #${item.job_reference}`}</Text>
              <View style={RepairCss.flat_MainView}>
                <View style={RepairCss.flexContainer}>
                  <View style={RepairCss.propertyView}>
                    <View style={RepairCss.flexContainer}>
                      <Text
                        style={
                          RepairCss.tom
                        }>{`${item.first_name} ${item.last_name}`}</Text>
                      <View style={RepairCss.locationView}>
                        <MaterialCommunityIcons
                          name={'map-marker'}
                          size={12}
                          color={_COLORS.Kodie_MediumGrayColor}
                          style={{alignSelf: 'center'}}
                        />
                        <Text style={RepairCss.locationText}>
                          {item.job_location}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[RepairCss.BudgetView]}>
                  <View style={RepairCss.flexContainer}>
                    <Text style={RepairCss.bugetText}>{'Budget'}</Text>
                    <Text style={RepairCss.spend}>{item.job_max_budget}</Text>
                  </View>
                </View>
              </View>
            </View>
            <DividerIcon />
          </TouchableOpacity>
        )}
      </>
    );
  };
  return (
    <View style={RepairCss.mainContainer}>
      <ScrollView>
        {/* {user_role_id === "4" ? ( */}
        <>
          <View style={RepairCss.BtnView}>
            <RowButtons
              LeftButtonText={'Jobs I am servicing'}
              leftButtonHeight={40}
              LeftButtonfontSize={12}
              leftButtonbackgroundColor={
                activeScreen
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_lightGreenColor
              }
              LeftButtonborderColor={
                activeScreen
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_DarkGreenColor
              }
              RightButtonText={'Jobs I have requested'}
              RightButtonbackgroundColor={
                activeScreen
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonborderColor={
                activeScreen
                  ? _COLORS.Kodie_DarkGreenColor
                  : _COLORS.Kodie_GrayColor
              }
              LeftButtonTextColor={
                activeScreen
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonTextColor={
                activeScreen
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_GrayColor
              }
              RightButtonHeight={40}
              RightButtonfontSize={12}
              onPressLeftButton={() => {
                setActiveScreen(false);
                setSelectedFilter('All');
              }}
              onPressRightButton={() => {
                setActiveScreen(true);
                setSelectedFilter('All');
              }}
            />
          </View>
          <DividerIcon
            borderBottomWidth={9}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
        </>
        {/* ) : null} */}

        {/* {user_role_id === "4" ? ( */}
        <>
          <View style={RepairCss.Container}>
            <CustomSingleButton
              _ButtonText={
                activeScreen ? '+ Create new job request' : '+ Add job'
              }
              disabled={isLoading ? true : false}
              Text_Color={_COLORS.Kodie_WhiteColor}
              text_Size={14}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={44}
              marginTop={3}
              onPress={activeScreen ? props.onpress : props.servicing_press}
            />
          </View>
          <DividerIcon
            borderBottomWidth={9}
            color={_COLORS.Kodie_LiteWhiteColor}
            // marginTop={20}
          />
        </>
        {/* ) : null} */}

        <SearchBar
          frontSearchIcon
          height={48}
          marginTop={5}
          placeholder={'Search jobs'}
          searchData={searchJobList}
        />
        <View style={RepairCss.Container}>
          <View style={RepairCss.flat_MainView}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={HorizontalData}
              renderItem={horizontal_render}
            />
          </View>
        </View>
        <DividerIcon />
        {activeScreen ? (
          <FlatList
            //  data={JobData}
            data={searchQuery ? filteredRequestpropertyData : JobData}
            renderItem={propertyData_render1}
          />
        ) : (
          // <ArchiveJob />
          <FlatList
            // data={servicingJobData}
            data={
              searchQuery ? filteredServicingpropertyData : servicingJobData
            }
            renderItem={propertyData_render1}
          />
        )}
      </ScrollView>
      <Modal
      isVisible={isDeleteBottomSheetVisible}
      onBackdropPress={() => setIsDeleteBottomSheetVisible(false)}
      style={RepairCss.modalStyle}
      swipeDirection="down" 
      onSwipeComplete={handleCloseModal}
    >
      <View style={[RepairCss.modalContent, { height: isDeleteData_Clicked ? '30%' : '40%' }]}>
        <TouchableOpacity
          style={RepairCss.closeButton}
          onPress={handleCloseModal}
        >
          <View style={RepairCss.centerLine} />
        </TouchableOpacity>

        <BottomJobModal
          JobId={JobId}
          onDelete={jobDelete}
          onCloseModal={handleCloseModal}
          isDeletePropertyClicked={isDeleteData_Clicked}
          onDeleteData={FinalDeleteProperty}
          Address={Address}
          onClose={CloseUp}
          // job_sub_type_serv={1}
          // job_sub_type_req={0}
          job_sub_type={job_sub_type}
        />
        </View>
      </Modal>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
