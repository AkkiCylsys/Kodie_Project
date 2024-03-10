import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  BackHandler,
} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {_COLORS, LABEL_STYLES} from '../../../../../Themes';
import Octicons from 'react-native-vector-icons/Octicons';
import {Config} from '../../../../../Config';
import ServicesBox from '../../../../../components/Molecules/ServicesBox/ServicesBox';
import IndividualSignupStyle from './IndividualSignupStyle';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
const IndividualSignup = ({
  IndividualData,
  physicalAddress,
  Individualp_latitude,
  Individualp_longitude,
  onPresslocation,
  IndividualLocation,
  onChangeIndivialLocation,
  IndividualOnFocus,
}) => {
  const [website, setWebsite] = useState('');
  const [servicesValue, setservicesValue] = useState([]);
  const [kodieDescribeYourselfData, setKodieDescribeYourselfData] = useState(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectJobTypeid, setSelectJobTypeid] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  const [selectJobType, setSelectJobType] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [IsMap, setIsMap] = useState(false);
  const [IsSearch, setIsSearch] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (IsMap || IsSearch) {
          setIsMap(false);
          setIsSearch(false);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [IsMap, IsSearch]),
  );
  const toggleSelection = lookup_key => {
    if (selectJobTypeid.includes(lookup_key)) {
      setSelectJobTypeid(prevSelected =>
        prevSelected.filter(item => item !== lookup_key),
      );
    } else {
      setSelectJobTypeid(prevSelected => [...prevSelected, lookup_key]);
    }
  };
  const jobType_render = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <ServicesBox
          images
          Services_Name={item.lookup_description}
          // Services_Icon={item.lookup_key ? IMAGES.cleaner : IMAGES.lightCleaner}
          Services_Icon={
            item.lookup_key === 166
              ? 'cleaning-services'
              : item.lookup_key === 167
              ? 'mower-bag'
              : item.lookup_key === 168
              ? 'forklift'
              : item.lookup_key === 169
              ? 'tools'
              : 'MaterialIcons'
          }
          iconLibrary={
            item.lookup_key === 166
              ? 'MaterialIcons'
              : item.lookup_key === 167
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 168
              ? 'MaterialCommunityIcons'
              : item.lookup_key === 169
              ? 'Entypo'
              : 'MaterialIcons'
          }
          iconColor={
            // isClick === item.lookup_key
            selectJobTypeid.includes(item.lookup_key)
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_GrayColor
          }
          BoxStyling={[
            IndividualSignupStyle.box_style,
            {
              backgroundColor:
                // isClick === item.lookup_key
                selectJobTypeid.includes(item.lookup_key)
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          textColor={[
            IndividualSignupStyle.box_Text_Style,
            {
              color:
                // isClick === item.lookup_key
                selectJobTypeid.includes(item.lookup_key)
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
            },
          ]}
          // onPress={() => setIsClick(!isClick)}
          onPress={() => {
            toggleSelection(item.lookup_key);
            setSelectJobType(item.lookup_key);
            // alert(item.lookup_key);
          }}
        />
      </View>
    );
  };
  const selectedselectJobTypesString = selectJobTypeid.join(',');
  console.log(selectedselectJobTypesString, 'selectedselectJobTypesString');

  // describe your self.....
  const handle_describe_yourself = () => {
    const describe_yourself_Data = {
      P_PARENT_CODE: 'JOB_TYPE',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const describeYourselfApi = url + 'lookup_details';
    console.log('Request URL:', describeYourselfApi);
    setIsLoading(true);
    axios
      .post(describeYourselfApi, describe_yourself_Data)
      .then(response => {
        console.log('kodie_describeYouself_Data', response.data);
        if (response.data.status === true) {
          setIsLoading(false);
          console.log(
            'kodie_describeYouself_Data....',
            response.data.lookup_details,
          );
          setKodieDescribeYourselfData(response.data.lookup_details);
        } else {
          console.error(
            'kodie_describeYouself_Data_error:',
            response.data.error,
          );
          alert(response.data.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('kodie_describeYouself_Data error:', error);
        alert(error);
        setIsLoading(false);
      });
  };
  const handleServices = selectJobType => {
    const jobTypes = selectedselectJobTypesString.split(',').map(Number);
    console.log(jobTypes, 'klhfudssdkjfhdsjk');
    const servicesDatas = [];

    setIsLoading(true);

    const fetchServiceData = async jobType => {
      const propertyData = {
        P_PARENT_CODE:
          jobType === 166
            ? 'HOME_CLEANING'
            : jobType === 167
            ? 'OUTDOOR_CLEANING'
            : jobType === 168
            ? 'HEAVY_LIFTING'
            : jobType === 169
            ? 'FIXING_AND_MAINTENANCE'
            : null,
        P_TYPE: 'OPTION',
      };

      const url = Config.BASE_URL;
      const propertyType = url + 'lookup_details';

      try {
        const response = await axios.post(propertyType, propertyData);

        if (response.data.status === true) {
          servicesDatas.push(...response.data.lookup_details);
        } else {
          console.error('Services_error:', response.data.error);
          alert(response.data.error);
        }
      } catch (error) {
        console.error('Services error:', error);
        // alert(error);
      }
    };

    const fetchAllServices = async () => {
      try {
        const promises = jobTypes.map(jobType => fetchServiceData(jobType));
        await Promise.all(promises);

        setIsLoading(false);
        console.log('All Services Data:', servicesDatas);
        setServicesData(servicesDatas);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching services:', error);
      }
    };

    fetchAllServices();
  };

  useEffect(() => {
    console.log('physicalAddress...', physicalAddress);
    console.log('pLatitudehhh', Individualp_latitude);
    IndividualData({
      website: website,
      selectJobType: selectedselectJobTypesString,
      servicesValue: servicesValue,
      p_latitude: isChecked ? '' : Individualp_latitude,
      p_longitude: Individualp_longitude,
      physicalAddress: physicalAddress,
    });

    handle_describe_yourself();
    if (selectJobType !== null) {
      handleServices(selectJobType);
    }
  }, [
    selectJobType,
    currentLocation,
    website,
    selectedselectJobTypesString,
    servicesValue,
    Individualp_latitude,
    Individualp_longitude,
    physicalAddress,
  ]);
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View>
      <View style={IndividualSignupStyle.card}>
        <View>
          <Text style={IndividualSignupStyle.want_Heading}>
            {
              'The category of service you offer (you can select multiple options)'
            }
          </Text>
          <FlatList
            data={kodieDescribeYourselfData}
            renderItem={jobType_render}
            keyExtractor={item => item.lookup_key.toString()}
            numColumns={2}
          />
        </View>
        {selectedselectJobTypesString == '' ? null : (
          <View style={IndividualSignupStyle.inputContainer}>
            <Text style={LABEL_STYLES.commontext}>
              {'The type of service you perform'}
            </Text>
            <MultiSelect
              style={[
                IndividualSignupStyle.dropdown,
                // {
                //   backgroundColor: _COLORS.Kodie_LightGrayLineColor,
                // },
              ]}
              placeholderStyle={IndividualSignupStyle.placeholderStyle}
              selectedTextStyle={IndividualSignupStyle.selectedTextStyle}
              inputSearchStyle={IndividualSignupStyle.inputSearchStyle}
              iconStyle={IndividualSignupStyle.iconStyle}
              search
              data={servicesData}
              labelField="lookup_description"
              valueField="lookup_key"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={servicesValue}
              onChange={selectedItems => {
                setservicesValue(selectedItems);
              }}
              selectedStyle={{
                // flex: 1,
                backgroundColor: _COLORS.Kodie_BlackColor,
                borderRadius: 20,
                alignSelf: 'center',
              }}
              // renderItem={lookingServices_render}
            />
            {/* <Dropdown
    style={[
      IndividualSignupStyle.dropdown,
      {
        backgroundColor: isClick
          ? null
          : _COLORS.Kodie_LightGrayLineColor,
      },
    ]}
    placeholderStyle={IndividualSignupStyle.placeholderStyle}
    selectedTextStyle={IndividualSignupStyle.selectedTextStyle}
    inputSearchStyle={IndividualSignupStyle.inputSearchStyle}
    iconStyle={IndividualSignupStyle.iconStyle}
    data={servicesData}
    search
    maxHeight={300}
    labelField="lookup_description"
    valueField="lookup_key"
    placeholder="Select item"
    value={servicesValue}
    disable={selectedselectJobTypesString ? false : true}
    searchPlaceholder="Search..."
    onChange={item => {
      setservicesValue(item.lookup_key);
    }}
    renderItem={lookingServices_render}
  /> */}
          </View>
        )}

        <View style={IndividualSignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>
            {'Company / professional physical address'}
          </Text>

          <View style={IndividualSignupStyle.inputContainer}>
            <View style={IndividualSignupStyle.chekboxview}>
              <TouchableOpacity onPress={handleChecked}>
                {/* {isChecked ? ( */}
                <MaterialIcons
                  name={!isChecked ? 'check-box-outline-blank' : 'check-box'}
                  size={24}
                  color={
                    !isChecked
                      ? _COLORS.Kodie_GrayColor
                      : _COLORS.Kodie_GreenColor
                  }
                  style={IndividualSignupStyle.Check_Icon}
                />
                {/* ) : null} */}
              </TouchableOpacity>

              <Text style={IndividualSignupStyle.commonaddresstext}>
                {'Same as personal physical address'}
              </Text>
            </View>
            <View style={IndividualSignupStyle.locationConView}>
              <View style={IndividualSignupStyle.locationContainer}>
                {isChecked ? (
                  <TextInput
                    style={IndividualSignupStyle.locationInput}
                    value={isChecked ? physicalAddress : ''}
                    onChangeText={onChangeIndivialLocation}
                    placeholder="Search location"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                ) : (
                  <TextInput
                    style={IndividualSignupStyle.locationInput}
                    // value={location}
                    value={IndividualLocation}
                    onChangeText={onChangeIndivialLocation}
                    onFocus={IndividualOnFocus}
                    placeholder="Search location"
                    placeholderTextColor={_COLORS.Kodie_LightGrayColor}
                  />
                )}
              </View>
              <TouchableOpacity
                style={IndividualSignupStyle.locationIconView}
                onPress={onPresslocation}>
                <Octicons
                  name={'location'}
                  size={22}
                  color={_COLORS.Kodie_GreenColor}
                  style={IndividualSignupStyle.locationIcon}
                />
              </TouchableOpacity>
            </View>
            {/* {locationError ? (
                  <Text style={PropertyDetailsStyle.error_text}>
                    {locationError}
                  </Text>
                ) : null} */}
          </View>
        </View>

        <View style={IndividualSignupStyle.inputContainer}>
          <Text style={LABEL_STYLES.commontext}>{'Website'}</Text>
          <TextInput
            style={IndividualSignupStyle.input}
            value={website}
            onChangeText={setWebsite}
            // onChangeText={() => {
            //   setWebsite();
            //   props.website(website);
            // }}
            placeholder="Enter your website address (if you have one)"
            placeholderTextColor={_COLORS.Kodie_LightGrayColor}
          />
        </View>
      </View>
    </View>
  );
};

export default IndividualSignup;
