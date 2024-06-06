import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {ProspectsTenantStyle} from './ProspectsTenantStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import {_goBack} from '../../../services/CommonServices';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, FONTFAMILY, IMAGES} from '../../../Themes/index';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import TenantData from '../../../components/TenantScreen/TenantData';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../../Config';
import {useNavigation} from '@react-navigation/native';

export default ProspectsTenant = props => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [inviteTenant, setInviteTenant] = useState([]);
  const [inviteTenantALl, setInviteTenantAll] = useState([]);
  const [selectedBtnId, setSelectedBtnId] = useState(null);
  const refRBSheet = useRef();
  // Get APi bind first user show bydefault showing here....
  const searchInviteTenant = () => {};

  useEffect(() => {
    get_Tenent_Details();
  }, []);
  const get_Tenent_Details = async () => {
    const url = Config.BASE_URL;
    const Invite_Tenant_url = url + `tanant_details/getAll/tanant`;
    setIsLoading(true);
    console.log('Request URL:', Invite_Tenant_url);
    await axios
      .get(Invite_Tenant_url)
      .then(response => {
        console.log('API Response InviteTenant_url:', response?.data);
        if (response?.data?.success === true) {
          setInviteTenant(response?.data?.data);
          console.log('Invite Tenant Data..', response?.data?.data);
          // alert(response?.data?.data.UAD_KEY)
          setIsLoading(false);
        } else {
          alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed Tenent_Details', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const CloseUp = () => {
    refRBSheet.current.close();
  };

  const tenantData = ({item, index}) => {
    return (
      <>
        <View style={ProspectsTenantStyle.usermainView}>
          <View>
            <TouchableOpacity style={ProspectsTenantStyle.usericon}>
              <Image source={IMAGES.userImage} />
            </TouchableOpacity>
          </View>
          <View style={ProspectsTenantStyle.nameView}>
            <Text style={ProspectsTenantStyle.nameText}>
              {item.UAD_FIRST_NAME}
            </Text>
            <Text style={ProspectsTenantStyle.nameText}>
              {item.UAD_LAST_NAME}
            </Text>
          </View>

          <View style={ProspectsTenantStyle.starStyle}>
            <View style={ProspectsTenantStyle.bindstarview}>
              <AntDesign
                name="star"
                size={20}
                color={_COLORS.Kodie_lightGreenColor}
              />
              <Text style={ProspectsTenantStyle.starratingStyle}>4.6(231)</Text>
            </View>
            <View style={ProspectsTenantStyle.verifiedView}>
              <Text style={ProspectsTenantStyle.verifiedtext}>
                Not verified
              </Text>
            </View>
          </View>
          <View style={ProspectsTenantStyle.menuiconview}>
            <AntDesign
              name="hearto"
              size={25}
              color={_COLORS.Kodie_GrayColor}
              style={ProspectsTenantStyle.heartimg}
            />
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={ProspectsTenantStyle.closeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={ProspectsTenantStyle.Maindescription}>
          <View style={ProspectsTenantStyle.description}>
            <View style={ProspectsTenantStyle.desc_View}>
              <Text style={ProspectsTenantStyle.desc_heading}>
                {'Looking for : '}
              </Text>
              <Text style={ProspectsTenantStyle.desc_value}>
                {item.looking_For}
              </Text>
            </View>
            <View style={ProspectsTenantStyle.desc_View}>
              <Text style={ProspectsTenantStyle.desc_heading}>
                {'Location : '}
              </Text>
              <Text style={ProspectsTenantStyle.desc_value}>
                {item.UAD_CURR_PHYSICAL_ADD}
              </Text>
            </View>
            <View style={ProspectsTenantStyle.desc_View}>
              <Text style={ProspectsTenantStyle.desc_heading}>
                {'Budget : '}
              </Text>
              <Text style={ProspectsTenantStyle.desc_value}>{item.budget}</Text>
            </View>
            <TouchableOpacity>
              <Text style={ProspectsTenantStyle.readtext}>{'Read more'}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={ProspectsTenantStyle.screeningView}>
              <Entypo
                name="dot-single"
                size={25}
                color={_COLORS.Kodie_DarkOrange}
                style={{
                  alignSelf: 'center',
                }}
              />
              <Text style={ProspectsTenantStyle.screeningText}>
                {'Failed screening'}
              </Text>
            </View>
            <Text style={ProspectsTenantStyle.residentText}>
              {'Resident score:'}
            </Text>
            <View style={ProspectsTenantStyle.residentScoreView}>
              <Text style={ProspectsTenantStyle.scoretext}>{'475'}</Text>
            </View>
          </View>
        </View>
        {/* <View style={ProspectsTenantStyle.RowBtnView}>
          <RowButtons
            leftButtonHeight={50}
            RightButtonHeight={50}
            LeftButtonText="View Profile"
            onPressLeftButton={() => navigation.navigate('LandlordProfile')}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonText="Add to property"
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            onPressRightButton={() => navigation.navigate('PropertyDetails')}
          />
        </View> */}
        <View style={ProspectsTenantStyle.RowBtnView}>
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
            RightButtonText="Add to property"
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
      </>
    );
  };
  return (
    <View style={ProspectsTenantStyle.mainContainer}>
      <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage
        height={48}
        marginTop={20}
        placeholder={'Search tenants'}
        frontSearchIcon
        searchData={searchInviteTenant}
        filterIcon="filter"
        iconSet="AntDesign"
      />
      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} />
      <FlatList
        data={inviteTenant}
        // data={inviteTenantALl}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        keyExtractor={item => item?.id}
        renderItem={tenantData}
      />

      <RBSheet
        ref={refRBSheet}
        height={240}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_LightGrayColor,
          },
          container: ProspectsTenantStyle.bottomModal_container,
        }}>
        <TenantData onClose={CloseUp} />
      </RBSheet>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};
