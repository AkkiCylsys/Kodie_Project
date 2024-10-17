import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
// import Modal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';
import DividerIcon from '../../Atoms/Devider/DividerIcon';
import BottomModalData from '../BottomModal/BottomModalData';
import {PropertyListingCss} from './PropertyListingCss';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_COLORS, IMAGES, BANNERS} from '../../../Themes';
import AddBiddingDetails from '../AddBiddingDetails/AddBiddingDetails';
import InviteTenant from '../InviteTenant/InviteTenant';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import VacantModal from '../VacantModal/VacantModal';
import {Config} from '../../../Config';
import {CommonLoader} from '../ActiveLoader/ActiveLoader';
import InviteTenantModal from '../InviteTenantModal/InviteTenantModal';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../../../services/axiosInstance';
const PropertyListing = props => {
  const refRBSheet = useRef(null);
  const refRBSheet1 = useRef(null);
  const isvisible = useIsFocused();
  const navigation = useNavigation();
  const Closemodal = () => {
    refRBSheet1.current.close();
  };
  const [auto_List, setAutoList] = useState(0);
  const [expandedItems, setExpandedItems] = useState([]);
  const [sortVacantData, setSortVacantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [propId, setPropId] = useState(0);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const [isDeleteBottomSheetVisible, setIsDeleteBottomSheetVisible] =
    useState(false);
  const [propertyDelId, setPropertyDelId] = useState();
  const [Address, setAddress] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const filteredUsers = props?.filteredUsers;
  const searchQuery = props?.searchQuery;
  const allData = props?.allData;
  const vacantData = props?.vacantData;
  // console.log(allData);
  // const totalPages = Math.ceil(Vacant_data.length / itemsPerPage);

  // Slice data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // const currentData = Vacant_data.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMoreData = () => {
    if (!loading && currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1000); // Simulating a delay, replace with your actual data fetching logic
    }
  };
  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    // setIsDeleteData_Clicked(false);
    // setIsDeleteBottomSheetVisible(false);
    try {
      const url = Config.BASE_URL;
      const response = await axiosInstance.delete('delete_property_by_id', {
        data: JSON.stringify({property_id: propId}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('API Response:', response?.data);
      if (response?.data?.success === true) {
        Alert.alert(
          'Property deleted',
          response?.data?.message || 'The property was deleted successfully.',
        );
        props.get_Vacant_Details();
        refRBSheet.current?.close();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
      // Alert.alert('Warning', error?.response?.data?.message);
    }
  };
  const propertyData1_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.property_id);

    const calculateDaysPast = dateString => {
      if (!dateString) {
        return 0; // Return 0 or another appropriate value for null
      }
      const currentDate = new Date(); // Current date

      const givenDate = new Date(dateString);

      const currentDateOnly = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      const givenDateOnly = new Date(
        givenDate.getFullYear(),
        givenDate.getMonth(),
        givenDate.getDate(),
      );

      const timeDifference = currentDateOnly - givenDateOnly;

      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      return daysDifference;
    };
    const daysPast = calculateDaysPast(item?.created_date);
    return (
      <>
        {item.result ? null : (
          <View
            style={PropertyListingCss.flatListContainer}
            key={item.property_id}>
            <View style={PropertyListingCss.flat_MainView}>
              <View style={PropertyListingCss.flexContainer}>
                <Text style={PropertyListingCss.apartmentText}>
                  {item.property_type}
                </Text>
                <Text
                  style={PropertyListingCss.commontext}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item?.City === null ||
                          item?.City === 'null' ||
                          item?.City === ''
                            ? item?.state || ' '
                            : item?.City || ' '}
                </Text>
                <View style={PropertyListingCss.flat_MainView}>
                  <MaterialCommunityIcons
                    name={'map-marker'}
                    size={12}
                    color={_COLORS.Kodie_GreenColor}
                  />
                  <Text
                    style={PropertyListingCss.locationText}
                    ellipsizeMode="tail"
                    numberOfLines={2}>
                    {item.location}
                  </Text>
                </View>
              </View>
              {item.image_path && item.image_path.length > 0 ? (
                <Image
                  source={{uri: item?.image_path[0]}}
                  style={PropertyListingCss.imageStyle}
                  resizeMode="cover"
                />
              ) : (
                // <View
                //   style={[
                //     PropertyListingCss.imageStyle,
                //     {justifyContent: 'center'},
                //   ]}>
                //   <Text style={PropertyListingCss.Img_found}>
                //     {'Image not found'}
                //   </Text>
                // </View>
                <View
                  style={[
                    PropertyListingCss.imageStyle,
                    {justifyContent: 'center'},
                  ]}>
                  <View style={[{flex: 1}]}>
                    <Ionicons
                      name="images-outline"
                      size={90}
                      color={_COLORS.Kodie_GrayColor}
                      style={[
                        PropertyListingCss.imageStyle,
                        {
                          borderWidth: 0,
                        },
                      ]}
                    />
                  </View>
                </View>
              )}

              <View style={PropertyListingCss.flexContainer}>
                <View style={PropertyListingCss.noteStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('PropertyDetails', {
                        propertyid: item.property_id,
                        editMode: 'editMode',
                      });
                    }}>
                    <SimpleLineIcons
                      name="note"
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setAddress(item?.location);
                      setPropId(item?.property_id);
                      setAutoList(item?.auto_place);
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
                    PropertyListingCss.buttonView,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_LightOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_mostLightGreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                  onPress={() => {
                    refRBSheet1.current.open();
                  }}>
                  <Text
                    style={[
                      PropertyListingCss.buttonText,
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
            <View style={{marginTop: 20}}>
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
          </View>
        )}
        {isExpanded && (
          <View style={PropertyListingCss.expandedContent}>
            <View style={PropertyListingCss.flexContainer}>
              <Text style={PropertyListingCss.commonMidtext}>
                Number of days vacant:
              </Text>
              <Text style={PropertyListingCss.commonDay}>{`${
                daysPast || '0'
              } Days`}</Text>
            </View>

            <View style={[PropertyListingCss.rentView]}>
              <Text style={PropertyListingCss.commonMidtext}>
                Listed price:
              </Text>

              <View style={PropertyListingCss.commonRentview}>
                <Text style={PropertyListingCss.commonRent}>{`$${
                  item?.list_price || '0'
                }`}</Text>
              </View>
            </View>
          </View>
        )}
        <DividerIcon />
      </>
    );
  };
  return (
    <>
      <FlatList
        data={searchQuery ? filteredUsers : vacantData}
        renderItem={propertyData1_render}
        keyExtractor={item => item.property_id}
      />
      <RBSheet
        ref={refRBSheet1}
        height={180}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: PropertyListingCss.bottomModal_container,
        }}>
        <InviteTenantModal onClose={Closemodal} />
      </RBSheet>
      <RBSheet
        ref={refRBSheet}
        height={330}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: PropertyListingCss.bottomModal_container,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            refRBSheet.current.close();
          }}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
        <VacantModal
          propertyId={propId}
          onDeleteData={FinalDeleteProperty}
          Address={Address}
          onClose={() => {
            refRBSheet.current.close();
          }}
          autoList={auto_List}
        />
      </RBSheet>
    </>
  );
};

export default PropertyListing;
