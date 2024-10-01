import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {PropertyFeatureStyle} from './PropertyFeatureStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {FONTFAMILY, LABEL_STYLES} from '../../../../Themes';
import {_COLORS} from '../../../../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import MultiSelect from 'react-native-multiple-select';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAddPropertySecondStepsSuccess} from '../../../../redux/Actions/AddProperty/AddPropertySecondStep/AddPropertySecondStepApiAction';
import ToggleButton from '../../../../components/Molecules/ToggleButton/ToggleButton';
import Counter from '../../../../components/Molecules/CounterComponent/Counter';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
export default PropertyFeature = props => {
  const addPropertySecondStepData = useSelector(
    state => state.AddPropertyStepsReducer.data,
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const location = props?.route?.params?.location;
  const property_value = props?.route?.params?.property_value;
  const propertyDesc = props?.route?.params?.propertyDesc;
  const selectedButtonId = props?.route?.params?.selectedButtonId;
  const latitude = props?.route?.params?.latitude;
  const longitude = props?.route?.params?.longitude;
  const propertyid = props?.route?.params?.propertyid;
  const city = props?.route?.params?.city;
  const state = props?.route?.params?.state;
  const country = props?.route?.params?.country;
  const editMode = props?.route?.params?.editMode;
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    [],
  );
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('key_features_id............', additionalfeatureskeyvalue);
  console.log('propertyid............', propertyid);
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(0);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] = useState(0);
  const [selectedButtonStorageId, setSelectedButtonStorageId] = useState(0);
  const [selectedButtonGardenId, setSelectedButtonGardenId] = useState(0);
  const [CountBedroom, setCountBedroom] = useState(0);
  const [CountBathroom, setCountBathroom] = useState(0);
  const [CountParking, setCountParking] = useState(0);
  const [CountReception, setCountReception] = useState(0);
  const [CountParkingStreet, setCountParkingStreet] = useState(0);
  const [florSize, setFlorSize] = useState('');
  const [landArea, setLandArea] = useState('');
  const [property_Detail, setProperty_Details] = useState([]);

  const keyFeaturesString = property_Detail?.key_features;

  useEffect(() => {
    additional_features();
    propertyid ? DetailsData() : null;
    try {
      const keyFeaturesArray = JSON.parse(keyFeaturesString);
      for (const feature of keyFeaturesArray) {
        if (feature.Bedrooms !== undefined) {
          setCountBedroom(feature.Bedrooms);
        } else if (feature.Bathrooms !== undefined) {
          setCountBathroom(feature.Bathrooms);
        } else if (feature['Reception rooms'] !== undefined) {
          setCountReception(feature['Reception rooms']);
        } else if (feature['Parking / garage spaces'] !== undefined) {
          setCountParking(feature['Parking / garage spaces']);
        } else if (feature['On-street parking'] !== undefined) {
          setCountParkingStreet(feature['On-street parking']);
        }
      }
    } catch (error) {
      console.error('Error parsing key_features:', error);
    }
  }, [keyFeaturesString]);
  const DetailsData = async () => {
    const detailData = {
      // property_id:
      //   addPropertySecondStepData && !Array.isArray(addPropertySecondStepData)
      //     ? addPropertySecondStepData
      //     : propertyid,
      property_id: propertyid,
    };
    const url = Config.BASE_URL;
    const property_Detailss = url + 'get_property_details';
    setIsLoading(true);
    try {
      const response = await axios.post(property_Detailss, detailData);
      if (response?.data?.success === true) {
        console.log('response in property feture..', response);
        setIsLoading(false);
        setProperty_Details(response?.data?.property_details[0]);
        const featureValues =
          response?.data?.property_details[0]?.additional_features_id
            ?.split(',')
            .map(value => value.trim());
        if (featureValues.length >= 4) {
          setSelectedButtonFurnishedId(featureValues[0] === '1' ? 1 : 0);
          setSelectedButtonStorageId(featureValues[1] === '1' ? 1 : 0);
          setSelectedButtonGardenId(featureValues[2] === '1' ? 1 : 0);
          setSelectedButtonDepositId(featureValues[3] === '1' ? 1 : 0);
        }
        response?.data?.property_details[0]?.floor_size == 0
          ? setFlorSize('')
          : setFlorSize(response?.data?.property_details[0]?.floor_size);
        const keyFeaturesId =
          response?.data?.property_details[0]?.additional_key_features_id;
        const parsedKeyFeaturesId =
          typeof keyFeaturesId === 'string'
            ? JSON.parse(keyFeaturesId)
            : keyFeaturesId;
        setAdditionalFeaturesKeyValue(
          Array.isArray(parsedKeyFeaturesId) ? parsedKeyFeaturesId : [],
        );
        response?.data?.property_details[0]?.land_area == 0
          ? setLandArea('')
          : setLandArea(response?.data?.property_details[0]?.land_area);
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('property_type error:', error);
      setIsLoading(false);
    }
  };
  const AllCountsData = [
    {Bedrooms: CountBedroom},
    {Bathrooms: CountBathroom},
    {'Reception rooms': CountReception},
    {'Parking / garage spaces': CountParking},
    {'On-street parking': CountParkingStreet},
  ];
  const PreFriedly = `${selectedButtonFurnishedId}, ${selectedButtonStorageId}, ${selectedButtonGardenId}, ${selectedButtonDepositId}`;
  console.log(PreFriedly);
  // Update count function
  const updateCount = (type, operation) => {
    if (operation === 'increase') {
      switch (type) {
        case 'Bedroom':
          setCountBedroom(prev => prev + 1);
          break;
        case 'Bathroom':
          setCountBathroom(prev => prev + 1);
          break;
        case 'Reception':
          setCountReception(prev => prev + 1);
          break;
        case 'Parking':
          setCountParking(prev => prev + 1);
          break;
        case 'ParkingStreet':
          setCountParkingStreet(prev => prev + 1);
          break;
        default:
          break;
      }
    } else if (operation === 'decrease') {
      switch (type) {
        case 'Bedroom':
          if (CountBedroom > 0) setCountBedroom(prev => prev - 1);
          break;
        case 'Bathroom':
          if (CountBathroom > 0) setCountBathroom(prev => prev - 1);
          break;
        case 'Reception':
          if (CountReception > 0) setCountReception(prev => prev - 1);
          break;
        case 'Parking':
          if (CountParking > 0) setCountParking(prev => prev - 1);
          break;
        case 'ParkingStreet':
          if (CountParkingStreet > 0) setCountParkingStreet(prev => prev - 1);
          break;
        default:
          break;
      }
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
  const goBack = () => {
    props.navigation.pop();
  };
  const property_details = async () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'add_property_details';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    let data = {
      user: loginData?.Login_details?.user_id,
      user_account_details_id: loginData?.Login_details?.user_account_id,
      location: location,
      location_longitude: longitude,
      location_latitude: latitude,
      islocation: 1,
      property_description: propertyDesc,
      property_type: property_value > 0 ? property_value : 0,
      key_features: AllCountsData,
      additional_features: PreFriedly,
      additional_key_features: additionalfeatureskeyvalue,
      autolist: selectedButtonId,
      UPD_FLOOR_SIZE: florSize,
      UPD_LAND_AREA: landArea,
      p_city: city,
      p_state: state,
      p_country: country,
    };
    console.log('Property feature data in feature..', data);
    axios
      .post(additionalApi, {
        user: loginData?.Login_details?.user_id,
        user_account_details_id: loginData?.Login_details?.user_account_id,
        location: location,
        location_longitude: longitude,
        location_latitude: latitude,
        islocation: 1,
        property_description: propertyDesc,
        property_type: property_value > 0 ? property_value : 0,
        key_features: AllCountsData,
        additional_features: PreFriedly,
        additional_key_features: additionalfeatureskeyvalue,
        autolist: selectedButtonId,
        UPD_FLOOR_SIZE: florSize,
        UPD_LAND_AREA: landArea,
        p_city: city,
        p_state: state,
        p_country: country,
      })

      .then(response => {
        console.log('property_details', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);

          console.log(
            'response?.data?.Property_id',
            response?.data?.Property_id,
          );

          dispatch(
            fetchAddPropertySecondStepsSuccess(response?.data?.Property_id),
          );

          props.navigation.navigate('PropertyImages', {
            property_id: response?.data?.Property_id,
          });
          console.log('property_details....', response?.data);
        } else {
          console.error('property_details_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('property_details error:', error);
        setIsLoading(false);
      });
  };
  const additional_features = async () => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'get_key_features';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
    try {
      const response = await axios.get(additionalApi);
      console.log('additional_Data:', response.data);

      if (response.data.success) {
        console.log('additional_features:', response.data);
        setAdditionalfeatureskey(response.data.key_features_details);
      } else {
        console.error(
          'additional_features_error:',
          response.data.error || 'Unknown error',
        );
      }
    } catch (error) {
      console.error('additional_features error:', error);
      alert('Error fetching additional features'); // Better to have a more generic message for the alert
    } finally {
      setIsLoading(false); // Ensure setIsLoading(false) is called in both success and error cases
    }
  };

  const updatePropertyDetails = () => {
    const updateData = {
      user: loginData?.Login_details?.user_id,
      user_account_details_id: loginData?.Login_details?.user_account_id,
      location: location,
      location_longitude: longitude,
      location_latitude: latitude,
      islocation: 1,
      property_description: propertyDesc,
      property_type: property_value,
      key_features: AllCountsData,
      additional_features: PreFriedly,
      UPD_FLOOR_SIZE: florSize,
      UPD_LAND_AREA: landArea,
      additional_key_features: additionalfeatureskeyvalue,
      autolist: selectedButtonId,
      property_id:
        // addPropertySecondStepData && !Array.isArray(addPropertySecondStepData)
        //   ? addPropertySecondStepData
        //   :
        propertyid,
      p_city: city,
      p_state: state,
      p_country: country,
    };
    console.log('updateData', updateData);
    const url = Config.BASE_URL;
    const update_property_details = url + 'update_property_details';
    console.log('Request URL:', update_property_details);
    setIsLoading(true);
    console.log('updated data in edit mode cgheck...', updateData);
    axios
      .put(update_property_details, updateData)
      .then(response => {
        console.log('update_property_details', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          props.navigation.navigate('PropertyImages', {
            property_id: propertyid,
            editMode: editMode,
          });
        } else {
          console.error('update_property_detailserror:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('update_property_details error:', error);
        setIsLoading(false);
      });
  };
  const onSelectedItemsChange = selectedItems => {
    setAdditionalFeaturesKeyValue(selectedItems);
  };
  return (
    <SafeAreaView style={PropertyFeatureStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={goBack}
        MiddleText={editMode ? 'Edit property' : 'Add new property'}
      />
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

      <ScrollView nestedScrollEnabled={true}>
        <View style={PropertyFeatureStyle.headingView}>
          <Text style={PropertyFeatureStyle.heading}>
            {'Property features'}
          </Text>
        </View>
        <View style={PropertyFeatureStyle.card}>
          <View style={PropertyFeatureStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Key features</Text>
            <View>
              <Counter
                label="Bedrooms"
                count={CountBedroom}
                onIncrease={() => updateCount('Bedroom', 'increase')}
                onDecrease={() => updateCount('Bedroom', 'decrease')}
              />
              <Counter
                label="Bathrooms"
                count={CountBathroom}
                onIncrease={() => updateCount('Bathroom', 'increase')}
                onDecrease={() => updateCount('Bathroom', 'decrease')}
              />
              <Counter
                label="Reception rooms"
                count={CountReception}
                onIncrease={() => updateCount('Reception', 'increase')}
                onDecrease={() => updateCount('Reception', 'decrease')}
              />
              <Counter
                label="Parking / garage spaces"
                count={CountParking}
                onIncrease={() => updateCount('Parking', 'increase')}
                onDecrease={() => updateCount('Parking', 'decrease')}
              />
              <Counter
                label="On-street parking"
                count={CountParkingStreet}
                onIncrease={() => updateCount('ParkingStreet', 'increase')}
                onDecrease={() => updateCount('ParkingStreet', 'decrease')}
              />
            </View>
            <View>
              <View style={PropertyFeatureStyle.key_feature_mainView}>
                <View style={PropertyFeatureStyle.key_feature_subView}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Building floor size'}
                  </Text>
                </View>

                <View style={PropertyFeatureStyle.floorsizeview}>
                  <TextInput
                    style={PropertyFeatureStyle.flor_input_field}
                    value={florSize}
                    onChangeText={setFlorSize}
                    placeholder="- m2"
                    keyboardType="number-pad"
                    placeholderTextColor={_COLORS.Kodie_GrayColor}
                  />
                </View>
              </View>

              <View style={PropertyFeatureStyle.key_feature_mainView}>
                <View style={PropertyFeatureStyle.key_feature_subView}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Land area'}
                  </Text>
                </View>

                <View style={PropertyFeatureStyle.floorsizeview}>
                  <TextInput
                    style={PropertyFeatureStyle.flor_input_field}
                    value={landArea}
                    onChangeText={setLandArea}
                    placeholder="- m2"
                    keyboardType="number-pad"
                    placeholderTextColor={_COLORS.Kodie_GrayColor}
                  />
                </View>
              </View>
            </View>

            <View>
              <Text style={LABEL_STYLES._texinputLabel}>
                {'Additional features'}
              </Text>
              <View style={[PropertyFeatureStyle.addition_featureView]}>
                <View style={{flex: 1}}>
                  <Text style={PropertyFeatureStyle.Furnished_Text}>
                    {'Furnished?'}
                  </Text>
                  <ToggleButton
                    tabValue={selectedButtonFurnishedId}
                    setTabValue={setSelectedButtonFurnishedId}
                    activeColor={_COLORS.Kodie_GreenColor}
                    inactiveColor={_COLORS.Kodie_WhiteColor}
                    activeTextColor={_COLORS.Kodie_WhiteColor}
                    inactiveTextColor={_COLORS.Kodie_BlackColor}
                    firstTabLabel="Yes"
                    secondTabLabel="No"
                  />
                </View>
                <View style={{margin: 11}} />
                <View style={{flex: 1}}>
                  <Text style={PropertyFeatureStyle.Furnished_Text}>
                    {'External storage?'}
                  </Text>
                  <ToggleButton
                    tabValue={selectedButtonStorageId}
                    setTabValue={setSelectedButtonStorageId}
                    activeColor={_COLORS.Kodie_GreenColor}
                    inactiveColor={_COLORS.Kodie_WhiteColor}
                    activeTextColor={_COLORS.Kodie_WhiteColor}
                    inactiveTextColor={_COLORS.Kodie_BlackColor}
                    firstTabLabel="Yes"
                    secondTabLabel="No"
                  />
                </View>
              </View>
              <View style={PropertyFeatureStyle.addition_featureView}>
                <View style={{flex: 1}}>
                  <Text style={PropertyFeatureStyle.Furnished_Text}>
                    {'Garden?'}
                  </Text>
                  <ToggleButton
                    tabValue={selectedButtonGardenId}
                    setTabValue={setSelectedButtonGardenId}
                    activeColor={_COLORS.Kodie_GreenColor}
                    inactiveColor={_COLORS.Kodie_WhiteColor}
                    activeTextColor={_COLORS.Kodie_WhiteColor}
                    inactiveTextColor={_COLORS.Kodie_BlackColor}
                    firstTabLabel="Yes"
                    secondTabLabel="No"
                  />
                </View>
                <View style={{margin: 11}} />
                <View style={{flex: 1}}>
                  <Text style={PropertyFeatureStyle.Furnished_Text}>
                    {'Disability access?'}
                  </Text>
                  <ToggleButton
                    tabValue={selectedButtonDepositId}
                    setTabValue={setSelectedButtonDepositId}
                    activeColor={_COLORS.Kodie_GreenColor}
                    inactiveColor={_COLORS.Kodie_WhiteColor}
                    activeTextColor={_COLORS.Kodie_WhiteColor}
                    inactiveTextColor={_COLORS.Kodie_BlackColor}
                    firstTabLabel="Yes"
                    secondTabLabel="No"
                  />
                </View>
              </View>
            </View>
            <View style={PropertyFeatureStyle.additional_key_view}>
              <Text style={PropertyFeatureStyle.Furnished_Text}>
                {'Additional key features'}
              </Text>
              <MultiSelect
                hideDropdown
                items={additionalfeatureskey}
                uniqueKey="paf_key"
                noItemsText={
                  'The feature you are searching for is not available on the list'
                }
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={additionalfeatureskeyvalue}
                selectText="Add features such as pool, aircon, balcony etc."
                searchInputPlaceholderText="Search Items..."
                onChangeInput={item => {
                  console.warn(item);
                  // setAdditionalFeaturesKeyValue(item)
                }}
                tagBorderColor={_COLORS.Kodie_BlackColor}
                selectedItemTextColor={_COLORS.Kodie_GreenColor}
                selectedItemIconColor={_COLORS.Kodie_GreenColor}
                itemTextColor="#000"
                displayKey="features_name"
                searchInputStyle={PropertyFeatureStyle.searchInput}
                styleListContainer={PropertyFeatureStyle.listContainer}
                styleRowList={PropertyFeatureStyle.rowList}
                tagContainerStyle={PropertyFeatureStyle.tagContainer}
                tagRemoveIconColor={_COLORS.Kodie_WhiteColor}
                styleTextTag={PropertyFeatureStyle.textTag}
                styleTextDropdown={[
                  PropertyFeatureStyle.textDropdown,
                  {
                    paddingHorizontal:
                      additionalfeatureskeyvalue.length > 0 ? 10 : 5,
                  },
                ]}
                styleDropdownMenu={[
                  PropertyFeatureStyle.dropdownMenu,
                  {
                    paddingHorizontal:
                      additionalfeatureskeyvalue.length > 0 ? 10 : 5,
                  },
                ]}
                submitButtonColor={_COLORS.Kodie_GreenColor}
                submitButtonText={
                  additionalfeatureskeyvalue.length > 0 ? 'Done' : 'Cancel'
                }
              />
            </View>
            <View style={PropertyFeatureStyle.btnView}>
              <CustomSingleButton
                _ButtonText={'Next'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  if (
                    (Array.isArray(addPropertySecondStepData) &&
                      addPropertySecondStepData.length > 0) ||
                    propertyid ||
                    editMode ||
                    typeof addPropertySecondStepData === 'number'
                  ) {
                    updatePropertyDetails();
                  } else {
                    property_details();
                  }
                }}
                disabled={isLoading ? true : false}
              />
            </View>
            <TouchableOpacity
              style={PropertyFeatureStyle.goBack_View}
              onPress={() => {
                goBack();
              }}>
              <View style={PropertyFeatureStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={PropertyFeatureStyle.goBack_Text}>{'Go back'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
