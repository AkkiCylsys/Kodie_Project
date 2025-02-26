import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
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
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import {Config} from '../../../../Config';
import axios from 'axios';
import StepIndicator from 'react-native-step-indicator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {DetailsStyle} from './Details/DetailsStyles';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import CustomTabNavigator from '../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import Share from 'react-native-share';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {fetchAddPropertySecondStepsSuccess} from '../../../../redux/Actions/AddProperty/AddPropertySecondStep/AddPropertySecondStepApiAction';
import {useDispatch, useSelector} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Geolocation from '@react-native-community/geolocation';
import {getPropertyDetailSevice} from '../../../../services/PropertyModule/PropertyModul';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
export default PropertyReview = props => {
  const addPropertySecondStepData = useSelector(
    state => state.AddPropertyStepsReducer.data,
  );
  const navigation = useNavigation();
  console.log('addPropertySecondStepData...', addPropertySecondStepData);
  const dispatch = useDispatch();
  const property_id = props?.route?.params?.property_id;
  const propertyListing = props?.route?.params?.propertyListing;
  console.log('propertyListing..', propertyListing);
  const propertyid = props?.route?.params?.propertyid;
  console.log('listing...', propertyid, property_id);
  const [data, setData] = useState([]);
  const propertyView = props?.route?.params?.propertyView;
  const editMode = props?.route?.params?.editMode;
  const DocTab = props?.route?.params?.DocTab;
  const [activeTab, setActiveTab] = useState('Tab4');
  const [isLoading, setIsLoading] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [additionalKeyFeaturesString, setAdditionalKeyFeaturesString] =
    useState([]);
  const [currentPage, setCurrentPage] = useState(3);
  const [additionalKeyFeatures, setAdditionalKeyFeatures] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [like, setLike] = useState(false);
  const [addtionalFeaturesID, setAddtionalFeaturesID] = useState('');
  const [propertyDetailsClp, setPropertyDetailsClp] = useState(false);
  const [roomClp, setRoomClp] = useState(false);
  const [externalfeaturesClp, setExternalfeaturesClp] = useState(false);
  const [pointOfInterest, setPointOfInterest] = useState(false);
  const [GenerateLink, setGenerateLink] = useState('');
  const GOOGLE_MAPS_API_KEY = 'AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw';
  useFocusEffect(
    useCallback(() => {
      fetchPointsOfInterest(
        property_Detail?.latitude,
        property_Detail?.longitude,
      );
    }, [property_Detail]),
  );
  useEffect(() => {
    const handleLink = async () => {
      const initialLink = await dynamicLinks().getInitialLink();
      if (initialLink) {
        await handleDynamicLink(initialLink);
      }
      const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
      return () => {
        console.log('Cleaning up dynamic link listener');
        unsubscribe();
      };
    };

    handleLink();
  }, [navigation]);
  useEffect(() => {
    setActiveTab(DocTab ? 'Tab4' : 'Tab1');
    fetchData();
    try {
      const keyFeaturesArray = additionalKeyFeaturesString.split(',');
      setAdditionalKeyFeatures(keyFeaturesArray);
    } catch (error) {
      console.error('Error parsing additional_key_features:', error);
    }
    const timeout = setTimeout(() => {
      setNumColumns(2); // Change to the desired number of columns
    }, 2000); // Change this delay as needed

    return () => clearTimeout(timeout);
  }, [property_id, propertyid, additionalKeyFeaturesString]);

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
  const buildLink = async id => {
    try {
      const link = await dynamicLinks().buildLink({
        link: `https://kodie.page.link/DwNd?id=${id}`,
        domainUriPrefix: 'https://kodie.page.link',
        analytics: {
          campaign: 'banner',
        },
      });
      setGenerateLink(link);
      console.log('Generated Link:', link); // For debugging
    } catch (error) {
      console.error('Failed to build dynamic link:', error);
    }
  };
  const handleDynamicLink = async link => {
    console.log('Received Dynamic Link:', link.url);

    try {
      const url = new URL(link.url);
      const id = url.searchParams.get('id');

      if (id) {
        console.log('Navigating to PropertyReview with ID:', id);
        navigation.navigate('PropertyReview', {id});
      } else {
        Alert.alert('Error', 'No ID found in the link.');
      }
    } catch (error) {
      console.error('Error handling dynamic link:', error);
    }
  };
  const shareContent = async () => {
    const shareOptions = {
      title: 'Share file',
      message: 'Check this out!',
      url: GenerateLink,
    };

    try {
      const shareResponse = await Share.open(shareOptions);
      console.log('Share Response:', shareResponse);
    } catch (error) {
      if (error.message === 'User did not share') {
        console.log('User canceled the sharing action.');
      } else {
        console.log('Error while sharing:', error);
      }
    }
  };

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
        propertyView || propertyListing ? propertyid : property_id,
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
      Alert.alert('Request timed out' ,'The request took too long to complete. Please try again later.')
    } finally {
      setIsLoading(false);
    }
  };
  const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }

      default: {
        break;
      }
    }
    return iconConfig;
  };
  const firstIndicatorSignUpStepStyle = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    separatorFinishedColor: _COLORS.Kodie_GrayColor,
    separatorUnFinishedColor: _COLORS.Kodie_LightOrange,
    stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
    stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
    stepIndicatorCurrentColor: _COLORS.Kodie_WhiteColor,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: _COLORS.Kodie_BlackColor,
    labelSize: 14,
    labelAlign: 'center',
  };
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({position, stepStatus}) => {
    const iconColor =
      position === currentPage
        ? _COLORS.Kodie_BlackColor
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Details'
        : position === 1
        ? 'Features'
        : position === 2
        ? 'Images'
        : position === 3
        ? 'Review'
        : 'null';

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: 'center',
          }}>{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}>
          {iconName}
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
  const goBack = () => {
    props.navigation.pop();
  };
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
              <>
                <Text
                  style={[DetailsStyle.propery_det, {marginHorizontal: 16}]}>
                  {'Additional key features'}
                </Text>
                {/* // )} */}
                <View style={{marginHorizontal: '10%'}}>
                  <FlatList
                    data={additionalKeyFeatures}
                    numColumns={numColumns}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{flexGrow: 1}}
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
                    <Text style={DetailsStyle.propery_det}>
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
                          {propertyid || property_id}
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
                          {addtionalFeaturesID[3] == 0 ? 'No' : 'Yes'}
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
                    <Text style={DetailsStyle.propery_det}>{'Rooms'}</Text>
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
                  </>
                ) : null}
                <View>
                  <TouchableOpacity
                    style={DetailsStyle.propety_details_view}
                    onPress={() => {
                      setExternalfeaturesClp(!externalfeaturesClp);
                    }}>
                    <Text style={DetailsStyle.propery_det}>
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
                    <Text style={DetailsStyle.propery_det}>
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
                    props.navigation.pop(4);
                    props?.navigation?.navigate('Properties');
                    dispatch(fetchAddPropertySecondStepsSuccess());
                  }
                }}
              />
            </View>
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
          </>
        );
      case 'Tab2':
        return (
          <>
            <Leases property_id={propertyid} />
          </>
        );

      case 'Tab3':
        return (
          <>
            <Expenses property_id={propertyid} />
          </>
        );
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
          propertyView
            ? () => props.navigation.navigate('Properties')
            : propertyListing
            ? () => props.navigation.navigate('MarketplacePropertyListing')
            : goBack
        }
        MiddleText={
          editMode
            ? 'Edit property'
            : propertyListing
            ? 'Property Listing'
            : propertyView
            ? property_Detail?.location
            : 'Add new property'
        }
      />
      {propertyView || propertyListing ? null : (
        <View
          style={{
            marginTop: 15,
          }}>
          <StepIndicator
            customSignUpStepStyle={firstIndicatorSignUpStepStyle}
            currentPosition={currentPage}
            renderStepIndicator={renderStepIndicator}
            labels={stepLabels}
            stepCount={4}
            renderLabel={renderLabel}
          />
        </View>
      )}
      <ScrollView contentContainerStyle={{}}>
        {propertyView || propertyListing ? null : (
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
              autoplay
              // circleLoop
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
                  buildLink(
                    propertyView || propertyListing ? propertyid : property_id,
                  );
                  shareContent();
                }}>
                <Entypo
                  name="share"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={PropertyReviewStyle.share_sty}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={PropertyReviewStyle.melbourne_Text}>
            {property_Detail?.city || property_Detail?.state || ''}
          </Text>
          <View style={PropertyReviewStyle.share_View}>
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
                : propertyView || propertyListing
                ? 'Leases'
                : null
            }
            Tab3={
              editMode
                ? null
                : propertyView || propertyListing
                ? 'Expenses'
                : null
            }
            Tab4={
              editMode
                ? null
                : propertyView || propertyListing
                ? 'Documents'
                : null
            }
            onPressTab1={() => setActiveTab('Tab1')}
            onPressTab2={() => {
              if (editMode) {
                null;
              } else if (propertyView || propertyListing) {
                setActiveTab('Tab2');
              } else {
                null;
              }
            }}
            onPressTab3={() => {
              if (editMode) {
                null;
              } else if (propertyView || propertyListing) {
                setActiveTab('Tab3');
              } else {
                null;
              }
            }}
            onPressTab4={() => {
              if (editMode) {
                null;
              } else if (propertyView || propertyListing) {
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
