import React, {useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {PropertyModalStyle} from '../../PropertyModal/PropertyModalStyle';
import {_COLORS} from '../../../Themes';
import {Config} from '../../../Config';
import axios from 'axios';

const data1 = [
  {
    id: '1',
    Data: 'Confirm delete property',
    Icon: (
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '2',
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

const PropertyDeletePopup = props => {
  const propertyId = props?.propertyId;
  const [isLoading, setIsLoading] = useState(false);

  const refRBSheet = useRef();

  const handleCloseModal = () => {
    props.onClose();
  };

  const FinalDeleteVacant = async () => {
    setIsLoading(true);
    try {
      const url = Config.BASE_URL;
      const response = await axios.delete(url + 'delete_property_by_id', {
        data: JSON.stringify({property_id: propertyId}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // console.log('API Response:', response?.data);
      if (response?.data?.success === true) {
        Alert.alert(
          'Property Deleted',
          'The property was deleted successfully.',
        );
        handleCloseModal();
        props?.RefreshListingData();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
    }
  };
  const BottomData = ({item}) => {
    return (
      <TouchableOpacity
        style={PropertyModalStyle.container}
        onPress={() => {
          if (item.id === '1') {
            FinalDeleteVacant();
          } else {
            handleCloseModal();
          }
        }}>
        <View style={PropertyModalStyle.IconView}>{item.Icon}</View>
        <Text style={PropertyModalStyle.text}>{item.Data}</Text>
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
        data={data1}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={BottomData}
        ListHeaderComponent={() => {
          return (
            <>
              <Text
                style={
                  PropertyModalStyle.text
                }>{`Delete property: ${props?.Address} ?`}</Text>
            </>
          );
        }}
      />
    </View>
  );
};

export default PropertyDeletePopup;
