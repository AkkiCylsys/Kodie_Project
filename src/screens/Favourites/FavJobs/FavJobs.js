import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {FavJobStyle} from './FavJobStyle';
import {_COLORS, FONTFAMILY} from '../../../Themes';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {GetJobFavouriteServices} from '../../../services/FavouriteServices/FavouriteServces';
import {useSelector} from 'react-redux';
const FavJobs = () => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userAccountId = loginData?.Login_details?.user_account_id;
  const userId = loginData?.Login_details?.user_id;

  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [favJobList, setFavJobList] = useState(false);

  useEffect(() => {
    handleGetFavouriteItem();
  }, []);
  const handleGetFavouriteItem = async () => {
    setIsLoading(true);
    const getJobfavourtiesPayload = {
      user_id: userId,
      account_id: userAccountId,
      favorite_type: 'job',
    };
    console.log('getJobfavourtiesPayload..', getJobfavourtiesPayload);
    try {
      const response = await GetJobFavouriteServices(getJobfavourtiesPayload);
      console.log('response in GetJobFavouriteServices', response);
      if (response?.success === true) {
        setFavJobList(response?.data);
        console.log(
          'get data in job favourite..',
          JSON.stringify(response?.data),
        );
      }
    } catch (error) {
      console.error('Error fetching GetJobFavouriteServices', error);
    } finally {
      setIsLoading(false);
    }
  };

  const favJobRender = ({item,index}) => {
    return (
      <>
        <View style={FavJobStyle?.subContainer}>
          <View style={FavJobStyle?.jobDetailContainer}>
            <View>
              <Text style={FavJobStyle?.jobTittle}>{'Rewire appliance'}</Text>
              <Text style={FavJobStyle?.refNo}>{`Ref#${item?.JM_JOB_REFERENCE_NO}`}</Text>
            </View>
            <View>
              <View style={FavJobStyle.share_View}>
                <View style={FavJobStyle?.statusView}>
                  <Entypo
                    name="dot-single"
                    color={_COLORS.Kodie_skyBlue}
                    size={24}
                  />
                  <Text style={FavJobStyle?.StatusText}>
                    {'AVAILABLE: NOW'}
                  </Text>
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
                    style={[FavJobStyle.share_sty, {marginTop: 5}]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Entypo
                    name="dots-three-horizontal"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={24}
                    style={{marginTop: 5}}
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
                <Text style={FavJobStyle?.locationText} ellipsizeMode='tail' numberOfLines={1}>
                  {item?.JM_JOB_LOCATION}
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
      </>
    );
  };

  return (
    <View style={FavJobStyle?.mainContainer}>
      <FlatList
        data={favJobList}
        keyExtractor={(item, index) => item?.JM_JOB_ID}
        renderItem={favJobRender}
        ListEmptyComponent={() => {
          return (
            <ListEmptyComponent
              EmptyText={"You don't have any favorite Job at the moment."}
            />
          );
        }}
      />
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default FavJobs;
