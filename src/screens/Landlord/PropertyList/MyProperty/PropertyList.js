import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  _COLORS,
  LABEL_STYLES,
  IMAGES,
} from '../../../../Themes';
import Modal from 'react-native-modal';
import { PropertyListCSS } from './PropertyListCSS';
import { _goBack } from '../../../../services/CommonServices/index';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomModalData from '../../../../components/Molecules/BottomModal/BottomModalData';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import axios from 'axios';
import { CommonLoader } from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Config } from '../../../../Config';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
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
  console.log('loginData', loginData);
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
  const [isDeleteBottomSheetVisible, setIsDeleteBottomSheetVisible] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredpropertyData, setFilteredpropertyData] = useState([]);
  const swipeableRef = useRef();
  const handleCloseModal = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };
  const CloseUp = () => {
    setIsDeleteBottomSheetVisible(false);
    setIsDeleteData_Clicked(false);
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
  const archiveProperty = async (id) => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const archive_apiUrl = url +'archieve_property';
      const response = await axios.post(archive_apiUrl, {
        property_id: id,
      });
      setPropertyData(prevData =>
        prevData.map(item =>
          item.property_id === id
            ? { ...item, isArchived: true }
            : item
        )
      );
      setTimeout(() => {
        if (response?.data?.success === true) {
          // Remove the item from the list
          getPropertyDetailsByFilter(selectedFilter);
         
          
        } else {
          // If the request failed, revert the item to its original state
          setPropertyData(prevData =>
            prevData.map(item =>
              item.property_id === id
                ? { ...item, isArchived: false }
                : item
            )
          );
        }
      }, 200); 
    
    } catch (error) {
      Alert.alert('Error', 'An error occurred while archiving the property.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPropertyDetailsByFilter = async filter => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const filter_apiUrl = url + 'get_property_details_by_filter';
      console.log('filter_apiUrl...', filter_apiUrl);
      const response = await axios.post(filter_apiUrl, {
        property_filter: filter,
        user_account_id: loginData?.Login_details?.user_account_id,
        page_no: 1,
        limit: filter === 'Recent' ? 5 : 10,
        order_col: '1',
        order_wise: 'DESC',
      });
      //alert(JSON.stringify(response))
      setPropertyData(response?.data?.property_details);
      console.log('property Data....', response?.data?.property_details);
      setIsLoading(false);
    } catch (error) {
      // Alert.alert('Warning', error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  const renderRightActions = (id, isArchived,location) => {
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
          }}
        >
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="white" />
          <Text style={PropertyListCSS.actionText}>More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[PropertyListCSS.actionButton, PropertyListCSS.archiveButton]}
          onPress={() => archiveProperty(id)}
        >
          <MaterialCommunityIcons name="archive" size={24} color="white" />
          <Text style={PropertyListCSS.actionText}>{selectedFilter == 'Archive' ? 'Unarchive' : 'Archive'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getPropertyDetailsByFilter(selectedFilter);
  }, [selectedFilter, isvisible]);

  const handleEndReached = () => {
    if (!isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const propertyDelete = async () => {
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
    try {
      const url = Config.BASE_URL;
      const response = await axios.delete(url + 'delete_property_by_id', {
        data: JSON.stringify({ property_id: propertyDelId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('API Response:', response?.data);
      if (response?.data?.success === true) {
        Alert.alert(
          'Property Deleted',
          response?.data?.message || 'The property was deleted successfully.',
        );

        getPropertyDetailsByFilter(selectedFilter);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
      Alert.alert('Warning', error?.response?.data?.message);
    }
  };

  const horizontal_render = ({ item }) => {
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
                    : _COLORS?.Kodie_BlackColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            PropertyListCSS.item_style,
            { color: selectedFilter === item ? 'white' : 'black' },
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
  const propertyData1_render = ({ item, index }) => {
const isArchived = item.isArchived;
    const isExpanded = expandedItems.includes(item.property_id);
    return (
      <Swipeable
        // ref={swipeableRef}
        // overshootRight={false}
        // onSwipeableWillClose={() => {
        //   if (item.isArchived) {
        //     swipeableRef.current?.close(); 
        //   }
        // }}
         renderRightActions={() => renderRightActions(item.property_id, isArchived,item.location)} >
        <TouchableOpacity
          style={[

            { flex: 1, backgroundColor: item.isArchived ? _COLORS.Kodie_GreenColor : _COLORS.Kodie_WhiteColor } // Apply green background if archived
          ]}
          onPress={() => {
            props?.onPropertyView?.({
              propertyid: item?.property_id,
            });
          }}>
          {item.result ? null : (
            <>
             {
              item.isArchived ? <View style={[PropertyListCSS.actionsContainer,{justifyContent:'flex-start',alignItems:'center'}]}> 
               <TouchableOpacity
                style={[PropertyListCSS.actionButton, PropertyListCSS.archiveButton,{height:120}]}
              >
                <MaterialCommunityIcons name="archive" size={24} color="white" style={{justifyContent:'flex-start',alignSelf:'center'}}/>
                <Text style={PropertyListCSS.actionText}>{selectedFilter == 'Archive' ? 'Unarchive' : 'Archive'}</Text>
              </TouchableOpacity>
              </View> : (
              <>
          
              <View key={index} style={PropertyListCSS.flatListContainer}>
               
                      <View style={PropertyListCSS.flat_MainView}>
                        <View style={PropertyListCSS.flexContainer}>
                          <Text style={PropertyListCSS.apartmentText}>
                            {item.property_type}
                          </Text>
                          <Text style={LABEL_STYLES.commontext}>
                            {item.state ? item.state : item.city}
                          </Text>
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
                        {item.image_path && item.image_path.length > 0 ? (
                          <Image
                            source={{ uri: item?.image_path[0] }}
                            style={PropertyListCSS.imageStyle}
                            resizeMode="cover"
                          />
                        ) : (
                          <View
                            style={[
                              PropertyListCSS.imageStyle,
                              { justifyContent: 'center' },
                            ]}>
                            <Text style={PropertyListCSS.Img_found}>
                              {'Image not found'}
                            </Text>
                          </View>
                        )}

                        <View
                          style={[
                            PropertyListCSS.flexContainer,
                            { alignSelf: 'center' },
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
                                color={_COLORS.Kodie_LightGrayColor}
                                resizeMode={'contain'}
                              />
                              {/* <Image
                    source={IMAGES.noteBook}
                    style={PropertyListCSS.noteIcon}
                  /> */}
                            </TouchableOpacity>
                            <View style={{ margin: 3 }} />
                            <TouchableOpacity
                              style={{}}
                              onPress={() => {
                                // refRBSheetDelete.current.open();
                                setIsDeleteBottomSheetVisible(true);
                                setPropertyDelId(item.property_id);
                                // alert(propertyDelId);
                                setAddress(item?.location);
                                setPropId(item?.property_id);
                                console.log('property id..', item.property_id);
                              }}>
                              <MaterialCommunityIcons
                                name={'dots-horizontal'}
                                size={25}
                                color={_COLORS.Kodie_LightGrayColor}
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
                            {/* <View
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
                /> */}
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
                              {'+ Invite Tenant'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <DividerIcon
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
                            setExpandedItems([...expandedItems, item.property_id]);
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
                    <Text style={LABEL_STYLES.commonMidtext}>Weekly rent</Text>
                    <Text style={LABEL_STYLES.commontext}>
                      {item.rent || '$0'}
                    </Text>
                  </View>
                  <View style={[PropertyListCSS.rentView]}>
                    <Text style={LABEL_STYLES.commonMidtext}>Total spend</Text>
                    <Text style={LABEL_STYLES.commontext}>
                      {item.spend || `$0`}
                    </Text>
                  </View>
                </View>
              )}
              <DividerIcon />
              </>
              )}
            </>
          )}
        </TouchableOpacity>
      </Swipeable>
    );
  };
  const propertyData2_render = ({ item }) => {
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

  return (
    <GestureHandlerRootView style={PropertyListCSS.mainContainer}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 50 }}>
        <View style={PropertyListCSS.Container}>
          <RowButtons
            LeftButtonText={'Properties I own'}
            leftButtonHeight={40}
            leftButtonbackgroundColor={
              activeScreen
                ? _COLORS.Kodie_WhiteColor
                : _COLORS.Kodie_lightGreenColor
            }
            LeftButtonborderColor={
              activeScreen
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_lightGreenColor
            }
            RightButtonText={'Properties I rent'}
            RightButtonbackgroundColor={
              activeScreen
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonborderColor={
              activeScreen
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_GrayColor
            }
            LeftButtonTextColor={
              activeScreen ? _COLORS.Kodie_GrayColor : _COLORS.Kodie_BlackColor
            }
            RightButtonTextColor={
              activeScreen ? _COLORS.Kodie_BlackColor : _COLORS.Kodie_GrayColor
            }
            RightButtonHeight={40}
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
        </View>
        <DividerIcon
          borderBottomWidth={9}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
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
        <DividerIcon
          borderBottomWidth={9}
          color={_COLORS.Kodie_LiteWhiteColor}
        />

        <SearchBar
          filterImage={IMAGES.filter}
          frontSearchIcon
          marginTop={3}
          searchData={searchPropertyList}
          textvalue={searchQuery}
        />
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
            height: isDeleteData_Clicked ? '30%' : '35%',
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
        />
      </Modal>
      {isLoading ? <CommonLoader /> : null}
    </GestureHandlerRootView>
  );
};

export default PropertyList;
