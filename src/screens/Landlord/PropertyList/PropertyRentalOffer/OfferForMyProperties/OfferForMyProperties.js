import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {OfferForMyPropertiesStyle} from './OfferForMyPropertiesStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../../../Themes';
import {
  addressType,
  offerForMyProperty,
} from '../../../../../services/PropertyRentalOfferApi/OfferForMyPropertyApi';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SearchBar from '../../../../../components/Molecules/SearchBar/SearchBar';
import ListEmptyComponent from '../../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import {acceptingLandlord} from '../../../../../services/PropertyRentalOfferApi/AcceptingBiddingApi';
const OfferForMyProperties = () => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [addressTypeData, setAddressTypeData] = useState([]);
  const [addressTypeValue, setAddressTypeValue] = useState({});
  const [offerPropertyData, setOfferPropertyData] = useState([]);
  const [lanlordAcceptingId, setLanlordAcceptingId] = useState('');
  const [filteredOfferPropertyData, setFilteredOfferPropertyData] = useState(
    [],
  );
  const [searchQuery, setSearchQuery] = useState('');

  const [occupantButtonId, setOccupantButtonId] = useState(null);

  const [applicationSumAcceptButtonId, setApplicationSumAcceptButtonId] =
    useState(null);

  const [referenceAcceptButtonId, setReferenceAcceptButtonId] = useState(null);

  useEffect(() => {
    handleAddressType();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleOfferForProperty();
    }, [addressTypeValue?.property_id]),
  );
  const handleAddressType = async () => {
    setIsLoading(true);
    const addressData = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    try {
      const response = await addressType(addressData);
      if (response?.success === true) {
        const propertyDetails = response?.property_details || [];
        const updatedPropertyDetails = [
          {latitude: 'All', location: 'All'},
          ...propertyDetails,
        ];
        setAddressTypeData(updatedPropertyDetails);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching addressData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfferForProperty = async () => {
    setIsLoading(true);

    const offerPropertyData = {
      Filter: addressTypeValue?.property_id ? 'AllData' : 'All',
      account_id: loginData?.Login_details?.user_account_id,
      property_id: addressTypeValue?.property_id
        ? addressTypeValue?.property_id
        : 0,
      limit: '10',
    };

    console.log('Request Payload:', offerPropertyData);

    try {
      const response = await offerForMyProperty(offerPropertyData);
      console.log('response in offerForMyProperty..', JSON.stringify(response));

      if (response?.success == true) {
        setOfferPropertyData(response?.data || []);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching OfferForProperty:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptingLandlord = async data => {
    const {propertyId, bid_id, tenant_id, landlord_id, actionType} = data;
    setIsLoading(true);

    const acceptingLandlordData = {
      property_id: propertyId,
      bid_id: bid_id,
      tenant_id: tenant_id,
      landlord_id: landlord_id,
      accepting_details: actionType,
    };

    console.log('acceptingLandlordData:', acceptingLandlordData);

    try {
      const response = await acceptingLandlord(acceptingLandlordData);
      console.log('Response in handleAcceptingLandlord:', response);

      if (response?.success === true) {
        Alert.alert('Success', response?.data);
        handleOfferForProperty();
      }
    } catch (error) {
      if (error.response) {
        console.error(
          'Server responded with a status code:',
          error.response.status,
        );
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const searchOfferForMyProperty = query => {
    setSearchQuery(query);
    const filtered = query
      ? offerPropertyData.filter(
          item =>
            item.property_type &&
            item.property_type.toLowerCase().includes(query.toLowerCase()),
        )
      : offerPropertyData;
    console.log('filtered.........', filtered);
    setFilteredOfferPropertyData(filtered);
  };

  const property_render = item => {
    const isSelected = addressTypeValue?.property_id === item.property_id;
    return (
      <View
        style={[
          OfferForMyPropertiesStyle.itemView,
          {
            backgroundColor: isSelected
              ? _COLORS.Kodie_MidLightGreenColor
              : null,
          },
        ]}>
        {isSelected ? (
          <AntDesign
            color={_COLORS.Kodie_GreenColor}
            name={'checkcircle'}
            size={20}
          />
        ) : (
          <Fontisto
            color={_COLORS.Kodie_GrayColor}
            name={'radio-btn-passive'}
            size={20}
          />
        )}
        <Text style={OfferForMyPropertiesStyle.textItem}>{item?.location}</Text>
      </View>
    );
  };
  const offerPropertyRender = ({item, index}) => {
    const isScreeningDisabled =
      item?.screening_one === 556 ||
      item?.screening_two === 556 ||
      item?.screening_three === 556 ||
      item?.screening_one === null ||
      item?.screening_two === null ||
      item?.screening_three === null ||
      item?.landlord_approve == -1;

    const isApproveApplication =
      item?.screening_one === 555 &&
      item?.screening_two === 555 &&
      item?.screening_three === 555 &&
      item?.landlord_approve === 0 &&
      item?.tenant_approve === 1 &&
      item?.landlord_finalize === 1;

    const isRightButtonDisabled =
      isScreeningDisabled ||
      isApproveApplication ||
      item?.landlord_finalize === 0;

    const isLeftButtonDisable =
      item?.landlord_approve === -1 ||
      item?.landlord_finalize === 0 ||
      (item?.landlord_accepting_id == null &&
        item?.screening_one == null &&
        item?.screening_two == null &&
        item?.screening_three == null);
    return (
      <View key={index}>
        <View style={{flex: 1, marginHorizontal: 20, marginBottom: 10}}>
          {item?.landlord_approve == -1 ? (
            <View
              style={{
                justifyContent: 'center',
                width: 100,
                marginLeft: 4,
                backgroundColor: _COLORS.Kodie_redColor,
                paddingVertical: 3,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 11,
                  fontFamily: FONTFAMILY.K_SemiBold,
                  color: _COLORS.Kodie_WhiteColor,
                  alignSelf: 'center',
                  marginBottom: 2,
                }}>
                {'Rejected'}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={OfferForMyPropertiesStyle.SubContainer}
            onPress={() => {
              navigation.navigate('PropertyViewApplication', {
                propertyId: item?.property_id,
                bid_id: item?.bid_id,
                tenant_id: item?.tenant_id,
                landlord_id: item?.landlord_id,
                accpetingLandlordId: item?.landlord_accepting_id,
                offerForMyPropData: item,
              });
            }}>
            <View>
              {item.image_path && item.image_path.length > 0 ? (
                <Image
                  source={{uri: item.image_path[0]}}
                  style={OfferForMyPropertiesStyle.imageStyle}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    OfferForMyPropertiesStyle.imageStyle,
                    {justifyContent: 'center'},
                  ]}>
                  <Text style={OfferForMyPropertiesStyle.Img_found}>
                    {'Image not found'}
                  </Text>
                </View>
              )}
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
              <View style={OfferForMyPropertiesStyle.apartmentView}>
                <View style={{flex: 1}}>
                  <Text style={OfferForMyPropertiesStyle.apartmentText}>
                    {item?.property_type}
                  </Text>
                  <Text
                    style={OfferForMyPropertiesStyle.cityText}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {item?.city && item.city !== 'null'
                      ? item.city
                      : item?.state || ''}
                  </Text>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={OfferForMyPropertiesStyle.apartmentText}>
                    {'Bid amount'}
                  </Text>
                  <Text style={OfferForMyPropertiesStyle.amount}>{`$${
                    item?.offer_amount || ''
                  }`}</Text>
                </View>
              </View>

              <View style={OfferForMyPropertiesStyle.flat_MainView}>
                <MaterialCommunityIcons
                  name={'map-marker'}
                  size={15}
                  color={_COLORS.Kodie_GreenColor}
                  style={{marginTop: 10}}
                />
                <Text
                  style={OfferForMyPropertiesStyle.locationText}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item?.location}
                </Text>
              </View>

              {item.account_details?.map((detail, index) => (
                <View key={index}>
                  <View style={OfferForMyPropertiesStyle.userMainCon}>
                    <View style={OfferForMyPropertiesStyle.userContainer}>
                      {detail.UAD_PROFILE_PHOTO_PATH &&
                      (typeof detail.UAD_PROFILE_PHOTO_PATH === 'string' ||
                        (Array.isArray(detail.UAD_PROFILE_PHOTO_PATH) &&
                          detail.UAD_PROFILE_PHOTO_PATH.length > 0)) ? (
                        <Image
                          source={{uri: detail.UAD_PROFILE_PHOTO_PATH}}
                          style={OfferForMyPropertiesStyle.userImg}
                          resizeMode="cover"
                        />
                      ) : (
                        <EvilIcons
                          color={_COLORS.Kodie_GrayColor}
                          name={'user'}
                          size={50}
                        />
                      )}

                      <Text style={OfferForMyPropertiesStyle.userName}>
                        {detail?.UAD_FIRST_NAME}
                      </Text>
                    </View>
                    <View style={OfferForMyPropertiesStyle.ratting}>
                      <View style={{alignSelf: 'center', alignItems: 'center'}}>
                        <AntDesign
                          color={_COLORS.Kodie_lightGreenColor}
                          name={'star'}
                          size={18}
                        />
                      </View>
                      <Text style={OfferForMyPropertiesStyle.rattingText}>
                        {'0.0'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </TouchableOpacity>

          <View style={{marginTop: 20}}>
            <RowButtons
              leftButtonHeight={44}
              RightButtonHeight={44}
              LeftButtonText={'Reject application'}
              RightButtonText={
                item?.tenant_approve === 0
                  ? 'Final approve'
                  : 'Approve application'
              }
              leftButtonbackgroundColor={
                isLeftButtonDisable
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonborderColor={
                isLeftButtonDisable
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              LeftButtonTextColor={
                isLeftButtonDisable
                  ? _COLORS.Kodie_ExtraLightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressLeftButton={() => {
                if (!isLeftButtonDisable) {
                  handleAcceptingLandlord({
                    propertyId: item?.property_id,
                    bid_id: item?.bid_id,
                    tenant_id: item?.tenant_id,
                    landlord_id: item?.landlord_id,
                    actionType: 'REJECT',
                  });
                }
              }}
              LeftButtonDisabled={isLeftButtonDisable}
              RightButtonbackgroundColor={
                isRightButtonDisabled
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonborderColor={
                isRightButtonDisabled
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonTextColor={
                isRightButtonDisabled
                  ? _COLORS.Kodie_ExtraLightGrayColor
                  : _COLORS.Kodie_WhiteColor
              }
              onPressRightButton={() => {
                if (!isRightButtonDisabled) {
                  if (item?.tenant_approve === 0) {
                    Alert.alert(
                      'Final approve',
                      'Are you sure you want to finalize this approval?',
                      [
                        {text: 'Cancel', style: 'cancel'},
                        {
                          text: 'Confirm',
                          onPress: () => {
                            handleAcceptingLandlord({
                              propertyId: item?.property_id,
                              bid_id: item?.bid_id,
                              tenant_id: item?.tenant_id,
                              landlord_id: item?.landlord_id,
                              actionType: 'FINAL',
                            });
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  } else {
                    handleAcceptingLandlord({
                      propertyId: item?.property_id,
                      bid_id: item?.bid_id,
                      tenant_id: item?.tenant_id,
                      landlord_id: item?.landlord_id,
                      actionType: 'ACCEPT',
                    });
                  }
                }
              }}
              RightButtonDisabled={isRightButtonDisabled}
            />
          </View>
        </View>
        <DividerIcon borderBottomWidth={3} />
      </View>
    );
  };

  return (
    <View style={OfferForMyPropertiesStyle.mainContainer}>
      <View style={{}}>
        <SearchBar
          filterImage={IMAGES.filter}
          frontSearchIcon
          Filter
          filter={'filter'}
          marginTop={3}
          placeholder={'Search offers'}
          searchData={searchOfferForMyProperty}
          textvalue={searchQuery}
        />
        <DividerIcon />
      </View>
      <View style={{marginHorizontal: 16}}>
        <Text style={OfferForMyPropertiesStyle.selectPropertyText}>
          {'Select property:'}
        </Text>
        <Dropdown
          style={OfferForMyPropertiesStyle.dropdown}
          placeholderStyle={[
            OfferForMyPropertiesStyle.placeholderStyle,
            {color: _COLORS.Kodie_LightGrayColor},
          ]}
          selectedTextStyle={OfferForMyPropertiesStyle.selectedTextStyle}
          inputSearchStyle={OfferForMyPropertiesStyle.inputSearchStyle}
          iconStyle={OfferForMyPropertiesStyle.iconStyle}
          data={addressTypeData || []}
          maxHeight={300}
          labelField="location"
          valueField="longitude"
          placeholder="Select property type"
          value={addressTypeValue}
          searchPlaceholder="Search..."
          onChange={item => {
            setAddressTypeValue({
              latitude: item.latitude,
              longitude: item.longitude,
              location: item.location,
              property_id: item?.property_id,
            });
            handleOfferForProperty();
          }}
          onFocus={() => {
            handleOfferForProperty();
          }}
          renderItem={property_render}
        />
      </View>
      <DividerIcon />
      <FlatList
        data={searchQuery ? filteredOfferPropertyData : offerPropertyData}
        keyExtractor={item => item?.property_id}
        renderItem={offerPropertyRender}
        ListEmptyComponent={() => {
          return <ListEmptyComponent EmptyText={"You don't have any offer."} />;
        }}
      />
    </View>
  );
};

export default OfferForMyProperties;
