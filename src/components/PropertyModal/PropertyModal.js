import React, {useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {PropertyModalStyle} from './PropertyModalStyle';
import {_COLORS} from '../../Themes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import PropertyPopup from './PropertyPopup';
import {useNavigation} from '@react-navigation/native';
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
      <AntDesign
        name="delete"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

const data1 = [
  {
    id: '6',
    Data: 'Confirm delete property',
    Icon: (
      <AntDesign
        name="delete"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '7',
    Data: 'Archive instead',
    Icon: (
      <Ionicons
        name="file-tray-full-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

const PropertyModal = props => {
  const propertyId = props?.propertyId;
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const handleCloseModal = () => {
    props.onClose();
  };
  const deleteMarketplace = () => {
    props?.deletelist();
  };
  const BottomData = ({item}) => {
    return (
      <TouchableOpacity
        style={PropertyModalStyle.container}
        onPress={() => {
          if (item.id === '1') {
            navigation.navigate('PropertyReview', {
              propertyid: propertyId,
              propertyView: 'propertyView',
            });
            handleCloseModal();
          }
          if (item.id === '2') {
            refRBSheet.current.open();
          }
          if (item.id === '3') {
            navigation.navigate('PropertyReview', {
              propertyid: propertyId,
              propertyView: 'propertyView',
              DocTab: 'DocTab',
            });
            handleCloseModal();
          }
          if (item.id === '4') {
            navigation.navigate('Notices');
            handleCloseModal();
          }
          if (item.id == '5') {
            deleteMarketplace();
            handleCloseModal();
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
        // data={props?.isDeletePropertyClicked ? data1 : data}
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
        height={590}
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
        {/* Pass propertyId to PropertyPopup */}
        <PropertyPopup propertyId={propertyId} onClose={handleCloseModal} />
      </RBSheet>
    </View>
  );
};

export default PropertyModal;
