import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import { _COLORS, LABEL_STYLES } from '../../../../Themes';
import { RepairCss } from './RepairCss';
import { _goBack } from '../../../../services/CommonServices/index';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import Entypo from 'react-native-vector-icons/Entypo';
import ArchiveJob from '../../../../components/Molecules/Archive/ArchiveJob/ArchiveJob';
import { Config } from '../../../../Config';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { ArchiveJobStyle } from '../../../../components/Molecules/Archive/ArchiveJob/ArchiveJobStyle';
import BottomModalData from '../../../../components/Molecules/BottomModal/BottomModalData';
import BottomJobModal from '../../../../components/Molecules/BottomModal/BottomJobModal';
import Modal from 'react-native-modal';
import { CommonLoader } from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import { color } from 'react-native-reanimated';
import ListEmptyComponent from '../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import { getJobDeleteServices, getJobListFilterRequestServices, getJobListFilterServices } from '../../../../services/JobModuleServices/JobModuleServices';
const HorizontalData = ['All', 'Scheduled', 'Pending', 'Complete - Paid'];
export default Repair = props => {
  const isvisible = useIsFocused();
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '4';
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
  const job_sub_type_req = props.job_sub_type_req;

  const roleArray = userRole ? userRole.split(',') : [];
  const hasTenantRole = roleArray.includes('2'); // Tenant role (2)
  const hasLandlordRole = roleArray.includes('3'); // Landlord role (3)
  const hasContractorRole = roleArray.includes('4'); // Contractor role (4)

  const renderRowButtons = () => {
    const renderSingleButton = buttonText => (
      <CustomSingleButton
        _ButtonText={buttonText}
        Text_Color={_COLORS.Kodie_BlackColor}
        text_Size={14}
        backgroundColor={_COLORS.Kodie_lightGreenColor}
        height={45}
        onPress={() => { }}
        disabled={isLoading ? true : false}
      />
    );
    if (hasContractorRole) {
      return (
        <RowButtons
          LeftButtonText={'Jobs I am servicing'}
          leftButtonHeight={45}
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
            activeScreen ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_BlackColor
          }
          RightButtonTextColor={
            activeScreen ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
          }
          RightButtonHeight={45}
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
      );
    }

    if (hasTenantRole || hasLandlordRole) {
      return renderSingleButton('Jobs I have requested');
    }

    return null;
  };

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
  const getJobDetailsByFilter = async (filter = 'Recent') => {
    setIsLoading(true);  // Start loading
    try {
      // Build the request payload
      const jobDetailsRequestPayload = {
        job_filter: filter,
        user_account_id: loginData?.Login_details?.user_account_id ?? '', // Ensure fallback value if undefined
        page_no: 1,
        limit: filter === 'Recent' ? 5 : 10,  // Dynamic limit based on filter type
        order_col: '8',
        order_wise: 'DESC',
      };

      console.log('payload of job filter...',jobDetailsRequestPayload)

      // Call API service with payload
      const response = await getJobListFilterRequestServices(jobDetailsRequestPayload);

      // Check if data exists and set it
      if (response?.data?.job_details) {
        setJobData(response.data.job_details);
        console.log('Job data in requested:', response.data.job_details);

        // Optional: Access specific nested data safely
        if (response?.data?.job_details?.job_sub_type) {
          console.log('Job sub type:', response.data.job_details.job_sub_type);
        }
      } else {
        console.warn('No job details found.');
      }
    } catch (error) {
      // Handle specific errors like 500, and other types of errors
      if (error.response && error.response.status === 500) {
        console.error('Server error:', error.response.message || 'Internal Server Error');
      } else {
        console.error('Error in fetching job details:', error.message || 'Unknown error occurred');
      }
    } finally {
      setIsLoading(false);  // Stop loading in both success and failure cases
    }
  };

  // job i have servicing...
  const getJobDetails_Filter_Service = async (filter = 'Recent') => {
    setIsLoading(true);

    try {
      const jobServicingPayload = {
        job_filter: filter,
        user_account_id: loginData?.Login_details?.user_account_id ?? '', // Ensure fallback value
        page_no: 1,
        limit: filter === 'Recent' ? 5 : 10,
        order_col: '8',
        order_wise: 'DESC',
      };

      const response = await getJobListFilterServices(jobServicingPayload);

      // Set the data only if it's available
      if (response?.data?.job_details) {
        setServicingJobData(response.data.job_details);
        console.log('Job data for servicing:', response.data.job_details);
      } else {
        console.warn('No job details found');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Server error: ', error.response.message);
      } else {
        console.error('API error: ', error.message || 'Unknown error occurred');
      }
    } finally {
      setIsLoading(false); // Ensures the loading state is turned off in both success and failure cases
    }
  };
  useEffect(() => {
    if (isvisible) {
      fetch_filterData();
    }
  }, [selectedFilter, isvisible]);
  const fetch_filterData = async () => {
    await getJobDetailsByFilter(selectedFilter);
    await getJobDetails_Filter_Service(selectedFilter);
  };

  useEffect(() => {
    setActiveScreen(
      myJob_Type == 1 || job_sub_type_req == 1
        ? //  ||
        // hasTenantRole ||
        // hasLandlordRole

        true
        : false,
    );
  }, []);
  const jobDelete = async () => {
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteJob = async () => {
    setIsLoading(true);  // Start loading
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);

    try {
      // Call the API service to delete the job
      const response = await getJobDeleteServices(JobId);

      // Check if the deletion was successful
      if (response?.data?.success) {
        Alert.alert('Job Deleted', response.data.message);

        // Refresh job details after deletion
        await getJobDetailsByFilter(selectedFilter);
        await getJobDetails_Filter_Service(selectedFilter);
      } else {
        console.warn('Job deletion failed:', response?.data?.message);
      }
    } catch (error) {
      console.error('API Error in FinalDeleteJob:', error.message || error);
      Alert.alert('Error', 'An error occurred while trying to delete the job.');
    } finally {
      setIsLoading(false);  // Stop loading in all cases (success or error)
    }
  };
  const horizontal_render = ({ item }) => {
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
            { color: selectedFilter === item ? 'white' : 'gray' },
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
  const propertyData_render1 = ({ item }) => {
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
              <View style={[RepairCss.flat_MainView]}>
                <View style={RepairCss.flexContainer}>
                  <Text style={[LABEL_STYLES.commontext]}>
                    {item.service_looking}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commonMidtext,
                    ]}>{`Ref #${item.job_reference}`}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    RepairCss.buttonView,
                    {
                      backgroundColor: _COLORS.Kodie_minLiteGrayColor,
                    },
                  ]}>
                  <View style={{ alignSelf: 'center' }}>
                    <Entypo
                      name="dot-single"
                      size={23}
                      color={_COLORS?.Kodie_boldGrayColor}
                    />
                  </View>
                  <Text
                    style={[
                      RepairCss.buttonText,
                      {
                        color: _COLORS.Kodie_boldGrayColor,
                      },
                    ]}>
                    {'Pending'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteBottomSheetVisible(true);
                    setJobId(item.job_id);
                    setAddress(`Ref #${item?.job_reference}`);
                  }}
                  style={{ alignSelf: 'center' }}>
                  <Entypo
                    name={'dots-three-horizontal'}
                    size={20}
                    color={_COLORS.Kodie_ExtraminLiteGrayColor}
                    style={{ marginLeft: 15, alignSelf: 'center' }}
                  />
                </TouchableOpacity>
              </View>
              <View style={RepairCss.flat_MainView}>
                <View style={RepairCss.flexContainer}>
                  <View style={RepairCss.propertyView}>
                    <View style={RepairCss.flexContainer}>
                      <Text
                        style={[
                          RepairCss.tom,
                          { color: _COLORS?.Kodie_MediumGrayColor },
                        ]}>{`${item.first_name} ${item.last_name}`}</Text>
                      <View style={RepairCss.locationView}>
                        <MaterialCommunityIcons
                          name={'map-marker'}
                          size={16}
                          color={_COLORS.Kodie_MediumGrayColor}
                          style={{ alignSelf: 'center', marginTop: 3 }}
                        />
                        <Text
                          style={RepairCss.locationText}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
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
        <View style={{ marginHorizontal: 16, marginVertical: 15 }}>
          {/* <View style={RepairCss.BtnView}>{renderRowButtons()}</View> */}
          <RowButtons
            LeftButtonText={'Jobs I am servicing'}
            leftButtonHeight={45}
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
              activeScreen ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_BlackColor
            }
            RightButtonTextColor={
              activeScreen ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
            }
            RightButtonHeight={45}
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
          marginTop={6}
        />
        {/* {hasTenantRole || hasLandlordRole ? ( */}
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
              height={40}
              marginTop={3}
              onPress={activeScreen ? props.onpress : props.servicing_press}
            />
          </View>
          <DividerIcon
            borderBottomWidth={9}
            color={_COLORS.Kodie_LiteWhiteColor}
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
        <DividerIcon borderBottomWidth={2} />
        {activeScreen ? (
          <FlatList
            //  data={JobData}
            data={searchQuery ? filteredRequestpropertyData : JobData}
            renderItem={propertyData_render1}
            ListEmptyComponent={() => {
              return (
                <ListEmptyComponent
                  EmptyText={"You don't have any job at the moment."}
                />
              );
            }}
          />
        ) : (
          // <ArchiveJob />
          <FlatList
            // data={servicingJobData}
            data={
              searchQuery ? filteredServicingpropertyData : servicingJobData
            }
            renderItem={propertyData_render1}
            ListEmptyComponent={() => {
              return (
                <ListEmptyComponent
                  EmptyText={"You don't have any job at the moment."}
                />
              );
            }}
          />
        )}
      </ScrollView>
      <Modal
        isVisible={isDeleteBottomSheetVisible}
        onBackdropPress={() => setIsDeleteBottomSheetVisible(false)}
        style={RepairCss.modalStyle}
        swipeDirection="down"
        onSwipeComplete={handleCloseModal}>
        <View
          style={[
            RepairCss.modalContent,
            // {height: isDeleteData_Clicked ? '30%' : '40%'},
            { height: isDeleteData_Clicked ? '30%' : '33%' },
          ]}>
          <TouchableOpacity
            style={RepairCss.closeButton}
            onPress={handleCloseModal}>
            <View style={RepairCss.centerLine} />
          </TouchableOpacity>

          <BottomJobModal
            JobId={JobId}
            onDelete={jobDelete}
            onCloseModal={handleCloseModal}
            isDeletePropertyClicked={isDeleteData_Clicked}
            onDeleteData={FinalDeleteJob}
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
