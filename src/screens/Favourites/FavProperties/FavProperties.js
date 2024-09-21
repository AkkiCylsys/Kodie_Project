import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BANNERS, IMAGES} from '../../../Themes';
import {FavPropertyStyle} from './FavPropertiesStyle';
import {SliderBox} from 'react-native-image-slider-box';
import {_COLORS, FONTFAMILY} from '../../../Themes';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {pad} from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import {
  FavouriteServices,
  GetFavouriteServices,
} from '../../../services/FavouriteServices/FavouriteServces';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useSelector} from 'react-redux';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import ListEmptyComponent from '../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';

const images = [
  BANNERS.cottage,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const FavProperties = () => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userAccountId = loginData?.Login_details?.user_account_id;
  const userId = loginData?.Login_details?.user_id;
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [favPropertyList, setFavPropertyList] = useState(false);

  useEffect(() => {
    handleGetFavouriteItem();
  }, []);
  const handleGetFavouriteItem = async () => {
    setIsLoading(true);
    const getfavourtiesPayload = {
      user_id: userId,
      account_id: userAccountId,
      favorite_type: 'property',
    };
    console.log('getfavourtiesPayload..', getfavourtiesPayload);
    try {
      const response = await GetFavouriteServices(getfavourtiesPayload);
      console.log('response in GetFavouriteServices', response);
      if (response?.success === true) {
        setFavPropertyList(response?.data);
        console.log('response?data?.data....', JSON.stringify(response?.data));
      }
    } catch (error) {
      console.error('Error fetching GetFavouriteServices', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFavouriteItem = async property_id => {
    setIsLoading(true);
    const favourtiesPayload = {
      user_id: userId,
      uad_key: userAccountId,
      favorite_type: 'property',
      favorite_ref_id: property_id,
      is_active: 0,
      created_by: userAccountId.toString(),
    };
    console.log('favourtiesPayload..', favourtiesPayload);
    try {
      const response = await FavouriteServices(favourtiesPayload);
      console.log('response in FavouriteServices', response);
      if (response?.success === true) {
        alert(response?.message);
        handleGetFavouriteItem();
      }
    } catch (error) {
      console.error('Error fetchingFavouriteServices', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeToggle = item => {
    if (item?.like_status === 1) {
      // If currently liked, call the dislike API
      handleFavouriteItem(item?.property_id);
    } else {
      // Optionally, you can add logic for when the item is not liked
      Alert.alert('This item is already disliked.');
    }
  };
  const favPropertyRender = ({item}) => {
    const keyFeatures = JSON.parse(item.key_features);
    // Extract feature values
    const bedrooms = keyFeatures.find(obj => obj.Bedrooms)?.Bedrooms || 0;
    const bathrooms = keyFeatures.find(obj => obj.Bathrooms)?.Bathrooms || 0;
    const receptionRooms =
      keyFeatures.find(obj => obj['Reception rooms'])?.['Reception rooms'] || 0;
    const parkingSpaces =
      keyFeatures.find(obj => obj['Parking / garage spaces'])?.[
        'Parking / garage spaces'
      ] || 0;
    return (
      <>
        {item?.image_path && item?.image_path.length > 0 ? (
          <SliderBox
            images={item?.image_path}
            sliderBoxHeight={241}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            inactiveDotColor={_COLORS.Kodie_GrayColor}
            dotColor={_COLORS.Kodie_GreenColor}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            dotStyle={FavPropertyStyle?.dotStyle}
            ImageComponentStyle={{
              resizeMode: 'cover',
            }}
          />
        ) : (
          <View
            style={[FavPropertyStyle.imageStyle, {justifyContent: 'center'}]}>
            <Ionicons
              name="images-outline"
              size={150}
              color={_COLORS.Kodie_GrayColor}
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
        <View style={FavPropertyStyle?.subContainer}>
          <View style={FavPropertyStyle?.headingView}>
            <View>
              <Text style={FavPropertyStyle?.Property_text}>
                {item?.property_type}
              </Text>
              <Text
                style={
                  FavPropertyStyle?.Property_rate
                }>{`$${item?.rental_amount}/wk`}</Text>
            </View>
            <View style={FavPropertyStyle.share_View}>
              <TouchableOpacity onPress={() => {}}>
                <Entypo
                  name="share"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={24}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLikeToggle(item)}
                disabled={isLoading}>
                <AntDesign
                  name={item?.like_status === 1 ? 'heart' : 'hearto'}
                  color={
                    item?.like_status === 1
                      ? _COLORS.Kodie_lightGreenColor
                      : _COLORS.Kodie_MediumGrayColor
                  }
                  size={24}
                  style={FavPropertyStyle.share_sty}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Entypo
                  name="dots-three-horizontal"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={FavPropertyStyle.locationTextView}>
            <Entypo
              name="location-pin"
              size={15}
              color={_COLORS.Kodie_GreenColor}
              style={{alignSelf: 'center'}}
            />
            <Text
              style={FavPropertyStyle?.locationText}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item?.location}
            </Text>
          </View>
          <View style={FavPropertyStyle?.statusView}>
            <Text style={FavPropertyStyle?.StatusText}>{'AVAILABLE: NOW'}</Text>
          </View>
          <View style={FavPropertyStyle.bedCountView}>
            <View style={[FavPropertyStyle.locationView, {marginLeft: 0}]}>
              <MaterialCommunityIcons
                color={_COLORS.Kodie_GreenColor}
                name="bed-outline"
                size={16}
                style={FavPropertyStyle.bedIconView}
              />
              <Text style={FavPropertyStyle.bedcont}>{bedrooms}</Text>
            </View>
            <View style={FavPropertyStyle.locationView}>
              <MaterialCommunityIcons
                color={_COLORS.Kodie_GreenColor}
                name="shower-head"
                size={16}
                style={FavPropertyStyle.bedIconView}
              />
              <Text style={FavPropertyStyle.bedcont}>{bathrooms}</Text>
            </View>
            <View style={FavPropertyStyle.locationView}>
              <MaterialCommunityIcons
                color={_COLORS.Kodie_GreenColor}
                name="car"
                size={16}
                style={FavPropertyStyle.bedIconView}
              />
              <Text style={FavPropertyStyle.bedcont}>{parkingSpaces}</Text>
            </View>
            <View style={FavPropertyStyle.locationView}>
              <MaterialCommunityIcons
                color={_COLORS.Kodie_GreenColor}
                name="floor-plan"
                size={16}
                style={FavPropertyStyle.bedIconView}
              />
              <Text style={FavPropertyStyle.bedcont}>{item?.floor_size}m2</Text>
            </View>
          </View>
        </View>
        <DividerIcon />
      </>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={favPropertyList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={favPropertyRender}
        ListEmptyComponent={() => {
          return (
            <ListEmptyComponent
              EmptyText={
                "You don't have any favorite properties at the moment."
              }
            />
          );
        }}
      />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default FavProperties;
