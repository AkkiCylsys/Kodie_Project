import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {ManagingTenantStyle} from './ManagingTenantStyle';
import {_COLORS, IMAGES} from '../../../Themes';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: '1',
    Data: 'Rent history',
    Icon: (
      <FontAwesome5
        name="house-user"
        size={24}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '2',
    Data: 'Inspections checklist',
    Icon: (
      <MaterialIcons
        name="history"
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
    Data: 'Delete tenant',
    Icon: (
      <MaterialCommunityIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

const ManagingTenant = props => {
  const {closeModal, property_id} = props;
  const navigation = useNavigation();
  const BottomData = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={ManagingTenantStyle.container}
          onPress={() => {
            if (item.id === '1') {
              navigation.navigate("Renthistory");
              closeModal();
            }
            if (item.id === '2') {
              navigation.navigate('InspectionsChecklist');
              closeModal();
            }
            if (item?.id === '3') {
              navigation.navigate('TenantDocuments', {
                property_id: property_id,
              });
              closeModal();
            }
          }}>
          <Text style={ManagingTenantStyle.IconView}>
            <View style={ManagingTenantStyle.IconView}>{item.Icon}</View>
          </Text>
          <Text style={ManagingTenantStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={ManagingTenantStyle.mainContainer}>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={BottomData}
      />
    </View>
  );
};
export default ManagingTenant;
