import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {PropertyRentalOfferStyle} from './PropertyRentalOfferStyle';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  getCurrentOffer,
  withdowBid,
  withdowBidServices,
  acceptTenants,
} from '../../../../services/PropertyRentalOfferApi/PropertyRentalOfferApi';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import OfferForMyProperties from './OfferForMyProperties/OfferForMyProperties';
import {useSelector} from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import ListEmptyComponent from '../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import {matrixTransform} from 'react-native-svg/lib/typescript/elements/Shape';
import {fontSize} from '../../../../Themes/FontStyle/FontStyle';
const PropertyRentalOffer = props => {
  const {acceptLanlordPassed} = props;
  console.log('acceptLanlordPassed in offer page...', acceptLanlordPassed);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '3,2';

  const roleArray = userRole ? userRole.split(',') : [];

  const hasTenantRole = roleArray.includes('2'); // Tenant role (2)
  const hasLandlordRole = roleArray.includes('3'); // Landlord role (3)
  const hasContractorRole = roleArray.includes('4'); // Contractor role (4)

  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(
    acceptLanlordPassed == 'acceptLanlordPassed' ? false : true,
  );
  const [selectedButtonBid, setSelectedButtonBid] = useState(false);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const [saveCurrentOffer, setSaveCurrentOffer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredpropertyData, setFilteredpropertyData] = useState([]);

  const accoutId = loginData?.Login_details?.user_account_id;

  useLayoutEffect(() => {
    if (userRole === '3') {
      setSelectedButton(false);
    } else if (userRole === '2') {
      setSelectedButton(true);
    } else {
      setSelectedButton(
        acceptLanlordPassed == 'acceptLanlordPassed' ? false : true,
      );
    }
  }, [userRole]);

  const handleExpandToggle = property_id => {
    setExpandedPropertyId(prevId =>
      prevId === property_id ? null : property_id,
    );
  };

  const handleGetCurrectOffer = async () => {
    setIsLoading(true);
    const current_Data = {
      account_id: accoutId,
      limit: 10,
    };
    try {
      const response = await getCurrentOffer(current_Data);
      console.log('response in currect offer..', response);
      if (response?.success === true) {
        setSaveCurrentOffer(response?.data);
      }
    } catch (error) {
      console.error('Error fetching current offer:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleWithdrawBid = async (property_id, bid_id) => {
    setIsLoading(true);
    const WithdrawData = {
      bid_id: bid_id,
      account_id: loginData?.Login_details?.user_account_id,
      property_id: property_id,
    };
    try {
      const response = await withdowBidServices(WithdrawData);
      console.log('response in withdrawBid...', response);
      if (response?.success === true) {
        Alert.alert('Withdraw bid', response?.data);
        handleGetCurrectOffer();
      }
    } catch (error) {
      console.error('Error fetching WithdrawBid:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptTenants = async (
    tenant_id,
    landlord_id,
    bid_id,
    property_id,
  ) => {
    setIsLoading(true);
    const acceptTenantsData = {
      property_id: property_id,
      bid_id: bid_id,
      tenant_id: tenant_id,
      landlord_id: landlord_id,
    };
    console.log('acceptTenantsData...', acceptTenantsData);
    try {
      const response = await acceptTenants(acceptTenantsData);
      console.log('response in acceptTenantsData...', response);
      if (response?.success === true) {
        Alert.alert('Success', response?.data);
        handleGetCurrectOffer();
      } else {
        console.error('Failed to accept tenants:', response?.message);
      }
    } catch (error) {
      console.error('Error fetching acceptTenantsData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      {
        isFocus || accoutId || selectedButton;
      }
      {
        handleGetCurrectOffer();
      }
    }, [accoutId, isFocus, selectedButton]),
  );

  const searchCurrentOffer = query => {
    setSearchQuery(query);
    const filtered = query
      ? saveCurrentOffer.filter(
          item =>
            item.property_type &&
            item.property_type.toLowerCase().includes(query.toLowerCase()),
        )
      : saveCurrentOffer;
    setFilteredpropertyData(filtered);
  };
  const handlePressLeftButton = (propertyId, bidId) => {
    setSelectedButtonBid(prev => ({
      ...prev,
      [propertyId]: false,
    }));
    handleWithdrawBid(propertyId, bidId);
  };

  const handlePressRightButton = item => {
    setSelectedButtonBid(prev => ({
      ...prev,
      [item.property_id]: true,
    }));
    if (item.accepting_landlord == 556 || item?.accepting_landlord == 0) {
      handleAcceptTenants(
        item?.tenant_id,
        item?.landlord_id,
        item?.bid_id,
        item?.property_id,
      );
    } else {
      navigation.navigate('RentalOffer', {
        edit_offer: 'edit_offer',
        propertyId: item.property_id,
        propertyDetails: item,
        bibId: item?.bid_id,
      });
    }
  };

  const getButtonBackgroundColor = (
    isScreenComplet,
    isScreenProgress,
    screeningStatus,
    acceptLandlord,
    finalLandlordApprove,
  ) => {
    if (isScreenComplet && acceptLandlord === 1) {
      return _COLORS.Kodie_lightseskyBule; // Color for completed screening
    } else if (acceptLandlord === 0 && finalLandlordApprove === 0) {
      return _COLORS.Kodie_mostLightBlueColor;
    } else if (screeningStatus === 'REJECT') {
      return _COLORS.Kodie_extralightRedColor; // Color for rejected application
    } else if (isScreenProgress) {
      return _COLORS.Kodie_backDarkOrange; // Color for rejected application
    } else if (acceptLandlord === 0) {
      // Color for accepted application
      return _COLORS.Kodie_mostLightGreenColor;
    }
    return _COLORS.Kodie_backDarkOrange; // Default color for bid submitted
  };
  const getBorderColor = (
    isScreenComplet,
    isScreenProgress,
    screeningStatus,
    acceptLandlord,
    finalLandlordApprove,
  ) => {
    if (isScreenComplet && acceptLandlord === 1) {
      return _COLORS.Kodie_lightseskyBule; // Color for completed screening
    } else if (acceptLandlord === 0 && finalLandlordApprove === 0) {
      return _COLORS.Kodie_mostLightBlueColor;
    } else if (screeningStatus === 'REJECT') {
      return _COLORS.Kodie_extralightRedColor; // Color for rejected application
    } else if (isScreenProgress) {
      return _COLORS.Kodie_backDarkOrange; // Color for rejected application
    } else if (acceptLandlord === 0) {
      // Color for accepted application
      return _COLORS.Kodie_mostLightGreenColor;
    }
    return _COLORS.Kodie_backDarkOrange; // Default color for bid submitted
  };

  const getButtonTextColor = (
    isScreenComplet,
    isScreenProgress,
    screeningStatus,
    acceptLandlord,
    finalLandlordApprove,
  ) => {
    if (isScreenComplet && acceptLandlord === 1) {
      return _COLORS.Kodie_skyBlue; // Color for completed screening text
    } else if (acceptLandlord === 0 && finalLandlordApprove === 0) {
      return _COLORS.Kodie_BlueColor;
    } else if (isScreenProgress) {
      return _COLORS.Kodie_textDarkOrange; // Color for rejected application
    } else if (screeningStatus === 'REJECT') {
      return _COLORS.Kodie_lightRedColor; // Color for rejected application text
    } else if (acceptLandlord === 0) {
      // Color for accepted application text
      return _COLORS.Kodie_DarkGreenColor;
    }
    return _COLORS.Kodie_textDarkOrange; // Default color for bid submitted text
  };

  const getIconColor = (
    isScreenComplet,
    isScreenProgress,
    screeningStatus,
    acceptLandlord,
    finalLandlordApprove,
  ) => {
    if (isScreenComplet && acceptLandlord === 1) {
      return _COLORS.Kodie_skyBlue; // Color for completed screening icon
    } else if (acceptLandlord === 0 && finalLandlordApprove === 0) {
      return _COLORS.Kodie_BlueColor;
    } else if (isScreenProgress) {
      return _COLORS.Kodie_textDarkOrange; // Color for rejected application
    } else if (screeningStatus === 'REJECT') {
      return _COLORS.Kodie_lightRedColor; // Color for rejected application icon
    } else if (acceptLandlord === 0) {
      // Color for accepted application icon
      return _COLORS.Kodie_DarkGreenColor;
    }
    return _COLORS.Kodie_textDarkOrange; // Default color for bid submitted icon
  };

  const getButtonText = (
    isScreenComplet,
    isScreenProgress,
    screeningStatus,
    acceptLandlord,
    finalLandlordApprove,
  ) => {
    if (isScreenComplet && acceptLandlord === 1) {
      return 'Screening completed';
    } else if (acceptLandlord === 0 && finalLandlordApprove === 0) {
      return 'Application submitted';
    } else if (isScreenProgress) {
      return 'Screening in progress'; // Color for rejected application
    } else if (screeningStatus === 'REJECT') {
      return 'Application rejected';
    } else if (acceptLandlord === 0) {
      // Message for accepted application
      return 'Application accepted';
    }
    return 'Screening in progress';
  };

  const currentOffer_render = ({item, index}) => {
    const isExpanded = expandedPropertyId === item.property_id;
    const keyFeatures = JSON.parse(item.key_features);
    const parkingSpaceFeature = keyFeatures.find(feature =>
      feature.hasOwnProperty('Parking / garage spaces'),
    );
    const parkingSpaceValue = parkingSpaceFeature
      ? parkingSpaceFeature['Parking / garage spaces']
      : 'N/A';

    const isDisabled = item.screening_status === 'REJECT';
    const isScreenComplet =
      item?.screening_one === 555 &&
      item?.screening_two === 555 &&
      item?.screening_three === 555;
    const isScreenProgress =
      item?.screening_one === 556 ||
      item?.screening_two === 556 ||
      item?.screening_three === 556;

    const isAcceptOfferDis =
      item?.screening_one === 555 &&
      item?.screening_two === 555 &&
      item?.screening_three === 555 &&
      item?.accepting_tenant === 0;

    const showPayNowButton =
      item?.accepting_landlord === 0 &&
      item?.accepting_tenant === 0 &&
      item?.final_landlord_approve === 0 &&
      item?.screening_one === 555 &&
      item?.screening_two === 555 &&
      item?.screening_three === 555;

    const isRightButtonDisabled =
      !showPayNowButton && (isDisabled || isAcceptOfferDis);

    const screeningStatus = item.screening_status; // e.g., "ACCEPT"
    const acceptLandlord = item?.accepting_landlord; // e.g., 0
    const finalLandlordApprove = item?.final_landlord_approve; // e.g., 1

    const backgroundColor = getButtonBackgroundColor(
      isScreenComplet,
      isScreenProgress,
      screeningStatus,
      acceptLandlord,
      finalLandlordApprove,
    );
    const border_color = getBorderColor(
      isScreenComplet,
      isScreenProgress,
      screeningStatus,
      acceptLandlord,
      finalLandlordApprove,
    );
    const textColor = getButtonTextColor(
      isScreenComplet,
      isScreenProgress,
      screeningStatus,
      acceptLandlord,
      finalLandlordApprove,
    );
    const buttonText = getButtonText(
      isScreenComplet,
      isScreenProgress,
      screeningStatus,
      acceptLandlord,
      finalLandlordApprove,
    );
    const iconColor = getIconColor(
      isScreenComplet,
      isScreenProgress,
      screeningStatus,
      acceptLandlord,
      finalLandlordApprove,
    );

    return (
      <>
        <View key={index} style={PropertyRentalOfferStyle.flatListContainer}>
          <View style={PropertyRentalOfferStyle.flat_MainView}>
            <View style={PropertyRentalOfferStyle.flexContainer}>
              <Text style={PropertyRentalOfferStyle.apartmentText}>
                {item?.property_type}
              </Text>
              <Text style={[LABEL_STYLES.commontext, {fontSize: 16}]}>
                {item?.city}
              </Text>
              <View style={PropertyRentalOfferStyle.flat_MainView}>
                <MaterialCommunityIcons
                  name={'map-marker'}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                  style={{marginTop: 5}}
                />
                <Text
                  style={PropertyRentalOfferStyle.locationText}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item?.location}
                </Text>
              </View>
            </View>

            {item.image_path && item.image_path.length > 0 ? (
              <View style={{}}>
                <Image
                  source={{uri: item.image_path[0]}}
                  style={[
                    PropertyRentalOfferStyle.imageStyle,
                    {width: 90, height: 90},
                  ]}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View
                style={[
                  PropertyRentalOfferStyle.imageStyle,
                  {justifyContent: 'center'},
                ]}>
                <Text style={PropertyRentalOfferStyle.Img_found}>
                  {'Image not found'}
                </Text>
              </View>
            )}

            <View style={PropertyRentalOfferStyle.flexContainer}>
              <View style={PropertyRentalOfferStyle.noteStyle}>
                <TouchableOpacity onPress={() => {}}>
                  <AntDesign
                    name="sharealt"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 15}}>
                  <AntDesign
                    name="hearto"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <MaterialCommunityIcons
                    name={'dots-horizontal'}
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  PropertyRentalOfferStyle.buttonView,
                  {backgroundColor, borderColor: border_color},
                ]}>
                <Entypo
                  name="dot-single"
                  color={iconColor}
                  size={24}
                  style={{
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={[
                    PropertyRentalOfferStyle.buttonText,
                    {
                      color: textColor,
                      fontSize: Platform.OS === 'ios' ? 8 : 9,
                    },
                  ]}>
                  {buttonText}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <DividerIcon
              IsShowIcon
              iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
              onPress={() => handleExpandToggle(item.property_id)}
            />
          </View>

          {isExpanded && (
            <View style={PropertyRentalOfferStyle.expandedView}>
              <View style={PropertyRentalOfferStyle.bedCountView}>
                <View style={PropertyRentalOfferStyle.locationView}>
                  <View style={PropertyRentalOfferStyle.circleIconView}>
                    <Ionicons
                      color={_COLORS.Kodie_GreenColor}
                      name="bed-outline"
                      size={20} // Adjust size as needed
                    />
                  </View>
                  <Text style={PropertyRentalOfferStyle.bedcont}>
                    {keyFeatures.find(obj => obj.hasOwnProperty('Bedrooms'))
                      ?.Bedrooms || '0'}
                  </Text>
                </View>
                <View style={PropertyRentalOfferStyle.locationView}>
                  <View style={PropertyRentalOfferStyle.circleIconView}>
                    <MaterialCommunityIcons
                      color={_COLORS.Kodie_GreenColor}
                      name="shower-head"
                      size={20} // Adjust size as needed
                    />
                  </View>
                  <Text style={PropertyRentalOfferStyle.bedcont}>
                    {keyFeatures.find(obj => obj.hasOwnProperty('Bathrooms'))
                      ?.Bathrooms || '0'}
                  </Text>
                </View>
                <View style={PropertyRentalOfferStyle.locationView}>
                  <View style={PropertyRentalOfferStyle.circleIconView}>
                    <Ionicons
                      color={_COLORS.Kodie_GreenColor}
                      name="car"
                      size={20} // Adjust size as needed
                    />
                  </View>
                  <Text style={PropertyRentalOfferStyle.bedcont}>
                    {parkingSpaceValue || '0'}
                  </Text>
                </View>
                <View style={PropertyRentalOfferStyle.locationView}>
                  <View style={PropertyRentalOfferStyle.circleIconView}>
                    <MaterialCommunityIcons
                      color={_COLORS.Kodie_GreenColor}
                      name="floor-plan"
                      size={20} // Adjust size as needed
                    />
                  </View>
                  <Text style={[PropertyRentalOfferStyle.bedcont, {flex: 1}]}>
                    {keyFeatures.find(obj => obj.hasOwnProperty('Garages'))
                      ?.Garages || '0'}{' '}
                    m²
                  </Text>
                </View>
              </View>
              <View style={{alignSelf: 'flex-end', marginLeft: 10}}>
                <Text style={PropertyRentalOfferStyle.listpriceText}>
                  {'Listed price'}
                </Text>
                <Text style={PropertyRentalOfferStyle.listprice}>
                  {`$${item.offer_amount}`}
                </Text>
              </View>
            </View>
          )}

          <View style={PropertyRentalOfferStyle.rowButtonView}>
            <RowButtons
              LeftButtonText={'Withdraw'}
              leftButtonbackgroundColor={
                isDisabled
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                isDisabled
                  ? _COLORS.Kodie_ExtraLightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              LeftButtonborderColor={
                isDisabled
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressLeftButton={() => {
                if (!isDisabled) {
                  handlePressLeftButton(item.property_id, item.bid_id);
                }
              }}
              LeftButtonDisabled={isDisabled}
              RightButtonText={
                showPayNowButton
                  ? 'Pay Now' // Show 'Pay Now' if conditions are met
                  : acceptLandlord === 0
                  ? 'Accept offer' // Show 'Accept offer' if only acceptLandlord is 0
                  : 'Edit offer' // Default to 'Edit offer'
              }
              RightButtonbackgroundColor={
                showPayNowButton
                  ? _COLORS.Kodie_BlackColor // Button is active when showPayNowButton is true
                  : isRightButtonDisabled
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonTextColor={
                showPayNowButton
                  ? _COLORS.Kodie_WhiteColor // Button text is white when active
                  : isRightButtonDisabled
                  ? _COLORS.Kodie_ExtraLightGrayColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonborderColor={
                showPayNowButton
                  ? _COLORS.Kodie_BlackColor
                  : isRightButtonDisabled
                  ? _COLORS.Kodie_LightGrayColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressRightButton={() => {
                if (showPayNowButton) {
                  // Show an alert when Pay Now button is pressed
                  Alert.alert('Pay now', 'You can pay now');
                } else if (!isRightButtonDisabled) {
                  // Handle other cases like 'Accept offer' or 'Edit offer'
                  handlePressRightButton(item);
                }
              }}
              RightButtonDisabled={isRightButtonDisabled} // Keep button disabled if necessary
            />
          </View>
        </View>
        <DividerIcon />
      </>
    );
  };

  const renderRowButtons = () => {
    const renderSingleButton = buttonText => (
      <CustomSingleButton
        _ButtonText={buttonText}
        Text_Color={_COLORS.Kodie_BlackColor}
        text_Size={14}
        backgroundColor={_COLORS.Kodie_lightGreenColor}
        height={45}
        // onPress={onPressAction} // Call the action passed as a parameter
        disabled={isLoading}
      />
    );

    if (!hasLandlordRole) {
      return renderSingleButton('My rental applications');
    }

    if (userRole === '3') {
      return renderSingleButton('Offers for my properties');
    }

    if (hasLandlordRole) {
      return (
        <RowButtons
          LeftButtonText={'Offers for my properties'}
          leftButtonbackgroundColor={
            !selectedButton
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          LeftButtonTextColor={
            !selectedButton
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          LeftButtonborderColor={
            !selectedButton
              ? _COLORS.Kodie_GreenColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressLeftButton={() => {
            console.log('Left button pressed: Offers for my properties');
            setSelectedButton(false);
          }}
          RightButtonText={'My rental applications'}
          RightButtonbackgroundColor={
            selectedButton
              ? _COLORS.Kodie_lightGreenColor
              : _COLORS.Kodie_WhiteColor
          }
          RightButtonTextColor={
            selectedButton
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          RightButtonborderColor={
            selectedButton
              ? _COLORS.Kodie_GreenColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressRightButton={() => {
            console.log('Right button pressed: My rental applications');
            setSelectedButton(true);
          }}
        />
      );
    }

    return null;
  };

  return (
    <View style={PropertyRentalOfferStyle.mainContainer}>
      <View
        style={[
          PropertyRentalOfferStyle.rowButtonView,
          {marginVertical: 15, marginHorizontal: 16},
        ]}>
        {renderRowButtons()}
      </View>
      <DividerIcon borderBottomWidth={5} marginTop={7} />
      <ScrollView>
        <View style={PropertyRentalOfferStyle.subContainer}>
          {!selectedButton ? null : (
            <View>
              <SearchBar
                filterImage={IMAGES.filter}
                frontSearchIcon
                Filter
                filter={'filter'}
                marginTop={3}
                placeholder={'Search offers'}
                searchData={searchCurrentOffer}
                textvalue={searchQuery}
              />
              <DividerIcon />
            </View>
          )}

          {selectedButton ? (
            <FlatList
              data={searchQuery ? filteredpropertyData : saveCurrentOffer}
              keyExtractor={item => item.property_id.toString()}
              renderItem={currentOffer_render}
              ListEmptyComponent={() => {
                return (
                  <ListEmptyComponent
                    EmptyText={
                      "You don't have any rental applications at the moment."
                    }
                  />
                );
              }}
            />
          ) : (
            <OfferForMyProperties />
          )}
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default PropertyRentalOffer;
