//ScreenNo:94
//ScreenNo:95
//ScreenNo:96
//ScreenNo:97
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';

import {InspectionCss} from './InspectionCss';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IMAGES, LABEL_STYLES, _COLORS} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import {Dropdown} from 'react-native-element-dropdown';
import Bedroom from './Bedroom/Bedroom';
import {ScrollView} from 'react-native-gesture-handler';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {googleMapIsInstalled} from 'react-native-maps/lib/decorateMapComponent';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const Inspection = props => {
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [customeAreavalue, setCustomeAreaValue] = useState([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [AreaKey, setAreaKey] = useState([]);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [selectedButtonFutue, setSelectedButtonFutue] = useState(false);
  const [selectedButtonFutueId, setSelectedButtonFutueId] = useState(1);
  const [selectedButtonStandard, setSelectedButtonStandard] = useState(false);
  const [selectedButtonStandardId, setSelectedButtonStandardId] = useState(1);
  const [getinspection, setGetInspection] = useState([]);
  const [getCustomeArea, setGetCustomeArea] = useState([]);
  const [getAreaKey, setGetAreaKey] = useState([]);
  console.log('getinspection', getinspection);
  const TIM_KEY = props?.TIM_KEY;

  console.log(' props?.', TIM_KEY);
  console.log('getinspection.TAM_AREA_KEY', AreaKey);
  console.log('getAreaKey....', getAreaKey);
  const PropertyId = props.PropertyId;
  const navigateToScreen = (id, name, TAIM_ITEM_STATUS) => {
    console.log(TAIM_ITEM_STATUS, 'TAIM_ITEM_STATUS');
    navigation.navigate('Bedroom', {
      TeamAreaKey: id,
      AreaName: name,
      TIM_KEY: TIM_KEY,
      getinspectionKey: getinspection.v_UPD_KEY,
      PropertyId: PropertyId,
      teamCreateId: loginData?.Login_details?.user_account_id,
      TAIM_ITEM_STATUS: TAIM_ITEM_STATUS,
    });
  };
  const handleCloseModal = () => {
    refRBSheet2.current.close();
    refRBSheet1.current.close();
  };
  useEffect(() => {
    getInspectionAreas();
  }, []);
  useEffect(() => {
    getInspectionDetails();
    getInspectionCustomeAreas();
  }, []);

  const getInspectionCustomeAreas = () => {
    const url = Config.BASE_URL;
    const CustomAreaGetUrl = url + `get_inspection_area`;
    console.log('Request URL custome area:', CustomAreaGetUrl);
    setIsLoading(true);
    axios
      .get(CustomAreaGetUrl)
      .then(response => {
        console.log('Selected_CustomeArea', response?.data);
        if (response?.data?.success === true) {
          console.log('Selected_CustomeArea....', response?.data?.data[0]);
          setGetCustomeArea(response?.data?.data[0]);
          setIsLoading(false);
        } else {
          console.error('Selected_CustomeArea_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_CustomeArea error:', error);
        setIsLoading(false);
      });
  };
  const getInspectionAreas = () => {
    const url = Config.BASE_URL;
    const AreaGetUrl = url + `get_inspection_area_details/${TIM_KEY}`;
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    axios
      .get(AreaGetUrl)
      .then(response => {
        console.log('Selected_Address', response?.data);
        if (response?.data?.success === true) {
          console.log('Selected_Address....', response?.data?.data);
          setAreaKey(response?.data?.data);
          setGetAreaKey(response?.data?.data[0]);
          setIsLoading(false);
        } else {
          console.error('Selected_Address_error:', response?.data?.error);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Selected_Address error:', error);
        setIsLoading(false);
      });
  };

  const handleDone = async () => {
    // alert(value);
    setIsLoading(true);
    const url = Config.BASE_URL;
    const AreaPostUrl = url + `inspection_details/CustomArea`;

    try {
      const response = await axios.post(AreaPostUrl, {
        custom_area_name: email,
        is_standard_check_inspection: selectedButtonStandardId,
        area_similar: customeAreavalue,
        area_future_inspection: selectedButtonFutueId,
        property_id: PropertyId,
        inspection_id: TIM_KEY,
        created_by: 543,
      });
      console.log(response);
      if (response?.data?.success) {
        Alert.alert('Success', 'Custom area added successfully');
        refRBSheet1.current.close();
        setEmail('');
        setSelectedButtonStandardId('');
        setSelectedButtonFutueId('');
        setCustomeAreaValue('');
        await getInspectionAreas();
      } else {
        Alert.alert('Error', 'Failed to add custom area');
        console.error('Error:', response?.data?.error || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add custom area');
      console.error('Error:', error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInspection = async () => {
    console.log('delete');
    const url = Config.BASE_URL;
    const deleteUrl = url + `delete_inspection_details/${TIM_KEY}`;

    try {
      const response = await axios.delete(deleteUrl);
      if (response?.data?.success) {
        Alert.alert('Success', 'Inspection deleted successfully');
        navigation?.navigate('NewInspection');
        // refRBSheet2.current.close();
      } else {
        Alert.alert('Error', 'Failed to delete inspection');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete inspection');
      console.error('Error:', error.response || error.message);
    }
  };

  const getInspectionDetails = () => {
    setIsLoading(true);
    const url = Config.BASE_URL;

    const apiUrl = url + `get_inspection_details/${TIM_KEY}`;

    axios
      .get(apiUrl)
      .then(response => {
        console.log('API Response: getinspection', response?.data?.data[0]);
        setGetInspection(response?.data?.data[0]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API Error PersonalDetails CIP:', error);
      });
  };

  const SubmitInspection = async () => {
    setIsLoading(true);
    try {
      const Inspectiondata = {
        UPD_KEY: PropertyId,
        TIM_INSPECTION_TYPE: getinspection.v_TIM_INSPECTION_TYPE,
        TIM_SCHEDULE_TIME: getinspection.v_TIM_SCHEDULE_TIME,
        TIM_SCHEDULE_DATE: moment(getinspection.v_TIM_SCHEDULE_DATE).format(
          'YYYY-MM-DD',
        ),
        TIM_LOCATION: getinspection.v_TIM_LOCATION,
        TIM_LOCATION_LONGITUDE: parseFloat(
          getinspection.v_TIM_LOCATION_LONGITUDE,
        ),
        TIM_LOCATION_LATITUDE: parseFloat(
          getinspection.v_TIM_LOCATION_LATITUDE,
        ),
        TIM_ADD_ATTENDENCE: getinspection.v_TIM_ADD_ATTENDENCE,
        TIM_IS_FURNISHED: getinspection.v_TIM_IS_FURNISHED,
        TIM_DESCRIPTION: getinspection.v_TIM_DESCRIPTION,
        TAM_AREA_KEYS: getinspection.cur_TAM_AREA_KEY,
        CREATED_BY: loginData?.Login_details?.user_account_id.toString(),
      };
      console.log('inspec', Inspectiondata);
      const Url = Config.BASE_URL;
      const Inspection_Url = Url + 'inspection_details/save';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axios.post(Inspection_Url, Inspectiondata);
      console.log('scheduule inspection....', res?.data);
      refRBSheet2.current.close();
      if (res?.data?.success == true) {
        alert('Inspection duplicate succussfully');
        setIsLoading(false);
      }
    } catch (error) {
      if (error?.response && error?.response?.status === 404) {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      } else {
        alert(error?.response?.data?.message);
        setIsLoading(false);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const Inspection_render = ({item}) => {
    console.log(item.area_key_id);
    let IconComponent;
    let iconName = '';

    switch (item.area_name) {
      case 'Bathroom':
        IconComponent = FontAwesome;
        iconName = 'bathtub';
        break;
      case 'Bedroom':
        IconComponent = FontAwesome;
        iconName = 'bed';
        break;
      case 'Garden':
        IconComponent = MaterialIcons;
        iconName = 'grass';
        break;
      case 'Kitchen':
        IconComponent = MaterialIcons;
        iconName = 'kitchen';
        break;
      case 'Dining room':
        IconComponent = MaterialIcons;
        iconName = 'dinner-dining';
        break;
      case 'Living room':
        IconComponent = MaterialIcons;
        iconName = 'family-restroom';
        break;
      case 'Exterior':
        IconComponent = MaterialCommunityIcons;
        iconName = 'home-assistant';
        break;
      case 'Roof':
        IconComponent = MaterialCommunityIcons;
        iconName = 'home-roof';
        break;
      case 'Garage':
        IconComponent = MaterialCommunityIcons;
        iconName = 'garage';
        break;
      // Add cases for other areas if needed
      default:
        IconComponent = MaterialIcons;
        iconName = 'home'; // Default icon
        break;
    }
    return (
      <>
        <View style={InspectionCss.mainView} key={item?.area_key_id}>
          <View style={InspectionCss.flatListContainer}>
            {!isEditing ? (
              <View style={InspectionCss.ImageStyle}>
                <IconComponent
                  name={iconName}
                  size={20}
                  color={_COLORS.Kodie_GreenColor}
                  style={{alignSelf: 'center'}}
                  resizeMode={'center'}
                />
              </View>
            ) : (
              <TouchableOpacity>
                <AntDesign
                  name={'minuscircle'}
                  size={20}
                  color={_COLORS.Kodie_lightRedColor}
                  style={InspectionCss.IconStyle}
                />
              </TouchableOpacity>
            )}
            <Text style={InspectionCss.editText}>{item.area_name}</Text>
          </View>
          {!isEditing ? (
            <TouchableOpacity
              onPress={() =>
                navigateToScreen(
                  item.area_key_id,
                  item?.area_name,
                  item?.TAIM_ITEM_STATUS,
                )
              }
              style={InspectionCss.rightIcon}>
              <Feather
                name={'chevron-right'}
                size={20}
                color={_COLORS.Kodie_BlackColor}
                style={InspectionCss.IconStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Entypo
                name={'menu'}
                size={25}
                color={_COLORS.Kodie_MediumGrayColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <DividerIcon />
      </>
    );
  };

  return (
    <ScrollView>
      <View style={InspectionCss.MainContainer}>
        <View style={InspectionCss.Container}>
          <View style={InspectionCss.mainView}>
            <Text style={InspectionCss.areasText}>{'Inspection areas'}</Text>
            <View style={InspectionCss.editView}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet2.current.open();
                }}
                style={InspectionCss.IconView}>
                <Entypo
                  name={'dots-three-horizontal'}
                  size={20}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEditing(!isEditing)}
                style={InspectionCss.IconView}>
                <Text style={InspectionCss.editText}>{'Edit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DividerIcon />
          {isEditing ? (
            <CustomSingleButton
              _ButtonText={'Add custom area'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={40}
              marginBottom={16}
              width={'50%'}
              onPress={() => {
                refRBSheet1.current.open();
                // Alert.alert('Button Clicked', 'klhdkujdsgjdsg');
              }}
              disabled={false}
            />
          ) : null}
          <FlatList
            data={AreaKey}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.area_key_id}
            renderItem={Inspection_render}
          />
        </View>
        <RBSheet
          ref={refRBSheet1}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={550}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: InspectionCss.bottomModal_container,
          }}>
          <View style={InspectionCss.Container}>
            <View style={InspectionCss.ModalContainer}>
              <Text style={InspectionCss.ShareText}>{'Add custom area'}</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Entypo
                  name="cross"
                  size={24}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>
            <View style={InspectionCss.inputContainer}>
              <Text
                style={[LABEL_STYLES._texinputLabel, InspectionCss.cardHeight]}>
                {'Name of area:'}
              </Text>
              <TextInput
                style={InspectionCss.emailinput}
                value={email}
                onChangeText={setEmail}
                placeholder="Create a name for your custom area"
                placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
                keyboardType="email-address"
              />
            </View>
            <Text style={InspectionCss.cancelText}>
              {'Would you like to use a standard inspection checklist?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              leftButtonbackgroundColor={
                !selectedButtonStandard
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonStandard
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonStandard
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              onPressLeftButton={() => {
                setSelectedButtonStandard(false);
                setSelectedButtonStandardId(1);
                // alert(selectedButtonStandard)
              }}
              RightButtonText={'No'}
              onPressRightButton={() => {
                setSelectedButtonStandard(true);
                setSelectedButtonStandardId(0);

                // alert(selectedButtonStandard)
              }}
              RightButtonbackgroundColor={
                selectedButtonStandard
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonStandard
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonStandard
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
            />
            <Text style={[InspectionCss.cancelText, {marginVertical: 12}]}>
              {' Select the area most similar to your custom area:'}
            </Text>
            <Dropdown
              style={InspectionCss.dropdown}
              placeholderStyle={InspectionCss.placeholderStyle}
              selectedTextStyle={InspectionCss.selectedTextStyle}
              inputSearchStyle={InspectionCss.inputSearchStyle}
              iconStyle={InspectionCss.iconStyle}
              data={getCustomeArea}
              search
              maxHeight={300}
              labelField="TAM_AREA_NAME"
              valueField="TAM_AREA_KEY"
              placeholder="Enter address manually"
              searchPlaceholder="Search ..."
              value={customeAreavalue}
              onChange={item => {
                setCustomeAreaValue(item.TAM_AREA_KEY);
              }}
            />
            <Text style={InspectionCss.cancelText}>
              {'Make this a standard area for future inspections?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              onPressLeftButton={() => {
                setSelectedButtonFutue(false);
                setSelectedButtonFutueId(1);
                // alert(selectedButtonFutue)
              }}
              leftButtonbackgroundColor={
                !selectedButtonFutue
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonFutue
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              LeftButtonborderColor={
                !selectedButtonFutue
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
              RightButtonText={'No'}
              onPressRightButton={() => {
                setSelectedButtonFutue(true);
                // alert(selectedButtonFutue)
                setSelectedButtonFutueId(0);
              }}
              RightButtonbackgroundColor={
                selectedButtonFutue
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonFutue
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor
              }
              RightButtonborderColor={
                selectedButtonFutue
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor
              }
            />
            <View style={InspectionCss.ButtonView}>
              <TouchableOpacity
                style={InspectionCss.cancelView}
                onPress={handleCloseModal}>
                <Text style={[InspectionCss.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={InspectionCss.SaveView}
                onPress={handleDone}
                disabled={isLoading}>
                <Text style={InspectionCss.DoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
        <RBSheet
          ref={refRBSheet2}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: InspectionCss.bottomModal_container,
          }}>
          <View style={InspectionCss.Container}>
            <View style={InspectionCss.ModalContainer}>
              <Text style={InspectionCss.ShareText}>{'Options'}</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Entypo
                  name="cross"
                  size={24}
                  color={_COLORS.Kodie_BlackColor}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={InspectionCss.modalFile}
              onPress={SubmitInspection}>
              <View style={InspectionCss.deleteIconView}>
                <MaterialCommunityIcons
                  name="file-multiple-outline"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                />
              </View>
              <Text style={InspectionCss.editText}>
                {'Duplicate inspection'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={InspectionCss.modalFile}
              onPress={handleDeleteInspection}>
              <View style={InspectionCss.deleteIconView}>
                <MaterialIcons
                  name="delete-outline"
                  size={25}
                  color={_COLORS.Kodie_GreenColor}
                />
              </View>
              <Text style={InspectionCss.editText}>{'Delete inspection'}</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
      {/* {isLoading ? <CommonLoader/> : null} */}
    </ScrollView>
  );
};
export default Inspection;
