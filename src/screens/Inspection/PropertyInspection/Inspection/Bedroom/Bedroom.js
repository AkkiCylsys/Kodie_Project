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
  const AreasKey = props.route.params.TeamAreaKey;
  const Team_Key = props.route.params.TIM_KEY;
  const Inspection_Key = props.route.params.getinspectionKey;
  const Created_Id = props.route.params.teamCreateId;
  console.log('AreasKey', AreasKey);
  console.log(Team_Key, Inspection_Key, Created_Id, 'get DAta in Bedroom....');

  useEffect(() => {
    handleInspectionItem();
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
    return (
      <>
        <View style={BedroomCss.TableView}>
          {isEditing ? (
            // <View
            //   style={[
            //     BedroomCss.minustextview,
            //     {
            //       flex: isEditing ? 0.5 : 0,
            //     },
            //   ]}>
            //   <TouchableOpacity onPress={() => removeItem(item.id)}>
            //     <AntDesign
            //       name={'minuscircle'}
            //       size={20}
            //       color={_COLORS.Kodie_lightRedColor}
            //       style={[BedroomCss.IconStyle]}
            //     />
            //   </TouchableOpacity>
            //   <Text
            //     style={[
            //       BedroomCss.bedText,
            //       {
            //         flex: isEditing ? 1 : 0,
            //       },
            //     ]}>
            //     {item?.TAIM_ITEM_NAME}
            //   </Text>
            // </View>
            <Text></Text>
          ) : null}
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
                  {item.Inspected}
                </Text>
              </View>
              {/* <Dropdown
                style={BedroomCss.dropdown1}
                placeholderStyle={BedroomCss.placeholderStyle}
                selectedTextStyle={BedroomCss.selectedTextStyle}
                inputSearchStyle={BedroomCss.inputSearchStyle}
                iconStyle={BedroomCss.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="select"
                searchPlaceholder="Search..."
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              /> */}
            </>
          ) : null}
          {!isEditing ? (
            <View style={BedroomCss.bindinputview}>
              <AntDesign
                name="checkcircle"
                size={18}
                color={_COLORS.Kodie_GreenColor}
              />
              {/* <AntDesign
                name="circle-with-cross"
                size={25}
                color={_COLORS.Kodie_lightGreenColor}
              /> */}
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

  return (
    <View style={BedroomCss.MainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Bedroom'}
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
          {/* {!isEditing ? (
            <View style={BedroomCss.RowContainer}>
              <Text style={BedroomCss.RowText}>{"Inspected"}</Text>
              <Text style={BedroomCss.RowText}>{"Status"}</Text>
            </View>
          ) : null} */}

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
                    props.navigation.navigate('AboutYou');
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
                  props.navigation.navigate('AboutYou');
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
        height={400}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BedroomCss.bottomModal_container,
        }}>
        <View style={BedroomCss.Container}>
          <View style={BedroomCss.ModalContainer}>
            <Text style={BedroomCss.ShareText}>{'Add custom item'}</Text>
            <AntDesign
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
          </View>
          <View style={BedroomCss.inputContainer}>
            <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
              {'Name of item'}
            </Text>
            <TextInput
              style={BedroomCss.emailinput}
              value={name}
              onChangeText={setName}
              placeholder="Create a name for your custom item"
              placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
            />
          </View>
          <View style={BedroomCss.inputContainer}>
            <Text style={[LABEL_STYLES._texinputLabel, BedroomCss.cardHeight]}>
              {'Description of item'}
            </Text>
            <TextInput
              style={BedroomCss.emailinput}
              value={Description}
              onChangeText={setDescription}
              placeholder="Provide a description of the item"
              placeholderTextColor={_COLORS.Kodie_MediumGrayColor}
            />
          </View>
          <Text style={BedroomCss.cancelText}>
            {'Make this a standard item for future inspections?'}
          </Text>
          <RowButtons
            LeftButtonText={'Yes'}
            leftButtonbackgroundColor={_COLORS.Kodie_lightGreenColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            LeftButtonborderColor={_COLORS.Kodie_GrayColor}
            RightButtonText={'No'}
            RightButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            RightButtonTextColor={_COLORS.Kodie_MediumGrayColor}
            RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
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
        ref={refRBSheet2}
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
        {/* Second Modal Content */}
        <View style={BedroomCss.secondModal}>
          <View style={BedroomCss.ModalContainer}>
            <Text style={BedroomCss.ShareText}>
              {selectedItem ? selectedItem.name : ''}
            </Text>
            <AntDesign
              name="close"
              size={20}
              color={_COLORS.Kodie_BlackColor}
            />
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
    </View>
  );
};
export default Bedroom;
