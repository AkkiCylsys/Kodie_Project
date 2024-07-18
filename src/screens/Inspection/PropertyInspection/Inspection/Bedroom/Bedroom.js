//ScreenNo:98
//ScreenNo:99
//ScreenNo:100
//ScreenNo:101
//ScreenNo:102
//ScreenNo:103
//ScreenNo:104
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import { BedroomCss } from './BedroomCss';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import { _goBack } from '../../../../../services/CommonServices';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FONTFAMILY, _COLORS } from '../../../../../Themes';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CommonLoader } from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import AddCustomItems from '../../../../../components/InspectionModul/AddCustomItem';
import { useNavigation } from '@react-navigation/native';
import AddCabinatItems from '../../../../../components/Molecules/AddCabinatItems/AddCabinatItems';
import { EditInspectionItem, GetInspectionAreas, InspectionAddItem, UpdateInspectionItem, UpdateItemMapping } from '../../../../../services/InspectionModuleServices.js/InspectionServices';
const Bedroom = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editGetItem, setEditGetItem] = useState([]);
  const [getItems, setGetItems] = useState([]);
  const [AreaKey, setAreaKey] = useState([]);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const navigation = useNavigation()
  const AreasKey = props.route.params.TeamAreaKey;
  const Team_Key = props.route.params.TIM_KEY;
  const Created_Id = props.route.params.teamCreateId;
  const AreaName = props.route.params.AreaName;
  const PropertyId = props.route.params.PropertyId;

  useEffect(() => {
    if (isEditing) { handleInspectionuEditItem() }
    else { handleInspectionudateItem() }
    getInspectionAreas();
  }, [isEditing]);
  const getInspectionAreas = async () => {
    setIsLoading(true);
    try {
      const areas = await GetInspectionAreas(Team_Key);
      setAreaKey(areas);
      console.log('get_inspection_area_details....', areas);
    } catch (error) {
      console.error('get_inspection_area_details error:', error);
      Alert.alert('Error', 'Failed to fetch inspection areas');
    } finally {
      setIsLoading(false);
    }
  };
  const getItemStatus = (area_key_id) => {
    const area = AreaKey.find(area => area.area_key_id === area_key_id);
    return area ? area.TAIM_ITEM_STATUS : null;
  };
  const TAIM_ITEM_STATUS = getItemStatus(AreasKey);

  const handleInspectionudateItem = async () => {
    setIsLoading(true);
    const data = {
      p_TAM_AREA_KEY: AreasKey,
      p_TIM_KEY: Team_Key,
    };
    try {
      const items = await UpdateInspectionItem(data);
      setGetItems(items);
      console.log('handleInspectionudateItem.....', items);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to update inspection item');
    } finally {
      setIsLoading(false);
    }
  };
  const handleInspectionuEditItem = async () => {
    setIsLoading(true);
    const data = {
      p_TAM_AREA_KEY: AreasKey,
      p_TIM_KEY: Team_Key,
    };
    try {
      const items = await EditInspectionItem(data);
      setEditGetItem(items);
      console.log('handleInspectionuEditItem.....', items);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to edit inspection item');
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddItem = async () => {
    setIsLoading(true);
    const tamAreaKeys = isEditing ? editGetItem.map(item => item.TAIM_ITEM_KEY).join(',') : getItems.map(item => item.TAIM_ITEM_KEY).join(',');
    console.log("AddItem", tamAreaKeys);
    const data = {
      timKey: Team_Key,
      taimItemKey: tamAreaKeys.toString(),
      tamAreaKey: AreasKey,
      updKey: PropertyId,
      tiimCreatedBy: Created_Id.toString()
    };
    console.log("Item", data);

    try {
      const response = await InspectionAddItem(data);
      Alert.alert('Success', response?.message);
      console.log('API Response:', response);
      handleInspectionudateItem();
      handleInspectionuEditItem();
      getInspectionAreas();
    } catch (error) {
      Alert.alert('Error', 'Failed to add custom item');
      console.error('Error adding custom item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    setIsLoading(true);
    const tamAreaKeys = isEditing ? editGetItem.map(item => item.TAIM_ITEM_KEY).join(',') : getItems.map(item => item.TAIM_ITEM_KEY).join(',');
    console.log("UpdateItem", tamAreaKeys);
    const data = {
      p_TIM_KEY: Team_Key,
      p_TAIM_ITEM_KEY: tamAreaKeys.toString(),
      p_TAM_AREA_KEY: AreasKey,
      p_UPD_KEY: PropertyId,
      p_TIIM_UPDATED_BY: Created_Id.toString()
    };
    console.log("Item", data);

    try {
      const response = await UpdateItemMapping(data);
      Alert.alert('Success', response?.message);
      console.log('API Response UpdateItem:', response);
      handleInspectionudateItem();
      handleInspectionuEditItem();
      getInspectionAreas();
    } catch (error) {
      Alert.alert('Error', 'Failed to update custom item');
      console.error('Error update custom item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = (id) => {
    const removedItem = editGetItem.find((item) => item.TAIM_ITEM_KEY === id);
    if (!removedItem) {
      console.warn(`Item with ID ${id} not found in getItems.`);
      return;
    }
    console.log(`Removing item with ID ${removedItem.TAIM_ITEM_KEY}`);

    const updatedItems = editGetItem.filter((item) => item.TAIM_ITEM_KEY !== id);
    setEditGetItem(updatedItems);
  };

  const ListItem = ({ item, onPressRemove }) => {
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
  const BedroomDetail_render = ({ item }) => {
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
                  {item.status_value ? item.status_value : '...'}
                </Text>
              </View>
            </>
          ) : null}
          {!isEditing ? (
            <View style={BedroomCss.bindinputview}>
              <AntDesign
                name="checkcircle"
                size={18}
                color={item?.TIMC_INSPECTED_ITEMS ?_COLORS.Kodie_GreenColor :_COLORS.Kodie_GrayColor }
              />
              <View style={BedroomCss.messageview}>
                <Text
                  style={{
                    color: _COLORS.Kodie_BlackColor,
                    fontSize: 13,
                    alignItems: 'center',
                    fontFamily: FONTFAMILY.K_Regular,
                  }}>
                  {item.TIMC_COMMENTS ? '1' : '0'}
                </Text>
                <MaterialCommunityIcons
                  name="message-text-outline"
                  size={18}
                  color={_COLORS.Kodie_GreenColor}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  if(TAIM_ITEM_STATUS === 1 ) {
                    setSelectedItem(item);
                  refRBSheet2.current.open({ item })
                  }else{
                  alert('First save the inspection items')
                  }
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
  const HandleOnFirstRbSheet = () => {
    handleInspectionuEditItem();
    refRBSheet1.current.close()
  }
  
  
 
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
              data={editGetItem}
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
                  onPress={() => setIsEditing(!isEditing)}
                  disabled={isLoading ? true : false}
                  width={'20%'}
                  marginHorizontal={10}
                />
                <CustomSingleButton
                  _ButtonText={'Done'}
                  Text_Color={_COLORS.Kodie_WhiteColor}
                  onPress={() => {
                    TAIM_ITEM_STATUS === 1 ?
                    handleUpdateItem(): handleAddItem();
                  }}
                  disabled={isLoading ? true : false}
                  width={'20%'}
                  height={'50%'}
                />
              </View>
            </>
          ) : (
            <>
              <CustomSingleButton
                _ButtonText={'Save'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                onPress={() => {
                  TAIM_ITEM_STATUS === 1 ?
                 handleUpdateItem(): handleAddItem();
                }}
                disabled={isLoading ? true : false}
              />
              <TouchableOpacity style={BedroomCss.goBack_View}
              onPress={() => {
                props.navigation.navigate('PropertyInspection');
              }}>
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
        <AddCustomItems Team_Key={Team_Key} PropertyId={PropertyId} AreasKey={AreasKey} Created_Id={Created_Id} onClose={HandleOnFirstRbSheet} />
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        height={750}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: BedroomCss.bottomModal_container,
        }}>
        <AddCabinatItems
          ItemName={selectedItem ? selectedItem.TAIM_ITEM_NAME : ''}
          onCabinateClose={() => {
            handleInspectionudateItem();
            refRBSheet2?.current.close()}}
          Tim_Key={Team_Key}
          PropertyId={PropertyId}
          AreasKey={AreasKey}
          Created_Id={Created_Id}
          TAIM_ITEM_KEY={selectedItem ? selectedItem.TAIM_ITEM_KEY : ''}
        />
      </RBSheet>

      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
export default Bedroom;
