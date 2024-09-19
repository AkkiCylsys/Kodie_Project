import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BANNERS, IMAGES} from '../../../Themes';
import {FavPropertyStyle} from './FavPropertiesStyle';
import {SliderBox} from 'react-native-image-slider-box';
import {_COLORS, FONTFAMILY} from '../../../Themes';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

import {pad} from 'lodash';

const images = [
  BANNERS.cottage,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const FavProperties = () => {
  const [like, setLike] = useState(false);

  return (
    <View style={{flex: 1}}>
      <SliderBox
        images={images}
        sliderBoxHeight={241}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        inactiveDotColor={_COLORS.Kodie_GrayColor}
        dotColor={_COLORS.Kodie_GreenColor}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        dotStyle={FavPropertyStyle?.dotStyle}
        ImageComponentStyle={{
          resizeMode: 'cover',
        }}
      />
      <View style={FavPropertyStyle?.subContainer}>
        <View style={FavPropertyStyle?.headingView}>
          <View>
            <Text style={FavPropertyStyle?.Property_text}>{'House'}</Text>
            <Text style={FavPropertyStyle?.Property_rate}>{'$1100.00/wk'}</Text>
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
              onPress={() => {
                setLike(!like);
              }}>
              <AntDesign
                name={like ? 'heart' : 'hearto'}
                color={
                  like
                    ? _COLORS.Kodie_GreenColor
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
          <Text style={FavPropertyStyle?.locationText}>
            {'5 Aspen Villas, Maroubra, NSW'}
          </Text>
        </View>
        <View style={FavPropertyStyle?.statusView}>
          <Text style={FavPropertyStyle?.StatusText}>{'AVAILABLE: NOW'}</Text>
        </View>
        <View style={FavPropertyStyle.bedCountView}>
          <View style={[FavPropertyStyle.locationView,{marginLeft:0}]}>
            <Ionicons
              color={_COLORS.Kodie_GreenColor}
              name="bed-outline"
              size={16}
              style={FavPropertyStyle.bedIconView}
            />
            <Text style={FavPropertyStyle.bedcont}>
              {
                //  keyFeatures.find(obj => obj.hasOwnProperty('Bedrooms'))
                //  ?.Bedrooms
                "4"
              }
            </Text>
          </View>
          <View style={FavPropertyStyle.locationView}>
            <MaterialCommunityIcons
              color={_COLORS.Kodie_GreenColor}
              name="shower-head"
              size={16}
              style={FavPropertyStyle.bedIconView}
            />
            <Text style={FavPropertyStyle.bedcont}>
              {
                // keyFeatures.find(obj =>
                //   obj.hasOwnProperty('Parking / garage spaces'),
                // )?.['Parking / garage spaces']
                "3"
              }
            </Text>
          </View>
          <View style={FavPropertyStyle.locationView}>
            <Ionicons
              color={_COLORS.Kodie_GreenColor}
              name="car"
              size={16}
              style={FavPropertyStyle.bedIconView}
            />
            <Text style={FavPropertyStyle.bedcont}>
              {
                // keyFeatures.find(obj => obj.hasOwnProperty('Bathrooms'))
                //   ?.Bathrooms
                "2"
              }
            </Text>
          </View>
          <View style={FavPropertyStyle.locationView}>
            <MaterialCommunityIcons
              color={_COLORS.Kodie_GreenColor}
              name="floor-plan"
              size={16}
              style={FavPropertyStyle.bedIconView}
            />
            <Text style={FavPropertyStyle.bedcont}>{"146"}m2</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavProperties;
