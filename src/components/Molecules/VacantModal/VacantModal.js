import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomModalDataStyle } from '../BottomModal/BottomModalDataStyle'; // Adjust import path as necessary
import { _COLORS } from '../../../Themes'; // Adjust import path as necessary
import { UnlistMarketDetails } from '../../../services/PropertyListing/ListingServices';

const VacantModal = (props) => {
  const { propertyId, onClose, onDeleteData, Address ,autoList} = props;
  const navigation = useNavigation();
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
  const data = [
    {
      id: '1',
      Data: 'View property details',
      Icon: (
        <MaterialIcons
          name="preview"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          style={{ alignSelf: 'center' }}
        />
      ),
      navigateTo: 'PropertyReviewDetails',
      params: {
        propertyid: propertyId,
        propertyVacantListing: 'propertyVacantListing',
        // propertyView: 'propertyView',
      },
    },
    {
      id: '2',
      Data: autoList == 0
      ? 'List property on kodie property marketplace'
      : 'Unlist property on kodie property marketplace',
      Icon: (
        <MaterialCommunityIcons
          name="alpha-k-box-outline"
          size={25}
          color={_COLORS.Kodie_GreenColor}
        />
      ),
      handleAction: () => { autoList == 0
      ? navigation.navigate('PropertyListingDetail', {
          propertyid: propertyId,
          viewMarketPlace: 'ViewMarketPlace',
        })
      : handleUnList()
      },
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
      navigateTo: 'PropertyReviewDetails',
      params: {
        propertyid: propertyId,
        DocTab: 'DocTab',
        propertyVacantListing: 'propertyVacantListing',
      },
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
      navigateTo: 'Notices',
    },
    {
      id: '5',
      Data: 'Delete property',
      Icon: (
        <AntDesign name="delete" size={25} color={_COLORS.Kodie_GreenColor} />
      ),
      handleAction: () => {
        Alert.alert(
          'Confirmation',
          'Are you sure you want to delete the vacant property?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: onDeleteData,
            },
          ],
        );
      },
    },
  ];

  const handleAction = (item) => {
    if (item.navigateTo) {
      navigation.navigate(item.navigateTo, {
        ...item.params,
      });
    }
    if (item.handleAction) {
      item.handleAction();
    }
    onClose();
  };

  const renderBottomData = ({ item }) => {
    return (
      <TouchableOpacity
        style={BottomModalDataStyle.container}
        onPress={() => handleAction(item)}
      >
        <View style={BottomModalDataStyle.IconView}>{item.Icon}</View>
        <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={BottomModalDataStyle.mainContainer}>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id}
        renderItem={renderBottomData}
      />
    </View>
  );
};

export default VacantModal;
