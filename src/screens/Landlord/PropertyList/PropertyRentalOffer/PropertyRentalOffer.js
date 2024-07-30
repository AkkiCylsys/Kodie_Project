import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {PropertyRentalOfferStyle} from './PropertyRentalOfferStyle';
import RowButtons from '../../../../components/Molecules/RowButtons/RowButtons';
import {_COLORS, FONTFAMILY, IMAGES, LABEL_STYLES} from '../../../../Themes';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import SearchBar from '../../../../components/Molecules/SearchBar/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getCurrentOffer} from '../../../../services/PropertyRentalOfferApi/PropertyRentalOfferApi';
import {useEffect} from 'react';
import {CommonLoader} from '../../../../components/Molecules/ActiveLoader/ActiveLoader';
import OfferForMyProperties from './OfferForMyProperties/OfferForMyProperties';
const PropertyRentalOffer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(true);
  const [selectedButtonBid, setSelectedButtonBid] = useState(false);
  const [isExpanded, setIsExpanded] = useState([]);
  const [saveCurrentOffer, setSaveCurrentOffer] = useState(false);

  const handleGetCurrectOffer = async () => {
    setIsLoading(true);
    const current_Data = {
      account_id: 724,
      limit: 10,
    };

    try {
      const response = await getCurrentOffer(current_Data);
      console.log('response in currect offer..', response);
      if (response?.success === true) {
        setSaveCurrentOffer(response?.data);
      }
    } catch (error) {
      console.error('Error fetching current offer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrectOffer();
  }, []);

  const currentOffer_render = ({item, index}) => {
    const ExpandedItem = isExpanded.includes(item.property_id);
    const keyFeatures = JSON.parse(item.key_features);
    console.log('keyFeatures..', keyFeatures);
    const parkingSpaceFeature = keyFeatures.find(feature =>
      feature.hasOwnProperty('Parking Space'),
    );
    const parkingSpaceValue = parkingSpaceFeature
      ? parkingSpaceFeature['Parking Space']
      : null;
    return (
      <TouchableOpacity onPress={() => {}}>
        <>
          <View key={index} style={PropertyRentalOfferStyle.flatListContainer}>
            <View style={PropertyRentalOfferStyle.flat_MainView}>
              <View style={PropertyRentalOfferStyle.flexContainer}>
                <Text style={PropertyRentalOfferStyle.apartmentText}>
                  {item?.property_type}
                </Text>
                <Text style={LABEL_STYLES.commontext}>{item?.city}</Text>
                <View style={PropertyRentalOfferStyle.flat_MainView}>
                  <MaterialCommunityIcons
                    name={'map-marker'}
                    size={12}
                    color={_COLORS.Kodie_GreenColor}
                  />
                  <Text style={PropertyRentalOfferStyle.locationText}>
                    {item?.location}
                  </Text>
                </View>
              </View>
              {/* {item.image_path && item.image_path.length > 0 ? (
                <Image
                  source={{uri: item?.image_path[0]}}
                  style={PropertyRentalOfferStyle.imageStyle}
                  resizeMode="cover"
                />
              ) : ( */}
              <View
                style={[
                  PropertyRentalOfferStyle.imageStyle,
                  {justifyContent: 'center'},
                ]}>
                <Text style={PropertyRentalOfferStyle.Img_found}>
                  {'Image not found'}
                </Text>
              </View>
              {/* )} */}

              <View
                style={[
                  PropertyRentalOfferStyle.flexContainer,
                  {alignSelf: 'center'},
                ]}>
                <View style={PropertyRentalOfferStyle.noteStyle}>
                  <TouchableOpacity onPress={() => {}}>
                    <AntDesign
                      name="sharealt"
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <View style={{margin: 3}} />
                  <TouchableOpacity onPress={() => {}}>
                    <AntDesign
                      name="hearto"
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                  <View style={{margin: 3}} />
                  <TouchableOpacity style={{}} onPress={() => {}}>
                    <MaterialCommunityIcons
                      name={'dots-horizontal'}
                      size={25}
                      color={_COLORS.Kodie_LightGrayColor}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[
                    PropertyRentalOfferStyle.buttonView,
                    {
                      backgroundColor:
                        item.bid_status_id == 0
                          ? _COLORS.Kodie_LightOrange
                          : _COLORS.Kodie_mostLightBlueColor,
                    },
                  ]}>
                  <Text
                    style={[
                      PropertyRentalOfferStyle.buttonText,
                      {
                        color:
                          item.bid_status_id == 0
                            ? _COLORS.Kodie_DarkOrange
                            : _COLORS.Kodie_BlueColor,
                      },
                    ]}>
                    {item.bid_status_id == 0 ? 'Pending bid' : 'Bid submitted'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <DividerIcon
              IsShowIcon
              iconName={ExpandedItem ? 'chevron-up' : 'chevron-down'}
              onPress={() => {
                // setIsExpanded(!isExpanded);

                if (ExpandedItem) {
                  setIsExpanded(
                    isExpanded.filter(
                      property_id => property_id !== item.property_id,
                    ),
                  );
                } else {
                  setIsExpanded([...isExpanded, item.property_id]);
                }
              }}
            />
            {ExpandedItem && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={PropertyRentalOfferStyle.bedCountView}>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <Ionicons
                      color={_COLORS.Kodie_GreenColor}
                      name="bed-outline"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {
                        keyFeatures.find(obj => obj.hasOwnProperty('Bedrooms'))
                          ?.Bedrooms
                      }
                    </Text>
                  </View>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <MaterialCommunityIcons
                      color={_COLORS.Kodie_GreenColor}
                      name="shower-head"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {
                        keyFeatures.find(obj => obj.hasOwnProperty('Bathrooms'))
                          ?.Bathrooms
                      }
                    </Text>
                  </View>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <Ionicons
                      color={_COLORS.Kodie_GreenColor}
                      name="car"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {' '}
                      {parkingSpaceValue}
                    </Text>
                  </View>
                  <View style={PropertyRentalOfferStyle.locationView}>
                    <MaterialCommunityIcons
                      color={_COLORS.Kodie_GreenColor}
                      name="floor-plan"
                      size={20}
                      style={PropertyRentalOfferStyle.bedIconView}
                    />
                    <Text style={PropertyRentalOfferStyle.bedcont}>
                      {
                        keyFeatures.find(obj => obj.hasOwnProperty('Garages'))
                          ?.Garages
                      }
                    </Text>
                  </View>
                </View>
                <View style={{alignSelf: 'flex-end', marginLeft: 10}}>
                  <Text style={PropertyRentalOfferStyle.listpriceText}>
                    {'Listed price'}
                  </Text>
                  <Text style={PropertyRentalOfferStyle.listprice}>
                    {`$${item?.offer_amount}`}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={PropertyRentalOfferStyle.rowButtonView}>
            <RowButtons
              LeftButtonText={'Withdraw bid'}
              leftButtonbackgroundColor={
                !selectedButtonBid
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_WhiteColor
              }
              LeftButtonTextColor={
                !selectedButtonBid
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_BlackColor
              }
              LeftButtonborderColor={
                !selectedButtonBid
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressLeftButton={() => {
                setSelectedButtonBid(false);
              }}
              RightButtonText={'Edit offer'}
              RightButtonbackgroundColor={
                selectedButtonBid
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_WhiteColor
              }
              RightButtonTextColor={
                selectedButtonBid
                  ? _COLORS.Kodie_WhiteColor
                  : _COLORS.Kodie_BlackColor
              }
              RightButtonborderColor={
                selectedButtonBid
                  ? _COLORS.Kodie_BlackColor
                  : _COLORS.Kodie_BlackColor
              }
              onPressRightButton={() => {
                setSelectedButtonBid(true);
              }}
            />
          </View>
          <DividerIcon />
        </>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={PropertyRentalOfferStyle.mainContainer}>
      <ScrollView>
        <View style={PropertyRentalOfferStyle.rowButtonView}>
          <RowButtons
            LeftButtonText={'Offers for my properties'}
            leftButtonbackgroundColor={
              !selectedButton
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            LeftButtonTextColor={
              !selectedButton
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            LeftButtonborderColor={
              !selectedButton
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressLeftButton={() => {
              setSelectedButton(false);
              // alert(selectedButton)
            }}
            RightButtonText={'My current offers'}
            RightButtonbackgroundColor={
              selectedButton
                ? _COLORS.Kodie_lightGreenColor
                : _COLORS.Kodie_WhiteColor
            }
            RightButtonTextColor={
              selectedButton
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            RightButtonborderColor={
              selectedButton
                ? _COLORS.Kodie_GrayColor
                : _COLORS.Kodie_LightWhiteColor
            }
            onPressRightButton={() => {
              setSelectedButton(true);
            }}
          />
        </View>
        <DividerIcon borderBottomWidth={5} />
        <SearchBar
          filterImage={IMAGES.filter}
          frontSearchIcon
          Filter
          filter={'filter'}
          marginTop={3}
          textvalue={'Search offers'}
          //   searchData={searchPropertyList}
          //   textvalue={searchQuery}
        />
        <DividerIcon />
        <View style={PropertyRentalOfferStyle.subContainer}>
          {!selectedButton ? null : (
            <View
              style={[
                PropertyRentalOfferStyle.flat_MainView,
                {alignSelf: 'center', marginBottom: 10},
              ]}>
              <TouchableOpacity style={PropertyRentalOfferStyle.bidsButton}>
                <Text style={PropertyRentalOfferStyle.bidsButtonText}>
                  Accepting bids
                </Text>
              </TouchableOpacity>
              <Text style={PropertyRentalOfferStyle.biddingText}>
                Bidding closes in:
              </Text>
              <View style={PropertyRentalOfferStyle.daysViewStl}>
                <Text style={PropertyRentalOfferStyle.biddingText}>
                  {'o days'}
                </Text>
              </View>
              <View style={PropertyRentalOfferStyle.daysViewStl}>
                <Text style={PropertyRentalOfferStyle.biddingText}>
                  {'6 hrs'}
                </Text>
              </View>
              <View style={PropertyRentalOfferStyle.daysViewStl}>
                <Text style={PropertyRentalOfferStyle.biddingText}>
                  {'10 mins'}
                </Text>
              </View>
            </View>
          )}

          {selectedButton ? (
            <FlatList
              data={saveCurrentOffer}
              keyExtractor={item => item.property_id.toString()}
              renderItem={currentOffer_render}
            />
          ) : (
            <OfferForMyProperties/>
          )}
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default PropertyRentalOffer;
