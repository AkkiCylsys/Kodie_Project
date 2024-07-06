//ScreenNo:98
//ScreenNo:99
//ScreenNo:100
//ScreenNo:101
//ScreenNo:102
//ScreenNo:103
//ScreenNo:104
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {BedroomCss} from './BedroomCss';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import {_goBack} from '../../../../../services/CommonServices';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {FONTFAMILY, LABEL_STYLES, _COLORS} from '../../../../../Themes';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import UploadImageBoxes from '../../../../../components/Molecules/UploadImageBoxes/UploadImageBoxes';
import UploadImageData from '../../../../../components/Molecules/UploadImage/UploadImage';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../../../Config';
import axios from 'axios';
import AddCustomItems from '../../../../../components/InspectionModul/AddCustomItem';
import { useNavigation } from '@react-navigation/native';
const data = [
  {label: 'Good', value: '1'},
  {label: 'Ok', value: '2'},
  {label: 'Bad', value: '3'},
  {label: 'Damaged', value: '4'},
  {label: 'Urgent repair', value: '5'},
  {label: 'Not usable', value: '6'},
];

const Bedroom = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [remainingItemId, setRemainingItemId] = useState([]);
  const [editGetItem, setEditGetItem] = useState([]);
  const [getItems, setGetItems] = useState([]);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const [value, setValue] = useState(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [Description, setDescription] = useState('');
  const [futureInspection, setfutureInspection] = useState(false);
  const [futureInspectionId, setfutureInspectionId] = useState(1);
  const [InspectionStatusType, setInspectionStatusType] = useState([]);
const navigation= useNavigation()
  const AreasKey = props.route.params.TeamAreaKey;
  const Team_Key = props.route.params.TIM_KEY;
  const Inspection_Key = props.route.params.getinspectionKey;
  const Created_Id = props.route.params.teamCreateId;
  const AreaName = props.route.params.AreaName;
  const PropertyId = props.route.params.PropertyId;
  console.log('AreasKey', AreasKey);
  console.log(Team_Key, Inspection_Key, Created_Id, 'get DAta in Bedroom....');

  useEffect(() => {
    handleInspectionItem();
    handleInsStatus_Type();
  }, []);
  const handleInspectionItem = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const AreaPostUrl = url + `getAreaItemMaster`;

    try {
      const response = await axios.post(AreaPostUrl, {
        tamAreaKey: AreasKey,
      });
      // console.log(response);
      if (response?.data?.success) {
        const items = response?.data?.data[0];
        setGetItems(items);
        setEditGetItem(items);
        // setRemainingItemId(items.map(item => item.id));
        
        console.log(response?.data?.data[0], 'beroomData.....');
      } else {
        console.error('Error:', response?.data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleInspectionudateItem = async () => {
    setIsLoading(true);
    const url = Config.BASE_URL;
    const AreaPostUrl = url + `getInspectionItemByAreakey`;

    try {
      const response = await axios.post(AreaPostUrl, {
        TAMAREAKEY: AreasKey,
  TIMKEY: Team_Key
      });
      // console.log(response);
      if (response?.data?.success) {
        const items = response?.data?.data[0];
        setGetItems(items);
        setEditGetItem(items);
        // setRemainingItemId(items.map(item => item.id));
        
        console.log(response?.data?.data[0], 'handleInspectionudateItem.....');
      } else {
        console.error('Error:', response?.data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const removeItem = (id) => {
    const removedItem = getItems.find((item) => item.TAIM_ITEM_KEY === id);
    if (!removedItem) {
      console.warn(`Item with ID ${id} not found in getItems.`);
      return;
    }
    console.log(`Removing item with ID ${removedItem.TAIM_ITEM_KEY}`);

    const updatedItems = getItems.filter((item) => item.TAIM_ITEM_KEY !== id);
    setGetItems(updatedItems);
  };

  const tamAreaKeys = getItems.map(item => item.TAIM_ITEM_KEY).join(',');
  console.log("dfdfddffd",tamAreaKeys);
  const ListItem = ({item,onPressRemove}) => {
    return (
      <View key={item.TAIM_ITEM_KEY}>
        <View style={[BedroomCss.minustextview]} >
          <View style={BedroomCss.crossrendermainview}>
            <TouchableOpacity
              onPress={() => onPressRemove(item.TAIM_ITEM_KEY)}
              style={{
                alignItems: 'center',
              }}>
              <AntDesign
                name={'minuscircle'}
                size={20}
                color={_COLORS.Kodie_lightRedColor}
                style={[BedroomCss.IconStyle]}
              />
            </TouchableOpacity>
            <Text
              style={[
                BedroomCss.bedText,
                {
                  flex: isEditing ? 0.8 : 0,
                },
              ]}>
              {item?.TAIM_ITEM_NAME}
            </Text>
          </View>
          <TouchableOpacity>
            <Entypo
              name={'menu'}
              size={25}
              color={_COLORS.Kodie_MediumGrayColor}
            />
          </TouchableOpacity>
        </View>
        <DividerIcon marginTop={8} />
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <ListItem item={item} onPressRemove={removeItem} />
  );
  const BedroomDetail_render = ({item}) => {
    console.log("itemitemitemitem",item);
    return (
      <>
        <View style={BedroomCss.TableView}>
          {!isEditing ? (
            <Text
              style={[
                BedroomCss.bedText,
                {
                  flex: !isEditing ? 0.3 : 0,
                },
              ]}>
              {item?.TAIM_ITEM_NAME}
            </Text>
          ) : null}

          {!isEditing ? (
            <>
              <View style={BedroomCss.boxView}>
                <Text
                  style={BedroomCss.YText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item.Inspected? item.Inspected: 'Status'}
                </Text>
              </View>
            </>
          ) : null}
          {!isEditing ? (
            <View style={BedroomCss.bindinputview}>
              <AntDesign
                name="checkcircle"
                size={18}
                color={_COLORS.Kodie_GreenColor}
              />
              <View style={BedroomCss.messageview}>
                <Text
                  style={{
                    color: _COLORS.Kodie_BlackColor,
                    fontSize: 13,
                    alignItems: 'center',
                    fontFamily: FONTFAMILY.K_Regular,
                  }}>
                  1
                </Text>
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  refRBSheet2.current.open({item});
                }}
                style={BedroomCss.rightIcon}>
                <Feather
                  name={'chevron-right'}
                  size={15}
                  color={_COLORS.Kodie_BlackColor}
                  style={BedroomCss.IconStyle}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <DividerIcon marginTop={8} />
      </>
    );
  };
  const HandleOnFirstRbSheet =()=>{
    refRBSheet1.current.close()
  }
  const handleAddItem = async () => {
    setIsLoading(true);

    const data ={
      timKey: Team_Key,
      taimItemKey:tamAreaKeys.toString(),
      tamAreaKey: AreasKey,
      updKey: PropertyId,
      tiimCreatedBy:Created_Id.toString()
    };
    console.log("Item",data);
const Url = Config.BASE_URL;
const ItemUrl = Url + 'add/Item'
    try {
      const response = await axios.post( ItemUrl,data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success',response?.data?.message);
      // handleInspectionudateItem();
      console.log('API Response:', response.data);
    setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to add custom item');
      console.error('Error adding custom item:', error);
    }
  };
  const handleInsStatus_Type = async () => {
    const InspectionData = {
      P_PARENT_CODE: 'STATUS',
      P_TYPE: 'OPTION',
    };
    const url = Config.BASE_URL;
    const InspectionStatustype = url + 'lookup_details';
    console.log('Request URL:', InspectionStatustype);
    setIsLoading(true);

    try {
      const response = await axios.post(InspectionStatustype, InspectionData);
      console.log('Inspection_Statustype', response?.data);

      if (response?.data?.status === true) {
        setIsLoading(false);
        console.log('InspectionStatusData....', response?.data?.lookup_details);
        setInspectionStatusType(response?.data?.lookup_details);
      } else {
        console.error('Inspection_type_error:', response?.data?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Inspection_type error:', error);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={BedroomCss.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={AreaName}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={BedroomCss.Container}>
          {isEditing ? (
            <CustomSingleButton
              _ButtonText={'Add custom item'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              backgroundColor={_COLORS.Kodie_BlackColor}
              height={40}
              marginBottom={16}
              width={'50%'}
              onPress={() => {
                refRBSheet1.current.open();
              }}
              disabled={isLoading ? true : false}
            />
          ) : null}
          <View style={BedroomCss.TableView}>
            <Text style={BedroomCss.HeaderText}>{'Inspection items'}</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Text style={BedroomCss.bedText}>{'Edit'}</Text>
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
          {isEditing ? (
            <FlatList
              data={getItems}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              keyExtractor={item => item?.id}
              renderItem={renderItem}
            />
          ) : (
            <FlatList
              data={getItems}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              keyExtractor={item => item?.id}
              renderItem={BedroomDetail_render}
            />
          )}
          {isEditing ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <CustomSingleButton
                  _ButtonText={'Cancel'}
                  Text_Color={_COLORS.Kodie_BlackColor}
                  backgroundColor={_COLORS.Kodie_WhiteColor}
                  borderColor={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    navigation.navigate.pop();
                  }}
                  disabled={isLoading ? true : false}
                  width={'20%'}
                  marginHorizontal={10}
                />
                <CustomSingleButton
                  _ButtonText={'Done'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    // props.navigation.navigate('AboutYou');
                  handleAddItem();
                  }}
                  disabled={isLoading ? true : false}
                  width={'20%'}
                />
              </View>
            </>
          ) : (
            <>
              <CustomSingleButton
                _ButtonText={'Save'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  handleAddItem();
                }}
                disabled={isLoading ? true : false}
              />
              <TouchableOpacity style={BedroomCss.goBack_View}>
                <View style={BedroomCss.backIcon}>
                  <Feather
                    name="chevron-left"
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </View>
                <Text style={BedroomCss.goBack_Text}>{'Go back'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BedroomCss.bottomModal_container,
        }}>
       <AddCustomItems Team_Key={Team_Key} PropertyId={PropertyId} AreasKey={AreasKey} Created_Id={Created_Id} onClose={HandleOnFirstRbSheet}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BedroomCss.bottomModal_container,
        }}>
        <View style={BedroomCss.secondModal}>
          <View style={BedroomCss.ModalContainer}>
            <Text style={BedroomCss.ShareText}>
              {selectedItem ? selectedItem.TAIM_ITEM_NAME : ''}
            </Text>
            <TouchableOpacity onPress={()=>refRBSheet2.current.close()}>
            <AntDesign
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
            </TouchableOpacity>
          </View>
          <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
            {'Has this item been inspected?'}
          </Text>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
            {!isChecked ? (
              <MaterialIcons
                name="check-box-outline-blank"
                size={30}
                color={_COLORS.Kodie_GrayColor}
              />
            ) : (
              <View style={BedroomCss.groupIconView}>
                <MaterialIcons
                  name="check-box-outline-blank"
                  size={30}
                  color={_COLORS.Kodie_GrayColor}
                />
                <Entypo
                  name="check"
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                  style={BedroomCss.groupIcon}
                />
              </View>
            )}
          </TouchableOpacity>
          <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
            {'Describe the current state of the item'}
          </Text>
          <Dropdown
            style={BedroomCss.dropdown}
            placeholderStyle={BedroomCss.placeholderStyle}
            selectedTextStyle={BedroomCss.selectedTextStyle}
            inputSearchStyle={BedroomCss.inputSearchStyle}
            iconStyle={BedroomCss.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select from drop down"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
          />
          <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
            {'Upload clear images of the item'}
          </Text>
          <UploadImageBoxes
            Box_Text={'Add Photo'}
            circlestyle={BedroomCss.circleStyle}
            pluacircle={BedroomCss.pluscirclestyle}
            size={15}
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
          <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
            {'Comment'}
          </Text>
          <TextInput
            style={BedroomCss.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Enter a description of your property"
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical={'top'}
          />
          <View style={BedroomCss.ButtonView}>
            <TouchableOpacity style={BedroomCss.cancelView}>
              <Text style={[BedroomCss.cancelText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={BedroomCss.SaveView}>
              <Text style={BedroomCss.DoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={180}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BedroomCss.bottomModal_container,
        }}>
        <UploadImageData heading_Text={'Upload more images'} />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default Bedroom;
