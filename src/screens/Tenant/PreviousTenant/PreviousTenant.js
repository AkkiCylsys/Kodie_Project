import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {PreviousTenantStyle} from './PreviousTenantStyle';
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
import axios from 'axios';
import {Config} from '../../../Config';

const PreviousTenant = props => {
  const [rating, setRating] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();
  const [selectedBtn, setSelectedBtn] = useState('');
  const [selectedBtnId, setSelectedBtnId] = useState(null);
  const [previousTenant, setPreviousTenant] = useState([]);
  const [filterpreviousTenant, setFilterPreviousTenant] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchprevioustenant = query => {
    setSearchQuery(query);
    const filtered = query
      ? previousTenant.filter(
          item =>
            item.UAD_FIRST_NAME &&
            item.UAD_FIRST_NAME.toLowerCase().includes(query.toLowerCase()),
        )
      : previousTenant;
    console.log('filtered.........', filtered);
    setFilterPreviousTenant(filtered);
  };
  const CloseUp = () => {
    refRBSheet.current.close();
  };
  useEffect(() => {
    getPreviousTenantList();
  }, []);
  // Api intrigation..
  const getPreviousTenantList = async () => {
    const url = Config.BASE_URL;
    const previousTenantUrl = url + 'tanant_details/getAll/tanant';
    console.log('url...', previousTenantUrl);
    setIsLoading(true);
    await axios
      .get(previousTenantUrl)
      .then(res => {
        console.log('response previousTenantList  ', res?.data);
        if (res?.data?.success === true) {
          setPreviousTenant(res?.data?.data);
        }
      })
      .catch(error => {
        console.log('error previousTenantList... ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const proviousTenantrender = ({item, index}) => {
    return (
      <View>
        <View style={PreviousTenantStyle.usermainView}>
          <TouchableOpacity style={PreviousTenantStyle.usericon}>
            <Image source={IMAGES.userImage} />
          </TouchableOpacity>
          <View style={PreviousTenantStyle.nameView}>
            <Text style={PreviousTenantStyle.nameText}>
              {item.UAD_FIRST_NAME}
            </Text>
            <Text style={PreviousTenantStyle.nameText}>
              {item.UAD_LAST_NAME}
            </Text>
          </View>
          <View style={PreviousTenantStyle.starStyle}>
            <View style={PreviousTenantStyle.bindstarview}>
              <AntDesign
                name="star"
                size={20}
                color={_COLORS.Kodie_lightGreenColor}
              />
              <Text style={PreviousTenantStyle.starratingStyle}>4.6 (231)</Text>
            </View>
            <View style={PreviousTenantStyle.verifiedView}>
              <Text style={PreviousTenantStyle.verifiedtext}>Not verified</Text>
            </View>
          </View>
          <View style={PreviousTenantStyle.menuiconview}>
            <AntDesign
              name="hearto"
              size={25}
              color={_COLORS.Kodie_GrayColor}
              style={PreviousTenantStyle.heartimg}
            />
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={PreviousTenantStyle.RowBtnView}>
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
    <View style={PreviousTenantStyle.mainContainer}>
      {/* <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage
        height={48}
        marginTop={20}
        placeholder={'Search tenants'}
        frontSearchIcon
        searchData={searchprevioustenant}
        filterIcon="filter"
        iconSet="AntDesign"
      />
      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} /> */}
      {/* <View style={PreviousTenantStyle.Container}>
        <CustomSingleButton
          _ButtonText={'+ Add tenant'}
          Text_Color={_COLORS.Kodie_WhiteColor}
          text_Size={14}
          backgroundColor={_COLORS.Kodie_BlackColor}
          height={38}
          marginTop={3}
          //   onPress={props.propertyDetail}
          disabled={isLoading ? true : false}
        />
      </View> */}
      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} />
      <FlatList
        data={searchQuery ? filterpreviousTenant : previousTenant}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item?.id}
        renderItem={proviousTenantrender}
      />
      <RBSheet
        ref={refRBSheet}
        height={316}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: PreviousTenantStyle.bottomModal_container,
        }}>
        <ManagingTenant onClose={CloseUp} />
      </RBSheet>
      {isLoading && <CommonLoader />}
    </View>
  );
};

export default PreviousTenant;
