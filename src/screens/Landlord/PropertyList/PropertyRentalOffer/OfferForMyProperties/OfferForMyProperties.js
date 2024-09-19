import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {OfferForMyPropertiesStyle} from './OfferForMyPropertiesStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {_COLORS, IMAGES} from '../../../../../Themes';
import {
  addressType,
  offerForMyProperty,
} from '../../../../../services/PropertyRentalOfferApi/OfferForMyPropertyApi';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import {useSelector} from 'react-redux';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../../../../../components/Molecules/SearchBar/SearchBar';
import ListEmptyComponent from '../../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
const OfferForMyProperties = () => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [addressTypeData, setAddressTypeData] = useState([]);
  const [addressTypeValue, setAddressTypeValue] = useState({});
  const [offerPropertyData, setOfferPropertyData] = useState([]);
  const [filteredOfferPropertyData, setFilteredOfferPropertyData] = useState(
    [],
  );
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleAddressType();
    handleOfferForProperty();
  }, []);

  const handleAddressType = async () => {
    setIsLoading(true);
    const addressData = {
      account_id: loginData?.Login_details?.user_account_id,
    };
    try {
      const response = await addressType(addressData);
      // console.log('response in addressData..', response);
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
      Filter: addressTypeValue?.latitude ? 'AllData' : 'All',
      account_id: loginData?.Login_details?.user_account_id,
      property_id: addressTypeValue?.property_id
        ? addressTypeValue?.property_id
        : 0,
      limit: '10',
    };
    console.log('Request Payload:', offerPropertyData);
    try {
      const response = await offerForMyProperty(offerPropertyData);
      console.log('response in offerForMyProperty..', response?.data);
      setOfferPropertyData(response?.data || []);
      setIsLoading(true);
    } catch (error) {
      console.error('Error fetching OfferForProperty:', error);
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
    return (
      <View key={index}>
        <View style={{flex: 1, marginHorizontal: 20, marginVertical: 10}}>
          <View style={OfferForMyPropertiesStyle.SubContainer}>
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
                <View>
                  <Text style={OfferForMyPropertiesStyle.apartmentText}>
                    {item?.property_type}
                  </Text>
                  <Text style={OfferForMyPropertiesStyle.cityText}>
                    {item?.city}
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
                      {Array.isArray(detail.UAD_PROFILE_PHOTO_PATH) &&
                      detail.UAD_PROFILE_PHOTO_PATH.length > 0 ? (
                        <Image
                          source={{uri: detail.UAD_PROFILE_PHOTO_PATH[0]}}
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
          </View>
          <DividerIcon />
          <CustomSingleButton
            _ButtonText={'View application'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            disabled={isLoading}
            isLeftImage={true}
            onPress={() => {
              navigation.navigate('PropertyViewApplication', {
                propertyId: item?.property_id,
                bid_id: item?.bid_id,
                tenant_id: item?.tenant_id,
                landlord_id: item?.landlord_id,
              });
            }}
            backgroundColor={_COLORS.Kodie_BlackColor}
          />
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
          search // Enable search functionality
          searchPlaceholder="Search..."
          onChange={item => {
            setAddressTypeValue({
              latitude: item.latitude,
              longitude: item.longitude,
              location: item.location,
              property_id: item?.property_id,
            });
            handleOfferForProperty(); // Update the list when a new property type is selected
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
          return <ListEmptyComponent EmptyText={"You don't have any properties."}/>;
        }}
      />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default OfferForMyProperties;
