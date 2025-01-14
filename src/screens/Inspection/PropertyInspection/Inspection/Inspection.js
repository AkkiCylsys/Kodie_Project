//ScreenNo:94
//ScreenNo:95
//ScreenNo:96
//ScreenNo:97
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import { InspectionCss } from './InspectionCss';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { IMAGES, LABEL_STYLES, _COLORS } from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import { Dropdown } from 'react-native-element-dropdown';
import Bedroom from './Bedroom/Bedroom';
import { ScrollView } from 'react-native-gesture-handler';
import { Config } from '../../../../Config';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { GetInspectionItem, UpdateInspectionItem } from '../../../../services/InspectionModuleServices.js/InspectionServices';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
import axiosInstance from '../../../../services/axiosInstance';

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
  const [showcustomAreaNameError, setShowcustomAreaNameError] = useState('');
  const [errorSimiarArea, setErrorSimiarArea] = useState(false);
  const [getItems, setGetItems] = useState([]);
  const TIM_KEY = props?.TIM_KEY;
  const PropertyId = props.PropertyId;
  const onNavigateAndUpdate = async (id, name, TAIM_ITEM_STATUS) => {
    console.log(id, 'iddd');
    console.log(getCustomeArea, "areaareaareaareaareaareaarea");
  
    // Find the area where TAM_SIMILAR_AREA_KEY matches the given id
    const area = getCustomeArea.find(item => item.TAM_AREA_KEY === id);
  console.log(area,"vvvvvvvv");
    // If id is greater than 9 and area is found, use TAM_SIMILAR_AREA_KEY, otherwise use id
    const TAM_AREA_TYPE = id > 9 && area && area.TAM_SIMILAR_AREA_KEY !== '0' 
    ? area.TAM_SIMILAR_AREA_KEY 
    : id;
    // Log the TAM_AREA_TYPE for debugging purposes
    console.log(TAM_AREA_TYPE, 'TAM_AREA_TYPE');
  
    // Call handleInspectionudateItem with TAM_AREA_TYPE
    const items = await handleInspectionudateItem(TAM_AREA_TYPE);
  
    // Navigate to the screen with relevant parameters
    navigateToScreen(id, name, TAIM_ITEM_STATUS, items);
  };
  function keyExtractor(item) {
    return item?.area_key_id; // Use userId as the key
  }
  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...AreaKey]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setAreaKey(copy);
  }

  const handleInspectionudateItem = async (id) => {
    setIsLoading(true);
  
    const data = {
      p_TAM_AREA_KEY: id,
      p_TIM_KEY: TIM_KEY,
    };

    try {
      const items = await UpdateInspectionItem(data);
      setGetItems(items);  // Save items in state
      console.log('handleInspectionudateItem.INs....', items);
      return items;  // Return the fetched items to use in navigation
    } catch (error) {
      console.error('Error:', error);
      return [];  // Return an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToScreen = (id, name, TAIM_ITEM_STATUS, getItems) => {
    console.log(id, 'TAIM_ITEM_STATUS');
   

    navigation.navigate('Bedroom', {
      TeamAreaKey: id,
      AreaName: name,
      TIM_KEY: TIM_KEY,
      getinspectionKey: getinspection.v_UPD_KEY,
      PropertyId: PropertyId,
      teamCreateId: loginData?.Login_details?.user_account_id,
      TAIM_ITEM_STATUS: TAIM_ITEM_STATUS,
      getItems: getItems.map(item => item.TAIM_ITEM_KEY).join(',')  // Pass the items as a string
    });
  };
  const handleCloseModal = () => {
    refRBSheet2.current.close();
    refRBSheet1.current.close();
  };
  const fetchInspectionData = async () => {
    await getInspectionAreas();
    await getInspectionDetails();
    await getInspectionCustomeAreas();
  };
  useFocusEffect(
    useCallback(() => {
      fetchInspectionData();
    }, [])
  );

  const getInspectionCustomeAreas = async () => {
    const url = Config.BASE_URL;
    const AreaData = {
      p_TIM_KEY: TIM_KEY,
      p_TAM_CREATED_BY: loginData?.Login_details?.user_account_id,
    };
    const AreaGetUrl = `get_inspection_area`;
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(AreaGetUrl, AreaData);
      console.log('area response', response?.data);
      if (response?.data?.success === true) {
        setGetCustomeArea(response?.data?.data || []);
        console.log('setAreaKey:', response?.data?.data);
      } else {
        console.error('area response_error:', response?.data?.error);
      }
    } catch (error) {
      console.error('area response error:', error);
    } finally {
      setIsLoading(false);
    }

  };
  const getInspectionAreas = () => {
    const url = Config.BASE_URL;
    const AreaGetUrl =`get_inspection_area_details/${TIM_KEY}`;
    console.log('Request URL:', AreaGetUrl);
    setIsLoading(true);
    axiosInstance
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
  const Customarea_render = item => {
    return (
      <View
        style={[
          InspectionCss.itemView,
          {
            backgroundColor:
              item?.TAM_AREA_KEY === customeAreavalue
                ? _COLORS.Kodie_MidLightGreenColor
                : null,
          },
        ]}>
        {item?.TAM_AREA_KEY === customeAreavalue ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={InspectionCss.textItem}>
          {item?.TAM_AREA_NAME}
        </Text>
      </View>
    );
  };
  const handleDone = async () => {
    // alert(value);
    setIsLoading(true);
    const url = Config.BASE_URL;
    const AreaPostUrl =`inspection_details/CustomArea`;
    const InspectionData = {
      custom_area_name: email,
      is_standard_check_inspection: selectedButtonStandardId,
      area_similar: selectedButtonStandardId == 0 ? 0 :customeAreavalue,
      area_future_inspection: selectedButtonFutueId,
      property_id: PropertyId,
      inspection_id: TIM_KEY,
      created_by: loginData?.Login_details?.user_account_id.toString(),
    };
    console.log('InspectionData.....', InspectionData);
    try {
      const response = await axiosInstance.post(AreaPostUrl, InspectionData);
      console.log(response);
      if (response?.data?.success) {
        Alert.alert('Success', 'Custom area added successfully');
        refRBSheet1.current.close();
        setEmail('');
        setSelectedButtonStandardId(1);
        setSelectedButtonFutueId(1);
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
    const deleteUrl =`delete_inspection_details/${TIM_KEY}`;

    try {
      const response = await axiosInstance.delete(deleteUrl);
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
  const handleCancleItem = async (id) => {
    setIsLoading(true);

    try {
      const payload = {
        TIM_KEY: TIM_KEY,
        TAM_AREA_KEYS: id.toString(),
      };
      console.log('itempayload', payload);
      const data = await GetInspectionItem(payload);
      console.log(data);
      getInspectionAreas();
      setIsLoading(false)
    } catch (err) {
      console.log(err, 'dfs');
    } finally {
      setIsLoading(false);
    }
  };
  const removeItem = (id) => {
    const removedItem = AreaKey.find((item) => item.area_key_id === id);
    if (!removedItem) {
      console.warn(`Item with ID ${id} not found in getItems.`);
      return;
    }
    console.log(`Removing item with ID ${removedItem.area_key_id}`);
    handleCancleItem(removedItem.area_key_id);
    const updatedItems = AreaKey.filter((item) => item.area_key_id !== id);
    setAreaKey(updatedItems);
  };
  const getInspectionDetails = () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const apiUrl =`get_inspection_details/${TIM_KEY}`;
    axiosInstance
      .get(apiUrl)
      .then(response => {
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
      const Inspection_Url ='inspection_details/save';
      console.log('Inspection_Url', Inspection_Url);
      const res = await axiosInstance.post(Inspection_Url, Inspectiondata);
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
  const handleCustomName = text => {
    setEmail(text);
    if (text.trim() === '') {
      setShowcustomAreaNameError('Custom area name cannot be empty!');
    } else {
      setShowcustomAreaNameError('');
    }
  };
  const SubmitCustomArea = () => {
    if (email.trim() === '') {
      setShowcustomAreaNameError('Custom area name cannot be empty!')
    } else if (selectedButtonStandardId !== 0 && customeAreavalue == '') {
      setErrorSimiarArea(true);
    } else {
      handleDone();
    }
  }
  function Inspection_render(info: DragListRenderItemInfo<{ area_key_id: number; TAM_AREA_NAME: string; }>) {
    const { item, onDragStart, onDragEnd } = info;
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
        <View
          style={InspectionCss.mainView}
        >
          <View style={InspectionCss.flatListContainer}>
            {!isEditing ? (
              <View style={InspectionCss.ImageStyle}>
                <IconComponent
                  name={iconName}
                  size={20}
                  color={_COLORS.Kodie_GreenColor}
                  style={{ alignSelf: 'center' }}

                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => removeItem(item.area_key_id)}
              >
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
              onPress={() =>{
                onNavigateAndUpdate(
                  item.area_key_id,
                  item?.area_name,
                  item?.TAIM_ITEM_STATUS,
                )}
              }
              style={InspectionCss.rightIcon}>
              <Feather
                name={'chevron-right'}
                size={20}
                color={_COLORS.Kodie_BlackColor}
                style={InspectionCss.rightIconStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={item.area_key_id}
              onPressIn={onDragStart}
              onPressOut={onDragEnd}
            >
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
    <>
        <View style={InspectionCss.MainContainer}>
          <View style={InspectionCss.Container}>
            <View style={InspectionCss.mainView}>
              <Text style={InspectionCss.areasText}>{'Inspection areas'}</Text>
              <View style={InspectionCss.editView}>
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
                }}
                disabled={false}
              />
            ) : null}

            <DragList
              data={AreaKey}
              keyExtractor={keyExtractor}
              onReordered={onReordered}
              renderItem={Inspection_render}
              containerStyle={{marginBottom:100}}
            />
          </View>
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
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView style={InspectionCss.Container}>
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

            {/* Area Name Input */}
            <View style={InspectionCss.inputContainer}>
              <Text style={[LABEL_STYLES._texinputLabel, InspectionCss.cardHeight]}>
                {'Name of area:'}
                <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
              </Text>
              <TextInput
                style={InspectionCss.emailinput}
                value={email}
                onChangeText={handleCustomName}
                placeholder="Create a name for your custom area"
                placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
                keyboardType="email-address"
                onBlur={() => handleCustomName(email)}
              />
              {showcustomAreaNameError && (
                <Text style={InspectionCss.errorText}>{showcustomAreaNameError}</Text>
              )}
            </View>

            {/* Standard Checklist */}
            <Text style={InspectionCss.cancelText}>
              {'Would you like to use a standard inspection checklist?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              RightButtonText={'No'}
              leftButtonProps={{
                backgroundColor: selectedButtonStandard
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_lightGreenColor,
                textColor: selectedButtonStandard
                  ? _COLORS.Kodie_MediumGrayColor
                  : _COLORS.Kodie_BlackColor,
                borderColor: selectedButtonStandard
                  ? _COLORS.Kodie_LightWhiteColor
                  : _COLORS.Kodie_GrayColor,
                onPress: () => {
                  setSelectedButtonStandard(false);
                  setSelectedButtonStandardId(1);
                },
              }}
              rightButtonProps={{
                backgroundColor: selectedButtonStandard
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
                textColor: selectedButtonStandard
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
                borderColor: selectedButtonStandard
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor,
                onPress: () => {
                  setSelectedButtonStandard(true);
                  setSelectedButtonStandardId(0);
                },
              }}
            />

            {/* Similar Area Selection */}
            {selectedButtonStandardId == 0 ? null :(
            <View style={{ marginVertical: 12 }}>
              <Text style={[InspectionCss.cancelText, { marginBottom: 12 }]}>
                {'Select the area most similar to your custom area:'}
                <Text style={{ color: _COLORS?.Kodie_redColor }}>*</Text>
              </Text>
              <Dropdown
                style={InspectionCss.dropdown}
                placeholderStyle={InspectionCss.placeholderStyle}
                selectedTextStyle={InspectionCss.selectedTextStyle}
                inputSearchStyle={InspectionCss.inputSearchStyle}
                iconStyle={InspectionCss.iconStyle}
                data={getCustomeArea || []}
                search
                maxHeight={300}
                labelField="TAM_AREA_NAME"
                valueField="TAM_AREA_KEY"
                placeholder="Enter address manually"
                searchPlaceholder="Search ..."
                value={customeAreavalue}
                onChange={item => {
                  setCustomeAreaValue(item.TAM_AREA_KEY);
                  setErrorSimiarArea(false);
                }}
                renderItem={Customarea_render}
              />
              {errorSimiarArea && (
                <Text style={InspectionCss.errorText}>
                  {'Please select a most similar to your custom area!'}
                </Text>
              )}
            </View>
            )}
            {/* Future Standard Area */}
            <Text style={InspectionCss.cancelText}>
              {'Make this a standard area for future inspections?'}
            </Text>
            <RowButtons
              LeftButtonText={'Yes'}
              RightButtonText={'No'}
              leftButtonProps={{
                backgroundColor: selectedButtonFutue
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_lightGreenColor,
                textColor: selectedButtonFutue
                  ? _COLORS.Kodie_MediumGrayColor
                  : _COLORS.Kodie_BlackColor,
                borderColor: selectedButtonFutue
                  ? _COLORS.Kodie_LightWhiteColor
                  : _COLORS.Kodie_GrayColor,
                onPress: () => {
                  setSelectedButtonFutue(false);
                  setSelectedButtonFutueId(1);
                },
              }}
              rightButtonProps={{
                backgroundColor: selectedButtonFutue
                  ? _COLORS.Kodie_lightGreenColor
                  : _COLORS.Kodie_WhiteColor,
                textColor: selectedButtonFutue
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_MediumGrayColor,
                borderColor: selectedButtonFutue
                  ? _COLORS.Kodie_GrayColor
                  : _COLORS.Kodie_LightWhiteColor,
                onPress: () => {
                  setSelectedButtonFutue(true);
                  setSelectedButtonFutueId(0);
                },
              }}
            />

          </ScrollView>

          {/* Action Buttons */}
          <View style={InspectionCss.ButtonView}>
            <TouchableOpacity style={InspectionCss.cancelView} onPress={handleCloseModal}>
              <Text style={InspectionCss.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InspectionCss.SaveView} onPress={SubmitCustomArea} disabled={isLoading}>
              <Text style={InspectionCss.DoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    </>
  );
};
export default Inspection;
