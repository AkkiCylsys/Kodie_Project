import React, {useRef} from 'react';
import {View, Text, Image, FlatList,Alert} from 'react-native';
import {IMAGES, _COLORS} from '../../../Themes';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomModalDataStyle} from '../BottomModal/BottomModalDataStyle';

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
    Data: 'List property on kodie property marketplace',
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
      <MaterialIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];
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

const VacantModal = props => {
  const propertyId = props?.propertyId;
  // console.log('propertyId.VacantModal..', propertyId);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const handleCloseModal = () => {
    props.onClose();
  };
  const handleDeleteProperty = propertyDelId => {
    props.onDelete(propertyDelId);
    handleCloseModal()
  };
  const FinalDeleteProperty = (propertyDelId, Address) => {
    props.onDelete(propertyDelId, Address);
  };
  const BottomData = ({item, index}) => {
    return (
      <>
        {/* {props?.isDeletePropertyClicked ? (
          <>
            <TouchableOpacity
              style={BottomModalDataStyle.container}
              onPress={() => {
                if (item.id === '1') {
                  FinalDeleteProperty();
                }
                if (item.id === '2') {
                }
              }}>
              <View style={BottomModalDataStyle.IconView}>{item.Icon}</View>
              <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
            </TouchableOpacity>
          </>
        ) : ( */}
        <TouchableOpacity
          style={BottomModalDataStyle.container}
          onPress={() => {
            if (item.id === '1') {
              navigation.navigate('PropertyReview', {
                propertyid: propertyId,
                propertyListing: 'propertyListing',
              });
              handleCloseModal();
            }
            if (item.id === '2') {
              navigation.navigate('MarketplacePropertyListing', {
                propertyid: propertyId,
              });
              handleCloseModal();
            }
            if (item.id === '3') {
              navigation.navigate('PropertyReview', {
                propertyid: propertyId,
                // propertyView: 'propertyView',
                DocTab: 'DocTab',
                propertyListing: 'propertyListing',

              });
              handleCloseModal();
            }
            if (item.id === '4') {
              navigation.navigate('Notices');
              handleCloseModal();
            }
            if (item.id === '5') {
              // handleDeleteProperty();
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
                    onPress: () => {
                      props.onDeleteData()
                    },
                  },
                ],
              );
            }
          }}>
          <View style={BottomModalDataStyle.IconView}>{item.Icon}</View>
          <Text style={BottomModalDataStyle.text}>{item.Data}</Text>
        </TouchableOpacity>
        {/* )} */}
      </>
    );
  };
  return (
    <View style={BottomModalDataStyle.mainContainer}>
      <TouchableOpacity
        style={{
          justifyContent: 'flex-end',
          alignSelf: 'flex-end',
        }}
        onPress={handleCloseModal}>
        <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
      </TouchableOpacity>
      <FlatList
        // data={props?.isDeletePropertyClicked ? data1 : data}
        data={data}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={BottomData}
        // ListHeaderComponent={() => {
        //   return (
        //     <>
        //       {props?.isDeletePropertyClicked ? (
        //         <Text
        //           style={
        //             BottomModalDataStyle.text
        //           }>{`Delete property: ${props?.Address} ?`}</Text>
        //       ) : null}
        //     </>
        //   );
        // }}
      />
    </View>
  );
};
export default VacantModal;
