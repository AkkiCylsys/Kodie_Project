import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {TenantProfileStyle} from './TenantProfileStyle';
import UserDetails from '../../../../components/PropertyViewApplication/UserDetails/UserDetails';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import PreRentalQuestionnaire from '../../../../components/PropertyViewApplication/UserDetails/PreRentalQuestionnaire/PreRentalQuestionnaire';
import {useSelector} from 'react-redux';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import ReadMore from '@fawazahmed/react-native-read-more';
const TenantProfile = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData...', loginData?.Account_details[0]);
  const TenantDetails = props.route.params.TenantDetails;
  const tenantAccountDeatils = TenantDetails?.account_details?.[0];
  console.log('tenantAccountDeatils...', JSON.stringify(TenantDetails));
  return (
    <SafeAreaView style={TenantProfileStyle.mainContanier}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'View profile'}
      />
      <View
        style={{
          marginHorizontal: 16,
        }}>
        <View style={TenantProfileStyle.container}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              source={
                tenantAccountDeatils?.UAD_PROFILE_PHOTO_PATH &&
                tenantAccountDeatils.UAD_PROFILE_PHOTO_PATH.length > 0
                  ? {uri: tenantAccountDeatils.UAD_PROFILE_PHOTO_PATH[0]}
                  : IMAGES.userImage
              }
              resizeMode={'cover'}
              style={TenantProfileStyle.usericon}
            />
            <View style={TenantProfileStyle.userNameView}>
              <Text style={TenantProfileStyle.username}>
                {tenantAccountDeatils?.UAD_FIRST_NAME}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <AntDesign
                  name="checkcircle"
                  size={18}
                  color={_COLORS.Kodie_lightGreenColor}
                  style={TenantProfileStyle.starIcon}
                />
                <Text
                  style={[
                    TenantProfileStyle.username,
                    {color: _COLORS.Kodie_GreenColor},
                  ]}>
                  {'Verified'}
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity style={{}}>
              <Entypo
                name="dots-three-horizontal"
                size={25}
                color={_COLORS.Kodie_GrayColor}
                style={{
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <AntDesign
                name="checkcircle"
                size={18}
                color={_COLORS.Kodie_lightGreenColor}
                style={TenantProfileStyle.starIcon}
              />
              <Text style={TenantProfileStyle.username}>
                {'4.6 '}
                <Text style={{color: _COLORS?.Kodie_GrayColor}}>{'(231)'}</Text>
              </Text>
            </View>
          </View>
        </View>
        <DividerIcon />
      </View>
      <View style={TenantProfileStyle.bioView}>
        <Text style={TenantProfileStyle.username}>{'Bio'}</Text>
        <ReadMore
          seeMoreStyle={TenantProfileStyle.readMore}
          seeLessStyle={TenantProfileStyle.readMore}
          seeMoreText={'read more'}
          seeLessText={'read Less'}
          numberOfLines={2}
          style={TenantProfileStyle.SubBio}>
          {tenantAccountDeatils?.UAD_BIO}
        </ReadMore>
      </View>
      <Text style={TenantProfileStyle.rentalProfileText}>
        {'Renter profile'}
      </Text>
      <PreRentalQuestionnaire
        accountId={loginData?.Login_details?.user_account_id}
        propertyId={TenantDetails?.property_id}
        bid_id={TenantDetails?.bid_id}
        tenant_id={TenantDetails?.tenant_id}
        landlord_id={TenantDetails?.landlord_id}
        tenantProfile={'tenantProfile'}
      />
      <View style={{marginHorizontal: 16, marginVertical: 10}}>
        <CustomSingleButton
          _ButtonText={'Message tenant'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          text_Size={14}
          backgroundColor={_COLORS.Kodie_BlackColor}
          onPress={() =>
            props.navigation.navigate('Chat', {
              data: tenantAccountDeatils,
              userid: TenantDetails?.tenant_id,
              chatname: 'chatname',
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TenantProfile;
