import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {_COLORS, LABEL_STYLES, IMAGES, FONTFAMILY} from '../../../../Themes';
import Modal from 'react-native-modal';
import {PropertyListCSS} from './PropertyListCSS';
import {_goBack} from '../../../../services/CommonServices/index';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomModalData from '../../../../components/Molecules/BottomModal/BottomModalData';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListEmptyComponent from '../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import DeviceInfo from 'react-native-device-info';
import { archiveSevices, deletePropertySevices, getPropertyFilterSevice } from '../../../../services/PropertyModule/PropertyModul';
const HorizontalData = [
  'All',
  'Recent',
  'Occupied',
  'Vacant',
  'Rent Pending',
  'Rent Received',
  'Archive',
];
const PropertyList = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  console.log(loginData, 'loginData');
  // const userRole = '3,2';
  const roleArray = userRole ? userRole.split(',') : [];
  const device = DeviceInfo.getUniqueId();
  const deviceId = device?._z
  const deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
  console.log(deviceId,deviceType,'propperty');
  const hasTenantRole = roleArray.includes('2');
  const hasLandlordRole = roleArray.includes('3');
  const hasContractor = roleArray.includes('4');
  const isvisible = useIsFocused();
  const [activeScreen, setActiveScreen] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const [propertyDelId, setPropertyDelId] = useState();
  const [Address, setAddress] = useState();
  const [page, setPage] = useState(1);
  const refRBSheet = useRef();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [propertyData, setPropertyData] = useState([]);
  const [propId, setPropId] = useState(0);
  const [auto_List, setAutoList] = useState(0);
  const [isDeleteBottomSheetVisible, setIsDeleteBottomSheetVisible] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredpropertyData, setFilteredpropertyData] = useState([]);
  const swipeableRef = useRef([]);
  const [openSwipeableIndex, setOpenSwipeableIndex] = useState(null);
  const handleCloseModal = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };
  const CloseUp = () => {
    setIsDeleteBottomSheetVisible(false);
    setIsDeleteData_Clicked(false);
    getPropertyDetailsByFilter(selectedFilter);
  };

  const closeSwipeable = index => {
    if (swipeableRef.current[index] && swipeableRef.current[index].close) {
      swipeableRef.current[index].close(); // Close the swipeable at the given index
    }
  };
  // search propertyList....
  const searchPropertyList = query => {
    setSearchQuery(query);
    const filtered = query
      ? propertyData.filter(
          item =>
            item.property_type &&
            item.property_type.toLowerCase().includes(query.toLowerCase()),
        )
      : propertyData;
    console.log('filtered.........', filtered);
    setFilteredpropertyData(filtered);
  };
  const archiveProperty = async id => {
    console.log(id);
    setIsLoading(true);
    try {
      const data = {
        property_id: id,
      }
      const archiveData = await archiveSevices(data)
      setPropertyData(prevData =>
        prevData.map(item =>
          item.property_id === id ? {...item, isArchived: true} : item,
        ),
      );
      setTimeout(() => {
        if (archiveData?.success === true) {
          // alert(archiveData?.message)
          getPropertyDetailsByFilter(selectedFilter);
          swipeableRef.current[id]?.close();
        } else {
          swipeableRef.current[id]?.close();
          setPropertyData(prevData =>
            prevData.map(item =>
              item.property_id === id ? {...item, isArchived: false} : item,
            ),
          );
        }
      }, 200);
    } catch (error) {
      alert(error)
      // Alert.alert('Error', 'An error occurred while archiving the property.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyDetailsByFilter = async (filter) => {
    setIsLoading(true); // Start loading
  
    try {
      // Construct the data for the API call
      const PropertyData = {
        property_filter: filter,
        user_account_id: loginData?.Login_details?.user_account_id,
        page_no: 1,
        limit: filter === 'Recent' ? 5 : 1000, // Adjust limit based on filter type
        order_col: '1', // Sorting column
        order_wise: 'DESC', // Sort in descending order
      };
      console.log("payload filter property..",PropertyData)
      const filterData = await getPropertyFilterSevice(PropertyData);
      if (!filterData || filterData.length === 0) {
        throw new Error('No property data found for the selected filter.');
      }
      setPropertyData(filterData);
      console.log('Property Data:', filterData);
    } catch (error) {
      console.error('Error fetching property details:', error.message || error);
      setPropertyData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRightActions = (id, isArchived, location, index) => {
    if (isArchived) return null;
    return (
      <View style={PropertyListCSS.actionsContainer}>
        <TouchableOpacity
          style={[PropertyListCSS.actionButton, PropertyListCSS.moreButton]}
          onPress={() => {
            setIsDeleteBottomSheetVisible(true);
            setPropertyDelId(id);
            setAddress(location);
            setPropId(id);
          }}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={24}
            color="white"
          />
          <Text style={PropertyListCSS.actionText}>More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[PropertyListCSS.actionButton, PropertyListCSS.archiveButton]}
          onPress={() => {
            archiveProperty(id);
            swipeableRef.current[index]?.close(); // Close the specific swipeable
          }}>
          <MaterialCommunityIcons name="archive" size={24} color="white" />
          <Text style={PropertyListCSS.actionText}>
            {selectedFilter == 'Archive' ? 'Unarchive' : 'Archive'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      // Fetch property details whenever the screen is focused
      getPropertyDetailsByFilter(selectedFilter);
  
    }, [selectedFilter])
  );
  const handleEndReached = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const propertyDelete = async () => {
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteProperty = async () => {
    console.log('propertyDelId:', propertyDelId);
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  
    try {
      if (!propertyDelId) {
        throw new Error('Invalid property ID. Please try again.');
      }
  
      const propertyIdString = String(propertyDelId); // Ensure property ID is a string
      const data = { property_id: propertyIdString };
      console.log('Data being sent:', data);
      const deletePropertyResponse = await deletePropertySevices(data);
      console.log('API Response:', deletePropertyResponse); // Log the response
  
        Alert.alert(
          'Property deleted',
          deletePropertyResponse?.message || 'The property was deleted successfully.')
        await getPropertyDetailsByFilter(selectedFilter); // Refresh property details
  
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred. Please try again.';
      Alert.alert('Warning', errorMessage);
    } finally {
      setIsLoading(false); // Ensure loading is disabled even after error
    }
  };
  
  const horizontal_render = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          PropertyListCSS.flatlistView,
          {
            backgroundColor:
              selectedFilter === item
                ? _COLORS?.Kodie_BlackColor
                : _COLORS?.Kodie_WhiteColor,
          },
        ]}
        onPress={() => setSelectedFilter(item)}>
        {selectedFilter === item ? null : (
          <View
            style={[
              PropertyListCSS.round,
              {
                backgroundColor:
                  selectedFilter === item
                    ? _COLORS?.Kodie_WhiteColor
                    : _COLORS?.Kodie_VeryLightGrayColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            PropertyListCSS.item_style,
            {
              color:
                selectedFilter === item
                  ? _COLORS?.Kodie_WhiteColor
                  : _COLORS?.Kodie_VeryLightGrayColor,
            },
          ]}>
          {item}
        </Text>
        {selectedFilter === item ? (
          <MaterialCommunityIcons
            name={'check'}
            size={18}
            color={_COLORS.Kodie_WhiteColor}
            style={{marginLeft: 6}}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  const propertyData1_render = ({item, index}) => {
    const isArchived = item.isArchived;
    const isExpanded = expandedItems.includes(item.property_id);
    return (
      <Swipeable
        ref={ref => (swipeableRef.current[index] = ref)}
        overshootRight={false}
        friction={2}
        onSwipeableWillOpen={() => {
          // Close the currently open swipeable (if any)
          if (openSwipeableIndex !== null && openSwipeableIndex !== index) {
            closeSwipeable(openSwipeableIndex);
          }

          // Set the new swipeable as open
          setOpenSwipeableIndex(index);
        }}
        onSwipeableWillClose={() => {
          // Clear the open swipeable index when it's closed
          if (openSwipeableIndex === index) {
            setOpenSwipeableIndex(null);
          }
        }}
        renderRightActions={() =>
          renderRightActions(item.property_id, isArchived, item.location, index)
        }>
        <TouchableOpacity
          style={[
            {
              flex: 1,
              backgroundColor: item.isArchived
                ? _COLORS.Kodie_GreenColor
                : _COLORS.Kodie_WhiteColor,
            }, // Apply green background if archived
          ]}
          onPress={() => {
            props?.onPropertyView?.({
              propertyid: item?.property_id,
            });
          }}>
          {item.result ? null : (
            <>
              {item?.auto_list == 0 ? null : (
                <View
                  style={{
                    justifyContent: 'center',
                    marginRight: '65%',
                    marginLeft: '6.6%',
                    backgroundColor: _COLORS.Kodie_GreenColor,
                    // paddingVertical: 2,
                    paddingBottom: 4,
                    borderBottomEndRadius: 8,
                    borderBottomStartRadius: 8,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      fontFamily: FONTFAMILY.K_SemiBold,
                      color: _COLORS.Kodie_WhiteColor,
                    }}>
                    {'Current listing'}
                  </Text>
                </View>
              )}
              {item.isArchived ? (
                <View
                  style={[
                    PropertyListCSS.actionsContainer,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <TouchableOpacity
                    style={[
                      PropertyListCSS.actionButton,
                      PropertyListCSS.archiveButton,
                      {height: 120},
                    ]}>
                    <MaterialCommunityIcons
                      name="archive"
                      size={24}
                      color="white"
                      style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'center',
                      }}
                    />
                    <Text style={PropertyListCSS.actionText}>
                      {selectedFilter == 'Archive' ? 'Unarchive' : 'Archive'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View key={index} style={[PropertyListCSS.flatListContainer]}>
                    <View
                      style={[
                        PropertyListCSS.flat_MainView,
                        {marginBottom: 12},
                      ]}>
                      <View style={PropertyListCSS.flexContainer}>
                        <Text style={PropertyListCSS.apartmentText}>
                          {item.property_type}
                        </Text>
                        <Text
                          style={LABEL_STYLES.commontext}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          {item?.City === null ||
                          item?.City === 'null' ||
                          item?.City === ''
                            ? item?.state || ' '
                            : item?.City || ' '}
                        </Text>
                        <View style={PropertyListCSS.flat_MainView}>
                          <MaterialCommunityIcons
                            name={'map-marker'}
                            size={12}
                            color={_COLORS.Kodie_GreenColor}
                            style={{marginTop: 6}}
                          />
                          <Text
                            style={PropertyListCSS.locationText}
                            ellipsizeMode="tail"
                            numberOfLines={2}>
                            {item.location}
                          </Text>
                        </View>
                      </View>
                      {item.image_path && item.image_path.length > 0 ? (
                        <View style={{flex: 1}}>
                          <Image
                            source={{uri: item?.image_path[0]}}
                            style={[PropertyListCSS.imageStyle]}
                            resizeMode="cover"
                          />
                        </View>
                      ) : (
                        <View style={[{flex: 1}]}>
                          <Ionicons
                            name="images-outline"
                            size={90}
                            color={_COLORS.Kodie_GrayColor}
                            style={[
                              PropertyListCSS.imageStyle,
                              {
                                borderWidth: 0,
                              },
                            ]}
                          />
                        </View>
                      )}

                      <View
                        style={[
                          PropertyListCSS.flexContainer,
                          {alignSelf: 'center'},
                        ]}>
                        <View style={PropertyListCSS.noteStyle}>
                          <TouchableOpacity
                            onPress={() => {
                              props?.onEdit?.({
                                propertyid: item?.property_id,
                              });
                            }}>
                            <SimpleLineIcons
                              name="note"
                              size={25}
                              color={_COLORS.Kodie_ExtraminLiteGrayColor}
                              resizeMode={'contain'}
                            />
                            {/* <Image
                    source={IMAGES.noteBook}
                    style={PropertyListCSS.noteIcon}
                  /> */}
                          </TouchableOpacity>
                          <View style={{margin: 3}} />
                          <TouchableOpacity
                            style={{}}
                            onPress={() => {
                              // refRBSheetDelete.current.open();
                              setIsDeleteBottomSheetVisible(true);
                              setPropertyDelId(item.property_id);
                              // alert(propertyDelId);
                              setAddress(item?.location);
                              setPropId(item?.property_id);
                              setAutoList(item?.auto_list);
                              console.log('property id..', item.auto_list);
                            }}>
                            <MaterialCommunityIcons
                              name={'dots-horizontal'}
                              size={25}
                              color={_COLORS.Kodie_ExtraminLiteGrayColor}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          style={[
                            PropertyListCSS.buttonView,
                            {
                              backgroundColor: item.isRentPanding
                                ? _COLORS.Kodie_LightOrange
                                : item.isRentReceived
                                ? _COLORS.Kodie_mostLightGreenColor
                                : _COLORS.Kodie_LightGrayColor,
                            },
                          ]}
                          onPress={props.onInvite}>
                          <Text
                            style={[
                              PropertyListCSS.buttonText,
                              {
                                color: item.isRentPanding
                                  ? _COLORS.Kodie_DarkOrange
                                  : item.isRentReceived
                                  ? _COLORS.Kodie_GreenColor
                                  : _COLORS.Kodie_ExtraminLiteGrayColor,
                              },
                            ]}>
                            {'+ Invite Tenant'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <DividerIcon
                      color={_COLORS?.Kodie_LiteWhiteColor}
                      IsShowIcon
                      iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
                      onPress={() => {
                        if (isExpanded) {
                          setExpandedItems(
                            expandedItems.filter(
                              property_id => property_id !== item.property_id,
                            ),
                          );
                        } else {
                          setExpandedItems([
                            ...expandedItems,
                            item.property_id,
                          ]);
                        }
                      }}
                    />
                  </View>
                  {isExpanded && (
                    <View style={PropertyListCSS.expandedContent}>
                      <View style={PropertyListCSS.flexContainer}>
                        <Text style={LABEL_STYLES.commonMidtext}>
                          Current tenant:
                        </Text>
                        <Text style={LABEL_STYLES.commontext}>
                          {item.tanentname || 'Vacant'}
                        </Text>
                      </View>

                      <View style={[PropertyListCSS.rentView]}>
                        <Text style={LABEL_STYLES.commonMidtext}>
                          Weekly rent
                        </Text>
                        <Text style={LABEL_STYLES.commontext}>
                          {item.rent || '$0'}
                        </Text>
                      </View>
                      <View style={[PropertyListCSS.rentView]}>
                        <Text style={LABEL_STYLES.commonMidtext}>
                          Total spend
                        </Text>
                        <Text style={LABEL_STYLES.commontext}>
                          {item.spend || `$0`}
                        </Text>
                      </View>
                    </View>
                  )}
                  <DividerIcon marginBottom={item?.auto_list == 0 ? 15 : 15} />
                </>
              )}
            </>
          )}
        </TouchableOpacity>
      </Swipeable>
    );
  };
  const propertyData2_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={PropertyListCSS.flatListContainer}>
          <View style={PropertyListCSS.flat_MainView}>
            <View style={PropertyListCSS.flexContainer}>
              <Text style={PropertyListCSS.apartmentText}>
                {item.propertyName}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
              <View style={PropertyListCSS.flat_MainView}>
                <MaterialCommunityIcons
                  name={'map-marker'}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={PropertyListCSS.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            <Image source={item.image} style={PropertyListCSS.imageStyle} />
            <View style={PropertyListCSS.flexContainer}>
              <View style={PropertyListCSS.noteStyle}>
                <TouchableOpacity>
                  <Image
                    source={IMAGES.noteBook}
                    style={PropertyListCSS.noteIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                  }}>
                  <MaterialCommunityIcons
                    name={'dots-horizontal'}
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  PropertyListCSS.buttonView,
                  {
                    backgroundColor: item.isRentPanding
                      ? _COLORS.Kodie_LightOrange
                      : item.isRentReceived
                      ? _COLORS.Kodie_mostLightGreenColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}>
                <View
                  style={[
                    PropertyListCSS.roundButton,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    PropertyListCSS.buttonText,
                    {
                      color: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}>
                  {item.buttonName}
                </Text>
              </View>
            </View>
          </View>
          <DividerIcon
            IsShowIcon
            iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
            onPress={() => {
              if (isExpanded) {
                setExpandedItems(expandedItems.filter(id => id !== item.id));
              } else {
                setExpandedItems([...expandedItems, item.id]);
              }
            }}
          />
        </View>
        {isExpanded && (
          <View style={PropertyListCSS.expandedContent}>
            <View style={PropertyListCSS.leftIconsView}>
              <Image
                source={IMAGES.BedroomIcon}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>{item.badroom}</Text>
              <Image
                source={IMAGES.Bathroom}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>{item.bathroom}</Text>
              <Image
                source={IMAGES.Parking}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>{item.parking}</Text>
              <Image
                source={IMAGES.AspactRatio}
                style={PropertyListCSS.ImagesStyle}
              />
              <Text style={PropertyListCSS.bedroomStl}>
                {item.aspact_ratio}
              </Text>
            </View>
            <View style={[PropertyListCSS.weeklyRent]}>
              <Text style={LABEL_STYLES.commonMidtext}>Weekly rent</Text>
              <Text style={LABEL_STYLES.commontext}>{item.rent}</Text>
            </View>
          </View>
        )}
        <DividerIcon />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListCSS.bottomModal_container,
          }}>
          <BottomModalData propertyId={propId} />
        </RBSheet>
      </>
    );
  };

  const renderRowButtons = () => {
    // const roleArray = userRole ? userRole.split(',') : [];

    // const hasTenantRole = roleArray.includes('2');
    // const hasLandlordRole = roleArray.includes('3');
    // const hasContractor = roleArray.includes('4');
    const renderSingleButton = buttonText => (
      <CustomSingleButton
        _ButtonText={buttonText}
        Text_Color={_COLORS.Kodie_BlackColor}
        text_Size={14}
        backgroundColor={_COLORS.Kodie_lightGreenColor}
        height={45}
        onPress={() => {}}
        disabled={true}
      />
    );

    if (hasTenantRole && !hasLandlordRole) {
      return renderSingleButton('Properties I rent');
    } else if (hasLandlordRole && !hasTenantRole) {
      return renderSingleButton('Properties I own');
    }

    if (hasTenantRole && hasLandlordRole) {
      return (
        <RowButtons
          LeftButtonText={'Properties I own'}
          // leftButtonHeight={40}
          leftButtonbackgroundColor={
            activeScreen
              ? _COLORS.Kodie_WhiteColor
              : _COLORS.Kodie_lightGreenColor
          }
          LeftButtonborderColor={
            activeScreen ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_GreenColor
          }
          RightButtonText={'Properties I rent'}
          RightButtonbackgroundColor={
            activeScreen
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          RightButtonborderColor={
            activeScreen ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_GrayColor
          }
          LeftButtonTextColor={
            activeScreen ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_BlackColor
          }
          RightButtonTextColor={
            activeScreen ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
          }
          // RightButtonHeight={40}
          onPressLeftButton={() => setActiveScreen(false)}
          onPressRightButton={() => {
            setActiveScreen(true);
            Alert.alert('Properties I rent', 'Coming soon', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  setActiveScreen(false);
                },
              },
            ]);
          }}
        />
      );
    }

    return null;
  };

  return (
    <GestureHandlerRootView style={PropertyListCSS.mainContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginBottom: 50}}>
        <View
          style={[
            PropertyListCSS.Container,
            {marginVertical: userRole == '4' ? 0 : 15},
          ]}>
          {renderRowButtons()}
        </View>
        {userRole == '4' || userRole == '2' ? null : (
          <DividerIcon
            borderBottomWidth={9}
            color={_COLORS.Kodie_LiteWhiteColor}
            // marginTop={1}
          />
        )}
        {/* {userRole == '4' || userRole == '2' ? null : (
          <View style={PropertyListCSS.Container}>
            <CustomSingleButton
              _ButtonText={'+ Add New Property'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              text_Size={14}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={40}
              marginTop={3}
              onPress={props.propertyDetail}
              disabled={isLoading ? true : false}
            />
          </View>
        )} */}
        {hasLandlordRole ? (
          <View style={PropertyListCSS.Container}>
            <CustomSingleButton
              _ButtonText={'+ Add new property'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              text_Size={14}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={45}
              marginTop={3}
              onPress={props.propertyDetail}
              disabled={isLoading ? true : false}
            />
          </View>
        ) : null}
        {!hasLandlordRole ? null : (
          <DividerIcon
            borderBottomWidth={9}
            color={_COLORS.Kodie_LiteWhiteColor}
            // marginTop={1}
          />
        )}
        <View style={{marginTop: userRole == '4' ? 15 : 0}}>
          <SearchBar
            placeholder={'Search properties'}
            filterImage={IMAGES.filter}
            frontSearchIcon
            marginTop={3}
            searchData={searchPropertyList}
            textvalue={searchQuery}
          />
        </View>
        {activeScreen ? (
          <>
            {/* for static that by its hide.... */}
            {/* <DividerIcon /> */}

            {/* <FlatList data={property_List2} renderItem={propertyData2_render} /> */}
            {/* <View style={PropertyListCSS.propertyRentMainView}>
              <View style={PropertyListCSS.LeftTextView}>
                <Text style={PropertyListCSS.LeftText}>
                  Your rent is due. You have not selected autopay as a payment
                  option.
                </Text>
                <Text style={PropertyListCSS.LeftTextRentText}>
                  Would you like to pay your rent now?
                </Text>
              </View>
              <View style={PropertyListCSS.payButtonMainView}>
                <TouchableOpacity style={PropertyListCSS.payButtonView}>
                  <Text style={PropertyListCSS.payButtonText}>
                    Pay $850 now
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </>
        ) : (
          <>
            <View style={PropertyListCSS.Container}>
              <View style={PropertyListCSS.flat_MainView}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={HorizontalData}
                  renderItem={horizontal_render}
                />
              </View>
            </View>
            <DividerIcon />
            <FlatList
              data={searchQuery ? filteredpropertyData : propertyData}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.8}
              renderItem={propertyData1_render}
              keyExtractor={item => item.propertyId}
              ListEmptyComponent={() => {
                return (
                  <ListEmptyComponent
                    EmptyText={"You don't have any property at the moment."}
                  />
                );
              }}
            />
          </>
        )}
      </ScrollView>
      <Modal
        isVisible={isDeleteBottomSheetVisible}
        onBackdropPress={() => setIsDeleteBottomSheetVisible(true)}
        style={[
          PropertyListCSS.bottomModal_container,
          {
            position: 'absolute',
            left: -20,
            bottom: -10,
            width: '100%',
            height: isDeleteData_Clicked ? '28%' : '40%',
            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 8,
          },
        ]}>
        <BottomModalData
          propertyId={propId}
          onDelete={propertyDelete}
          onCloseModal={handleCloseModal}
          isDeletePropertyClicked={isDeleteData_Clicked}
          onDeleteData={FinalDeleteProperty}
          Address={Address}
          onClose={CloseUp}
          autoList={auto_List}
          onArchive={archiveProperty}
        />
      </Modal>
      {isLoading ? <CommonLoader /> : null}
    </GestureHandlerRootView>
  );
};

export default PropertyList;
