import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TopHeader from '../components/Molecules/Header/Header';
import DividerIcon from '../components/Atoms/Devider/DividerIcon';
import {MarketplacePropertyListingStyle} from './MarketplacePropertyListingStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_COLORS, IMAGES, BANNERS} from '../Themes';
import AddBiddingDetails from '../components/Molecules/AddBiddingDetails/AddBiddingDetails';
import InviteTenant from '../screens/Landlord/InviteTenant/InviteTenant';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Config} from '../Config';
import {CommonLoader} from '../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import PropertyPopup from '../components/PropertyModal/PropertyPopup';
import PropertyModal from '../components/PropertyModal/PropertyModal';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../components/Molecules/SearchBar/SearchBar';
import {_goBack} from '../services/CommonServices';
import {useIsFocused} from '@react-navigation/native';

const HorizontalData = [
  'All',
  'Recent',
  'Occupied',
  'Vacant',
  'Rent Pending',
  'Rent Received',
  'Archive',
];

const property_List1 = [
  {
    id: '1',
    propertyName: 'Apartment',
    name: 'Melbourne',
    location: '8502 Preston Rd. Inglewood',
    image: BANNERS.apartment,
    buttonName: '+ Invite Tenant',
    tanentDay: '27 Days',
    rent: '$850',
    isRentPanding: true,
    isRentReceived: false,
    isinviteTenants: false,
  },

  {
    id: '2',
    propertyName: 'House',
    name: 'Sydney',
    location: '2118 Thornridge Cir. Syracuse',
    image: BANNERS.house,
    buttonName: '+ Invite Tenant',
    tanentDay: '27 Days',
    rent: '$850',
    isRentPanding: false,
    isRentReceived: true,
    isinviteTenants: false,
  },
  {
    id: '3',
    propertyName: 'Cottage',
    name: 'Brisbane',
    location: '1729 Sickle St, QLD, 4010, Australia ',
    image: BANNERS.cottage,
    buttonName: '+ Invite Tenant',
    tanentDay: '27 Days',
    rent: '$850',
    isRentPanding: false,
    isRentReceived: false,
    isinviteTenants: true,
  },
  {
    id: '4',
    propertyName: 'Apartment',
    name: 'Melbourne',
    location: '8502 Preston Rd. Inglewood',
    image: BANNERS.apartment,
    buttonName: '+ Invite Tenant',
    tanentDay: '27 Days',
    rent: '$850',
    isRentPanding: true,
    isRentReceived: false,
    isinviteTenants: false,
  },
  {
    id: '5',
    propertyName: 'House',
    name: 'Sydney',
    location: '2118 Thornridge Cir. Syracuse',
    image: BANNERS.house,
    buttonName: '+ Invite Tenant',
    tanentDay: '27 Days',
    rent: '$850',
    isRentPanding: false,
    isRentReceived: true,
    isinviteTenants: false,
  },
  {
    id: '6',
    propertyName: 'Cottage',
    name: 'Brisbane',
    location: '1729 Sickle St, QLD, 4010, Australia ',
    image: BANNERS.cottage,
    buttonName: '+ Invite Tenant',
    tanentDay: '27 Days',
    rent: '$850',
    isRentPanding: false,
    isRentReceived: false,
    isinviteTenants: true,
  },
];

const MarketplacePropertyListing = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const CloseUp = () => {
    refRBSheet1.current.close();
  };
  const [expandedItems, setExpandedItems] = useState([]);
  const [PropertyListing_data, setPropertyListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [propId, setPropId] = useState(0);

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [Address, setAddress] = useState();
  const isvisible = useIsFocused();
  const handleonClose = () => {
    refRBSheet1.current.close();
  };
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
  // Get Api Bind here...
  const get_MarketplacePropertyListing = () => {
    const url = Config.BASE_URL;
    const PropertyListing_url = url + 'property_market_by_account_id';
    setIsLoading(true);
    console.log('Request URL:', PropertyListing_url);
    // setIsLoading(true);
    const PropertyListing_data = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    axios
      .post(PropertyListing_url, PropertyListing_data)
      .then(response => {
        console.log(
          'Property Market Details Retrieve Successfully:',
          JSON.stringify(response?.data),
        );
        if (response?.data?.success === true) {
          setPropertyListingData(response?.data?.property_details);
          // console.log("Vacent Details Data..", response?.data?.data);
          setIsLoading(false);
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error?.response?.status === 400) {
          setPropertyListingData([]);
          // console.log("Vacent Details Data..", response?.data?.data);
          setIsLoading(false);
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
        console.error('API failed PropertyListing', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isvisible) {
      get_MarketplacePropertyListing();
    }
  }, [isvisible]);
  const propertyData1_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.id);
    setPropId(item.property_id);
    return (
      <View>
        <View style={MarketplacePropertyListingStyle.flatListContainer}>
          <View style={MarketplacePropertyListingStyle.flat_MainView}>
            <View style={MarketplacePropertyListingStyle.flexContainer}>
              <Text style={MarketplacePropertyListingStyle.apartmentText}>
                {item.property_type_text}
              </Text>
              <Text style={MarketplacePropertyListingStyle.commontext}>
                {item.city}
              </Text>
              <View style={MarketplacePropertyListingStyle.flat_MainView}>
                <MaterialCommunityIcons
                  name={'map-marker'}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={MarketplacePropertyListingStyle.locationText}>
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
                <Text style={MarketplacePropertyListingStyle.Img_found}>
                  {'Image not found'}
                </Text>
              </View>
            )}
            <View style={MarketplacePropertyListingStyle.flexContainer}>
              <View style={MarketplacePropertyListingStyle.noteStyle}>
                <TouchableOpacity>
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
              <View
                style={[
                  MarketplacePropertyListingStyle.buttonView,
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
                    MarketplacePropertyListingStyle.roundButton,
                    {
                      backgroundColor: item.isRentPanding
                        ? _COLORS.Kodie_LightGrayColor
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_LightGrayColor,
                    },
                  ]}
                />
                <Text
                  style={[
                    MarketplacePropertyListingStyle.buttonText,
                    {
                      color: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}
                  onPress={() => {
                    refRBSheet3.current.open();
                  }}>
                  {'+ invite Tenant'}
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
          <View style={MarketplacePropertyListingStyle.expandedContent}>
            <View style={MarketplacePropertyListingStyle.flexContainer}>
              <Text style={MarketplacePropertyListingStyle.commonMidtext}>
                Number of days listed:
              </Text>
              <Text style={MarketplacePropertyListingStyle.commonDay}>
                {item.tanentDay}
              </Text>
            </View>

            <View style={[MarketplacePropertyListingStyle.rentView]}>
              <Text style={MarketplacePropertyListingStyle.commonMidtext}>
                Listed price:
              </Text>

              <View style={MarketplacePropertyListingStyle.commonRentview}>
                <Text style={MarketplacePropertyListingStyle.commonRent}>
                  {item.rent}
                </Text>
              </View>
            </View>
          </View>
        )}
        <DividerIcon />
        {/* three dot click popup menu */}
        <RBSheet
          ref={refRBSheet1}
          closeOnDragDown={true}
          height={280}
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
          <PropertyModal
            onClose={CloseUp}
            propertyId={propId}
            Address={Address}
            // OnPopupclose={refRBSheet1}
            RefreshListingData={get_MarketplacePropertyListing}
          />
        </RBSheet>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: _COLORS.Kodie_WhiteColor}}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate('Dashboard')}
        MiddleText={'Propery listings'}
      />

      <SearchBar
        filterImage={IMAGES.filter}
        frontSearchIcon
        marginTop={16}
        placeholder={'Search properties'}
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

      <DividerIcon />
      <FlatList data={PropertyListing_data} renderItem={propertyData1_render} />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default MarketplacePropertyListing;
