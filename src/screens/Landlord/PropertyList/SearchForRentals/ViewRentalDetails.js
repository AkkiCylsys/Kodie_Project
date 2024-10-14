import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {ViewRentalDetailsStyle} from './ViewRentalDetailsStyle';
import {SliderBox} from 'react-native-image-slider-box';
import {BANNERS, _COLORS, FONTFAMILY, LABEL_STYLES} from '../../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import ReadMore from '@fawazahmed/react-native-read-more';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import {DetailsStyle} from '../../AddNewProperty/PropertyReview/Details/DetailsStyles';
import {useSelector} from 'react-redux';
import {FavouriteServices} from '../../../../services/FavouriteServices/FavouriteServces';
import {MapUrlTile} from 'react-native-maps';
import {useFocusEffect} from '@react-navigation/native';
import axiosInstance from '../../../../services/axiosInstance';

const ViewRentalDetails = props => {
  const propertyId = props?.route?.params?.propertyId;
  const rentalAmount = props?.route?.params?.rentalAmount;
  const searchRentalData = props?.route?.params?.searchRentalData;
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userAccountId = loginData?.Login_details?.user_account_id;
  const userId = loginData?.Login_details?.user_id;
  console.log('propertyId in view...', propertyId);
  console.log('searchRentalData in view...', searchRentalData);
  const [isLoading, setIsLoading] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [property_Detail, setProperty_Details] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [additionalKeyFeaturesString, setAdditionalKeyFeaturesString] =
    useState([]);
  const [data, setData] = useState([]);

  const [addtionalFeaturesID, setAddtionalFeaturesID] = useState('');
  const [additionalKeyFeatures, setAdditionalKeyFeatures] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [propertyDetailsClp, setPropertyDetailsClp] = useState(false);
  const [roomClp, setRoomClp] = useState(false);
  const [externalfeaturesClp, setExternalfeaturesClp] = useState(false);
  const [pointOfInterest, setPointOfInterest] = useState(false);
  const [submitApplicationBtn, setSubmitApplicationBtn] = useState(false);
  const [submitApplicationBtnId, setSubmitApplicationBtnId] = useState(0);
  const [favRental, setFavRental] = useState(false);
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw';
  useFocusEffect(
    useCallback(() => {
      // Geolocation.getCurrentPosition(
      //   position => {
      //     const {latitude, longitude} = position.coords;
      //     console.log(latitude, longitude, 'latitude,longitude');
      // alert(property_Detail?.longitude)
      fetchPointsOfInterest(
        property_Detail?.latitude,
        property_Detail?.longitude,
      );
      // fetchPointsOfInterest("33.8849","151.2052");
      // fetchPointsOfInterest("27.149994", "79.499901");
      //   },
      //   error => console.error(error),
      //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      // );

      return () => {
        // Cleanup if necessary when the screen is unfocused
      };
    }, [property_Detail]), // Add necessary dependencies
  );

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

  // will uncomment imn the future..
  // const toggleLike = propertyId => {
  //   setLikedItems(prevState => ({
  //     ...prevState,
  //     [propertyId]: !prevState[propertyId],
  //   }));
  //   handleFavouriteItem(propertyId);
  // };
  const fetchPointsOfInterest = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&type=point_of_interest&key=${GOOGLE_MAPS_API_KEY}`,
      );

      const poiData = categorizeData(response.data.results);
      console.log(JSON.stringify(poiData));
      setData(poiData);
    } catch (error) {
      console.error('Error fetching POIs:', error);
    }
  };

  const categorizeData = places => {
    const categories = {
      'Schools & Education': [],
      'Food & Entertainment': [],
      Health: [],
      Transport: [],
    };

    places.forEach(place => {
      const {name, vicinity} = place;
      const distance = `${(place.distance || Math.random() * 3).toFixed(1)}km`; // Mocking distance
      if (
        place.types.includes('school') ||
        place.types.includes('university')
      ) {
        categories['Schools & Education'].push({name, distance});
      } else if (
        place.types.includes('restaurant') ||
        place.types.includes('food')
      ) {
        categories['Food & Entertainment'].push({name, distance});
      } else if (
        place.types.includes('hospital') ||
        place.types.includes('health')
      ) {
        categories['Health'].push({name, distance});
      } else if (
        place.types.includes('bus_station') ||
        place.types.includes('train_station')
      ) {
        categories['Transport'].push({name, distance});
      }
    });

    return Object.entries(categories).map(([category, items]) => ({
      category,
      items,
    }));
  };

  const renderpointItem = ({item}) => (
    <>
      <View style={DetailsStyle.itemContainer}>
        <Text style={DetailsStyle.itemName}>{item.name}</Text>
        <Text style={DetailsStyle.itemDistance}>{item.distance}</Text>

        {/* <DividerIcon marginTop={5}/> */}
      </View>
    </>
  );

  const renderCategory = ({item}) => (
    <View style={DetailsStyle.categoryContainer}>
      <Text style={DetailsStyle.categoryTitle}>{item.category}</Text>
      <DividerIcon marginTop={5} />

      {item.items.length > 0 ? (
        <FlatList
          data={item.items}
          renderItem={renderpointItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={DetailsStyle.itemName}>----</Text> // Display hyphen if no items
      )}
    </View>
  );
  const images = [
    BANNERS.wallImage,
    BANNERS.BannerFirst,
    BANNERS.BannerSecond,
    BANNERS.previewImage,
  ];
  useEffect(() => {
    {
      propertyId ? fetchData() : null;
    }
    // try {
    //   const keyFeaturesArray = additionalKeyFeaturesString.split(',');
    //   setAdditionalKeyFeatures(keyFeaturesArray);
    // } catch (error) {
    //   console.error('Error parsing additional_key_features:', error);
    // }
  }, [propertyId]);
  const iconMapping = {
    Pool: {component: MaterialIcons, name: 'pool'},
    Garage: {component: MaterialCommunityIcons, name: 'garage'},
    Balcony: {component: MaterialCommunityIcons, name: 'balcony'},
    'Outdoor area': {component: MaterialCommunityIcons, name: 'table-chair'},
    Ensuite: {component: MaterialCommunityIcons, name: 'shower'},
    Dishwasher: {component: MaterialCommunityIcons, name: 'dishwasher'},
    Study: {component: MaterialCommunityIcons, name: 'bookshelf'},
    'Built-in wardrobes': {component: MaterialCommunityIcons, name: 'wardrobe'},
    'Air conditioning': {
      component: MaterialCommunityIcons,
      name: 'air-conditioner',
    },
    'Solar panels': {component: MaterialCommunityIcons, name: 'solar-panel'},
    Heating: {component: MaterialCommunityIcons, name: 'fireplace'},
    'High energy efficiency': {component: SimpleLineIcons, name: 'energy'},
    Bedrooms: {component: MaterialCommunityIcons, name: 'bed-double-outline'},
    Bathrooms: {component: MaterialCommunityIcons, name: 'shower-head'},
    'Parking / garage spaces': {component: Ionicons, name: 'car-outline'},
    'On-street parking': {component: Ionicons, name: 'car-sport-outline'},
    Default: {component: MaterialCommunityIcons, name: 'garage'},
  };
  const Detail_rander = ({item}) => {
    const itemKey = Object.keys(item)[0];
    const itemValue = Object.values(item)[0];
    const IconComponent =
      iconMapping[itemKey]?.component || iconMapping.Default.component;
    const iconName = iconMapping[itemKey]?.name || iconMapping.Default.name;

    return (
      <View style={ViewRentalDetailsStyle.DetailsView}>
        <View style={ViewRentalDetailsStyle.ViewIconStyle}>
          <IconComponent
            name={iconName}
            size={22}
            color={_COLORS.Kodie_GreenColor}
            style={{alignSelf: 'center'}}
          />
        </View>

        <Text style={[ViewRentalDetailsStyle.details_text, {flexShrink: 1}]}>
          {`${itemKey}: ${itemValue}`}
        </Text>
      </View>
    );
  };
  const renderItem = ({item}) => {
    const IconComponent = iconMapping[item]?.component;
    const iconName = iconMapping[item]?.name;

    return (
      <View style={ViewRentalDetailsStyle.DetailsView}>
        <View style={ViewRentalDetailsStyle.ViewIconStyle}>
          {IconComponent && (
            <IconComponent
              name={iconName}
              size={22}
              color={_COLORS.Kodie_GreenColor}
              style={{alignSelf: 'center'}}
            />
          )}
        </View>
        <Text style={[ViewRentalDetailsStyle.details_text, {flexShrink: 1}]}>
          {item}
        </Text>
      </View>
    );
  };
  const parkingSpaceValueObj = Detail.find(
    item => 'Parking / garage spaces' in item,
  );
  const parkingSpaceValue = parkingSpaceValueObj
    ? parkingSpaceValueObj['Parking / garage spaces']
    : null;
  const OnStreetParkingObj = Detail.find(item => 'On-street parking' in item);
  const OnStreetParkingValue = OnStreetParkingObj
    ? OnStreetParkingObj['On-street parking']
    : null;

  // Api intrigation...
  // const fetchData = async () => {
  //   try {
  //     const detailData = {
  //       property_id: propertyId,
  //     };
  //     // const url = `${Config.BASE_URL}get_property_details`;
  //     const url = 'get_property_details';
  //     console.log('url:', url);
  //     setIsLoading(true);

  //     const response = await axiosInstance.post(url, detailData);
  //     setIsLoading(false);

  //     console.log('response_get_property_details:', response?.data);
  //     if (response?.data?.success) {
  //       const propertyDetails = response?.data?.property_details?.[0];
  //       setProperty_Details(propertyDetails);
  //       console.log('type of property:', propertyDetails);

  //       // Fetch and process key features
  //       if (propertyDetails?.key_features) {
  //         try {
  //           const parsedData = JSON.parse(
  //             propertyDetails.key_features.replace(/\\/g, ''),
  //           );
  //           setDetail(parsedData);
  //           console.log('parsedData:', parsedData);
  //         } catch (parseError) {
  //           console.error('Error parsing key features:', parseError);
  //         }
  //       }

  //       const additionalFeatures_id =
  //         response?.data?.property_details[0].additional_features_id;
  //       console.log('additionalFeaturesid....', additionalFeatures_id);
  //       const additionalFeaturesIds = additionalFeatures_id
  //         .split(',')
  //         .map(value => value.trim()); // ['1', '1', '1', '0']
  //       console.log('is_additionalFeaturesid....', additionalFeaturesIds);
  //       setAddtionalFeaturesID(additionalFeaturesIds);
  //       console.log(
  //         'aditioal key feature.. in ..',
  //         JSON.stringify(
  //           response?.data?.property_details[0].additional_key_features || [],
  //         ),
  //       );
  //       setAdditionalKeyFeaturesString(
  //         response?.data?.property_details[0].additional_key_features || [],
  //       );
  //       const keyFeaturesArray = additionalKeyFeaturesString.split(',');
  //       setAdditionalKeyFeatures(keyFeaturesArray);
  //       console.log('setAdditionalKeyFeatures...', additionalKeyFeatures);
  //     } else {
  //       console.error('propertyDetail_error:', response?.data?.error);
  //       // Uncomment if you want to display an alert to the user
  //       // alert('Oops something went wrong! Please try again later.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setIsLoading(false);
  //     // Uncomment if you want to display an alert to the user
  //     // alert('An error occurred while fetching the property details. Please try again.');
  //   }
  // };

  const fetchData = async () => {
    try {
      const detailData = {
        property_id: propertyId,
      };
      const url = 'get_property_details';
      console.log('url:', url);
      setIsLoading(true);
  
      const response = await axiosInstance.post(url, detailData);
      setIsLoading(false);
  
      console.log('response_get_property_details:', response?.data);
      if (response?.data?.success) {
        const propertyDetails = response?.data?.property_details?.[0];
        setProperty_Details(propertyDetails);
        console.log('type of property:', propertyDetails);
  
        // Fetch and process key features
        if (propertyDetails?.key_features) {
          try {
            const parsedData = JSON.parse(propertyDetails.key_features.replace(/\\/g, ''));
            setDetail(parsedData);
            console.log('parsedData:', parsedData);
          } catch (parseError) {
            console.error('Error parsing key features:', parseError);
          }
        }
  
        const additionalFeatures_id = propertyDetails?.additional_features_id;
        console.log('additionalFeaturesid....', additionalFeatures_id);
        const additionalFeaturesIds = additionalFeatures_id
          ? additionalFeatures_id.split(',').map(value => value.trim())
          : []; // Handle case where additionalFeatures_id might be undefined
  
        console.log('is_additionalFeaturesid....', additionalFeaturesIds);
        setAddtionalFeaturesID(additionalFeaturesIds);
  
        console.log('additional key features:', JSON.stringify(propertyDetails.additional_key_features || []));
        const additionalKeyFeaturesString = propertyDetails.additional_key_features || [];
        setAdditionalKeyFeaturesString(additionalKeyFeaturesString);
  
        // Move the splitting logic here after setting additionalKeyFeaturesString
        if (Array.isArray(additionalKeyFeaturesString)) {
          setAdditionalKeyFeatures(additionalKeyFeaturesString);
        } else {
          try {
            const keyFeaturesArray = additionalKeyFeaturesString.split(',');
            setAdditionalKeyFeatures(keyFeaturesArray);
            console.log("setAdditionalKeyFeatures...", keyFeaturesArray);
          } catch (error) {
            console.error('Error parsing additional_key_features:', error);
          }
        }
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        // Uncomment if you want to display an alert to the user
        // alert('Oops something went wrong! Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      // Uncomment if you want to display an alert to the user
      // alert('An error occurred while fetching the property details. Please try again.');
    }
  };
  
  const available = property_Detail?.available; // Fallback to default date if not available
  const availableDate = moment(available); // Convert to moment object
  const currentDate = moment(); // Get current date

  // Determine if the available date is in the past or present
  const isAvailableNow = availableDate.isSameOrBefore(currentDate, 'day');

  return (
    <SafeAreaView style={ViewRentalDetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={property_Detail?.location || ''}
      />
      <ScrollView>
        {property_Detail?.image_path &&
        property_Detail?.image_path.length != 0 ? (
          <View>
            <SliderBox
              images={property_Detail?.image_path}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              inactiveDotColor={_COLORS.Kodie_GrayColor}
              dotColor={_COLORS.Kodie_GreenColor}
              autoplay={false}
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              dotStyle={ViewRentalDetailsStyle.dotStyle}
              ImageComponentStyle={{
                resizeMode: 'cover',
              }}
            />
          </View>
        ) : (
          <View>
            <Image
              source={BANNERS?.imageNotFound}
              style={{width: '100%', height: 200, resizeMode: 'cover'}}
            />
          </View>
        )}

        <View style={ViewRentalDetailsStyle.apartmentmainView}>
          <View>
            <Text
              style={[
                ViewRentalDetailsStyle.propertyHeading,
                {fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {property_Detail?.property_type || ''}
            </Text>
            <Text
              style={[
                ViewRentalDetailsStyle.propertyHeading,
                {marginTop: 5, width: 100},
              ]}>
              {property_Detail?.city || ''}
            </Text>
          </View>
          <View style={ViewRentalDetailsStyle.shareIcon}>
            {/* <View style={ViewRentalDetailsStyle.availableBtn}>
              <Text style={ViewRentalDetailsStyle.availabletext}>
              {`AVAILABLE: ${moment(property_Detail?.available).format('DD-MMM-YYYY')}`}
              </Text>
            </View> */}
            <View
              style={[
                ViewRentalDetailsStyle.availableBtn,
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
                  ViewRentalDetailsStyle.availabletext,
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
            </View>
            <TouchableOpacity>
              <Entypo
                color={_COLORS.Kodie_ExtraminLiteGrayColor}
                name="share"
                size={25}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => {
                // setFavRental(!favRental);
                toggleLike(propertyId);
              }}>
              <AntDesign
                color={
                  likedItems[propertyId]
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_ExtraminLiteGrayColor
                }
                name={likedItems[propertyId] ? 'heart' : 'hearto'}
                size={25}
                style={{marginLeft:20}}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={ViewRentalDetailsStyle.locationView}>
          <Entypo
            color={_COLORS.Kodie_GreenColor}
            name="location-pin"
            size={20}
          />
          <Text style={ViewRentalDetailsStyle.location}>
            {property_Detail?.location || ''}
          </Text>
        </View>
        <Text
          style={[
            ViewRentalDetailsStyle.propertyHeading,
            {marginTop: 5, marginHorizontal: 28},
          ]}>
          {`$${rentalAmount || '0'}`}
        </Text>
        <DividerIcon
          borderBottomWidth={3}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <View style={{marginHorizontal: 16}}>
          <ReadMore
            seeMoreStyle={ViewRentalDetailsStyle.readMore}
            seeLessStyle={ViewRentalDetailsStyle.readMore}
            seeMoreText={'read more'}
            seeLessText={'read Less'}
            numberOfLines={2}
            style={ViewRentalDetailsStyle.textStyle}>
            {property_Detail?.property_description || ''}
          </ReadMore>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />

          <Text
            style={[
              ViewRentalDetailsStyle.propery_det,
              {marginHorizontal: 16},
            ]}>
            {'Key features'}
          </Text>
          <View style={{marginHorizontal: '10%'}}>
            <FlatList
              data={Detail}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              numColumns={numColumns}
              keyExtractor={item => item?.id}
              renderItem={Detail_rander}
            />
          </View>
          <DividerIcon />
          {property_Detail?.additional_key_features_id === '[]' ? null : (
            <Text
              style={[
                ViewRentalDetailsStyle.propery_det,
                {marginHorizontal: 16},
              ]}>
              {'Additional key features'}
            </Text>
          )}
          <View style={{marginHorizontal: '10%'}}>
            <FlatList
              data={additionalKeyFeatures}
              numColumns={numColumns}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{flexGrow: 1}}
            />
          </View>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <Text
            style={[
              ViewRentalDetailsStyle.propertyHeading,
              {marginTop: 5, marginHorizontal: 16},
            ]}>
            {'Inspections'}
          </Text>
          <View style={{marginHorizontal: 16}}>
            <CustomSingleButton
              _ButtonText={'Request an inspection'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              backgroundColor={_COLORS.Kodie_BlackColor}
              onPress={() => {
                props.navigation.navigate('CreateNewInspection');
              }}
              disabled={isLoading ? true : false}
            />
          </View>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setPropertyDetailsClp(!propertyDetailsClp);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>
                {'Property details'}
              </Text>

              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setPropertyDetailsClp(!propertyDetailsClp);
                }}>
                <Entypo
                  name={
                    propertyDetailsClp
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <DividerIcon marginTop={8} />
            {propertyDetailsClp ? (
              <>
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Listing Number'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {propertyId}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Type of Property'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {property_Detail?.property_type}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Floor Size'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {`${property_Detail?.floor_size || ''} m²`}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Pets Allowed'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {addtionalFeaturesID[3] == 1 ? 'Yes' : 'No'}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Furnished'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {addtionalFeaturesID[0] == 1 ? 'Yes' : 'No'}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Smoking'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {'No'}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
              </>
            ) : null}
          </View>
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setRoomClp(!roomClp);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>{'Rooms'}</Text>
              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setRoomClp(!roomClp);
                }}>
                <Entypo
                  name={roomClp ? 'chevron-small-up' : 'chevron-small-down'}
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
          {roomClp ? (
            <>
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Bedrooms'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {Detail[0]?.Bedrooms}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Bathrooms'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {Detail[1]?.Bathrooms}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              {/* <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Kitchen'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Lounge'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Dining Room'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Other'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} /> */}
            </>
          ) : null}
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setExternalfeaturesClp(!externalfeaturesClp);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>
                {'External features'}
              </Text>

              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setExternalfeaturesClp(!externalfeaturesClp);
                }}>
                <Entypo
                  name={
                    externalfeaturesClp
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
          {externalfeaturesClp ? (
            <>
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Car Spaces'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {parkingSpaceValue}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'On-Street Parking Spaces'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {OnStreetParkingValue}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
            </>
          ) : null}
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setPointOfInterest(!pointOfInterest);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>
                {'Points of interest'}
              </Text>
              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setPointOfInterest(!pointOfInterest);
                }}>
                <Entypo
                  name={
                    pointOfInterest ? 'chevron-small-up' : 'chevron-small-down'
                  }
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <DividerIcon marginTop={8} />
            {pointOfInterest ? (
              <View style={DetailsStyle.container}>
                <FlatList
                  data={data}
                  renderItem={renderCategory}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            ) : null}
            <View style={ViewRentalDetailsStyle.submitApplicationbtn}>
              <RowButtons
                LeftButtonText={'Submit application'}
                leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                LeftButtonborderColor={_COLORS.Kodie_BlackColor}
                RightButtonText={'Message owner'}
                RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
                onPressLeftButton={() => {
                  setSubmitApplicationBtn(false);
                  setSubmitApplicationBtnId(0);
                  Alert.alert('Submit application', 'Coming soon');
                  // alert(selectPetFriendlyBtnId)
                }}
                onPressRightButton={() => {
                  setSubmitApplicationBtn(true);
                  setSubmitApplicationBtnId(1);
                  props.navigation.navigate('Chat', {
                    data: property_Detail.landlord_details[0],
                    userid: property_Detail.landlord_id_property,
                    chatname: 'chatname',
                  });
                  // alert(selectPetFriendlyBtnId)
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default ViewRentalDetails;

const styles = StyleSheet.create({});
