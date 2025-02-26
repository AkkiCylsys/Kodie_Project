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
import RBSheet from 'react-native-raw-bottom-sheet';
import TopHeader from '../components/Molecules/Header/Header';
import DividerIcon from '../components/Atoms/Devider/DividerIcon';
import {MarketplacePropertyListingStyle} from './MarketplacePropertyListingStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_COLORS, IMAGES, BANNERS} from '../Themes';
import AddBiddingDetails from '../components/Molecules/AddBiddingDetails/AddBiddingDetails';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Config} from '../Config';
import {CommonLoader} from '../components/Molecules/ActiveLoader/ActiveLoader';
import PropertyModal from '../components/PropertyModal/PropertyModal';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../components/Molecules/SearchBar/SearchBar';
import {_goBack} from '../services/CommonServices';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListEmptyComponent from '../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import {deletePropertySevices} from '../services/PropertyModule/PropertyModul';
import {PropertyListingDetails} from '../services/PropertyListing/ListingServices';
const HorizontalData = [
  'All',
  // 'Recent',
  'Occupied',
  'Vacant',
  'Rent Pending',
  'Rent Received',
  // 'Archive',
];
const MarketplacePropertyListing = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const refRBSheet1 = useRef();
  const CloseUp = () => {
    refRBSheet1.current.close();
  };
  const [expandedItems, setExpandedItems] = useState([]);
  const [PropertyListing_data, setPropertyListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [propId, setPropId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [Address, setAddress] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMarketPlace, setFilteredMarketPlace] = useState([]);
  const [listingCurrentDate, setListingCurrentDate] = useState('');

  const viewMarketPlace = props?.route?.params?.viewMarketPlace;
  const isvisible = useIsFocused();
  const horizontal_render = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          MarketplacePropertyListingStyle.flatlistView,
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
              MarketplacePropertyListingStyle.round,
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
            MarketplacePropertyListingStyle.item_style,
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
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  // search propertyList....
  const searchaMarketPlaceList = query => {
    setSearchQuery(query);
    const filtered = query
      ? PropertyListing_data.filter(
          item =>
            item.property_type_text &&
            item.property_type_text.toLowerCase().includes(query.toLowerCase()),
        )
      : PropertyListing_data;
    console.log('filtered.........', filtered);
    setFilteredMarketPlace(filtered);
  };
  // Get Api Bind here...
  // const get_MarketplacePropertyListing = async() => {
  //   setIsLoading(true);
  //   const PropertyListing_id = {
  //     account_id: loginData?.Login_details?.user_account_id,
  //   };
  //  const ListingRes = await PropertyListingDetails(PropertyListing_id)
  //       if (ListingRes?.success === true) {
  //         setPropertyListingData(ListingRes?.property_details);
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //       }
  // };

  const get_MarketplacePropertyListing = async () => {
    try {
      setIsLoading(true); // Start loading

      const PropertyListing_id = {
        account_id: loginData?.Login_details?.user_account_id,
      };

      const ListingRes = await PropertyListingDetails(PropertyListing_id);

      console.log("ListingRes...marketplace",ListingRes)
      if (ListingRes?.success) {
        setPropertyListingData(ListingRes.property_details); // Set property data
      }
    } catch (error) {
      // You can also show a user-friendly error message here if needed
    } finally {
      setIsLoading(false); // Ensure loading stops whether the request is successful or fails
    }
  };

  // delete marketplace list
  const FinalDeleteVacant = async () => {
    console.log('propertyDelId:', propId);
    setIsLoading(true);

    try {
      if (!propId) {
        throw new Error('Invalid property ID. Please try again.');
      }

      const propertyIdString = String(propId); // Ensure property ID is a string
      const data = {property_id: propertyIdString};
      console.log('Data being sent:', data);
      const deletePropertyResponse = await deletePropertySevices(data);
      console.log('API Response:', deletePropertyResponse); // Log the response

      Alert.alert(
        'Property deleted',
        deletePropertyResponse?.message ||
          'The property was deleted successfully.',
      );
      await get_MarketplacePropertyListing(); // Refresh property details
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'An error occurred. Please try again.';
      Alert.alert('Warning', errorMessage);
    } finally {
      setIsLoading(false); // Ensure loading is disabled even after error
    }
  };
  useEffect(() => {
    if (isvisible) {
      get_MarketplacePropertyListing();
    }
  }, [isvisible]);

  const filteredData = searchQuery
    ? filteredMarketPlace.filter(item =>
        item.property_type_text
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()),
      )
    : PropertyListing_data.filter(item => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'Occupied') return item.isOccupied;
        if (selectedFilter === 'Vacant') return item.isVacant;
        if (selectedFilter === 'Rent Pending') return item.isRentPending;
        if (selectedFilter === 'Rent Received') return item.isRentReceived;
        return false;
      });

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
      <View>
        {item.result ? null : (
          <View style={MarketplacePropertyListingStyle.flatListContainer}>
            <View style={MarketplacePropertyListingStyle.flat_MainView}>
              <View style={MarketplacePropertyListingStyle.flexContainer}>
                <Text style={MarketplacePropertyListingStyle.apartmentText}>
                  {item.property_type_text}
                </Text>
                <Text
                  style={MarketplacePropertyListingStyle.commontext}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item?.city ? item?.city : item?.state}
                </Text>
                <View style={MarketplacePropertyListingStyle.flat_MainView}>
                  <MaterialCommunityIcons
                    name={'map-marker'}
                    size={12}
                    color={_COLORS.Kodie_GreenColor}
                    style={{marginTop: 2}}
                  />
                  <Text
                    style={MarketplacePropertyListingStyle.locationText}
                    ellipsizeMode="tail"
                    numberOfLines={2}>
                    {item.location}
                  </Text>
                </View>
              </View>
              {item?.image_path && item?.image_path.length > 0 ? (
                <Image
                  source={{uri: item?.image_path[0]}}
                  style={MarketplacePropertyListingStyle.imageStyle}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    MarketplacePropertyListingStyle.imageStyle,
                    {justifyContent: 'center'},
                  ]}>
                  <View style={[{flex: 1}]}>
                    <Ionicons
                      name="images-outline"
                      size={90}
                      color={_COLORS.Kodie_GrayColor}
                      style={[
                        MarketplacePropertyListingStyle.imageStyle,
                        {
                          borderWidth: 0,
                        },
                      ]}
                    />
                  </View>
                </View>
              )}
              <View style={MarketplacePropertyListingStyle.flexContainer}>
                <View style={MarketplacePropertyListingStyle.noteStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('PropertyDetails', {
                        propertyid: item?.property_id,
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
                      refRBSheet1.current.open();
                      setPropId(item?.property_id);
                      setAddress(item?.location);
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
                    MarketplacePropertyListingStyle.buttonView,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_LightOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_mostLightGreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                  onPress={() => {
                    props?.navigation?.navigate('Invitefriend');
                  }}>
                  <Text
                    style={[
                      MarketplacePropertyListingStyle.buttonText,
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
          <View style={MarketplacePropertyListingStyle.expandedContent}>
            <View style={MarketplacePropertyListingStyle.flexContainer}>
              <Text style={MarketplacePropertyListingStyle.commonMidtext}>
                Number of days listed:
              </Text>
              <Text style={MarketplacePropertyListingStyle.commonDay}>
                {`${daysPast} Days`}
              </Text>
            </View>

            <View style={[MarketplacePropertyListingStyle.rentView]}>
              <Text style={MarketplacePropertyListingStyle.commonMidtext}>
                Listed price:
              </Text>

              <View style={MarketplacePropertyListingStyle.commonRentview}>
                <Text style={MarketplacePropertyListingStyle.commonRent}>
                  {`$${item?.list_price}`}
                </Text>
              </View>
            </View>
          </View>
        )}
        <DividerIcon />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <TopHeader
        onPressLeftButton={() =>
          viewMarketPlace
            ? props.navigation.navigate('VacantPropertiesList')
            : _goBack(props)
        }
        MiddleText={'Property listings'}
      />

      <SearchBar
        filterImage={IMAGES.filter}
        frontSearchIcon
        marginTop={16}
        placeholder={'Search properties'}
        searchData={searchaMarketPlaceList}
      />

      <View style={MarketplacePropertyListingStyle.Container}>
        <View style={MarketplacePropertyListingStyle.flat_MainView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={HorizontalData}
            renderItem={horizontal_render}
          />
        </View>
      </View>

      <DividerIcon borderBottomWidth={2} />
      <FlatList
        // data={searchQuery ? filteredMarketPlace : PropertyListing_data}
        data={filteredData}
        renderItem={propertyData1_render}
        ListEmptyComponent={() => {
          return (
            <ListEmptyComponent
              EmptyText={"You don't have data at the moment."}
            />
          );
        }}
      />
      {isLoading ? <CommonLoader /> : null}
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        height={300}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
            width: 40,
            height: 4,
            borderRadius: 2,
          },
          container: MarketplacePropertyListingStyle.bottomModal_container,
        }}>
        {/* <TouchableOpacity
          style={MarketplacePropertyListingStyle.crossIcon}
          onPress={() => {
            refRBSheet1.current.close();
          }}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity> */}
        <PropertyModal
          onClose={CloseUp}
          propertyId={propId}
          Address={Address}
          deletelist={FinalDeleteVacant}
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export default MarketplacePropertyListing;
