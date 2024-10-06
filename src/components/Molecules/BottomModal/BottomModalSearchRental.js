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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const BottomModalSearchRental = props => {
  const {propertyId, rentalAmount, bibId, landlordId, searchRentalData,propertyDetailsItem} = props;
  const loginData = useSelector(state => state.authenticationReducer.data);

  // Retrieve user data from Redux state
  const userAccountId = loginData?.Login_details?.user_account_id;
  const hasLandlordRoleId = loginData?.Account_details[0]?.user_role_id;

  const navigation = useNavigation();

  // Data for the modal options
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

  // Filter logic for excluding "Make offer"
  const filteredData = data.filter(item => {
    // Check if the current item is "Make offer" (id = '2')
    if (item.id === '2') {
      // Hide "Make offer" for landlords (roleId 3) or if the user is the landlord of the property
      if (hasLandlordRoleId === '3' || userAccountId === landlordId) {
        return false; // Exclude "Make offer"
      }
    }
    return true; // Include other items
  });

  // Handle modal close
  const handleClose = () => {
    props.onClose();
  };

  // Rendering each modal option
  const bottomModalRender = ({item}) => {
    return (
      <TouchableOpacity
        style={BottomModalSearchRentalStyle.container}
        onPress={() => {
          if (item?.id == '1') {
            navigation.navigate('ViewRentalDetails', {
              propertyId: propertyId,
              rentalAmount: rentalAmount,
              searchRentalData: searchRentalData,
            });
            handleClose();
          }
          if (item?.id == '2') {
            navigation.navigate('RentalOffer', {
              propertyId: propertyId,
              bibId: bibId,
              propertyDetails: props?.propertyDetails,
            });
            handleClose();
          }
          if (item?.id == '3') {
            navigation.navigate('AddNotices');
            handleClose();
          }

          if (item?.id == '4') {
            navigation.navigate('Chat', {
              data: props?.propertyDetails,
              userid: props?.propertyDetails.landlord_id,
              chatname: 'chatname',
            });
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
        data={filteredData}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item?.id}
        renderItem={bottomModalRender}
      />
    </View>
  );
};

export default BottomModalSearchRental;

const styles = StyleSheet.create({});
