import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {ProspectsTenantStyle} from './ProspectsTenantStyle';
import {_goBack} from '../../../services/CommonServices';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../Themes/index';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import TenantData from '../../../components/TenantScreen/TenantData';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useNavigation} from '@react-navigation/native';
import ListEmptyComponent from '../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';

export default ProspectsTenant = ({TenantAllDetails}) => {
  console.log('TenantAllDetails in prospects:', JSON.stringify(TenantAllDetails));

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
        <View style={ProspectsTenantStyle.subContainer}>
          <View style={ProspectsTenantStyle.userMainView}>
            <Image
              source={
                UAD_PROFILE_PHOTO_PATH && UAD_PROFILE_PHOTO_PATH.length > 0
                  ? {uri: UAD_PROFILE_PHOTO_PATH[0]}
                  : IMAGES.userImage
              }
              resizeMode={'cover'}
              style={ProspectsTenantStyle.usericon}
            />
            <View style={{marginHorizontal: 16}}>
              <View style={ProspectsTenantStyle.flexRowView}>
                <Text style={ProspectsTenantStyle.userName}>
                  {UAD_FIRST_NAME || 'N/A'}{' '}
                </Text>
                <View style={ProspectsTenantStyle.flexRowView}>
                  <AntDesign
                    name="checkcircle"
                    size={11}
                    color={_COLORS?.Kodie_GreenColor}
                    style={ProspectsTenantStyle.checkIconStyle}
                  />
                  <Text style={ProspectsTenantStyle.verifyText}>
                    {'Verified'}
                  </Text>
                </View>
              </View>
              <View style={ProspectsTenantStyle.ratingView}>
                <AntDesign
                  name="star"
                  size={20}
                  color={_COLORS?.Kodie_GreenColor}
                />
                <Text style={ProspectsTenantStyle.ratingText}>
                  {'0.0'}
                  <Text style={{color: _COLORS?.Kodie_GrayColor}}>
                    {'(0)'}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={ProspectsTenantStyle.threeDotView}>
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

              <View style={ProspectsTenantStyle.screeningView}>
                <Entypo
                  name="dot-single"
                  size={25}
                  color={_COLORS.Kodie_DarkOrange}
                  style={{
                    alignSelf: 'center',
                  }}
                />
                <Text style={ProspectsTenantStyle.screeningText}>
                  {'Failed screening'}
                </Text>
              </View>
            </View>
          </View>
          <View style={ProspectsTenantStyle.RowBtnView}>
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
              onPressRightButton={()=>{}}
            />
          </View>
        </View>
        <DividerIcon />
      </>
    );
  };
  return (
    <View style={ProspectsTenantStyle.mainContainer}>
      {TenantAllDetails?.length > 0 ? (
        <FlatList
          data={TenantAllDetails?.length > 0 ? TenantAllDetails : []}
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.property_id?.toString()}
          renderItem={tenantAllDetailRender}
        />
      ) : (
        <ListEmptyComponent EmptyText={"You don't have any Data."} />
      )}
      <RBSheet
        ref={refRBSheet}
        height={210}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: ProspectsTenantStyle.bottomModal_container,
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
        <TenantData
          closeModal={() => refRBSheet.current.close()}
          TenantAllDetails={tenantAllDetailsItem}
        />
      </RBSheet>
      {/* {isLoading ? <CommonLoader /> : null} */}
    </View>
  );
};
