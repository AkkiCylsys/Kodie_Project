import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FavJobStyle} from './FavJobStyle';
import {_COLORS, FONTFAMILY} from '../../../Themes';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
const FavJobs = () => {
  const [like, setLike] = useState(false);

  return (
    <View style={FavJobStyle?.mainContainer}>
      <View style={FavJobStyle?.subContainer}>
        <View style={FavJobStyle?.jobDetailContainer}>
          <View>
            <Text style={FavJobStyle?.jobTittle}>{'Rewire appliance'}</Text>
            <Text style={FavJobStyle?.refNo}>{'Ref #16953'}</Text>
          </View>
          <View>
            <View style={FavJobStyle.share_View}>
              <View style={FavJobStyle?.statusView}>
                <Entypo
                  name="dot-single"
                  color={_COLORS.Kodie_skyBlue}
                  size={24}
                />
                <Text style={FavJobStyle?.StatusText}>{'AVAILABLE: NOW'}</Text>
              </View>

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
                  style={[FavJobStyle.share_sty,{marginTop:5}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Entypo
                  name="dots-three-horizontal"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={24}
                  style={{marginTop:5}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={FavJobStyle?.budgetCon}>
          <View>
            <Text style={FavJobStyle?.refNo}>{'John Smith'}</Text>
            <View style={FavJobStyle.locationTextView}>
              <Entypo
                name="location-pin"
                size={15}
                color={_COLORS.Kodie_GreenColor}
                style={{alignSelf: 'center'}}
              />
              <Text style={FavJobStyle?.locationText}>
                {'5 Aspen Villas, Maroubra, NSW'}
              </Text>
            </View>
          </View>
          <View>
            <Text style={FavJobStyle?.refNo}>{'Budget'}</Text>
            <Text style={FavJobStyle?.budgetRange}>{'$200'}</Text>
          </View>
        </View>
        <DividerIcon />
        <View>
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
    </View>
  );
};

export default FavJobs;
