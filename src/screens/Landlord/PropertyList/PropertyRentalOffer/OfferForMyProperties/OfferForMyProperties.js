import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {OfferForMyPropertiesStyle} from './OfferForMyPropertiesStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Dropdown} from 'react-native-element-dropdown';
import {_COLORS, IMAGES} from '../../../../../Themes';
import {addressType} from '../../../../../services/PropertyRentalOfferApi/OfferForMyPropertyApi';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import {Divider} from 'react-native-paper';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
const OfferForMyProperties = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [addressTypeData, setAddressTypeData] = useState([]);
  const [addressTypeValue, setAddressTypeValue] = useState({});

  useEffect(() => {
    handleAddressType();
  }, []);
  // Api intrigation...
  const handleAddressType = async () => {
    const addressData = {
      account_id: 730,
    };
    try {
      const response = await addressType(addressData);
      console.log('response in addressData..', response);
      if (response?.success === true) {
        setAddressTypeData(response?.property_details);
        console.log('response?.data..', response?.property_details);
      }
    } catch (error) {
      console.error('Error fetching addressDatar:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <SafeAreaView style={OfferForMyPropertiesStyle.mainContainer}>
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
          onChange={item => {
            setAddressTypeValue({
              latitude: item.latitude,
              longitude: item.longitude,
              location: item.location,
              property_id: item?.property_id,
            });
          }}
          renderItem={property_render}
        />
      </View>
      <DividerIcon />
      <View style={{marginHorizontal: 20}}>
        <View style={OfferForMyPropertiesStyle.SubContainer}>
          <View>
            <Image
              source={IMAGES.Bathroom}
              style={OfferForMyPropertiesStyle.imageStyle}
              resizeMode="cover"
            />
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <View style={OfferForMyPropertiesStyle.apartmentView}>
              <View>
                <Text style={OfferForMyPropertiesStyle.apartmentText}>
                  {'Apartment'}
                </Text>
                <Text style={OfferForMyPropertiesStyle.cityText}>
                  {'Melbourne'}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={OfferForMyPropertiesStyle.apartmentText}>
                  {'Bid amount'}
                </Text>
                <Text style={OfferForMyPropertiesStyle.amount}>{'$879'}</Text>
              </View>
            </View>
            <View style={OfferForMyPropertiesStyle.flat_MainView}>
              <MaterialCommunityIcons
                name={'map-marker'}
                size={15}
                color={_COLORS.Kodie_GreenColor}
                style={{marginTop: 10}}
              />
              <Text style={OfferForMyPropertiesStyle.locationText}>
                {'gadarwarabvvhvhjvhjvhjjhvhjvhj'}
              </Text>
            </View>
            <View style={OfferForMyPropertiesStyle.userMainCon}>
              <View style={OfferForMyPropertiesStyle.userContainer}>
                <Image
                  source={IMAGES.Bathroom}
                  style={OfferForMyPropertiesStyle.userImg}
                  resizeMode="cover"
                />
                <Text style={OfferForMyPropertiesStyle.userName}>
                  {'Jenny dio'}
                </Text>
              </View>
              <View style={OfferForMyPropertiesStyle.ratting}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                  <AntDesign
                    color={_COLORS.Kodie_GreenColor}
                    name={'star'}
                    size={20}
                  />
                </View>
                <Text style={OfferForMyPropertiesStyle.userName}>{'4.9'}</Text>
              </View>
            </View>
          </View>
        </View>
        <DividerIcon />
        <CustomSingleButton
          _ButtonText={'View application'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          disabled={isLoading ? true : false}
          isLeftImage={true}
          onPress={() => {}}
          backgroundColor={_COLORS.Kodie_BlackColor}
        />
      </View>
      <DividerIcon borderBottomWidth={3}/>
    </SafeAreaView>
  );
};

export default OfferForMyProperties;
