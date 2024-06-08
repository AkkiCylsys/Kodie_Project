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
import { googleMapIsInstalled } from 'react-native-maps/lib/decorateMapComponent';
import { useSelector } from 'react-redux';
const Data = [
  {
    id: 1,
    image: IMAGES.BedroomIcon,
    name: 'Bedroom',
  },
  {
    id: 2,
    image: IMAGES.Bathroom,
    name: 'Bathroom',
  },
  {
    id: 3,
    image: IMAGES.diningRoom,
    name: 'Dining Room',
  },
  {
    id: 4,
    image: IMAGES.Exterior,
    name: 'Exterior',
  },
  {
    id: 5,
    image: IMAGES.Garage,
    name: 'Garage',
  },
  {
    id: 6,
    image: IMAGES.Garden,
    name: 'Garden',
  },
  {
    id: 7,
    image: IMAGES.kitchen,
    name: 'Kitchen',
  },
  {
    id: 8,
    image: IMAGES.LivingRoom,
    name: 'Living Room',
  },
  {
    id: 9,
    image: IMAGES.Roof,
    name: 'Roof',
  },
];
const DropdownData = [
  {label: 'Bedroom', value: '1'},
  {label: 'Bathroom', value: '2'},
  {label: 'Dining Room', value: '3'},
  {label: 'Exterior', value: '4'},
  {label: 'Garage', value: '5'},
  {label: 'Garden', value: '6'},
  {label: 'Kitchen', value: '7'},
  {label: 'Living Room', value: '8'},
  {label: 'Roof', value: '9'},
];
const Inspection = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [AreaKey, setAreaKey] = useState([]);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [selectedButtonFutue, setSelectedButtonFutue] = useState(0);
  const [selectedButtonStandard, setSelectedButtonStandard] = useState(0);
  console.log(
    'loginresponse_jobdetails..',
    loginData?.Login_details?.user_account_id,
  );
  const TIM_KEY = props?.TIM_KEY;

  console.log(' props?.', TIM_KEY);
  const PropertyId=props.PropertyId
  const navigateToScreen = id => {
    switch (id) {
      case 1:
        <Bedroom />;
        break;
      case 2:
        break;
      case 3:
        break;
      default:
        break;
    }
  };
  const handleCloseModal = () => {
    refRBSheet2.current.close();
    refRBSheet1.current.close();
  };
  useEffect(() => {
    getInspectionAreas();
  }, []);
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
    alert(value)
    setIsLoading(true);
    const url = Config.BASE_URL;
    const AreaPostUrl = url + `inspection_details/CustomArea`;

    try {
      const response = await axios.post(AreaPostUrl, {
        custom_area_name:email,
        is_standard_check_inspection: true,
        area_similar: 5,
        area_future_inspection: false,
        property_id: PropertyId,
        inspection_id: TIM_KEY,
        created_by: 543,
      });
      console.log (response)
      if (response?.data?.success) {
        Alert.alert('Success', 'Custom area added successfully');
        refRBSheet1.current.close();
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

  const Inspection_render = ({item}) => {
    console.log(item);
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
        IconComponent = AntDesign;
        iconName = 'grass';
        break;
      case 'Kitchen':
        IconComponent = AntDesign;
        iconName = 'kitchen';
        break;
      case 'Dining room':
        IconComponent = AntDesign;
        iconName = 'kitchen';
        break;
      case 'Living room':
        IconComponent = AntDesign;
        iconName = 'kitchen';
        break;
      case 'Exterior':
        IconComponent = AntDesign;
        iconName = 'kitchen';
        break;
      case 'Roof':
        IconComponent = AntDesign;
        iconName = 'kitchen';
        break;
      case 'Garage':
        IconComponent = MaterialIcons;
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
              <AntDesign
                name={'minuscircle'}
                size={20}
                color={_COLORS.Kodie_lightRedColor}
                style={InspectionCss.IconStyle}
              />
            )}
            <Text style={InspectionCss.editText}>{item.area_name}</Text>
          </View>
          {!isEditing ? (
            <TouchableOpacity
              onPress={() => navigateToScreen(item.id)}
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
              <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
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
            />
          </View>
          <Text style={InspectionCss.cancelText}>
            {'Would you like to use a standard inspection checklist?'}
          </Text>
          <RowButtons
          // onPressLeftButton={() => {
          //   setSelectedButtonStandard(1);
          //   // alert(selectedButtonStandard)
          // }}
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'No'}
            // onPressRightButton={() => {
            //   setSelectedButtonStandard(0);
            //   // alert(selectedButtonStandard)
            // }}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <Text style={[InspectionCss.cancelText, {marginVertical: 16}]}>
            {' Select the area most similar to your custom area:'}
          </Text>
          <Dropdown
            style={InspectionCss.dropdown}
            placeholderStyle={InspectionCss.placeholderStyle}
            selectedTextStyle={InspectionCss.selectedTextStyle}
            inputSearchStyle={InspectionCss.inputSearchStyle}
            iconStyle={InspectionCss.iconStyle}
            data={DropdownData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Enter address manually"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Text style={InspectionCss.cancelText}>
            {'Make this a standard area for future inspections?'}
          </Text>
          <RowButtons
            LeftButtonText={'Yes'}
            // onPressLeftButton={() => {
            //   setSelectedButtonFutue(0);
            //   // alert(selectedButtonFutue)
            // }}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'No'}
            // onPressRightButton={() => {
            //   setSelectedButtonFutue(0);
            //   // alert(selectedButtonFutue)
            // }}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
          />
          <View style={InspectionCss.ButtonView}>
            <TouchableOpacity style={InspectionCss.cancelView}>
              <Text style={[InspectionCss.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InspectionCss.SaveView} onPress={handleDone} disabled={isLoading}>
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

            <TouchableOpacity style={InspectionCss.modalFile}>
              <Image
                source={IMAGES.Duplicate}
                style={InspectionCss.ImageStyle}
                resizeMode={'center'}
              />
              <Text style={InspectionCss.editText}>
                {'Duplicate inspection'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={InspectionCss.modalFile}>
              <View style={InspectionCss.deleteIconView}>
                <MaterialIcons
                  name="delete-outline"
                  size={20}
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
