import React, {useState, useRef} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from './../../../../services/CommonServices/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomModalData from '../../../../components/Molecules/BottomModal/BottomModalData';
import {SliderBox} from 'react-native-image-slider-box';
import styles from 'rn-range-slider/styles';

const property_List2 = [
  {
    id: '1',
    propertyName: 'Apartment',
    name: 'Melbourne',
    location: '8502 Preston Rd. Inglewood',
    image: BANNERS.apartment,
    buttonName: 'AVAILABLE: 1 OCT',
    tanentname: 'Jason Stathom',
    rent: '$870.00',
    badroom: '3',
    bathroom: '2',
    parking: '1',
    day: '0 days',
    hours: '6 hrs',
    mint: '10 mins',
    aspact_ratio: '86m2',
    availableDate: true,
    availablenow: false,
  },
  {
    id: '2',
    propertyName: 'Apartment',
    name: 'Melbourne',
    location: '8502 Preston Rd. Inglewood',
    image: BANNERS.apartment,
    buttonName: 'AVAILABLE: NOW',
    tanentname: 'Jason Stathom',
    rent: '$660.00',
    badroom: '3',
    bathroom: '2',
    parking: '1',
    day: '4 days',
    hours: '6 hrs',
    mint: '10 mins',
    aspact_ratio: '86m2',
    availableDate: false,
    availablenow: true,
  },
  {
    id: '3',
    propertyName: 'Apartment',
    name: 'Melbourne',
    location: '8502 Preston Rd. Inglewood',
    image: BANNERS.apartment,
    buttonName: 'AVAILABLE: NOW',
    tanentname: 'Jason Stathom',
    rent: '$850.00',
    badroom: '3',
    bathroom: '2',
    parking: '1',
    day: '4 days',
    hours: '20 hrs',
    mint: '5 mins',
    aspact_ratio: '86m2',
    availableDate: false,
    availablenow: true,
  },
];

export default SearchResult = props => {
  const [expandedItems, setExpandedItems] = useState([]);
  const refRBSheet = useRef();

  const images = [
    BANNERS.wallImage,
    BANNERS.BannerFirst,
    BANNERS.BannerSecond,
    BANNERS.previewImage,
  ];
  const propertyData2_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.id);
    return (
      <>
        <View style={SearchResultCss.flatListContainer}>
          <View style={[SearchResultCss.flat_MainView, {marginBottom: 10}]}>
            <TouchableOpacity style={SearchResultCss.bidsButton}>
              <Text style={SearchResultCss.bidsButtonText}>Accepting bids</Text>
            </TouchableOpacity>
            <Text style={SearchResultCss.biddingText}>Bidding closes in:</Text>
            <View style={SearchResultCss.daysViewStl}>
              <Text style={SearchResultCss.biddingText}>{item.day}</Text>
            </View>
            <View style={SearchResultCss.daysViewStl}>
              <Text style={SearchResultCss.biddingText}>{item.hours}</Text>
            </View>
            <View style={SearchResultCss.daysViewStl}>
              <Text style={SearchResultCss.biddingText}>{item.mint}</Text>
            </View>
          </View>
          <View style={SearchResultCss.flat_MainView}>
            <View style={SearchResultCss.flexContainer}>
              <Text style={SearchResultCss.apartmentText}>
                {item.propertyName}
              </Text>
              <Text style={LABEL_STYLES.commontext}>{item.name}</Text>
              <View style={SearchResultCss.flat_MainView}>
                <MaterialCommunityIcons
                  name={'map-marker'}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={SearchResultCss.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            <Image source={item.image} style={SearchResultCss.imageStyle} />
            <View style={SearchResultCss.flexContainer}>
              <View style={SearchResultCss.noteStyle}>
                <TouchableOpacity>
                  <Entypo
                    name="share"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={22}
                    style={SearchResultCss.share_sty}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Fontisto
                    name="heart-alt"
                    color={_COLORS.Kodie_MediumGrayColor}
                    size={22}
                    style={SearchResultCss.share_sty}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    refRBSheet.current.open();
                  }}>
                  <MaterialCommunityIcons
                    name={'dots-horizontal'}
                    size={22}
                    color={_COLORS.Kodie_MediumGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  SearchResultCss.buttonView,
                  {
                    backgroundColor: item.availableDate
                      ? _COLORS.Kodie_LightOrange
                      : item.availablenow
                      ? _COLORS.Kodie_mostLightGreenColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}>
                <Text
                  style={[
                    SearchResultCss.buttonText,
                    {
                      color: item.availableDate
                        ? _COLORS.Kodie_DarkOrange
                        : item.availablenow
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}>
                  {item.buttonName}
                </Text>
              </View>
            </View>
          </View>
          <DividerIcon
            IsShowIcon
            iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
            onPress={() => {
              if (isExpanded) {
                setExpandedItems(expandedItems.filter(id => id !== item.id));
              } else {
                setExpandedItems([...expandedItems, item.id]);
              }
            }}
          />
        </View>
        {isExpanded && (
          <View style={SearchResultCss.expandedContent}>
            <View style={SearchResultCss.leftIconsView}>
              <Image
                source={IMAGES.BedroomIcon}
                style={SearchResultCss.ImagesStyle}
              />
              <Text style={SearchResultCss.bedroomStl}>{item.badroom}</Text>
              <Image
                source={IMAGES.Bathroom}
                style={SearchResultCss.ImagesStyle}
              />
              <Text style={SearchResultCss.bedroomStl}>{item.bathroom}</Text>
              <Image
                source={IMAGES.Parking}
                style={SearchResultCss.ImagesStyle}
              />
              <Text style={SearchResultCss.bedroomStl}>{item.parking}</Text>
              <Image
                source={IMAGES.AspactRatio}
                style={SearchResultCss.ImagesStyle}
              />
              <Text style={SearchResultCss.bedroomStl}>
                {item.aspact_ratio}
              </Text>
            </View>
            <View style={[SearchResultCss.weeklyRent]}>
              <Text style={LABEL_STYLES.commonMidtext}>Listed Price</Text>
              <Text style={LABEL_STYLES.commontext}>{item.rent}</Text>
            </View>
          </View>
        )}
        <DividerIcon />
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
          <BottomModalData
            onPress={() => props.navigation.navigate('ViewPropertyDetails')}
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
            <Text style={SearchResultCss.LeftText}>Melbourne</Text>
            <Text style={SearchResultCss.LeftTextRentText}>
              Apartment; $300 to $1000; 3 Beds; 2 Baths; Garden; Pool ...
            </Text>
          </View>
          <View style={SearchResultCss.payButtonMainView}>
            <TouchableOpacity style={SearchResultCss.payButtonView}>
              <Image source={IMAGES.filter} />
            </TouchableOpacity>
          </View>
        </View>
        <DividerIcon
          borderBottomWidth={4}
          color={_COLORS.Kodie_LiteWhiteColor}
        />

        {/* <FlatList data={property_List2} renderItem={propertyData2_render} /> */}
        <View style={[SearchResultCss.flat_MainView, {marginBottom: 10}]}>
          <TouchableOpacity style={SearchResultCss.bidsButton}>
            <Text style={SearchResultCss.bidsButtonText}>Accepting bids</Text>
          </TouchableOpacity>
          <Text style={SearchResultCss.biddingText}>Bidding closes in:</Text>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{"'4 days'"}</Text>
          </View>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'20 hrs'}</Text>
          </View>
          <View style={SearchResultCss.daysViewStl}>
            <Text style={SearchResultCss.biddingText}>{'5 m'}</Text>
          </View>
        </View>
        <SliderBox
          // images={editMode ? updateAllImage : allImagePaths}
          images={images}
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
          dotStyle={SearchResultCss.dotStyle}
          ImageComponentStyle={{
            flex: 1,
            resizeMode: 'cover',
            // borderRadius: 15,
            // width: '90%',
          }}
        />
        <View style={SearchResultCss.apartmentmainView}>
          <View>
            <Text style={SearchResultCss.propertyHeading}>{'Apartment'}</Text>
            <Text style={[SearchResultCss.propertyHeading, {marginTop: 5}]}>
              {'$870.00/wk'}
            </Text>
          </View>
          <View style={SearchResultCss.shareIcon}>
            <TouchableOpacity>
              <Entypo color={_COLORS.Kodie_BlackColor} name="share" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign
                color={_COLORS.Kodie_BlackColor}
                name="hearto"
                size={25}
                style={{marginHorizontal: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                color={_COLORS.Kodie_BlackColor}
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
          <Text style={SearchResultCss.location}>
            {'5 Aspen Villas, Maroubra, NSW'}
          </Text>
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
            <Text style={SearchResultCss.bedcont}>{'5'}</Text>
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
            <EvilIcons
              color={_COLORS.Kodie_GreenColor}
              name="image"
              size={20}
              style={SearchResultCss.bedIconView}
            />
            <Text style={SearchResultCss.bedcont}>{'86m2'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
