import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {ProspectsTenantStyle} from './ProspectsTenantStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../Themes/index';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import TenantData from '../../../components/TenantScreen/TenantData';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
import {useNavigation} from '@react-navigation/native';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {getTenantAllDetailsService} from '../../../services/TenantManagementsServices/TenantScreeningServices/TenantScreeningServices';

export default ProspectsTenant = ({TenantAllDetails}) => {
  console.log('TenantAllDetails in prospects:', TenantAllDetails);

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
            <TouchableOpacity style={ProspectsTenantStyle.usericon}>
              <Image
                source={
                  // UAD_PROFILE_PHOTO_PATH
                  //   ? {uri: UAD_PROFILE_PHOTO_PATH}
                  //   :
                  IMAGES.userImage
                }
              />
            </TouchableOpacity>

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
                  {'4.2 (101)'}
                </Text>
              </View>
            </View>
            <View style={ProspectsTenantStyle.threeDotView}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open();
                  setTenantAllDetailsItem(item); // Correctly calling the state setter function
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
              onPressLeftButton={() => {}}
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
    <View style={ProspectsTenantStyle.mainContainer}>
      {/* <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage
        height={48}
        marginTop={20}
        placeholder={'Search tenants'}
        frontSearchIcon
        searchData={searchInviteTenant}
        filterIcon="filter"
        iconSet="AntDesign"
      />
      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} /> */}
      {/* <View style={{marginHorizontal: 16}}>
        <CustomSingleButton
          _ButtonText={'+ Add tenant'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          text_Size={14}
          backgroundColor={_COLORS.Kodie_BlackColor}
          //   onPress={props.propertyDetail}
          disabled={isLoading ? true : false}
        />
      </View> */}
      <FlatList
        data={TenantAllDetails || []}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.property_id}
        renderItem={tenantAllDetailRender}
      />
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
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
