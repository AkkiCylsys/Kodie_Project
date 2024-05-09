import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {ViewRentalDetailsStyle} from './ViewRentalDetailsStyle';
import {SliderBox} from 'react-native-image-slider-box';
import {BANNERS, _COLORS, FONTFAMILY, LABEL_STYLES} from '../../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import {Config} from '../../../../Config';
import axios from 'axios';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import ReadMore from '@fawazahmed/react-native-read-more';

const ViewRentalDetails = props => {
  const propertyId = props?.route?.params?.propertyId;
  const rentalAmount = props?.route?.params?.rentalAmount;
  console.log('propertyId in view...', propertyId);
  const [isLoading, setIsLoading] = useState([]);
  const [property_Detail, setProperty_Details] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [additionalKeyFeaturesString, setAdditionalKeyFeaturesString] =
    useState([]);
  const [addtionalFeaturesID, setAddtionalFeaturesID] = useState('');
  const [additionalKeyFeatures, setAdditionalKeyFeatures] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [propertyDetailsClp, setPropertyDetailsClp] = useState(false);
  const [roomClp, setRoomClp] = useState(false);
  const [externalfeaturesClp, setExternalfeaturesClp] = useState(false);
  const [pointOfInterest, setPointOfInterest] = useState(false);
  const [submitApplicationBtn, setSubmitApplicationBtn] = useState(false);
  const [submitApplicationBtnId, setSubmitApplicationBtnId] = useState(0);
  const [favRental, setFavRental] = useState(false);

  const images = [
    BANNERS.wallImage,
    BANNERS.BannerFirst,
    BANNERS.BannerSecond,
    BANNERS.previewImage,
  ];
  useEffect(() => {
    fetchData();
    try {
      const keyFeaturesArray = additionalKeyFeaturesString.split(',');
      setAdditionalKeyFeatures(keyFeaturesArray);
    } catch (error) {
      console.error('Error parsing additional_key_features:', error);
    }
  }, [additionalKeyFeaturesString, propertyId]);
  const Detail_rander = ({item, index}) => {
    return (
      <>
        <View style={ViewRentalDetailsStyle.DetailsView}>
          {Object.keys(item)[0] == 'Bedrooms' ? (
            <MaterialCommunityIcons
              name="bed-double-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          ) : Object.keys(item)[0] == 'Bathrooms' ? (
            <MaterialCommunityIcons
              name="shower-head"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          ) : Object.keys(item)[0] == 'Parking Space' ? (
            <Ionicons
              name="car-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          ) : (
            <MaterialCommunityIcons
              name="garage"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          )}
          <Text style={ViewRentalDetailsStyle.details_text}>
            {`${Object.keys(item)[0]}: ${Object.values(item)[0]}` || ''}
          </Text>
        </View>
      </>
    );
  };
  const renderItem = ({item}) => (
    <View style={ViewRentalDetailsStyle.DetailsView}>
      {item === 'Pool' ? (
        <MaterialIcons
          name="pool"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Garage' ? (
        <MaterialCommunityIcons
          name="garage"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Balcony' ? (
        <MaterialCommunityIcons
          name="balcony"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Outdoor Area' ? (
        <MaterialCommunityIcons
          name="table-chair"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Ensuite' ? (
        <MaterialCommunityIcons
          name="shower"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Dishwasher' ? (
        <MaterialCommunityIcons
          name="dishwasher"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Study' ? (
        <MaterialCommunityIcons
          name="bookshelf"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Built in Robes' ? (
        <MaterialCommunityIcons
          name="cupboard"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Air Conditioning' ? (
        <MaterialCommunityIcons
          name="air-conditioner"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Solar Panels' ? (
        <MaterialCommunityIcons
          name="solar-panel"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Heating' ? (
        <MaterialCommunityIcons
          name="fireplace"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'High Energy Efficiency' ? (
        <SimpleLineIcons
          name="energy"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : null}
      <Text style={ViewRentalDetailsStyle.details_text}>{item}</Text>
    </View>
  );
  // Api intrigation...
  const fetchData = async () => {
    try {
      // Fetch property details
      const detailData = {
        // property_id: 1542,
        property_id: propertyId,
      };
      const url = Config.BASE_URL;
      const property_Detailss = url + 'get_property_details';
      console.log('url..', property_Detailss);
      setIsLoading(true);
      const response = await axios.post(property_Detailss, detailData);
      setIsLoading(false);
      console.log('response_get_property_details...', response?.data);
      if (response?.data?.success === true) {
        setProperty_Details(response?.data?.property_details[0]);
        console.log(
          'type of property....',
          response?.data?.property_details[0],
        );
        // Fetch and process key features..........
        if (response?.data?.property_details[0]?.key_features) {
          const parsedData = JSON.parse(
            response?.data?.property_details[0]?.key_features.replace(
              /\\/g,
              '',
            ),
          );
          setDetail(parsedData);
          console.log('parsedData....', parsedData);
        }
        const additionalKeyFeatures =
          response?.data?.property_details[0]?.additional_key_features[0];
        setAdditionalKeyFeaturesString(additionalKeyFeatures);
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        // alert('Oops something went wrong! Please try again later.');
      }
      const additionalFeatures_id =
        response?.data?.property_details[0]?.additional_features;
      console.log('additionalFeaturesid....', additionalFeatures_id);
      const is_additionalFeaturesid = additionalFeatures_id.split(',');
      setAddtionalFeaturesID(is_additionalFeaturesid);
    } catch (error) {
      console.error('Error:', error);
      // alert(error);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={ViewRentalDetailsStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={property_Detail?.location || ''}
      />
      <ScrollView>
        <View>
          <SliderBox
            // images={editMode ? updateAllImage : allImagePaths}
            images={property_Detail?.image_path}
            sliderBoxHeight={200}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            inactiveDotColor={_COLORS.Kodie_GrayColor}
            dotColor={_COLORS.Kodie_GreenColor}
            autoplay={false}
            circleLoop
            resizeMethod={'resize'}
            resizeMode={'cover'}
            dotStyle={ViewRentalDetailsStyle.dotStyle}
            ImageComponentStyle={{
              // flex: 1,
              resizeMode: 'cover',
              // borderRadius: 15,
              // width: '90%',
            }}
          />
        </View>
        <View style={ViewRentalDetailsStyle.apartmentmainView}>
          <View>
            <Text
              style={[
                ViewRentalDetailsStyle.propertyHeading,
                {fontFamily: FONTFAMILY.K_Regular},
              ]}>
              {property_Detail?.property_type || ''}
            </Text>
            <Text
              style={[ViewRentalDetailsStyle.propertyHeading, {marginTop: 5}]}>
              {/* {item?.rental_amount ? `$ ${item?.rental_amount || ''}` : null} */}
              {property_Detail?.city || ''}
            </Text>
          </View>
          <View style={ViewRentalDetailsStyle.shareIcon}>
            <View style={ViewRentalDetailsStyle.availableBtn}>
              <Text style={ViewRentalDetailsStyle.availabletext}>
                {'AVAILABLE: NOW'}
              </Text>
            </View>
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
            {/* <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Entypo
                color={_COLORS.Kodie_ExtraminLiteGrayColor}
                name="dots-three-horizontal"
                size={25}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={ViewRentalDetailsStyle.locationView}>
          <Entypo
            color={_COLORS.Kodie_GreenColor}
            name="location-pin"
            size={20}
          />
          <Text style={ViewRentalDetailsStyle.location}>
            {property_Detail?.location || ''}
          </Text>
        </View>
        <Text
          style={[
            ViewRentalDetailsStyle.propertyHeading,
            {marginTop: 5, marginHorizontal: 28},
          ]}>
          {/* {item?.rental_amount ? `$ ${item?.rental_amount || ''}` : null} */}
          {rentalAmount || ''}
        </Text>
        <DividerIcon
          borderBottomWidth={3}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        <View style={{marginHorizontal: 16}}>
          <ReadMore
            seeMoreStyle={ViewRentalDetailsStyle.readMore}
            seeLessStyle={ViewRentalDetailsStyle.readMore}
            seeMoreText={'read more'}
            seeLessText={'read Less'}
            numberOfLines={2}
            style={ViewRentalDetailsStyle.textStyle}>
            {property_Detail?.property_description || ''}
          </ReadMore>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <Text
            style={[
              ViewRentalDetailsStyle.propery_det,
              {marginHorizontal: 16},
            ]}>
            {'Key features'}
          </Text>
          <FlatList
            data={Detail}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
            numColumns={numColumns}
            keyExtractor={item => item?.id}
            // keyExtractor={(item, index) => index.toString()}
            renderItem={Detail_rander}
          />
          {property_Detail?.additional_key_features_id === '[]' ? null : (
            <Text
              style={[
                ViewRentalDetailsStyle.propery_det,
                {marginHorizontal: 16},
              ]}>
              {'Additional key features'}
            </Text>
          )}
          <FlatList
            data={additionalKeyFeatures}
            numColumns={numColumns}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <Text
            style={[
              ViewRentalDetailsStyle.propertyHeading,
              {marginTop: 5, marginHorizontal: 16},
            ]}>
            {'Inspections'}
          </Text>
          <View style={{marginHorizontal: 16}}>
            <CustomSingleButton
              _ButtonText={'Request an inspection'}
              Text_Color={_COLORS.Kodie_WhiteColor}
              backgroundColor={_COLORS.Kodie_BlackColor}
              onPress={() => {
                // handleSearchForRental();
                // props.navigation.navigate('RentalOffer');
              }}
              disabled={isLoading ? true : false}
            />
          </View>
          <DividerIcon
            borderBottomWidth={3}
            color={_COLORS.Kodie_LiteWhiteColor}
          />
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setPropertyDetailsClp(!propertyDetailsClp);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>
                {'Property details'}
              </Text>

              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setPropertyDetailsClp(!propertyDetailsClp);
                }}>
                <Entypo
                  name={
                    propertyDetailsClp
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <DividerIcon marginTop={8} />
            {propertyDetailsClp ? (
              <>
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Listing Number'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {'NA'}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Type of Property'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {property_Detail?.property_type}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Floor Size'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {property_Detail?.floor_size}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Pets Allowed'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {addtionalFeaturesID[0]}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Furnished'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {/* {addtionalFeaturesID[0]} */}
                    {addtionalFeaturesID[1] ? 'No' : 'Yes'}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
                <View style={ViewRentalDetailsStyle.p_rowTextView}>
                  <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                    {'Smoking'}
                  </Text>
                  <Text
                    style={[
                      LABEL_STYLES.commontext,
                      {fontFamily: FONTFAMILY.K_Medium},
                    ]}>
                    {'No'}
                  </Text>
                </View>
                <DividerIcon marginTop={8} />
              </>
            ) : null}

            {/* <DividerIcon marginTop={8} /> */}
          </View>
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setRoomClp(!roomClp);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>{'Rooms'}</Text>
              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setRoomClp(!roomClp);
                }}>
                <Entypo
                  name={roomClp ? 'chevron-small-up' : 'chevron-small-down'}
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
          {roomClp ? (
            <>
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Bedrooms'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {Detail[0]?.Bedrooms}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Bathrooms'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {Detail[1]?.Bathrooms}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Kitchen'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Lounge'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Dining Room'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Other'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
            </>
          ) : null}
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setExternalfeaturesClp(!externalfeaturesClp);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>
                {'External featuress'}
              </Text>

              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setExternalfeaturesClp(!externalfeaturesClp);
                }}>
                <Entypo
                  name={
                    externalfeaturesClp
                      ? 'chevron-small-up'
                      : 'chevron-small-down'
                  }
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={8} />
          {externalfeaturesClp ? (
            <>
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Car Spaces'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {Detail[0]?.Bedrooms}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'On-Street Parking Spaces'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Garden'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Pool'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Outdoor Patio'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
              <View style={ViewRentalDetailsStyle.p_rowTextView}>
                <Text style={[LABEL_STYLES.commontext, {fontSize: 12}]}>
                  {'Other'}
                </Text>
                <Text
                  style={[
                    LABEL_STYLES.commontext,
                    {fontFamily: FONTFAMILY.K_Medium},
                  ]}>
                  {'0'}
                </Text>
              </View>
              <DividerIcon marginTop={8} />
            </>
          ) : null}
          <View style={ViewRentalDetailsStyle.subContainer}>
            <TouchableOpacity
              style={ViewRentalDetailsStyle.propety_details_view}
              onPress={() => {
                setPointOfInterest(!pointOfInterest);
              }}>
              <Text style={ViewRentalDetailsStyle.propery_det}>
                {'Points of interest'}
              </Text>
              <TouchableOpacity
                style={ViewRentalDetailsStyle.down_Arrow_icon}
                onPress={() => {
                  setPointOfInterest(!pointOfInterest);
                }}>
                <Entypo
                  name={
                    pointOfInterest ? 'chevron-small-up' : 'chevron-small-down'
                  }
                  size={18}
                  color={_COLORS.Kodie_GrayColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <DividerIcon marginTop={8} />
            <View style={ViewRentalDetailsStyle.submitApplicationbtn}>
              <RowButtons
                LeftButtonText={'Submit application'}
                leftButtonbackgroundColor={
                  !submitApplicationBtn
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_WhiteColor
                }
                LeftButtonTextColor={
                  !submitApplicationBtn
                    ? _COLORS.Kodie_WhiteColor
                    : _COLORS.Kodie_BlackColor
                }
                LeftButtonborderColor={
                  !submitApplicationBtn
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_BlackColor
                }
                onPressLeftButton={() => {
                  setSubmitApplicationBtn(false);
                  setSubmitApplicationBtnId(0);
                  // alert(selectPetFriendlyBtnId)
                }}
                RightButtonText={'Message owner'}
                RightButtonbackgroundColor={
                  submitApplicationBtn
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_WhiteColor
                }
                RightButtonTextColor={
                  submitApplicationBtn
                    ? _COLORS.Kodie_WhiteColor
                    : _COLORS.Kodie_BlackColor
                }
                RightButtonborderColor={
                  submitApplicationBtn
                    ? _COLORS.Kodie_BlackColor
                    : _COLORS.Kodie_BlackColor
                }
                onPressRightButton={() => {
                  setSubmitApplicationBtn(true);
                  setSubmitApplicationBtnId(1);
                  // alert(selectPetFriendlyBtnId)
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default ViewRentalDetails;

const styles = StyleSheet.create({});
