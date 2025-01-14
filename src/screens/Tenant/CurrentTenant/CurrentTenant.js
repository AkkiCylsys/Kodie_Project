import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {CurrentTenantStyle} from './CurrentTenantStyle';
import {_goBack} from '../../../services/CommonServices';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, IMAGES} from '../../../Themes/index';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import ManagingTenant from '../../../components/Molecules/ManagingTenant/ManagingTenant';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {Config} from '../../../Config';
import axiosInstance from '../../../services/axiosInstance';
const CurrentTenant = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTenant, setCurrentTenant] = useState([]);
  const [filterCurrentTenant, setFilterCurrentTenant] = useState([]);
  const [selectedBtnId, setSelectedBtnId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const refRBSheet = useRef();
  const searchCurrentTenant = query => {
    setSearchQuery(query);
    const filtered = query
      ? currentTenant.filter(
          item =>
            item.ATD_FIRST_NAME &&
            item.ATD_FIRST_NAME.toLowerCase().includes(query.toLowerCase()),
        )
      : currentTenant;
    console.log('filtered.........', filtered);
    setFilterCurrentTenant(filtered);
  };
  const CloseUp = () => {
    refRBSheet.current.close();
  };
  useEffect(() => {
    getCurrentTenantList();
  }, []);
  // Api intrigation..
  const getCurrentTenantList = async () => {
    const url = Config.BASE_URL;
    const currectTenantUrl ='tanant_details/getAll/tanant/manually';
    console.log('url...', currectTenantUrl);
    setIsLoading(true);
    await axiosInstance
      .get(currectTenantUrl)
      .then(res => {
        console.log('response CurrentTenantList  ', res?.data);
        if (res?.data?.success === true) {
          setCurrentTenant(res?.data?.data);
        }
      })
      .catch(error => {
        console.log('error CurrentTenantList... ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const CurrentTenantrender = ({item, index}) => {
    return (
      <View>
        <View style={CurrentTenantStyle.usermainView}>
          <TouchableOpacity style={CurrentTenantStyle.usericon}>
            <Image source={IMAGES.userImage} />
          </TouchableOpacity>
          <View style={CurrentTenantStyle.nameView}>
            <Text style={CurrentTenantStyle.nameText}>
              {item.ATD_FIRST_NAME}
            </Text>
            <Text style={CurrentTenantStyle.nameText}>
              {item.ATD_LAST_NAME}
            </Text>
          </View>
          <View style={CurrentTenantStyle.starStyle}>
            <View style={CurrentTenantStyle.bindstarview}>
              <AntDesign
                name="star"
                size={20}
                color={_COLORS.Kodie_lightGreenColor}
                style={CurrentTenantStyle.heartimg}
              />
              <Text style={CurrentTenantStyle.starratingStyle}>4.6 (231)</Text>
            </View>
            <View style={CurrentTenantStyle.verifiedView}>
              <Text style={CurrentTenantStyle.verifiedtext}>Not verified</Text>
            </View>
          </View>
          <View style={CurrentTenantStyle.menuiconview}>
            <AntDesign
              name="hearto"
              size={25}
              color={_COLORS.Kodie_GrayColor}
              style={CurrentTenantStyle.heartimg}
            />
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={CurrentTenantStyle.closeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={CurrentTenantStyle.RowBtnView}>
          <RowButtons
            LeftButtonText="View Profile"
            leftButtonbackgroundColor={
              selectedBtnId !== item.ATD_KEY
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              selectedBtnId !== item.ATD_KEY
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              selectedBtnId !== item.ATD_KEY
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => setSelectedBtnId(null)}
            RightButtonText="Message"
            RightButtonbackgroundColor={
              selectedBtnId === item.ATD_KEY
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selectedBtnId === item.ATD_KEY
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selectedBtnId === item.ATD_KEY
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => setSelectedBtnId(item.ATD_KEY)}
          />
        </View>
        <DividerIcon />
      </View>
    );
  };
  return (
    <View style={CurrentTenantStyle.mainContainer}>
      <FlatList
        data={searchQuery ? filterCurrentTenant : currentTenant}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={CurrentTenantrender}
      />
      <RBSheet
        ref={refRBSheet}
        height={290}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: CurrentTenantStyle.bottomModal_container,
        }}>
        <ManagingTenant onClose={CloseUp} />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default CurrentTenant;
