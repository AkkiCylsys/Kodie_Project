import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';
import {Config} from '../../../../Config';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {SliderBox} from 'react-native-image-slider-box';
import {_COLORS, BANNERS, IMAGES} from '../../../../Themes';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ViewDetailCss} from './ViewPropertyDetailsCss';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import {DetailsStyle} from '../../AddNewProperty/PropertyReview/Details/DetailsStyles';
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const Detail = [
  {
    id: '1',
    images: IMAGES.BedroomIcon,
    name: 'Bedrooms: 3',
  },
  {
    id: '2',
    images: IMAGES.Bathroom,
    name: 'Bathrooms: 2',
  },
  {
    id: '3',
    images: IMAGES.Parking,
    name: 'Garages: 1',
  },
  {
    id: '4',
    images: IMAGES.BedroomIcon,
    name: 'Parkings: 1',
  },
  {
    id: '5',
    images: IMAGES.BedroomIcon,
    name: 'Garden',
  },
  {
    id: '6',
    images: IMAGES.BedroomIcon,
    name: 'Pool',
  },
  {
    id: '7',
    images: IMAGES.BedroomIcon,
    name: 'Furnished',
  },
  {
    id: '8',
    images: IMAGES.BedroomIcon,
    name: 'WiFi',
  },
];

export default ViewPropertyDetails = props => {
  // const propertyDelId = props?.route?.params?.propertyDelId;
  const propertyid = props?.route?.params?.propertyId;

  console.log(propertyid, 'viewpropertydetails id....');
  // console.log(propertyDelId);
  const [isLoading, setIsLoading] = useState(false);
  const [property_Detail, setProperty_Details] = useState([]);
  const [Detail, setDetail] = useState([]);
  const [additionalKeyFeatures, setAdditionalKeyFeatures] = useState([]);
  const [additionalKeyFeaturesString, setAdditionalKeyFeaturesString] =
    useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const Detail_rander = ({item, index}) => {
    return (
      <>
        <View style={DetailsStyle.DetailsView}>
          {Object.keys(item)[0] == 'Bedrooms' ? (
            // (<Image
            //     source={IMAGES.BedroomIcon}
            //     style={DetailsStyle.DetailsIcon}
            //   />)

            <MaterialCommunityIcons
              name="bed-double-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          ) : Object.keys(item)[0] == 'Bathrooms' ? (
            // (
            //   <Image source={IMAGES.Bathroom}
            //   style={DetailsStyle.DetailsIcon} />
            // )
            <MaterialCommunityIcons
              name="shower-head"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          ) : Object.keys(item)[0] == 'Parking Space' ? (
            // (
            //   <Image source={IMAGES.Parking}
            //   style={DetailsStyle.DetailsIcon} />
            // )
            <Ionicons
              name="car-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          ) : (
            // (
            //   <Image source={IMAGES.Garden}
            //   style={DetailsStyle.DetailsIcon} />
            // )
            <Ionicons
              name="car-outline"
              size={25}
              color={_COLORS.Kodie_GreenColor}
              resizeMode={'contain'}
            />
          )}
          <Text style={DetailsStyle.details_text}>
            {`${Object.keys(item)[0]}: ${Object.values(item)[0]}` || ''}
            {/* {`${key}: ${value}`} */}
          </Text>
        </View>
      </>
    );
  };
  const renderItem = ({item}) => (
    <View style={DetailsStyle.DetailsView}>
      {item === 'Pool' ? (
        // (
        //   <Image source={IMAGES.Bathroom}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialIcons
          name="pool"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Garage' ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="garage"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Balcony' ? (
        //   (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="window-closed-variant"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Outdoor area' ? (
        // (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="table-chair"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Ensuite' ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="shower"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Dishwasher' ? (
        // (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="dishwasher"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Study' ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="bookshelf"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Built in robes' ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="fireplace"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Air conditioning' ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="air-conditioner"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Solar panels' ? (
        // (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="solar-panel"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'Heating' ? (
        //   (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <MaterialCommunityIcons
          name="fireplace"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : item === 'High energy efficiency' ? (
        //  (
        //   <Image source={IMAGES.BedroomIcon}
        //   style={DetailsStyle.DetailsIcon} />
        // )
        <SimpleLineIcons
          name="energy"
          size={25}
          color={_COLORS.Kodie_GreenColor}
          resizeMode={'contain'}
        />
      ) : null}
      <Text style={DetailsStyle.details_text}>{item}</Text>
    </View>
  );
  // const fetchData = async () => {
  //   try {
  //     // Fetch property details
  //     const detailData = { property_id: propertyid };
  //     const url = Config.BASE_URL;
  //     const property_Detailss = url + "get_property_details";

  //     setIsLoading(true);
  //     const response = await axios.post(property_Detailss, detailData);
  //     setIsLoading(false);

  //     if (response?.data?.status === true) {
  //       setProperty_Details(response?.data?.data[0]);
  //       console.log(response?.data?.data[0])
  //       console.log(object);
  //       // Fetch and process key features..........
  //       if (response?.data?.data[0]?.key_features) {
  //         const parsedData = JSON.parse(
  //           response?.data?.data[0].key_features.replace(/\\/g, "")
  //         );
  //         setDetail(parsedData);
  //       }
  //       const additionalKeyFeatures =
  //         response?.data?.data[0].additional_key_features[0];
  //       setAdditionalKeyFeaturesString(additionalKeyFeatures);
  //     } else {
  //       console.error("propertyDetail_error:", response?.data?.error);
  //       alert("Oops something went wrong! Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert(error);
  //     setIsLoading(false);
  //   }
  // };
  const fetchData = async () => {
    try {
      // Fetch property details
      const detailData = {
        property_id: propertyid,
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
        // Fetch and process key features..........
        if (response?.data?.property_details[0].key_features) {
          const parsedData = JSON.parse(
            response?.data?.property_details[0].key_features.replace(/\\/g, ''),
          );
          setDetail(parsedData);
        }
        const additionalKeyFeatures =
          response?.data?.property_details[0].additional_key_features[0];
        setAdditionalKeyFeaturesString(additionalKeyFeatures);
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        alert('Oops something went wrong! Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error);
      setIsLoading(false);
    }
  };
  // const additionalKeyFeaturesString =
  //   property_Detail?.additional_key_features[0];

  useEffect(() => {
    fetchData();
    try {
      const keyFeaturesArray = additionalKeyFeaturesString.split(',');
      setAdditionalKeyFeatures(keyFeaturesArray);
    } catch (error) {
      console.error('Error parsing additional_key_features:', error);
    }
    const timeout = setTimeout(() => {
      setNumColumns(2); // Change to the desired number of columns
    }, 2000); // Change this delay as needed

    return () => clearTimeout(timeout);
  }, [propertyid, additionalKeyFeaturesString]);

  return (
    <View style={ViewDetailCss.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        // MiddleText={"8502 Preston Rd. Inglewood..."}
        MiddleText={property_Detail.location}
      />
      <ScrollView>
        <View style={ViewDetailCss.slider_view}>
          {property_Detail.image_path &&
          property_Detail.image_path.length != 0 ? (
            <SliderBox
              images={property_Detail.image_path}
              sliderBoxHeight={200}
              onCurrentImagePressed={index =>
                console.warn(`image ${index} pressed`)
              }
              inactiveDotColor={_COLORS.Kodie_GrayColor}
              dotColor={_COLORS.Kodie_GreenColor}
              autoplay
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              dotStyle={ViewDetailCss.dotStyle}
              ImageComponentStyle={{
                flex: 1,
                resizeMode: 'cover',
              }}
            />
          ) : null}
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.apartment_View}>
            <Text style={ViewDetailCss.apartment_text}>
              {property_Detail.property_type}
            </Text>
            <View style={ViewDetailCss.share_View}>
              <TouchableOpacity style={ViewDetailCss.availableButtonview}>
                <Text style={ViewDetailCss.availableButtonText}>
                  AVAILABLE : NOW
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name="share"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={ViewDetailCss.share_sty}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Fontisto
                  name="heart-alt"
                  color={_COLORS.Kodie_MediumGrayColor}
                  size={22}
                  style={ViewDetailCss.share_sty}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={ViewDetailCss.melbourne_Text}>
            {property_Detail.state}
          </Text>
          <View style={ViewDetailCss.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={ViewDetailCss.LocationText}>
              {property_Detail.location}
            </Text>
          </View>
          <Text style={ViewDetailCss.apartment_text}>$850.00</Text>
        </View>
        <DividerIcon />
        <View style={ViewDetailCss.subContainer}>
          <Text style={ViewDetailCss.welcome_Text}>
            {property_Detail.property_description}
          </Text>
        </View>
        <DividerIcon />
        <View style={ViewDetailCss.subContainer}>
          <Text style={[DetailsStyle.propery_det]}>{'Key features'}</Text>
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
          <DividerIcon/>
          {property_Detail?.additional_key_features_id === '[]' ? null : (
            <Text style={[DetailsStyle.propery_det]}>
              {'Additional key features'}
            </Text>
          )}

          <FlatList
            data={additionalKeyFeatures}
            numColumns={numColumns}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </View> */}
          {property_Detail?.additional_key_features_id === '[]' ? null : (
            <DividerIcon
              borderBottomWidth={1}
              color={_COLORS.Kodie_GrayColor}
            />
          )}
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FlatList
              data={Detail}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}
              // numColumns={2}
              keyExtractor={item => item?.id}
              // keyExtractor={(item, index) => index.toString()}
              renderItem={Detail_rander}
            />
            <FlatList
              data={additionalKeyFeatures}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View> */}
        </View>
        <DividerIcon />
        <View style={ViewDetailCss.Container}>
          <Text style={ViewDetailCss.inspections}>{'Inspections'}</Text>
          <CustomSingleButton
            disabled={isLoading ? true : false}
            _ButtonText={'inspection'}
            Text_Color={_COLORS.Kodie_WhiteColor}
          />
        </View>
        <DividerIcon />
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>{'Property details'}</Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>{'Rooms'}</Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>
              {'External features'}
            </Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.Container}>
          <View style={ViewDetailCss.propety_details_view}>
            <Text style={ViewDetailCss.propery_det}>
              {'Points of interest'}
            </Text>

            <TouchableOpacity style={ViewDetailCss.down_Arrow_icon}>
              <AntDesign
                name="down"
                size={15}
                color={_COLORS.Kodie_GrayColor}
              />
            </TouchableOpacity>
          </View>
          <DividerIcon marginTop={5} />
        </View>
        <View style={ViewDetailCss.bottomButtonMainView}>
          <RowButtons
            LeftButtonText={'Submit application'}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            onPressLeftButton={() =>
              props.navigation.navigate('SubmitApplication')
            }
            RightButtonText={'Message owner'}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          />
        </View>
      </ScrollView>
    </View>
  );
};
