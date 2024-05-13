import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {_COLORS, LABEL_STYLES, BANNERS, IMAGES} from '../../../../Themes';
import {SearchResultCss} from './SearchResultCss';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from './../../../../services/CommonServices/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SliderBox} from 'react-native-image-slider-box';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {FONTFAMILY, fontFamily} from '../../../../Themes/FontStyle/FontStyle';
import BottomModalSearchRental from '../../../../components/Molecules/BottomModal/BottomModalSearchRental';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const staticimage = [
  // 'https://kodietestapi.cylsys.com/upload/photo/b654ad06-522d-4d46-8a37-951b15845721.jpg',
  // 'https://kodietestapi.cylsys.com/upload/photo/87152267-524d-4bae-bf08-2448b26d659e.jpg',
  // 'https://kodietestapi.cylsys.com/upload/photo/87152267-524d-4bae-bf08-2448b26d659e.jpg',
];
export default SearchResult = props => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [searchRentalData, setSearchRentalData] = useState([]);
  const [favRental, setFavRental] = useState(false);
  const [rentalAmount, setRentalAmount] = useState('');
  const [additionalfeatureskey, setAdditionalfeatureskey] = useState([]);
  const keyFeatureMapping = {};
  additionalfeatureskey.forEach(detail => {
    keyFeatureMapping[detail.paf_key] = detail.features_name;
  });
  const [propertyId, setPropertyId] = useState('');
  const [keyFeature, setKeyFeature] = useState([]);
  console.log('keyFeature......', keyFeature);
  const searchRentalResponse = props?.route?.params?.searchRentalResponse;
  console.log('searchRentalResponse.....', searchRentalResponse);
  const searchInputData = props?.route?.params?.searchInputData;
  console.log('searchInputData....', searchInputData);
  console.log('searchInputData....', searchInputData?.input_Fur_unFurnished);
  const propertyType = searchInputData?.input_PropertyType;
  const AllCountsData = props?.route?.params?.AllCountsData;
  console.log('AllCountsData...in result', AllCountsData);
  // const addtional_keyFeature = searchInputData?.input_addtional_keyFeature;
  // console.log('addtional_keyFeature.....', addtional_keyFeature);
  // const additionalKeyFeaturesString = addtional_keyFeature.map(
  //   key => keyFeatureMapping[key],
  // );
  // console.log('additionalKeyFeaturesString.....', additionalKeyFeaturesString);
  // useEffect....
  useEffect(() => {
    additional_key_features();
  }, []);
  const onClose = () => {
    refRBSheet.current.close();
  };
  // Api intrigation...
  const additional_key_features = async() => {
    const url = Config.BASE_URL;
    const additionalApi = url + 'get_key_features';
    console.log('Request URL:', additionalApi);
    setIsLoading(true);
   await axios
      .get(additionalApi)
      .then(response => {
        console.log('additional_Data', response?.data);
        if (response?.data?.success === true) {
          setIsLoading(false);
          console.log('additional key_features....', response?.data);
          setAdditionalfeatureskey(response?.data?.key_features_details);
          console.log(
            'AdditionalFeaturesKey....',
            response?.data?.key_features_details,
          );
        } else {
          console.error('additional_features_error:', response?.data?.error);
          // alert('Oops something went wrong! Please try again later.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('additional_features error:', error);
        // alert(error);
        setIsLoading(false);
      });
  };
  const propertyData2_render = ({item, index}) => {
    return (
      <>
        {setKeyFeature(item?.key_features)}
        {item?.image_path && item?.image_path.length != 0 ? (
          <View style={{marginTop: 10}}>
            <SliderBox
              // images={staticimage}
              images={item?.image_path}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              inactiveDotColor={_COLORS.Kodie_GrayColor}
              dotColor={_COLORS.Kodie_GreenColor}
              // autoplay={false}
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              dotStyle={SearchResultCss.dotStyle}
              ImageComponentStyle={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
          </View>
        ) : (
          <View>
            <Image
              source={BANNERS?.imageNotFound}
              style={{width: '100%', height: 200, resizeMode: 'cover'}}
            />
          </View>
        )}
        <View style={SearchResultCss.apartmentmainView}>
          <View>
            <Text
              style={[
                SearchResultCss.propertyHeading,
                {fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {item?.property_type || ''}
            </Text>
            <Text style={[SearchResultCss.propertyHeading, {marginTop: 5}]}>
              {`$ ${item?.rental_amount || '0'}`}
            </Text>
          </View>
          <View style={SearchResultCss.shareIcon}>
            <TouchableOpacity>
              <Entypo
                color={_COLORS.Kodie_ExtraminLiteGrayColor}
                name="share"
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFavRental(!favRental);
              }}>
              <AntDesign
                color={
                  favRental
                    ? _COLORS.Kodie_GreenColor
                    : _COLORS.Kodie_ExtraminLiteGrayColor
                }
                name={favRental ? 'heart' : 'hearto'}
                size={25}
                style={{marginHorizontal: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
                setPropertyId(item?.property_id);
                setRentalAmount(item?.rental_amount);
              }}>
              <Entypo
                color={_COLORS.Kodie_ExtraminLiteGrayColor}
                name="dots-three-horizontal"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={SearchResultCss.locationView}>
          <Entypo
            color={_COLORS.Kodie_GreenColor}
            name="location-pin"
            size={20}
          />
          <Text style={SearchResultCss.location}>{item?.location || ''}</Text>
        </View>
        <View style={SearchResultCss.availableBtn}>
          <Text style={SearchResultCss.availabletext}>
            {'AVAILABLE: 1 OCT'}
          </Text>
        </View>

        <View style={SearchResultCss.bedCountView}>
          <View style={SearchResultCss.locationView}>
            <Ionicons
              color={_COLORS.Kodie_GreenColor}
              name="bed-outline"
              size={20}
              style={SearchResultCss.bedIconView}
            />
            <Text style={SearchResultCss.bedcont}>{'6'}</Text>
          </View>
          <View style={SearchResultCss.locationView}>
            <MaterialCommunityIcons
              color={_COLORS.Kodie_GreenColor}
              name="shower-head"
              size={20}
              style={SearchResultCss.bedIconView}
            />
            <Text style={SearchResultCss.bedcont}>{'2'}</Text>
          </View>
          <View style={SearchResultCss.locationView}>
            <Ionicons
              color={_COLORS.Kodie_GreenColor}
              name="car"
              size={20}
              style={SearchResultCss.bedIconView}
            />
            <Text style={SearchResultCss.bedcont}>{'5'}</Text>
          </View>
          <View style={SearchResultCss.locationView}>
            <MaterialCommunityIcons
              color={_COLORS.Kodie_GreenColor}
              name="floor-plan"
              size={20}
              style={SearchResultCss.bedIconView}
            />
            <Text style={SearchResultCss.bedcont}>{'86m2'}</Text>
          </View>
        </View>

        <DividerIcon
          borderBottomWidth={3}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: SearchResultCss.bottomModal_container,
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              marginHorizontal: 10,
            }}
            onPress={() => {
              refRBSheet.current.close();
            }}>
            <Entypo name="cross" size={24} color={_COLORS.Kodie_BlackColor} />
          </TouchableOpacity>
          <BottomModalSearchRental
            onClose={onClose}
            propertyId={propertyId}
            rentalAmount={rentalAmount}
          />
        </RBSheet>
      </>
    );
  };
  return (
    <SafeAreaView style={SearchResultCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Search results'}
      />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={SearchResultCss.propertyRentMainView}>
          <View style={SearchResultCss.LeftTextView}>
            <Text style={SearchResultCss.LeftText}>
              {searchInputData?.city || ''}
            </Text>
            <Text style={SearchResultCss.LeftTextRentText}>
              {`${
                propertyType === 22
                  ? 'House'
                  : propertyType === 23
                  ? 'Cottage'
                  : propertyType === 24
                  ? 'Apartment/Flat'
                  : propertyType === 25
                  ? 'Townhouse'
                  : propertyType === 26
                  ? 'Land/Vacant Plot'
                  : propertyType === 27
                  ? 'Farm'
                  : ''
              } ; $${searchInputData?.input_minRange} ; $${
                searchInputData?.input_maxRange
              } ; ${AllCountsData[0]?.Bedrooms} Beds ${
                AllCountsData[1]?.Bathrooms
              } Baths ; ${AllCountsData[2]?.Parking_Space} parking space ; ${
                AllCountsData[3]?.StreetParking
              } on-street parking ; ${
                searchInputData?.input_Fur_unFurnished == 67
                  ? 'Furnished'
                  : 'unfurnished'
              },${searchInputData?.input_petFrendly == 0 ? 'Yes' : 'No'},${
                searchInputData?.input_secureDeposit == 0 ? 'Yes' : 'No'
              }`}
            </Text>
          </View>
          <View style={SearchResultCss.payButtonMainView}>
            <TouchableOpacity
              style={SearchResultCss.payButtonView}
              onPress={() => {
                _goBack(props);
              }}>
              <Feather
                name="filter"
                color={_COLORS.Kodie_GrayColor}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon
          borderBottomWidth={4}
          color={_COLORS.Kodie_LiteWhiteColor}
        />

        <View style={[SearchResultCss.flat_MainView]}>
          <TouchableOpacity style={SearchResultCss.bidsButton}>
            <Text style={SearchResultCss.bidsButtonText}>Accepting bids</Text>
          </TouchableOpacity>
          <Text style={SearchResultCss.biddingText}>Bidding closes in:</Text>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'o days'}</Text>
          </View>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'6 hrs'}</Text>
          </View>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'10 mins'}</Text>
          </View>
        </View>
        <FlatList
          data={searchRentalResponse?.data}
          keyExtractor={(item, index) => `item_${index}`}
          renderItem={propertyData2_render}
        />
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};
