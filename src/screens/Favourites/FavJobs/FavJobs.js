import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {FavJobStyle} from './FavJobStyle';
import {_COLORS, FONTFAMILY} from '../../../Themes';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import ListEmptyComponent from '../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {FavouriteServices, GetJobFavouriteServices} from '../../../services/FavouriteServices/FavouriteServces';
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

  const handleUnFavouriteItem = async job_id => {
    setIsLoading(true);
    const favourtiesPayload = {
      user_id: userId,
      uad_key: userAccountId,
      favorite_type: 'job',
      favorite_ref_id: job_id,
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
      handleUnFavouriteItem(item?.job_id);
    } else {
      // Optionally, you can add logic for when the item is not liked
      Alert.alert('This item is already disliked.');
    }
  };
  const favJobRender = ({item, index}) => {
    return (
      <>
        <View style={FavJobStyle?.subContainer}>
          <View style={FavJobStyle?.jobDetailContainer}>
            <View>
              <Text style={FavJobStyle?.jobTittle}>
                {item?.service_looking}
              </Text>
              <Text
                style={FavJobStyle?.refNo}>{`Ref#${item?.job_reference}`}</Text>
            </View>
            <View>
              <View style={FavJobStyle.share_View}>
                <View style={FavJobStyle?.statusView}>
                  <Entypo
                    name="dot-single"
                    color={_COLORS.Kodie_skyBlue}
                    size={24}
                  />
                  <Text style={FavJobStyle?.StatusText}>{'Unassigned'}</Text>
                </View>

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
              <Text
                style={
                  FavJobStyle?.refNo
                }>{`${item?.first_name} ${item?.last_name}`}</Text>
              <View style={FavJobStyle.locationTextView}>
                <Entypo
                  name="location-pin"
                  size={15}
                  color={_COLORS.Kodie_GreenColor}
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={FavJobStyle?.locationText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item?.job_location}
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
        keyExtractor={(item, index) => item?.job_id}
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
