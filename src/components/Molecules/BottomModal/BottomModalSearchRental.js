import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../Themes';
import {useNavigation} from '@react-navigation/native';
import {BottomModalSearchRentalStyle} from './BottomModalSearchRentalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const data = [
  {
    id: '1',
    Data: 'View property details',
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
    Data: 'Make offer',
    Icon: (
      <MaterialCommunityIcons
        name="file-download-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '3',
    Data: 'Create notice/reminder',
    Icon: (
      <Ionicons
        name="mail-unread-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '4',
    Data: 'Message owner',
    Icon: (
      <Ionicons
        name="chatbubbles-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];
const BottomModalSearchRental = props => {
  const navigation = useNavigation();
  const propertyId = props.propertyId;
  const rentalAmount = props.rentalAmount;
  console.log('propertyId.....', propertyId);
  const handleClose = () => {
    props.onClose();
  };
  const bottomModalrender = ({item}) => {
    return (
      <TouchableOpacity
        style={BottomModalSearchRentalStyle.container}
        onPress={() => {
          if (item?.id == '1') {
            navigation.navigate('ViewRentalDetails', {
              propertyId: propertyId,
              rentalAmount: rentalAmount,
            });
            handleClose();
          }
          if (item?.id == '2') {
            navigation.navigate('RentalOffer');
            handleClose();
          }
        }}>
        <View style={BottomModalSearchRentalStyle.IconView}>{item.Icon}</View>
        <Text style={BottomModalSearchRentalStyle.text}>{item.Data}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={BottomModalSearchRentalStyle.mainConatiner}>
      <FlatList
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={bottomModalrender}
      />
    </View>
  );
};

export default BottomModalSearchRental;

const styles = StyleSheet.create({});
