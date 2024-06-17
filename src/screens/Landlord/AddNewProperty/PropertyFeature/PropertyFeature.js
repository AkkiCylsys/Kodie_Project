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

import {Dropdown} from 'react-native-element-dropdown';
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
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const renderDataItem = item => {
  return (
    <View style={PropertyFeatureStyle.item}>
      <Text style={PropertyFeatureStyle.selectedTextStyle}>
        {item.features_name}
      </Text>
      {/* <AntDesign
        style={PropertyFeatureStyle.icon}
        color={_COLORS.Kodie_BlackColor}
        name="check"
        size={20}
      /> */}
    </View>
  );
};
export default PropertyFeature = props => {
  const addPropertySecondStepData = useSelector(
    state => state.AddPropertyStepsReducer.data,
  );
  console.log('addPropertySecondStepData...', addPropertySecondStepData);
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
  console.log(
    'location......',
    location,
    property_value,
    selectedButtonId,
    propertyDesc,
    longitude,
    latitude,
    propertyid,
    city,
    state,
    country,
    editMode,
  );
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);

  const [additionalfeatureskeyvalue, setAdditionalFeaturesKeyValue] = useState(
    [],
  );
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData', loginData?.Login_details?.user_id);

  console.log('key_features_id............', additionalfeatureskeyvalue);
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectedButton, setSelectedButton] = useState(false);
  const [selectedButtonDeposit, setSelectedButtonDeposit] = useState(false);
  const [selectedButtonDepositId, setSelectedButtonDepositId] = useState(70);
  const [selectedButtonFurnished, setSelectedButtonFurnished] = useState(false);
  const [selectedButtonFurnishedId, setSelectedButtonFurnishedId] =
    useState(67);
  const [CountBedroom, setCountBedroom] = useState(0);
  const [CountBathroom, setCountBathroom] = useState(0);
  const [CountParking, setCountParking] = useState(0);
  const [CountParkingStreet, setCountParkingStreet] = useState(0);
  const [florSize, setFlorSize] = useState('');
  const [landArea, setLandArea] = useState('');
  const [selectedAutoList, setSelectedAutoList] = useState('');
  const [property_Detail, setProperty_Details] = useState([]);
  const [savePropertyId, setSavePropertyId] = useState('');
  const [activeColor, setActiveColor] = useState(
    _COLORS.Kodie_MidLightGreenColor,
  );
  console.log(
    'propertyDetail....',
    property_Detail?.additional_key_features_id,
  );

  const keyFeaturesString = property_Detail?.key_features;

  useEffect(() => {
    console.log('step 1');
    additional_features();
    console.log('step 2');
    setActiveColor(_COLORS.Kodie_MidLightGreenColor);
    propertyid > 0 || addPropertySecondStepData ? DetailsData() : null;
    try {
      const keyFeaturesArray = JSON.parse(keyFeaturesString);

      for (const feature of keyFeaturesArray) {
        if (feature.Bedrooms !== undefined) {
          setCountBedroom(feature.Bedrooms);
        } else if (feature.Bathrooms !== undefined) {
          setCountBathroom(feature.Bathrooms);
        } else if (feature['Parking Space'] !== undefined) {
          setCountParking(feature['Parking Space']);
        } else if (feature['Garages'] !== undefined) {
          setCountParkingStreet(feature['Garages']);
        }
      }
    } catch (error) {
      console.error('Error parsing key_features:', error);
    }
  }, [keyFeaturesString]);

  const DetailsData = async () => {
    const detailData = {
      property_id: addPropertySecondStepData && !Array.isArray(addPropertySecondStepData)
      ? addPropertySecondStepData
      : propertyid,
    };
    console.log('detailData', detailData);
    const url = Config.BASE_URL;
    const property_Detailss = url + 'get_property_details';
    console.log('Request URL:', property_Detailss);
    setIsLoading(true);
    try {
      const response = await axios.post(property_Detailss, detailData);
      console.log('step 2.1');

      console.log('propertyDetail', response?.data);
      if (response?.data?.success === true) {
        setIsLoading(false);
        setProperty_Details(response?.data?.property_details[0]);

        const apiAdditionalFeaturesIds =
          response?.data?.property_details[0]?.additional_features_id
            .split(',')
            .map(Number);
        const furnishedFeatureId = apiAdditionalFeaturesIds.find(
          id => id == 68,
        );
        const yesFeatureId = apiAdditionalFeaturesIds.find(id => id == 71);

        console.log(
          'Furnished Feature ID:',
          apiAdditionalFeaturesIds,
          furnishedFeatureId,
        );
        setSelectedButtonFurnished(furnishedFeatureId);
        setSelectedButtonDeposit(yesFeatureId);
        setFlorSize(response?.data?.property_details[0]?.floor_size);
        setAdditionalfeatureskey(
          response?.data?.property_details[0]?.additional_key_features,
        );
        console.log("additionalfeatureskey..d",additionalfeatureskey)
        const keyFeaturesId =
          response?.data?.property_details[0]?.additional_key_features_id;
        const parsedKeyFeaturesId =
          typeof keyFeaturesId === 'string'
            ? JSON.parse(keyFeaturesId)
            : keyFeaturesId;
        setAdditionalFeaturesKeyValue(
          Array.isArray(parsedKeyFeaturesId) ? parsedKeyFeaturesId : [],
        );

        setLandArea(response?.data?.property_details[0]?.land_area);
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
    {'Parking Space': CountParking},
    {Garages: CountParkingStreet},
  ];

  const PreFriedly = `${selectedButtonDepositId}, ${selectedButtonFurnishedId}`;
  console.log(PreFriedly, 'pre friedly............');
  console.log(AllCountsData);
  const increaseBedroomCount = () => {
    setCountBedroom(prevCount => prevCount + 1);
  };
  const decreaseBedroomCount = () => {
    if (CountBedroom > 0) {
      setCountBedroom(prevCount => prevCount - 1);
    }
  };
  // key_features count for Bathroom code here------
  const increaseBathroomCount = () => {
    setCountBathroom(prevCount => prevCount + 1);
  };
  const decreaseBathroomCount = () => {
    if (CountBathroom > 0) {
      setCountBathroom(prevCount => prevCount - 1);
    }
  };

  // key_features count for Parking code here------
  const increaseParkingCount = () => {
    setCountParking(prevCount => prevCount + 1);
  };
  const decreaseParkingCount = () => {
    if (CountParking > 0) {
      setCountParking(prevCount => prevCount - 1);
    }
  };

  // key_features count for Parking code here------
  const increaseParkingStreetCount = () => {
    setCountParkingStreet(prevCount => prevCount + 1);
  };
  const decreaseParkingStreetCount = () => {
    if (CountParkingStreet > 0) {
      setCountParkingStreet(prevCount => prevCount - 1);
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
    console.log('Property feature data..', data);
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
      console.log('additional_Data', response?.data);
      console.log('step 1.1');

      if (response?.data?.success === true) {
        setIsLoading(false);
        console.log('additional_features....', response?.data);
        setAdditionalfeatureskey(response?.data?.key_features_details);
      } else {
        console.error('additional_features_error:', response?.data?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('additional_features error:', error);
      alert(error);
      setIsLoading(false);
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
      property_id: addPropertySecondStepData
        ? addPropertySecondStepData
        : propertyid,
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
            property_id: addPropertySecondStepData
              ? addPropertySecondStepData
              : propertyid,
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

      <ScrollView>
        <View style={PropertyFeatureStyle.headingView}>
          <Text style={PropertyFeatureStyle.heading}>
            {'Property features'}
          </Text>
        </View>
        <View style={PropertyFeatureStyle.card}>
          <View style={PropertyFeatureStyle.inputContainer}>
            <Text style={LABEL_STYLES._texinputLabel}>Key features</Text>
            <View>
              <View style={PropertyFeatureStyle.mainfeaturesview}>
                <View style={PropertyFeatureStyle.key_feature_Text_view}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Bedrooms'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyFeatureStyle.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={decreaseBedroomCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyFeatureStyle.countdata}>
                    {CountBedroom}
                  </Text>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={() => {
                      increaseBedroomCount();
                    }}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={PropertyFeatureStyle.mainfeaturesview}>
                <View style={PropertyFeatureStyle.key_feature_Text_view}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Bathrooms'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyFeatureStyle.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={decreaseBathroomCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyFeatureStyle.countdata}>
                    {CountBathroom}
                  </Text>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={increaseBathroomCount}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={PropertyFeatureStyle.mainfeaturesview}>
                <View style={PropertyFeatureStyle.key_feature_Text_view}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Parking spaces'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyFeatureStyle.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={decreaseParkingCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyFeatureStyle.countdata}>
                    {CountParking}
                  </Text>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={increaseParkingCount}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <View style={PropertyFeatureStyle.mainfeaturesview}>
                <View style={PropertyFeatureStyle.key_feature_Text_view}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Garages'}
                  </Text>
                </View>

                <TouchableOpacity style={PropertyFeatureStyle.plus_minusview}>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={decreaseParkingStreetCount}>
                    <AntDesign
                      name="minus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                  <Text style={PropertyFeatureStyle.countdata}>
                    {CountParkingStreet}
                  </Text>
                  <TouchableOpacity
                    style={PropertyFeatureStyle.menusIconView}
                    onPress={increaseParkingStreetCount}>
                    <AntDesign
                      name="plus"
                      size={20}
                      color={_COLORS.Kodie_BlackColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={PropertyFeatureStyle.key_feature_mainView}>
                <View style={PropertyFeatureStyle.key_feature_subView}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Building floor size  (optional)'}
                  </Text>
                </View>

                <View style={PropertyFeatureStyle.floorsizeview}>
                  <TextInput
                    style={PropertyFeatureStyle.flor_input_field}
                    value={florSize}
                    onChangeText={setFlorSize}
                    placeholder="102m2"
                    keyboardType="number-pad"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
              </View>

              <View style={PropertyFeatureStyle.key_feature_mainView}>
                <View style={PropertyFeatureStyle.key_feature_subView}>
                  <Text style={PropertyFeatureStyle.key_feature_Text}>
                    {'Land area (optional)'}
                  </Text>
                </View>

                <View style={PropertyFeatureStyle.floorsizeview}>
                  <TextInput
                    style={PropertyFeatureStyle.flor_input_field}
                    value={landArea}
                    onChangeText={setLandArea}
                    placeholder="102m2"
                    keyboardType="number-pad"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                </View>
              </View>
            </View>
            <View style={PropertyFeatureStyle.addition_featureView}>
              <Text style={PropertyFeatureStyle.additional_Text}>
                {'Additional features'}
              </Text>
              <View style={PropertyFeatureStyle.addition_featureView}>
                <Text style={PropertyFeatureStyle.Furnished_Text}>
                  {'Furnished or unfurnished ?'}
                </Text>
                <RowButtons
                  LeftButtonText={'Furnished'}
                  leftButtonbackgroundColor={
                    !selectedButtonFurnished
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selectedButtonFurnished
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selectedButtonFurnished
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelectedButtonFurnished(false);
                    setSelectedButtonFurnishedId(67);
                  }}
                  RightButtonText={'Unfurnished'}
                  RightButtonbackgroundColor={
                    selectedButtonFurnished
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selectedButtonFurnished
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selectedButtonFurnished
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelectedButtonFurnished(true);
                    setSelectedButtonFurnishedId(68);
                  }}
                />
              </View>
              <View style={PropertyFeatureStyle.addition_featureView}>
                <Text style={PropertyFeatureStyle.Furnished_Text}>
                  {'Pet friendly ?'}
                </Text>
                <RowButtons
                  LeftButtonText={'Yes'}
                  leftButtonbackgroundColor={
                    !selectedButtonDeposit
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  LeftButtonTextColor={
                    !selectedButtonDeposit
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  LeftButtonborderColor={
                    !selectedButtonDeposit
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressLeftButton={() => {
                    setSelectedButtonDeposit(false);
                    setSelectedButtonDepositId(70);
                  }}
                  RightButtonText={'No'}
                  RightButtonbackgroundColor={
                    selectedButtonDeposit
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_WhiteColor
                  }
                  RightButtonTextColor={
                    selectedButtonDeposit
                      ? _COLORS.Kodie_BlackColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  RightButtonborderColor={
                    selectedButtonDeposit
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_LightWhiteColor
                  }
                  onPressRightButton={() => {
                    setSelectedButtonDeposit(true);
                    setSelectedButtonDepositId(71);
                  }}
                />
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
                  'Feature being searched for is not found on the list.'
                }
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={
                  Array.isArray(additionalfeatureskeyvalue)
                    ? additionalfeatureskeyvalue
                    : []
                }
                selectText="Add features such as pool, aircon, balcony etc."
                searchInputPlaceholderText="Search Items..."
                onChangeInput={item => {
                  setAdditionalFeaturesKeyValue(item);
                }}
                tagBorderColor={_COLORS.Kodie_BlackColor}
                selectedItemTextColor={_COLORS.Kodie_GreenColor}
                selectedItemIconColor={_COLORS.Kodie_GreenColor}
                itemTextColor="#000"
                displayKey="features_name"
                searchInputStyle={{
                  color: _COLORS.Kodie_BlackColor,
                  borderColor: _COLORS.Kodie_GrayColor,
                  height: 40,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}
                styleListContainer={{
                  paddingVertical: 10,
                  height: 200,
                }}
                styleRowList={{
                  height: 40,
                }}
                tagContainerStyle={{
                  borderWidth: 1,
                  height: 40,
                  backgroundColor: _COLORS.Kodie_BlackColor,
                }}
                tagRemoveIconColor={_COLORS.Kodie_WhiteColor}
                styleTextTag={{
                  fontSize: 14,
                  color: _COLORS.Kodie_WhiteColor,
                  fontFamily: FONTFAMILY.K_Medium,
                }}
                styleTextDropdown={{marginLeft: 20}}
                styleDropdownMenu={{
                  flex: 1,
                  borderWidth: 1,
                  height: 50,
                  borderColor: _COLORS.Kodie_GrayColor,
                  marginTop: 10,
                  borderRadius: 8,
                }}
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
                      addPropertySecondStepData.length > 0) || propertyid ||editMode||
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
