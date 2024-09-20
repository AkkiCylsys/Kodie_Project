import React, {useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FavContractorStyle} from './FavContractorStyle';
import {_COLORS, IMAGES, FONTFAMILY} from '../../../Themes';
import RBSheet from 'react-native-raw-bottom-sheet';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import CustomRBSheet from '../../../components/Molecules/CustomRBSheet/CustomRBSheet';
import TenantData from '../../../components/TenantScreen/TenantData';
import CustomRBSheetContent from '../../../components/Molecules/CustomRBSheet/CustomRBSheetContent';

const RBSheetData = [
  {
    id: '1',
    Data: 'Request new quote',
    Icon: (
      <MaterialCommunityIcons
        name="home-account"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '2',
    Data: 'Create notice / reminder',
    Icon: <EvilIcons name="user" size={25} color={_COLORS.Kodie_GreenColor} />,
  },
  {
    id: '3',
    Data: 'View completed jobs',
    Icon: (
      <MaterialCommunityIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
  {
    id: '4',
    Data: 'Ratings & feedback',
    Icon: (
      <MaterialCommunityIcons
        name="delete-outline"
        size={25}
        color={_COLORS.Kodie_GreenColor}
      />
    ),
  },
];

const FavContractors = () => {
  const refRBSheet = useRef();
  const [like, setLike] = useState(false);

  return (
    <View style={FavContractorStyle?.mainContainer}>
      <View style={FavContractorStyle.subContainer}>
        <View style={FavContractorStyle.userMainView}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={IMAGES.userImage}
              resizeMode={'cover'}
              style={FavContractorStyle.usericon}
            />
            <View style={{marginHorizontal: 16}}>
              <View style={FavContractorStyle.flexRowView}>
                <Text style={FavContractorStyle.userName}>
                  {'Jason Stathom'}
                </Text>
                <View style={FavContractorStyle.flexRowView}>
                  <AntDesign
                    name="checkcircle"
                    size={11}
                    color={_COLORS?.Kodie_GreenColor}
                    style={FavContractorStyle.checkIconStyle}
                  />
                  <Text style={FavContractorStyle.verifyText}>
                    {'Verified'}
                  </Text>
                </View>
              </View>
              <Text style={FavContractorStyle.jobtittel}>{'Handyman'}</Text>
              <View style={FavContractorStyle.ratingView}>
                <AntDesign
                  name="star"
                  size={20}
                  color={_COLORS?.Kodie_lightGreenColor}
                />
                <Text style={FavContractorStyle.ratingText}>
                  {'0.0'}
                  <Text style={{color: _COLORS?.Kodie_GrayColor}}>{'(0)'}</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={FavContractorStyle.threeDotView}>
            <TouchableOpacity
              onPress={() => {
                setLike(!like);
              }}>
              <AntDesign
                name={like ? 'heart' : 'hearto'}
                color={
                  like
                    ? _COLORS.Kodie_lightGreenColor
                    : _COLORS.Kodie_MediumGrayColor
                }
                size={24}
                style={{marginHorizontal: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Entypo
                name="dots-three-horizontal"
                size={25}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon />
        <View style={FavContractorStyle.RowBtnView}>
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
            RightButtonText="Message"
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            onPressRightButton={() => {}}
          />
        </View>
      </View>
      <DividerIcon />
      <CustomRBSheet
        ref={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        height={245}>
       <CustomRBSheetContent data={RBSheetData} closeModal={() => refRBSheet.current.close()} />
      </CustomRBSheet>
    </View>
  );
};

export default FavContractors;
