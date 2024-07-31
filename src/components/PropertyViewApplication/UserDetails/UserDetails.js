import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity,Image} from 'react-native';
import { IMAGES,_COLORS } from '../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UserDetailsStyle } from './UserDetailsStyle';
const UserDetails = () => {
  return (
    <View style={UserDetailsStyle.container}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={IMAGES.userImage}
          resizeMode={'cover'}
          style={UserDetailsStyle.userImg}
        />
        <View style={UserDetailsStyle.userNameView}>
          <Text style={UserDetailsStyle.username}>{'Jack'}</Text>
          <Text style={UserDetailsStyle.username}>{'Black'}</Text>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <AntDesign
            name="star"
            size={18}
            color={_COLORS.Kodie_lightGreenColor}
            style={UserDetailsStyle.starIcon}
          />
          <Text style={[UserDetailsStyle.username]}>{'3.9 (81)'}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <AntDesign
            name="checkcircle"
            size={18}
            color={_COLORS.Kodie_lightGreenColor}
            style={UserDetailsStyle.starIcon}
          />
          <Text
            style={[
              UserDetailsStyle.username,
              {color: _COLORS.Kodie_GreenColor},
            ]}>
            {'Verified'}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={{}}>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color={_COLORS.Kodie_GrayColor}
          style={{
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({});
