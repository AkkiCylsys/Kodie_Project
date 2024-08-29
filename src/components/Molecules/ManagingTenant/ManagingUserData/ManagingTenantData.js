import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { _COLORS, IMAGES } from '../../../../Themes';
import { ManagingTenantDataStyle } from './ManagingTenantDataStyle';
import DividerIcon from '../../../Atoms/Devider/DividerIcon';
const ManagingTenantData = () => {
  return (
    <View
      style={{
        marginHorizontal: 16,
      }}>
      <View style={ManagingTenantDataStyle.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={IMAGES.userImage}
            resizeMode={'cover'}
            style={ManagingTenantDataStyle.usericon}
          />
          <View style={ManagingTenantDataStyle.userNameView}>
            <Text style={ManagingTenantDataStyle.username}>
              {"Deependra"}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <AntDesign
                name="checkcircle"
                size={18}
                color={_COLORS.Kodie_lightGreenColor}
                style={ManagingTenantDataStyle.starIcon}
              />
              <Text
                style={[
                  ManagingTenantDataStyle.username,
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
              style={ManagingTenantDataStyle.starIcon}
            />
            <Text style={ManagingTenantDataStyle.username}>
              {'4.6 '}
              <Text style={{color: _COLORS?.Kodie_GrayColor}}>{'(231)'}</Text>
            </Text>
          </View>
        </View>
      </View>
      {/* <DividerIcon /> */}
    </View>
  );
};

export default ManagingTenantData;
