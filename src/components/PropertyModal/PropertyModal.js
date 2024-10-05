import React, {useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {PropertyModalStyle} from './PropertyModalStyle';
import {_COLORS} from '../../Themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import PropertyPopup from './PropertyPopup';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
// Define data for FlatList
const data = [
  {
    id: '1',
    Data: 'View /edit property details',
    Icon: (
      <MaterialIcons
        name="preview"
        size={25}
        color={_COLORS.Kodie_GreenColor}
        style={{alignSelf: 'center'}}
      />
    ),
  },
  {
    id: '2',
    Data: 'Make property available for rental bidding',
    Icon: (
      <MaterialCommunityIcons
        name="alpha-k-box-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '3',
    Data: 'Manage documents',
    Icon: (
      <MaterialCommunityIcons
        name="file-download-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '4',
    Data: 'Notices & reminders',
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '5',
    Data: 'Delete property',
    Icon: (
      <AntDesign name="delete" size={25} color={_COLORS.Kodie_GreenColor} />
    ),
  },
];
const PropertyModal = props => {
  const propertyId = props?.propertyId;
  const [isSaveClick, setIsSaveClick] = useState(
    isSaveClick == true ? 400 : 650,
  );
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const handleCloseModal = () => {
    props.onClose();
  };
  const deleteMarketplace = () => {
    props?.deletelist();
  };
  const handleSaveClick = saveClick => {
    console.log('saveClick...', saveClick);
    setIsSaveClick(saveClick);
  };

  const BottomData = ({item}) => {
    return (
      <TouchableOpacity
        style={PropertyModalStyle.container}
        onPress={() => {
          if (item.id === '1') {
            navigation.navigate('PropertyReview', {
              propertyid: propertyId,
              propertyListing: 'propertyListing',
            });
            handleCloseModal();
          }
          if (item.id === '2') {
            // refRBSheet.current.open();
            Alert.alert("Rental bidding","Coming soon")
          }
          if (item.id === '3') {
            navigation.navigate('PropertyReview', {
              propertyid: propertyId,
              propertyListing: 'propertyListing',
              DocTab: 'DocTab',
            });
            handleCloseModal();
          }
          if (item.id === '4') {
            navigation.navigate('Notices');
            handleCloseModal();
          }
          if (item.id == '5') {
            Alert.alert(
              'Delete Property',
              'Are you sure you want to delete this property?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    deleteMarketplace(); 
                    handleCloseModal();
                  },
                },
              ],
              { cancelable: true }
            );
          }
        }}>
        <View style={PropertyModalStyle.IconView}>{item.Icon}</View>
        <Text style={[PropertyModalStyle.text, {flex: 1}]}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={PropertyModalStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
          paddingHorizontal: 20,
        }}
        onPress={handleCloseModal}
      />
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={BottomData}
      />
      {/* RBSheet for additional actions */}
      <RBSheet
        ref={refRBSheet}
        height={isSaveClick == true ? 400 : 650}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
        }}>
        <PropertyPopup
          propertyId={propertyId}
          onClose={handleCloseModal}
          saveClicked={handleSaveClick}
        />
      </RBSheet>
    </View>
  );
};

export default PropertyModal;
