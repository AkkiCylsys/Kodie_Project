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
import VacantModal from '../components/Molecules/VacantModal/VacantModal';
import {Config} from '../Config';
import BottomModalData from '../components/Molecules/BottomModal/BottomModalData';
import {CommonLoader} from '../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

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

const MarketplacePropertyListing = () => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginResponse.....', loginData);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  const CloseUp = () => {
    refRBSheet1.current.close();
    setIsDeleteData_Clicked(false);
  };
  const [expandedItems, setExpandedItems] = useState([]);
  const [PropertyListing_data, setPropertyListingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [propId, setPropId] = useState(0);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const dispatch = useDispatch();

  // Get Api Bind here...
  const get_MarketplacePropertyListing = () => {
    const url = Config.BASE_URL;
    const PropertyListing_url =
      ' https://kodietestapi.cylsys.com/api/v1/property_market_by_account_id';
    setIsLoading(true);
    console.log('Request URL:', PropertyListing_url);
    // setIsLoading(true);
    const PropertyListing_data = {
      account_id: 595,
    };
    axios
      .post(PropertyListing_url, PropertyListing_data)
      .then(response => {
        console.log('API Response PropertyListing_url:', response?.data);
        if (response?.data?.success === true) {
          setPropertyListingData(response?.data?.property_details);
          // console.log("Vacent Details Data..", response?.data?.data);
          setIsLoading(false);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed PropertyListing', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const vacantDelete = async () => {
    setIsDeleteData_Clicked(true);
  };

  const FinalDeleteVacant = async () => {
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    CloseUp();
    const url = Config.BASE_URL;
    const vacantdelete = url + 'delete_property_by_id';
    console.log('vacantdelete', vacantdelete);
    try {
      const response = await axios.delete(vacantdelete);
      console.log('API Response:', response?.data);
      if (response?.data?.success === true) {
        alert(response?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteVacant:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get_MarketplacePropertyListing();
  }, []);
  const propertyData1_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.id);
    setPropId(item.property_id);
    return (
      <>
      <TopHeader
          MiddleText={'Kodie'}
        //   Text_Color={_COLORS.Kodie_BlackColor}
        //   onPressLeftButton={() => props.navigation.openDrawer()}
        //   onPressRightImgProfile={() =>
        //     props.navigation.navigate('LandlordProfile')
        //   }
          // statusBarColor="red"
          // statusBarStyle="dark-content"
        />
        <View style={MarketplacePropertyListingStyle.flatListContainer}>
          <View style={MarketplacePropertyListingStyle.flat_MainView}>
            <View style={MarketplacePropertyListingStyle.flexContainer}>
              <Text style={MarketplacePropertyListingStyle.apartmentText}>
                {item.property_type}
              </Text>
              <Text style={MarketplacePropertyListingStyle.commontext}>
                {item.name}
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
            {/* <Image
              source={{uri: item.image_path[0]}}
              style={MarketplacePropertyListingStyle.imageStyle}
            /> */}
            <View style={MarketplacePropertyListingStyle.flexContainer}>
              <View style={MarketplacePropertyListingStyle.noteStyle}>
                <TouchableOpacity>
                  {/* <Image
                      source={IMAGES.noteBook}
                      style={MarketplacePropertyListingStyle.noteIcon}
                      resizeMode={"contain"}
                    /> */}
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
                  {/* {item.buttonName} */}
                  "+ invite"
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
          height={320}
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
          <VacantModal
            onPress={() => {
              refRBSheet2.current.open();
            }}
            onClose={CloseUp}
            onDeleteData={FinalDeleteVacant}
            propertyId={propId}
            onDelete={vacantDelete}
            isDeletePropertyClicked={isDeleteData_Clicked}
          />
        </RBSheet>

        {/* AddBiddingDetails popup */}
        <RBSheet
          ref={refRBSheet2}
          // closeOnDragDown={true}
          height={760}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: MarketplacePropertyListingStyle.bottomModal_container,
          }}>
          <AddBiddingDetails />
        </RBSheet>

        {/* invite tenent popup */}
        <RBSheet
          ref={refRBSheet3}
          // closeOnDragDown={true}
          height={230}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: MarketplacePropertyListingStyle.bottomModal_container,
          }}>
          <InviteTenant />
        </RBSheet>
      </>
    );
  };
  return (
    <View>
      {/* <FlatList data={property_List1} renderItem={propertyData1_render} /> */}
      <FlatList data={PropertyListing_data} renderItem={propertyData1_render} />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default MarketplacePropertyListing;
