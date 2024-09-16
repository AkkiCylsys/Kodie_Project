import React, {useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {BottomModalDataStyle} from './BottomModalDataStyle';
import {_COLORS} from '../../../Themes';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Config} from '../../../Config';
import axios from 'axios';
import {UnlistMarketDetails} from '../../../services/PropertyListing/ListingServices';
import {useSelector} from 'react-redux';

const BottomModalData = ({
  propertyId,
  Address,
  isDeletePropertyClicked,
  onClose,
  onDelete,
  autoList,
  onDeleteData,
}) => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '3,4';
  const roleArray = userRole ? userRole.split(',') : [];
  const hasLandlordRole = roleArray.includes('3');

  const options = hasLandlordRole
    ? [
        {
          id: '1',
          label: 'View property details',
          icon: (
            <MaterialIcons
              name="preview"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'viewProperty',
        },
        {
          id: '6',
          label:
            autoList == 0
              ? 'List property on kodie property marketplace'
              : 'Unlist property on kodie property marketplace',
          icon: (
            <MaterialIcons
              name="preview"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'listProperty',
        },
        {
          id: '2',
          label: 'Manage documents',
          icon: (
            <MaterialCommunityIcons
              name="file-download-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'manageDocuments',
        },
        {
          id: '3',
          label: 'Create notice / reminder',
          icon: (
            <Ionicons
              name="mail-unread-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'createNotice',
        },
        {
          id: '4',
          label: 'Chat to tenant',
          icon: (
            <Ionicons
              name="chatbubbles-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'chatTenant',
        },
        {
          id: '5',
          label: 'Delete property',
          icon: (
            <AntDesign
              name="delete"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'deleteProperty',
        },
      ]
    : [
        {
          id: '1',
          label: 'View property details',
          icon: (
            <MaterialIcons
              name="preview"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'viewProperty',
        },
        {
          id: '2',
          label: 'Manage documents',
          icon: (
            <MaterialCommunityIcons
              name="file-download-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'manageDocuments',
        },
        {
          id: '3',
          label: 'Create notice / reminder',
          icon: (
            <Ionicons
              name="mail-unread-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'createNotice',
        },
        {
          id: '4',
          label: 'Chat to tenant',
          icon: (
            <Ionicons
              name="chatbubbles-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'chatTenant',
        },
        {
          id: '5',
          label: 'Delete property',
          icon: (
            <AntDesign
              name="delete"
              size={25}
              color={_COLORS.Kodie_GreenColor}
            />
          ),
          action: 'deleteProperty',
        },
      ];

  const deleteOptions = [
    {
      id: '1',
      label: 'Confirm delete property',
      icon: (
        <MaterialIcons
          name="delete-outline"
          size={25}
          color={_COLORS.Kodie_GreenColor}
        />
      ),
      action: 'confirmDelete',
    },
    {
      id: '2',
      label: 'Archive instead',
      icon: (
        <Ionicons
          name="file-tray-full-outline"
          size={25}
          color={_COLORS.Kodie_GreenColor}
        />
      ),
      action: 'archiveProperty',
    },
  ];
  const navigation = useNavigation();

  const handleAction = action => {
    switch (action) {
      case 'viewProperty':
        navigation.navigate('PropertyReview', {
          propertyid: propertyId,
          propertyView: 'propertyView',
        });
        onClose();
        break;
      case 'listProperty':
        autoList == 0
          ? navigation.navigate('PropertyListingDetail', {
              propertyid: propertyId,
            })
          : handleUnList();
        onClose();
        break;
      case 'manageDocuments':
        navigation.navigate('PropertyReview', {
          propertyid: propertyId,
          propertyView: 'propertyView',
          DocTab: 'DocTab',
        });
        onClose();
        break;
      case 'createNotice':
        navigation.navigate('AddNotices', {propertyView: 'propertyView'});
        onClose();
        break;
      case 'chatTenant':
        navigation.navigate('Chats', {property: 'property'});
        onClose();
        break;
      case 'deleteProperty':
        onDelete(propertyId);
        break;
      case 'confirmDelete':
        onDeleteData(propertyId, Address);
        break;
      case 'archiveProperty':
        archiveProperty();
        break;
      default:
        break;
    }
  };
  const archiveProperty = async () => {
    console.log('sdfsdfdsf');
    try {
      const url = Config.BASE_URL;
      const archive_apiUrl = url + 'archieve_property';
      const response = await axios.post(archive_apiUrl, {
        property_id: propertyId,
      });
      setTimeout(() => {
        if (response?.data?.success === true) {
          onClose();
        }
      }, 200);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while archiving the property.');
    } finally {
    }
  };
  const handleUnList = async () => {
    const data = {
      property_id: propertyId,
    };
    console.log(data);
    try {
      const response = await UnlistMarketDetails(data);
      Alert.alert('Success', 'Market details have been Unlist successfully.');
      onClose();
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to insert market details.');
    }
  };
  const renderOption = ({item}) => (
    <TouchableOpacity
      style={BottomModalDataStyle.container}
      onPress={() => handleAction(item.action)}>
      <View style={BottomModalDataStyle.IconView}>{item.icon}</View>
      <Text style={BottomModalDataStyle.text}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={BottomModalDataStyle.mainContainer}>
      <TouchableOpacity
        style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}
        onPress={onClose}>
        <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
      </TouchableOpacity>
      <FlatList
        data={isDeletePropertyClicked ? deleteOptions : options}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderOption}
        ListHeaderComponent={() =>
          isDeletePropertyClicked ? (
            <Text
              style={
                BottomModalDataStyle.text
              }>{`Delete property: ${Address}?`}</Text>
          ) : null
        }
      />
    </View>
  );
};

export default BottomModalData;
