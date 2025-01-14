import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {PropertyReviewStyle} from './PropertyReviewStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {SliderBox} from 'react-native-image-slider-box';
import {_COLORS, LABEL_STYLES, FONTFAMILY} from '../../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import Leases from './Leases/Leases';
import Details from './Details/Details';
import Expenses from './Expenses/Expenses';
import Documents from './Documents/Documents';
import Share from 'react-native-share';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import {Config} from '../../../../Config';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {DetailsStyle} from './Details/DetailsStyles';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import CustomTabNavigator from '../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import {BackHandler} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import {getPropertyDetailSevice} from '../../../../services/PropertyModule/PropertyModul';
export default PropertyReviewDetails = props => {
  const property_id = props?.route?.params?.property_id;
  const propertyid = props?.route?.params?.propertyid;
  const propertyView = props?.route?.params?.propertyView;
  const propertyVacantListing = props?.route?.params?.propertyVacantListing;
  const propertyListing = props?.route?.params?.propertyListing;
  const backProperty = props?.route?.params?.backProperty;
  const editMode = props?.route?.params?.editMode;
  const DocTab = props?.route?.params?.DocTab;
  const [activeTab, setActiveTab] = useState('Tab4');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [additionalKeyFeaturesString, setAdditionalKeyFeaturesString] =
    useState([]);
  const [currentPage, setCurrentPage] = useState(3);
  const [additionalKeyFeatures, setAdditionalKeyFeatures] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [like, setLike] = useState(false);
  const [addtionalFeaturesID, setAddtionalFeaturesID] = useState([]);
  const [propertyDetailsClp, setPropertyDetailsClp] = useState(false);
  const [roomClp, setRoomClp] = useState(false);
  const [externalfeaturesClp, setExternalfeaturesClp] = useState(false);
  const [pointOfInterest, setPointOfInterest] = useState(false);
  const shareContent = async () => {
    const shareOptions = {
      message: `Check out this page: https://kodie.com/PropertyReviewDetails/${propertyid}`, // Include id in the deep link
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

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

  const fetchPointsOfInterest = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&type=point_of_interest&key=${GOOGLE_MAPS_API_KEY}`,
      );

      const poiData = categorizeData(response.data.results);
      console.log(JSON.stringify(poiData), 'kjdfdfd');
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
      <View style={DetailsStyle.DetailsView}>
        <View style={DetailsStyle.ViewIconStyle}>
          <IconComponent
            name={iconName}
            size={22}
            color={_COLORS.Kodie_GreenColor}
            style={{alignSelf: 'center'}}
          />
        </View>
        <Text style={[DetailsStyle.details_text, {flexShrink: 1}]}>
          {`${itemKey}: ${itemValue}`}
        </Text>
      </View>
    );
  };
  const renderItem = ({item}) => {
    const IconComponent = iconMapping[item]?.component;
    const iconName = iconMapping[item]?.name;

    return (
      <View style={DetailsStyle.DetailsView}>
        <View style={DetailsStyle.ViewIconStyle}>
          {IconComponent && (
            <IconComponent
              name={iconName}
              size={22}
              color={_COLORS.Kodie_GreenColor}
              style={{alignSelf: 'center'}}
            />
          )}
        </View>
        <Text style={[DetailsStyle.details_text, {flexShrink: 1}]}>{item}</Text>
      </View>
    );
  };
  // Api intrigation here ....
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const details = await getPropertyDetailSevice(
        propertyView || propertyVacantListing ? propertyid : property_id,
      );
      console.log(details, 'detailis');
      setProperty_Details(details);
      if (details?.key_features) {
        const parsedData = JSON.parse(details?.key_features.replace(/\\/g, ''));
        setDetail(parsedData);
        console.log('parsedData....', parsedData);
      }
      const additionalKeyFeatures = details?.additional_key_features[0];
      setAdditionalKeyFeaturesString(additionalKeyFeatures);
      const additionalFeatures_id = details?.additional_features_id;
      console.log('additionalFeaturesid....', additionalFeatures_id);
      const additionalFeaturesIds = additionalFeatures_id
        .split(',')
        .map(value => value.trim()); // ['1', '1', '1', '0']
      console.log('is_additionalFeaturesid....', additionalFeaturesIds);
      setAddtionalFeaturesID(additionalFeaturesIds);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setActiveTab(DocTab ? 'Tab4' : 'Tab1');
    // fetchData();
    try {
      const keyFeaturesArray = additionalKeyFeaturesString.split(',');
      setAdditionalKeyFeatures(keyFeaturesArray);
    } catch (error) {
      console.error('Error parsing additional_key_features:', error);
    }
    const timeout = setTimeout(() => {
      setNumColumns(2);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [property_id, propertyid, additionalKeyFeaturesString]);

  useFocusEffect(
    React.useCallback(() => {
      if ( propertyView || propertyVacantListing ? propertyid : property_id) {
        fetchData();
      }
    }, [ propertyView || propertyVacantListing ? propertyid : property_id,]),
  );

  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.navigate('Properties');
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const goBack = () => {
    props.navigation.pop();
  };
  // const parkingSpaceValueObj = Detail.find(item => 'Parking / garage spaces' in item);
  // const parkingSpaceValue = parkingSpaceValueObj
  //   ? parkingSpaceValueObj['Parking / garage spaces']
  //   : null;
  let parkingSpaceValue = null;
  let OnStreetParkingValue = null;

  if (Array.isArray(Detail)) {
    const parkingSpaceValueObj = Detail.find(
      item => 'Parking / garage spaces' in item,
    );
    parkingSpaceValue = parkingSpaceValueObj
      ? parkingSpaceValueObj['Parking / garage spaces']
      : null;
    const OnStreetParkingObj = Detail.find(item => 'On-street parking' in item);
    OnStreetParkingValue = OnStreetParkingObj
      ? OnStreetParkingObj['On-street parking']
      : null;
  } else {
    console.error('Detail is not an array:', Detail);
  }

  console.log('Parking / garage spaces value:', addtionalFeaturesID);
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <>
            <Text style={DetailsStyle.welcome_Text}>
              {property_Detail?.property_description}
            </Text>
            <DividerIcon marginTop={10} />
            <Text style={[DetailsStyle.propery_det, {marginHorizontal: 16}]}>
              {'Key features '}
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
              <>
                <Text
                  style={[DetailsStyle.propery_det, {marginHorizontal: 16}]}>
                  {'Additional key features'}
                </Text>
                {/* )} */}
                <View style={{marginHorizontal: '10%'}}>
                  <FlatList
                    data={additionalKeyFeatures}
                    numColumns={numColumns}
                    contentContainerStyle={{flexGrow: 1}}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                {/* {property_Detail?.additional_key_features_id === '[]' ? null : ( */}
                <DividerIcon
                  borderBottomWidth={1}
                  color={_COLORS.Kodie_GrayColor}
                />
              </>
            )}
            {property_Detail?.auto_list == 0 ? null : (
              <>
                <View>
                  <TouchableOpacity
                    style={DetailsStyle.propety_details_view}
                    onPress={() => {
                      setPropertyDetailsClp(!propertyDetailsClp);
                    }}>
                    <Text
                      style={[DetailsStyle.propery_det, {alignSelf: 'center'}]}>
                      {'Property details'}
                    </Text>

                    <TouchableOpacity
                      style={DetailsStyle.down_Arrow_icon}
                      onPress={() => {
                        setPropertyDetailsClp(!propertyDetailsClp);
                      }}>
                      <Fontisto
                        name={propertyDetailsClp ? 'angle-up' : 'angle-down'}
                        size={18}
                        color={_COLORS.Kodie_DarkGrayColor}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <DividerIcon marginTop={8} />
                  {propertyDetailsClp ? (
                    <>
                      <View style={DetailsStyle.p_rowTextView}>
                        <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                          {'Listing Number'}
                        </Text>
                        <Text
                          style={[
                            LABEL_STYLES.commontext,
                            {fontFamily: FONTFAMILY.K_Medium},
                          ]}>
                          {propertyid}
                        </Text>
                      </View>
                      <DividerIcon marginTop={8} />
                      <View style={DetailsStyle.p_rowTextView}>
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
                      <View style={DetailsStyle.p_rowTextView}>
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
                      <View style={DetailsStyle.p_rowTextView}>
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
                      <View style={DetailsStyle.p_rowTextView}>
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
                      <View style={DetailsStyle.p_rowTextView}>
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
                <View>
                  <TouchableOpacity
                    style={DetailsStyle.propety_details_view}
                    onPress={() => {
                      setRoomClp(!roomClp);
                    }}>
                    <Text
                      style={[DetailsStyle.propery_det, {alignSelf: 'center'}]}>
                      {'Rooms'}
                    </Text>
                    <TouchableOpacity
                      style={DetailsStyle.down_Arrow_icon}
                      onPress={() => {
                        setRoomClp(!roomClp);
                      }}>
                      <Fontisto
                        name={roomClp ? 'angle-up' : 'angle-down'}
                        size={18}
                        color={_COLORS.Kodie_DarkGrayColor}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
                <DividerIcon marginTop={8} />
                {roomClp ? (
                  <>
                    <View style={DetailsStyle.p_rowTextView}>
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
                    <View style={DetailsStyle.p_rowTextView}>
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
                    {/* <View style={DetailsStyle.p_rowTextView}>
                      <Text style={[LABEL_STYLES.commontext, { fontSize: 12 }]}>
                        {'Kitchen'}
                      </Text>
                      <Text
                        style={[
                          LABEL_STYLES.commontext,
                          { fontFamily: FONTFAMILY.K_Medium },
                        ]}>
                        {'0'}
                      </Text>
                    </View>
                    <DividerIcon marginTop={8} />
                    <View style={DetailsStyle.p_rowTextView}>
                      <Text style={[LABEL_STYLES.commontext, { fontSize: 12 }]}>
                        {'Lounge'}
                      </Text>
                      <Text
                        style={[
                          LABEL_STYLES.commontext,
                          { fontFamily: FONTFAMILY.K_Medium },
                        ]}>
                        {'0'}
                      </Text>
                    </View>
                    <DividerIcon marginTop={8} />
                    <View style={DetailsStyle.p_rowTextView}>
                      <Text style={[LABEL_STYLES.commontext, { fontSize: 12 }]}>
                        {'Dining Room'}
                      </Text>
                      <Text
                        style={[
                          LABEL_STYLES.commontext,
                          { fontFamily: FONTFAMILY.K_Medium },
                        ]}>
                        {'0'}
                      </Text>
                    </View>
                    <DividerIcon marginTop={8} />
                    <View style={DetailsStyle.p_rowTextView}>
                      <Text style={[LABEL_STYLES.commontext, { fontSize: 12 }]}>
                        {'Other'}
                      </Text>
                      <Text
                        style={[
                          LABEL_STYLES.commontext,
                          { fontFamily: FONTFAMILY.K_Medium },
                        ]}>
                        {'0'}
                      </Text>
                    </View>
                    <DividerIcon marginTop={8} /> */}
                  </>
                ) : null}
                <View>
                  <TouchableOpacity
                    style={DetailsStyle.propety_details_view}
                    onPress={() => {
                      setExternalfeaturesClp(!externalfeaturesClp);
                    }}>
                    <Text
                      style={[DetailsStyle.propery_det, {alignSelf: 'center'}]}>
                      {'External features'}
                    </Text>

                    <TouchableOpacity
                      style={DetailsStyle.down_Arrow_icon}
                      onPress={() => {
                        setExternalfeaturesClp(!externalfeaturesClp);
                      }}>
                      <Fontisto
                        name={externalfeaturesClp ? 'angle-up' : 'angle-down'}
                        size={18}
                        color={_COLORS.Kodie_DarkGrayColor}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
                <DividerIcon marginTop={8} />
                {externalfeaturesClp ? (
                  <>
                    <View style={DetailsStyle.p_rowTextView}>
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
                    <View style={DetailsStyle.p_rowTextView}>
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
                <View>
                  <TouchableOpacity
                    style={DetailsStyle.propety_details_view}
                    onPress={() => {
                      setPointOfInterest(!pointOfInterest);
                    }}>
                    <Text
                      style={[DetailsStyle.propery_det, {alignSelf: 'center'}]}>
                      {'Points of interest'}
                    </Text>
                    <TouchableOpacity
                      style={DetailsStyle.down_Arrow_icon}
                      onPress={() => {
                        setPointOfInterest(!pointOfInterest);
                      }}>
                      <Fontisto
                        name={pointOfInterest ? 'angle-up' : 'angle-down'}
                        size={18}
                        color={_COLORS.Kodie_DarkGrayColor}
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
                </View>
              </>
            )}
            <View>
              {propertyVacantListing || propertyListing? null :(
              <View style={PropertyReviewStyle.btnView}>
                <CustomSingleButton
                  disabled={isLoading ? true : false}
                  height={50}
                  _ButtonText={
                    editMode
                      ? 'Save property'
                      : propertyView
                      ? 'Edit details'
                      : 'Add property'
                  }
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    if (propertyView) {
                      props?.navigation?.navigate('PropertyDetails', {
                        propertyid: propertyid,
                        editMode: 'editMode',
                      });
                    } else {
                      props?.navigation?.navigate('Properties');
                    }
                  }}
                />
              </View>
              )}
              {propertyView ? null : (
                <>
                  <TouchableOpacity
                    style={PropertyReviewStyle.goBack_View}
                    onPress={() => {
                      goBack();
                    }}>
                    <View style={PropertyReviewStyle.backIcon}>
                      <Ionicons
                        name="chevron-back"
                        size={22}
                        color={_COLORS.Kodie_MediumGrayColor}
                      />
                    </View>
                    <Text style={PropertyReviewStyle.goBack_Text}>
                      {'Go back'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        );
      case 'Tab2':
        return <Leases property_id={propertyid} />;

      case 'Tab3':
        return <Expenses property_id={propertyid} />;
      case 'Tab4':
        return (
          <Documents
            documentDetail={(folderId, moduleName, propertyid) => {
              props.navigation.navigate('DocumentDetails', {
                folderId: folderId,
                moduleName: moduleName,
                property_id: propertyid,
              });
            }}
            property_id={propertyid}
          />
        );

      default:
        return <Details />;
    }
  };
  return (
    <SafeAreaView style={PropertyReviewStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={
          backProperty
            ? () => props.navigation.navigate('DrawerNavigatorLeftMenu')
            : propertyVacantListing
            ? () => props.navigation.navigate('VacantPropertiesList')
            : goBack
        }
        MiddleText={
          editMode
            ? 'Edit property'
            : propertyView || propertyVacantListing
            ? property_Detail?.location
            : 'Add new property'
        }
      />
      <ScrollView contentContainerStyle={{}}>
        {propertyView || propertyVacantListing ? null : (
          <View style={[PropertyReviewStyle.headingView]}>
            <Text style={PropertyReviewStyle.heading}>
              {'Review property details'}
            </Text>
          </View>
        )}
        <View
          style={[
            PropertyReviewStyle.slider_view,
            {marginBottom: '5%', marginTop: propertyView ? 0 : '5%'},
          ]}>
          {property_Detail.image_path &&
          property_Detail.image_path.length != 0 ? (
            <SliderBox
              images={property_Detail.image_path}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              inactiveDotColor={_COLORS.Kodie_GrayColor}
              dotColor={_COLORS.Kodie_GreenColor}
              // autoplay={false}
              // circleLoop={false}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              dotStyle={PropertyReviewStyle.dotStyle}
              ImageComponentStyle={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
          ) : null}
        </View>
        <View style={PropertyReviewStyle.subContainer}>
          <View style={PropertyReviewStyle.apartment_View}>
            <Text style={PropertyReviewStyle.apartment_text}>
              {property_Detail?.property_type}
            </Text>
            <View style={PropertyReviewStyle.share_View}>
              <TouchableOpacity
                onPress={() => {
                  shareContent();
                }}>
                <Entypo
                  name="share"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={PropertyReviewStyle.share_sty}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  setLike(!like);
                }}>
                <AntDesign
                  name={like ? 'heart' : 'hearto'}
                  color={
                    like
                      ? _COLORS.Kodie_GreenColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  size={24}
                />
              </TouchableOpacity> */}
            </View>
          </View>
          <Text style={PropertyReviewStyle.melbourne_Text}>
            {property_Detail?.city || property_Detail?.state || ''}
          </Text>
          <View style={PropertyReviewStyle.location_View}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={{flex: 1, color: _COLORS.Kodie_MediumGrayColor}}>
              {property_Detail?.location || ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 3,
            borderColor: _COLORS.Kodie_GrayColor,
            elevation: 1,
          }}>
          <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            TAB3
            TAB4
            Tab1={'Details'}
            Tab2={
              editMode
                ? null
                : propertyView || propertyVacantListing
                ? 'Leases'
                : null
            }
            Tab3={
              editMode
                ? null
                : propertyView || propertyVacantListing
                ? 'Expenses'
                : null
            }
            Tab4={
              editMode
                ? null
                : propertyView || propertyVacantListing
                ? 'Documents'
                : null
            }
            onPressTab1={() => setActiveTab('Tab1')}
            onPressTab2={() => {
              if (editMode) {
                null;
              } else if (propertyView || propertyVacantListing) {
                setActiveTab('Tab2');
              } else {
                null;
              }
            }}
            onPressTab3={() => {
              if (editMode) {
                null;
              } else if (propertyView || propertyVacantListing) {
                setActiveTab('Tab3');
              } else {
                null;
              }
            }}
            onPressTab4={() => {
              if (editMode) {
                null;
              } else if (propertyView || propertyVacantListing) {
                setActiveTab('Tab4');
              } else {
                null;
              }
            }}
            colorTab1={
              activeTab === 'Tab1'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            colorTab2={
              activeTab === 'Tab2'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            colorTab3={
              activeTab === 'Tab3'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            colorTab4={
              activeTab === 'Tab4'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            FONTFAMILY1={
              activeTab === 'Tab1' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY2={
              activeTab === 'Tab2' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY3={
              activeTab === 'Tab3' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY4={
              activeTab === 'Tab4' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            styleTab1={activeTab === 'Tab1' && PropertyReviewStyle.activeTab}
            styleTab2={activeTab === 'Tab2' && PropertyReviewStyle.activeTab}
            styleTab3={activeTab === 'Tab3' && PropertyReviewStyle.activeTab}
            styleTab4={activeTab === 'Tab4' && PropertyReviewStyle.activeTab}
          />
        </View>
        {checkTabs()}
        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};
