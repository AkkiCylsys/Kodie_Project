import React, {useRef} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {_COLORS, IMAGES} from '../../Themes';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TenantDataStyle} from './TenantDataStyle';
const data = [
  {
    id: '1',
    Data: 'Screen tenant',
    Icon: (
      <MaterialCommunityIcons
        name="home-account"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '2',
    Data: 'Add tenant to property',
    Icon: <EvilIcons name="user" size={25} color={_COLORS.Kodie_GreenColor} />,
  },
  {
    id: '3',
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

const TenantData = props => {
  const {TenantAllDetails} = props;
  const navigation = useNavigation();
  const BottomData = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={TenantDataStyle.container}
          onPress={() => {
            if (item.id === '1') {
              navigation.navigate('PropertyViewApplication', {
                propertyId: TenantAllDetails?.property_id,
                bid_id: TenantAllDetails?.bid_id,
                tenant_id: TenantAllDetails?.tenant_id,
                landlord_id: TenantAllDetails?.landlord_id,
                Pre_screening: 'Pre-screening',
              });
              props.closeModal();
            }
            if (item.id === '5') {
            }
          }}>
          <View style={TenantDataStyle.IconView}>{item.Icon}</View>
          <Text style={TenantDataStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <View style={TenantDataStyle.mainContainer}>
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
export default TenantData;
