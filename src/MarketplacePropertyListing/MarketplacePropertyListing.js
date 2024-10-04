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
import axios from 'axios';
import PropertyModal from '../components/PropertyModal/PropertyModal';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../components/Molecules/SearchBar/SearchBar';
import {_goBack} from '../services/CommonServices';
import {useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
const HorizontalData = [
  'All',
  'Recent',
  'Occupied',
  'Vacant',
  'Rent Pending',
  'Rent Received',
  'Archive',
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
  const [expandedItemId, setExpandedItemId] = useState(null);
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
                    : _COLORS?.Kodie_BlackColor,
              },
            ]}
          />
        )}
        <Text
          style={[
            MarketplacePropertyListingStyle.item_style,
            {color: selectedFilter === item ? 'white' : 'black'},
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
  const get_MarketplacePropertyListing = () => {
    const url = Config.BASE_URL;
    const PropertyListing_url = url + 'property_market_by_account_id';
    setIsLoading(true);
    console.log('Request URL:', PropertyListing_url);
    // setIsLoading(true);
    const PropertyListing_id = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    axios
      .post(PropertyListing_url, PropertyListing_id)
      .then(response => {
        console.log(
          'Property Market Details Retrieve Successfully:',
          JSON.stringify(response?.data),
        );
        if (response?.data?.success === true) {
          setPropertyListingData(response?.data?.property_details);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error?.response?.status === 400) {
          setPropertyListingData([]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
        console.error('API failed PropertyListing', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // delete marketplace list
  const FinalDeleteVacant = async () => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const response = await axios.delete(url + 'delete_property_by_id', {
        data: JSON.stringify({property_id: propId}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('API Response:', response?.data);
      if (response?.data?.success === true) {
        Alert.alert('Property deleted', response?.data?.message);
        get_MarketplacePropertyListing();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
    }
  };
  useEffect(() => {
    if (isvisible) {
      get_MarketplacePropertyListing();
    }
  }, [isvisible]);

  const propertyData1_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.property_id);
    const calculateDaysPast = dateString => {
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
                <Text style={MarketplacePropertyListingStyle.commontext}>
                  {item?.state ? item?.state : item?.city}
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
        data={searchQuery ? filteredMarketPlace : PropertyListing_data}
        renderItem={propertyData1_render}
      />
      {isLoading ? <CommonLoader /> : null}
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        height={300}
        closeOnPressMask={false}
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
        <TouchableOpacity
          style={MarketplacePropertyListingStyle.crossIcon}
          onPress={() => {
            refRBSheet1.current.close();
          }}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
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
