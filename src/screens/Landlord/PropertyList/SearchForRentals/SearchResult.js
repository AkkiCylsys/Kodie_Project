import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {_COLORS, LABEL_STYLES, BANNERS, IMAGES} from '../../../../Themes';
import {SearchResultCss} from './SearchResultCss';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from './../../../../services/CommonServices/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SliderBox} from 'react-native-image-slider-box';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {FONTFAMILY, fontFamily} from '../../../../Themes/FontStyle/FontStyle';
import BottomModalSearchRental from '../../../../components/Molecules/BottomModal/BottomModalSearchRental';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FavouriteServices} from '../../../../services/FavouriteServices/FavouriteServces';
import {useSelector} from 'react-redux';
import moment from 'moment';
export default SearchResult = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userAccountId = loginData?.Login_details?.user_account_id;
  const userId = loginData?.Login_details?.user_id;
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [likedItems, setLikedItems] = useState({});
  const [rentalAmount, setRentalAmount] = useState('');
  const [bibId, setBidId] = useState('');
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [propertyDetailsItem, setPropertyDetailsItem] = useState([]);
  const [landlordId, setLandlordId] = useState([]);
  const [allSearchResult, setAllSearchResult] = useState([]);
  const keyFeatureMapping = {};
  additionalfeatureskey.forEach(detail => {
    keyFeatureMapping[detail.paf_key] = detail.features_name;
  });
  const [propertyId, setPropertyId] = useState('');
  const [keyFeature, setKeyFeature] = useState([]);
  const searchRentalResponse = props?.route?.params?.searchRentalResponse;
  const searchInputData = props?.route?.params?.searchInputData;
  const propertyType = searchInputData?.input_PropertyType;
  const AllCountsData = props?.route?.params?.AllCountsData;
  console.log('propertyType..', propertyType);
  console.log('AllCountsData...', AllCountsData);
  console.log('searchRentalResponse...', JSON.stringify(searchRentalResponse));
  console.log('searchInputData..', searchInputData);
  useEffect(() => {
    additional_key_features();
  }, []);

  const parkingGarageSpaces = AllCountsData.find(item =>
    item.hasOwnProperty('Parking / garage spaces'),
  )['Parking / garage spaces'];

  // Find the object with "On-street parking"
  const onStreetParking = AllCountsData.find(item =>
    item.hasOwnProperty('On-street parking'),
  )['On-street parking'];

  console.log('Parking / garage spaces:', parkingGarageSpaces);
  console.log('On-street parking:', onStreetParking);

  const handleFavouriteItem = async propertyId => {
    setIsLoading(true);
    const favourtiesPayload = {
      user_id: userId,
      uad_key: userAccountId,
      favorite_type: 'property',
      favorite_ref_id: propertyId,
      is_active: likedItems[propertyId] ? 0 : 1,
      created_by: userAccountId.toString(),
    };
    console.log('favourtiesPayload..', favourtiesPayload);
    try {
      const response = await FavouriteServices(favourtiesPayload);
      console.log('response in FavouriteServices', response);
      if (response?.success === true) {
        alert(response?.message);
      }
    } catch (error) {
      console.error('Error fetchingFavouriteServices', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = propertyId => {
    setLikedItems(prevState => ({
      ...prevState,
      [propertyId]: !prevState[propertyId],
    }));
    handleFavouriteItem(propertyId);
  };

  const onClose = () => {
    refRBSheet.current.close();
  };
  // Api intrigation...
  const additional_key_features = async () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'get_key_features';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    await axios
      .get(additionalApi)
      .then(response => {
        console.log('additional_Data', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('additional key_features....', response?.data);
          setAdditionalfeatureskey(response?.data?.key_features_details);
          console.log(
            'AdditionalFeaturesKey....',
            response?.data?.key_features_details,
          );
        } else {
          console.error('additional_features_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('additional_features error:', error);
        setIsLoading(false);
      });
  };
  const propertyData2_render = ({item, index}) => {
    const available = item?.property_avaliable ? item?.property_avaliable : ''; // Fallback to default date if not available
    const availableDate = moment(available); // Convert to moment object
    const currentDate = moment();
    // Determine if the available date is in the past or present
    const isAvailableNow = availableDate.isSameOrBefore(currentDate, 'day');
    console.log(item, 'details');
    const keyFeatures = JSON.parse(item.key_features);
    return (
      <>
        {/* This is important comment we will uncomment this in the future */}

        {/* <View style={[SearchResultCss.flat_MainView]}>
          <TouchableOpacity style={SearchResultCss.bidsButton}>
            <Text style={SearchResultCss.bidsButtonText}>Accepting bids</Text>
          </TouchableOpacity>
          <Text style={SearchResultCss.biddingText}>Bidding closes in:</Text>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'o days'}</Text>
          </View>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'6 hrs'}</Text>
          </View>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'10 mins'}</Text>
          </View>
        </View> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ViewRentalDetails', {
              propertyId: item?.property_id,
              rentalAmount: item?.rental_amount,
              searchRentalData: item,
            });
          }}>
          {setKeyFeature(item?.key_features)}
          {item?.image_path && item?.image_path.length != 0 ? (
            <View style={{}}>
              <SliderBox
                images={item?.image_path}
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
                inactiveDotColor={_COLORS.Kodie_GrayColor}
                dotColor={_COLORS.Kodie_GreenColor}
                // autoplay={false}
                circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                dotStyle={SearchResultCss.dotStyle}
                ImageComponentStyle={{
                  flex: 1,
                  resizeMode: 'cover',
                }}
              />
            </View>
          ) : (
            <View>
              <Image
                source={BANNERS?.imageNotFound} // Set your default image path
                style={{width: '100%', height: 200, resizeMode: 'cover'}}
              />
            </View>
          )}
          <View style={SearchResultCss.apartmentmainView}>
            <View>
              <Text
                style={[
                  SearchResultCss.propertyHeading,
                  {fontFamily: FONTFAMILY.K_Regular},
                ]}>
                {item?.property_type || ''}
              </Text>
              <Text style={[SearchResultCss.propertyHeading, {marginTop: 5}]}>
                {`$${item?.rental_amount || '0'}`}
              </Text>
            </View>
            <View style={SearchResultCss.shareIcon}>
              <TouchableOpacity>
                <Entypo
                  color={_COLORS.Kodie_ExtraminLiteGrayColor}
                  name="share"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleLike(item.property_id);
                  setPropertyId(item.property_id);
                }}>
                <AntDesign
                  color={
                    likedItems[item.property_id]
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_ExtraminLiteGrayColor
                  }
                  name={likedItems[item.property_id] ? 'heart' : 'hearto'}
                  size={25}
                  style={{marginHorizontal: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                  setPropertyId(item?.property_id);
                  setRentalAmount(item?.rental_amount);
                  setBidId(item?.bid_id);
                  setPropertyDetailsItem(item);
                  setLandlordId(item?.landlord_id);
                  setAllSearchResult(item);
                }}>
                <Entypo
                  color={_COLORS.Kodie_ExtraminLiteGrayColor}
                  name="dots-three-horizontal"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={SearchResultCss.locationView}>
            <Entypo
              color={_COLORS.Kodie_GreenColor}
              name="location-pin"
              size={20}
            />
            <Text
              style={SearchResultCss.location}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.location || ''}
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={[
                SearchResultCss.availableBtn,
                {
                  backgroundColor: isAvailableNow
                    ? _COLORS.Kodie_minDarkGreenColor // Use the color for 'AVAILABLE: NOW'
                    : _COLORS.Kodie_LightOrange, // Use the color for future date
                  borderColor: isAvailableNow
                    ? _COLORS.Kodie_minDarkGreenColor // Border color for 'AVAILABLE: NOW'
                    : _COLORS.Kodie_LightOrange,
                },
              ]}>
              <Text
                style={[
                  SearchResultCss.availabletext,
                  {
                    color: isAvailableNow
                      ? _COLORS.Kodie_GreenColor // Text color for 'AVAILABLE: NOW'
                      : _COLORS.Kodie_DarkOrange, // Text color for future date
                  },
                ]}>
                {isAvailableNow
                  ? 'AVAILABLE: NOW'
                  : `AVAILABLE: ${availableDate.format('DD-MMM-YYYY')}`}
              </Text>
              <View style={{flex: 1}} />
            </View>
          </View>
          <View style={SearchResultCss.bedCountView}>
            <View style={SearchResultCss.locationView}>
              <View style={SearchResultCss.circleIconView}>
                {/* Circle view to hold the icon */}
                <Ionicons
                  color={_COLORS.Kodie_GreenColor}
                  name="bed-outline"
                  size={16}
                />
              </View>
              <Text style={SearchResultCss.bedcont}>
                {
                  keyFeatures.find(obj => obj.hasOwnProperty('Bedrooms'))
                    ?.Bedrooms
                }
              </Text>
            </View>
            <View style={SearchResultCss.locationView}>
              <View style={SearchResultCss.circleIconView}>
                {/* Circle view to hold the icon */}
                <MaterialCommunityIcons
                  color={_COLORS.Kodie_GreenColor}
                  name="shower-head"
                  size={16}
                />
              </View>
              <Text style={SearchResultCss.bedcont}>
                {
                  keyFeatures.find(obj =>
                    obj.hasOwnProperty('Parking / garage spaces'),
                  )?.['Parking / garage spaces']
                }
              </Text>
            </View>
            <View style={SearchResultCss.locationView}>
              <View style={SearchResultCss.circleIconView}>
                {/* Circle view to hold the icon */}
                <Ionicons
                  color={_COLORS.Kodie_GreenColor}
                  name="car"
                  size={16}
                />
              </View>
              <Text style={SearchResultCss.bedcont}>
                {
                  keyFeatures.find(obj => obj.hasOwnProperty('Bathrooms'))
                    ?.Bathrooms
                }
              </Text>
            </View>
            <View style={SearchResultCss.locationView}>
              <View style={SearchResultCss.circleIconView}>
                {/* Circle view for icon */}
                <MaterialCommunityIcons
                  color={_COLORS.Kodie_GreenColor}
                  name="floor-plan"
                  size={16}
                />
              </View>
              <Text style={SearchResultCss.bedcont}>{item?.floor_size}m²</Text>
            </View>
          </View>

          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <SafeAreaView style={SearchResultCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Search results'}
      />
      <View style={SearchResultCss.propertyRentMainView}>
        <View style={SearchResultCss.LeftTextView}>
          <Text style={SearchResultCss.LeftText}>
            {searchInputData?.city || ''}
          </Text>
          <Text style={SearchResultCss.LeftTextRentText}>
            {`${
              propertyType === '22'
                ? 'House'
                : propertyType === '23'
                ? 'Cottage'
                : propertyType === '24'
                ? 'Apartment/Flat'
                : propertyType === '25'
                ? 'Townhouse'
                : propertyType === '26'
                ? 'Land/Vacant Plot'
                : propertyType === '27'
                ? 'Farm'
                : ''
            } $${searchInputData?.input_minRange || ''} to $${
              searchInputData?.input_maxRange || ''
            }; ${AllCountsData[0]?.Bedrooms || ''} Beds; ${
              AllCountsData[1]?.Bathrooms
            } Baths; ${parkingGarageSpaces || ''} parking space; ${
              parkingGarageSpaces || ''
            } on-street parking; ${
              searchInputData?.input_Fur_unFurnished == 67
                ? 'Furnished'
                : 'unfurnished'
            }; ${searchInputData?.input_petFrendly == 0 ? 'Yes' : 'No'}; ${
              searchInputData?.input_secureDeposit == 0 ? 'Yes' : 'No'
            }`}
          </Text>
        </View>
        <View style={SearchResultCss.payButtonMainView}>
          <TouchableOpacity
            style={SearchResultCss.payButtonView}
            onPress={() => {
              _goBack(props);
            }}>
            <Feather name="filter" color={_COLORS.Kodie_GrayColor} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <DividerIcon borderBottomWidth={5} color={_COLORS.Kodie_LiteWhiteColor} />
      <View style={{flex: 1}}>
        {searchRentalResponse?.data &&
        searchRentalResponse?.data?.length > 0 ? (
          <FlatList
            data={searchRentalResponse.data}
            keyExtractor={(item, index) => `item_${index}`}
            renderItem={propertyData2_render}
          />
        ) : (
          <View style={SearchResultCss.noResultView}>
            <Text style={SearchResultCss.noResultText}>
              {'No results found'}
            </Text>
            <Text style={SearchResultCss.noResultSubtext}>
              {'We couldn`t find any exact matches for your search'}{' '}
            </Text>
          </View>
        )}
      </View>
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
          container: SearchResultCss.bottomModal_container,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            marginHorizontal: 10,
          }}
          onPress={() => {
            refRBSheet.current.close();
          }}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
        <BottomModalSearchRental
          onClose={onClose}
          propertyId={propertyId}
          landlordId={landlordId}
          rentalAmount={rentalAmount}
          bibId={bibId}
          propertyDetails={propertyDetailsItem}
          searchRentalData={allSearchResult}
        />
      </RBSheet>
      {/* </ScrollView> */}
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
