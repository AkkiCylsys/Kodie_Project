import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {_goBack} from '../../../../services/CommonServices';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useNavigation} from '@react-navigation/native';
import ListEmptyComponent from '../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import ManagingTenant from '../../../../components/Molecules/ManagingTenant/ManagingTenant';
import {ManagingPreviousTenantsStyle} from './ManagingPreviousTenantStyle';
const ManagingPreviousTenant = ({TenantAllDetails}) => {
  console.log('TenantAllDetails in Previous:', TenantAllDetails);
  const navigation = useNavigation();
  const [rating, setRating] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [tenantAllDetailsItem, setTenantAllDetailsItem] = useState({});
  const refRBSheet = useRef();

  const searchInviteTenant = () => {};
  const tenantAllDetailRender = ({item}) => {
    const accountDetails = item?.account_details?.[0] || {};
    const {UAD_FIRST_NAME, UAD_PROFILE_PHOTO_PATH} = accountDetails;
    return (
      <>
        <View style={ManagingPreviousTenantsStyle.subContainer}>
          <View style={ManagingPreviousTenantsStyle.userMainView}>
            <Image
              source={
                UAD_PROFILE_PHOTO_PATH && UAD_PROFILE_PHOTO_PATH.length > 0
                  ? {uri: UAD_PROFILE_PHOTO_PATH[0]}
                  : IMAGES.userImage
              }
              resizeMode={'cover'}
              style={ManagingPreviousTenantsStyle.usericon}
            />

            <View style={{marginHorizontal: 16}}>
              <View style={ManagingPreviousTenantsStyle.flexRowView}>
                <Text style={ManagingPreviousTenantsStyle.userName}>
                  {UAD_FIRST_NAME || 'N/A'}{' '}
                </Text>
                <View style={ManagingPreviousTenantsStyle.flexRowView}>
                  <AntDesign
                    name="checkcircle"
                    size={11}
                    color={_COLORS?.Kodie_GreenColor}
                    style={ManagingPreviousTenantsStyle.checkIconStyle}
                  />
                  <Text style={ManagingPreviousTenantsStyle.verifyText}>
                    {'Verified'}
                  </Text>
                </View>
              </View>
              <View style={ManagingPreviousTenantsStyle.ratingView}>
                <AntDesign
                  name="star"
                  size={20}
                  color={_COLORS?.Kodie_GreenColor}
                />
                <Text style={ManagingPreviousTenantsStyle.ratingText}>
                  {'4.2'}
                  <Text style={{color: _COLORS?.Kodie_GrayColor}}>
                    {'(231)'}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={ManagingPreviousTenantsStyle.threeDotView}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                  setTenantAllDetailsItem(item);
                }}>
                <Entypo
                  name="dots-three-horizontal"
                  size={25}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>

              <View style={ManagingPreviousTenantsStyle.screeningView}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_DarkOrange}
                  style={{
                    alignSelf: 'center',
                  }}
                />
                <Text style={ManagingPreviousTenantsStyle.screeningText}>
                  {'Failed screening'}
                </Text>
              </View>
            </View>
          </View>
          <View style={ManagingPreviousTenantsStyle.RowBtnView}>
            <RowButtons
              leftButtonHeight={50}
              RightButtonHeight={50}
              LeftButtonText="View Profile"
              onPressLeftButton={() => {
                navigation.navigate('TenantProfile', {TenantDetails: item});
                console.log('item in tenant...', item);
              }}
              leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
              LeftButtonborderColor={_COLORS.Kodie_BlackColor}
              RightButtonText="Add to property"
              RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
              RightButtonTextColor={_COLORS.Kodie_WhiteColor}
              onPressRightButton={() => {}}
            />
          </View>
        </View>
        <DividerIcon />
      </>
    );
  };
  return (
    <View style={ManagingPreviousTenantsStyle.mainContainer}>
      {TenantAllDetails?.length > 0 ? (
        <FlatList
          data={TenantAllDetails?.length > 0 ? TenantAllDetails : []}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.property_id?.toString()}
          renderItem={tenantAllDetailRender}
          ListEmptyComponent={()=>{
            <ListEmptyComponent EmptyText={"You don't have any Data."} />
          }}
        />
      ) : (
        <ListEmptyComponent EmptyText={"You don't have any Data."} />
      )}
      <RBSheet
        ref={refRBSheet}
        height={260}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: ManagingPreviousTenantsStyle.bottomModal_container,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            marginHorizontal: 5,
          }}
          onPress={() => {
            refRBSheet.current.close();
          }}>
          <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
        </TouchableOpacity>
        <ManagingTenant
          closeModal={() => refRBSheet.current.close()}
          property_id={tenantAllDetailsItem?.property_id}
        />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default ManagingPreviousTenant;
