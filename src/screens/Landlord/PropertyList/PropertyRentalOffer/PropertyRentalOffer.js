import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import {PropertyRentalOfferStyle} from './PropertyRentalOfferStyle';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getCurrentOffer,
  withdowBid,
  withdowBidServices,
  acceptTenants,
} from '../../../../services/PropertyRentalOfferApi/PropertyRentalOfferApi';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import OfferForMyProperties from './OfferForMyProperties/OfferForMyProperties';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ListEmptyComponent from '../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
const PropertyRentalOffer = props => {
 const {acceptLanlordPassed} =props
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '4';
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(acceptLanlordPassed == "acceptLanlordPassed" ? false :true);
  const [selectedButtonBid, setSelectedButtonBid] = useState(false);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const [saveCurrentOffer, setSaveCurrentOffer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredpropertyData, setFilteredpropertyData] = useState([]);

  const handleGetCurrectOffer = async () => {
    setIsLoading(true);
    const current_Data = {
      account_id: loginData?.Login_details?.user_account_id,
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
        alert(response?.data);
      } else {
        console.error('Failed to accept tenants:', response?.message);
      }
    } catch (error) {
      console.error('Error fetching acceptTenantsData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrectOffer();
  }, [isFocus]);

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
    if (item.accepting_landlord == 556) {
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
      });
    }
  };
  const currentOffer_render = ({item, index}) => {
    const isExpanded = expandedPropertyId === item.property_id;
    const keyFeatures = JSON.parse(item.key_features);
    const parkingSpaceFeature = keyFeatures.find(feature =>
      feature.hasOwnProperty('Parking / garage spaces'),
    );
    const parkingSpaceValue = parkingSpaceFeature
      ? parkingSpaceFeature['Parking / garage spaces']
      : null;
    return (
      <TouchableOpacity onPress={() => {}}>
        <>
          <View key={index} style={PropertyRentalOfferStyle.flatListContainer}>
            <View
              style={[
                PropertyRentalOfferStyle.flat_MainView,
                {marginBottom: 10},
              ]}>
              <TouchableOpacity style={PropertyRentalOfferStyle.bidsButton}>
                <Text style={PropertyRentalOfferStyle.bidsButtonText}>
                  Accepting bids
                </Text>
              </TouchableOpacity>
              <Text style={PropertyRentalOfferStyle.biddingText}>
                Bidding closes in:
              </Text>
              <View style={PropertyRentalOfferStyle.daysViewStl}>
                <Text style={PropertyRentalOfferStyle.biddingText}>
                  {'o days'}
                </Text>
              </View>
              <View style={PropertyRentalOfferStyle.daysViewStl}>
                <Text style={PropertyRentalOfferStyle.biddingText}>
                  {'6 hrs'}
                </Text>
              </View>
              <View style={PropertyRentalOfferStyle.daysViewStl}>
                <Text style={PropertyRentalOfferStyle.biddingText}>
                  {'10 mins'}
                </Text>
              </View>
            </View>
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
                    style={{alignSelf: 'center', marginTop: 4}}
                  />
                  <Text
                    style={PropertyRentalOfferStyle.locationText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item?.location}
                  </Text>
                </View>
              </View>
              {item.image_path && item.image_path.length > 0 ? (
                <Image
                  source={{uri: item.image_path[0]}}
                  style={PropertyRentalOfferStyle.imageStyle}
                  resizeMode="cover"
                />
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

              <View
                style={[
                  PropertyRentalOfferStyle.flexContainer,
                  {alignSelf: 'center'},
                ]}>
                <View style={PropertyRentalOfferStyle.noteStyle}>
                  <TouchableOpacity onPress={() => {}}>
                    <AntDesign
                      name="sharealt"
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <View />
                  <TouchableOpacity style={{marginHorizontal: 15}}>
                    <AntDesign
                      name="hearto"
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={{}} onPress={() => {}}>
                    <MaterialCommunityIcons
                      name={'dots-horizontal'}
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    PropertyRentalOfferStyle.buttonView,
                    {
                      backgroundColor:
                        item.bid_status_id == 0
                          ? _COLORS.Kodie_LightOrange
                          : _COLORS.Kodie_mostLightBlueColor,
                    },
                  ]}>
                  <Text
                    style={[
                      PropertyRentalOfferStyle.buttonText,
                      {
                        color:
                          item.bid_status_id == 0
                            ? _COLORS.Kodie_DarkOrange
                            : _COLORS.Kodie_BlueColor,
                      },
                    ]}>
                    {item.bid_status_id == 0 ? 'Pending bid' : 'Bid submitted'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon
              IsShowIcon
              iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
              onPress={() => handleExpandToggle(item.property_id)}
            />
            {isExpanded && (
              <View style={PropertyRentalOfferStyle.expandedView}>
                <View style={PropertyRentalOfferStyle.bedCountView}>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <Ionicons
                      color={_COLORS.Kodie_GreenColor}
                      name="bed-outline"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {keyFeatures.find(obj => obj.hasOwnProperty('Bedrooms'))
                        ?.Bedrooms || 'N/A'}
                    </Text>
                  </View>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <MaterialCommunityIcons
                      color={_COLORS.Kodie_GreenColor}
                      name="shower-head"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {keyFeatures.find(obj => obj.hasOwnProperty('Bathrooms'))
                        ?.Bathrooms || 'N/A'}
                    </Text>
                  </View>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <Ionicons
                      color={_COLORS.Kodie_GreenColor}
                      name="car"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {parkingSpaceValue}
                    </Text>
                  </View>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <MaterialCommunityIcons
                      color={_COLORS.Kodie_GreenColor}
                      name="floor-plan"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {`${
                        keyFeatures.find(obj => obj.hasOwnProperty('Garages'))
                          ?.Garages
                      } m2` || 'N/A'}
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
          </View>
          <View style={PropertyRentalOfferStyle.rowButtonView}>
            <RowButtons
              LeftButtonText={'Withdraw bid'}
              leftButtonbackgroundColor={
                !selectedButtonBid[item.property_id]
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonBid[item.property_id]
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              LeftButtonborderColor={
                !selectedButtonBid[item.property_id]
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressLeftButton={() =>
                handlePressLeftButton(item.property_id, item.bid_id)
              }
              RightButtonText={
                item.accepting_landlord == 556 ? 'Accept offer' : 'Edit offer'
              }
              RightButtonbackgroundColor={
                selectedButtonBid[item.property_id]
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonTextColor={
                selectedButtonBid[item.property_id]
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonborderColor={
                selectedButtonBid[item.property_id]
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressRightButton={() => handlePressRightButton(item)}
            />
          </View>
          <DividerIcon />
        </>
      </TouchableOpacity>
    );
  };
  const renderRowButtons = () => {
    const roleArray = userRole ? userRole.split(',') : [];

    const hasTenantRole = roleArray.includes('2'); // Tenant role (2)
    const hasLandlordRole = roleArray.includes('3'); // Landlord role (3)
    const hasContractorRole = roleArray.includes('4'); // Contractor role (4)

    const renderSingleButton = buttonText => (
      <CustomSingleButton
        _ButtonText={buttonText}
        Text_Color={_COLORS.Kodie_BlackColor}
        text_Size={14}
        backgroundColor={_COLORS.Kodie_lightGreenColor}
        height={40}
        onPress={() => {}}
        disabled={isLoading ? true : false}
      />
    );

    if (!hasLandlordRole) {
      return renderSingleButton('My rental applications');
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
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressLeftButton={() => {
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
              ? _COLORS.Kodie_GrayColor
              : _COLORS.Kodie_LightWhiteColor
          }
          onPressRightButton={() => {
            setSelectedButton(true);
          }}
        />
      );
    }

    return null; // If no matching roles, return null
  };

  return (
    <View style={PropertyRentalOfferStyle.mainContainer}>
      <View
        style={[PropertyRentalOfferStyle.rowButtonView, {marginVertical: 15}]}>
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
