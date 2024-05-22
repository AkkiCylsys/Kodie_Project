import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,

} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';
import DividerIcon from '../../Atoms/Devider/DividerIcon';
import BottomModalData from '../BottomModal/BottomModalData';
import {PropertyListingCss} from './PropertyListingCss';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_COLORS, IMAGES, BANNERS} from '../../../Themes';
import AddBiddingDetails from '../AddBiddingDetails/AddBiddingDetails';
import InviteTenant from '../InviteTenant/InviteTenant';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import VacantModal from '../VacantModal/VacantModal';
import {Config} from '../../../Config';
import {CommonLoader} from '../ActiveLoader/ActiveLoader';
import axios from 'axios';
import InviteTenantModal from '../InviteTenantModal/InviteTenantModal';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const PropertyListing = (props) => {
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
 const isvisible = useIsFocused()
 const navigation=useNavigation()
  const Closemodal = () => {
    refRBSheet3.current.close();
  };
  const [expandedItems, setExpandedItems] = useState([]);
  const [Vacant_data, setVacantData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [propId, setPropId] = useState(0);
  const [isDeleteData_Clicked, setIsDeleteData_Clicked] = useState(false);
  const [isDeleteBottomSheetVisible, setIsDeleteBottomSheetVisible] =
  useState(false);
  const [propertyDelId, setPropertyDelId] = useState();
  const [Address, setAddress] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
const filteredUsers= props?.filteredUsers;
const searchQuery= props?.searchQuery;
const allData= props?.allData;
console.log(allData);
  const totalPages = Math.ceil(Vacant_data.length / itemsPerPage);

  // Slice data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = Vacant_data.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadMoreData = () => {
    if (!loading && currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1000); // Simulating a delay, replace with your actual data fetching logic
    }
  };


 
  const handleCloseModal = () => {
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
  };
  const CloseUp = () => {
    setIsDeleteBottomSheetVisible(false);
    setIsDeleteData_Clicked(false);
  };
  // Get Api Bind here...
  const get_Vacant_Details = async () => {
    try {
        const url = Config.BASE_URL;
        const Vacant_Details_url = url + '/get_vacant_property_list';
        setIsLoading(true);
        console.log('Request URL:', Vacant_Details_url);

        const response = await axios.get(Vacant_Details_url);

        console.log('API Response Vacant_Details_url:', response?.data);
        
        if (response?.data?.success === true) {
            setVacantData(response?.data?.property_details);
            props?.onVacantDataFetch(response?.data?.property_details);
        } else {
            alert(response?.data?.message);
        }
    } catch (error) {
        console.error('API failed Vacant_Details', error);
        alert('An error occurred while fetching vacant details');
    } finally {
        setIsLoading(false);
    }
};

  const propertyDelete = async () => {
    setIsDeleteData_Clicked(true);
  };
  const FinalDeleteProperty = async () => {
    setIsLoading(true);
    setIsDeleteData_Clicked(false);
    setIsDeleteBottomSheetVisible(false);
    try {
      const url = Config.BASE_URL;
      const response = await axios.delete(url + 'delete_property_by_id', {
        data: JSON.stringify({property_id: propertyDelId}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response:', response?.data);
      if (response?.data?.success === true) {
        Alert.alert(
          'Property Deleted',
          response?.data?.message || 'The property was deleted successfully.',
        );
        get_Vacant_Details();

        setIsLoading(false);
      }
    } catch (error) {
      console.error('API Error DeleteProperty:', error);
      Alert.alert('Worning', error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if(isvisible){
    get_Vacant_Details();
    }
  }, [isvisible]);
  const propertyData1_render = ({item}) => {
    const isExpanded = expandedItems.includes(item.property_id);
    setPropId(item.property_id);
    return (
      <>
      {item.result ? null : (
    
        <View style={PropertyListingCss.flatListContainer} key={item.property_id}>
          <View style={PropertyListingCss.flat_MainView}>
            <View style={PropertyListingCss.flexContainer}>
              <Text style={PropertyListingCss.apartmentText}>
                {item.property_type}
              </Text>
              <Text style={PropertyListingCss.commontext}>{item.state ? item.state : item.city}</Text>
              <View style={PropertyListingCss.flat_MainView}>
                <MaterialCommunityIcons
                  name={'map-marker'}
                  size={12}
                  color={_COLORS.Kodie_GreenColor}
                />
                <Text style={PropertyListingCss.locationText}>
                  {item.location}
                </Text>
              </View>
            </View>
            {item.image_path && item.image_path.length > 0 ? (
              <Image
                source={{uri: item?.image_path[0]}}
                style={PropertyListingCss.imageStyle}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  PropertyListingCss.imageStyle,
                  {justifyContent: 'center'},
                ]}>
                <Text style={PropertyListingCss.Img_found}>
                  {'Image not found'}
                </Text>
              </View>
            )}

            <View style={PropertyListingCss.flexContainer}>
              <View style={PropertyListingCss.noteStyle}>
                <TouchableOpacity  
                onPress={() => {navigation?.navigate('PropertyDetails', {
                  propertyid: item.property_id,
                  editMode: 'editMode',
                });
              }}
                        >
                  <SimpleLineIcons
                    name="note"
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteBottomSheetVisible(true);
                    setPropertyDelId(item.property_id);
                    // alert(propertyDelId);
                    setAddress(item?.location);
                    setPropId(item?.property_id);
                  
                    console.log('property id..', item.property_id);
                  }}>
                  <MaterialCommunityIcons
                    name={'dots-horizontal'}
                    size={25}
                    color={_COLORS.Kodie_LightGrayColor}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  PropertyListingCss.buttonView,
                  {
                    backgroundColor: item.isRentPanding
                      ? _COLORS.Kodie_LightOrange
                      : item.isRentReceived
                      ? _COLORS.Kodie_mostLightGreenColor
                      : _COLORS.Kodie_LightGrayColor,
                  },
                ]}
                onPress={() => {
                  refRBSheet3.current.open();
                }}>
                <Text
                  style={[
                    PropertyListingCss.buttonText,
                    {
                      color: item.isRentPanding
                        ? _COLORS.Kodie_DarkOrange
                        : item.isRentReceived
                        ? _COLORS.Kodie_GreenColor
                        : _COLORS.Kodie_MediumGrayColor,
                    },
                  ]}
                  onPress={() => {
                    refRBSheet3.current.open();
                  }}>
                  {'+ invite Tenant'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <DividerIcon
            IsShowIcon
            iconName={isExpanded ? 'chevron-up' : 'chevron-down'}
            onPress={() => {
              if (isExpanded) {
                setExpandedItems(expandedItems.filter(property_id => property_id !== item.property_id));
              } else {
                setExpandedItems([...expandedItems, item.property_id]);
              }
            }}
          />
        </View>
        )}
        {isExpanded && (
          <View style={PropertyListingCss.expandedContent}>
            <View style={PropertyListingCss.flexContainer}>
              <Text style={PropertyListingCss.commonMidtext}>
                Number of days listed:
              </Text>
              <Text style={PropertyListingCss.commonDay}>{'0'}</Text>
            </View>

            <View style={[PropertyListingCss.rentView]}>
              <Text style={PropertyListingCss.commonMidtext}>
                Listed price:
              </Text>

              <View style={PropertyListingCss.commonRentview}>
                <Text style={PropertyListingCss.commonRent}>{'0'}</Text>
              </View>
            </View>
          </View>
        )}
        <DividerIcon />
      

     
        <RBSheet
          ref={refRBSheet2}
          height={760}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListingCss.bottomModal_container,
          }}>
          <AddBiddingDetails />
        </RBSheet>

        <RBSheet
          ref={refRBSheet3}
          height={230}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            draggableIcon: {
              backgroundColor: _COLORS.Kodie_LightGrayColor,
            },
            container: PropertyListingCss.bottomModal_container,
          }}>
          <InviteTenantModal  onClose={Closemodal}/>
        </RBSheet>
        <Modal
        isVisible={isDeleteBottomSheetVisible}
        onBackdropPress={() => setIsDeleteBottomSheetVisible(true)}
        style={[
          PropertyListingCss.bottomModal_container,
          {
            position: 'absolute',
            left: -20,
            bottom: -10,
            width: '100%',
            height: isDeleteData_Clicked ? '30%' : '35%',
            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 8,
          },
        ]}>
        <VacantModal
          propertyId={propId}
          onDelete={propertyDelete}
          onCloseModal={handleCloseModal}
          isDeletePropertyClicked={isDeleteData_Clicked}
          onDeleteData={FinalDeleteProperty}
          Address={Address}
          onClose={CloseUp}
        />
      </Modal>
    
      </>
    );
  };
  return (
  
        <SafeAreaView>
      <FlatList data={searchQuery?filteredUsers:allData} renderItem={propertyData1_render}  keyExtractor={(item) => item.property_id}/>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>

  );
};

export default PropertyListing;
