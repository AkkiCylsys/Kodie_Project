import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import {_goBack} from './../../../services/CommonServices/index';
import {BANNERS, _COLORS} from '../../../Themes';
import {PropertyInspectionCSS} from './PropertyInspectionCss';
import ReviewInspection from './ReviewInspection/ReviewInspection';
import Entypo from 'react-native-vector-icons/Entypo';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import Inspection from './Inspection/Inspection';
import Schedule from './Schedule/Schedule';
import {Config} from '../../../Config';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import axiosInstance from '../../../services/axiosInstance';
import {useFocusEffect} from '@react-navigation/native';
const images = [
  BANNERS.Apartment,
  BANNERS.BannerFirst,
  BANNERS.BannerSecond,
  BANNERS.previewImage,
];
const PropertyInspection = props => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const [property_Detail, setProperty_Details] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [isCancel, setIsCancel] = useState('');

  const TIM_KEY = props?.route?.params?.TIM_KEY;
  const PropertyId = props?.route?.params?.PropertyId;
  const account_id = props?.route?.params?.account_id;
  console.log('TIM_KEY ins', TIM_KEY);
  console.log('PropertyId ins', PropertyId);
  useEffect(() => {
    fetchPropertyData();
  }, []);
  const refRBSheet = useRef();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        props.navigation.navigate('NewInspection');
        return true; // Indicating that the back action is handled
      };

      // Adding the event listener for hardware back press
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup the event listener when component unmounts
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [props.navigation]), // Added props.navigation as a dependency
  );

  const fetchPropertyData = async () => {
    try {
      // Fetch property details
      const detailData = {
        property_id: PropertyId,
      };
      // alert(JSON.stringify(detailData))
      const url = Config.BASE_URL;
      const property_Detailss = 'get_property_details';

      console.log('url..', property_Detailss);
      setIsLoading(true);
      const response = await axiosInstance.post(property_Detailss, detailData);
      setIsLoading(false);
      console.log('response_get_property_details...', response?.data);
      if (response?.data?.success === true) {
        setProperty_Details(response?.data?.property_details[0]);
      } else {
        console.error('propertyDetail_error:', response?.data?.error);
        // alert('Oops something went wrong! Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      // alert(error);
      setIsLoading(false);
    }
  };
  const CancleInspectionData = async () => {
    try {
      const detailData = {
        TIM_KEY: TIM_KEY,
      };
      const url = Config.BASE_URL;
      const Cancel_Inspection = 'inspection_details/cancel';

      console.log('url..', Cancel_Inspection);
      setIsLoading(true);
      const response = await axiosInstance.put(Cancel_Inspection, detailData);
      setIsLoading(false);
      console.log('response_Cancel_Inspection..', response?.data);
      if (response?.data?.success === true) {
        console.log(response?.data?.message);
        setIsCancel(response?.data?.newStatus);
        alert(response?.data?.message);
      } else {
        console.error(
          'response_Cancel_Inspection_error:',
          response?.data?.error,
        );
        // alert('Oops something went wrong! Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      // alert(error);
      setIsLoading(false);
    }
  };
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <Schedule
            TIM_KEY={TIM_KEY}
            account_id={account_id}
            newStatus={isCancel}
            rescheduleInspection={() =>
              props.navigation.navigate('CreateNewInspection', {
                TIM_KEY: TIM_KEY,
                InspectionView: 'InspectionView',
              })
            }
            CancelInspection={CancleInspectionData}
          />
        );
      case 'Tab2':
        return <Inspection TIM_KEY={TIM_KEY} PropertyId={PropertyId} />;
      case 'Tab3':
        return (
          <ReviewInspection
            ViewApplication={() => props.navigation.navigate('ViewApplication')}
            TIM_KEY={TIM_KEY}
            PropertyId={PropertyId}
          />
        );

      default:
        return <Schedule />;
    }
  };

  return (
    <SafeAreaView style={PropertyInspectionCSS.MainContainer}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate('NewInspection')}
        MiddleText={property_Detail?.location || ''}
      />
      {/* <View style={PropertyInspectionCSS.slider_view}> */}
      {property_Detail.image_path && property_Detail.image_path.length != 0 ? (
        <SliderBox
          images={property_Detail.image_path}
          sliderBoxHeight={200}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          inactiveDotColor={_COLORS.Kodie_GrayColor}
          dotColor={_COLORS.Kodie_GreenColor}
          // autoplay
          // circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          dotStyle={PropertyInspectionCSS.dotStyle}
          ImageComponentStyle={{
            // flex: 1,
            resizeMode: 'cover',
          }}
        />
      ) : null}
      {/* </View> */}
      <View style={{flex: 1, marginTop: 20}}>
        <View style={PropertyInspectionCSS.Container}>
          <Text style={PropertyInspectionCSS.apartment_text}>
            {property_Detail?.property_type}
          </Text>

          <Text style={PropertyInspectionCSS.melbourne_Text}>
            {property_Detail?.state || property_Detail?.city || ''}
          </Text>
          <View style={PropertyInspectionCSS.locationView}>
            <Entypo
              name="location-pin"
              size={20}
              color={_COLORS.Kodie_GreenColor}
            />
            <Text style={PropertyInspectionCSS.LocationText}>
              {property_Detail?.location || ''}
            </Text>
          </View>
        </View>
        <DividerIcon marginBottom={1} />
        <CustomTabNavigator
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          TAB3
          Tab1={'Schedule'}
          Tab2={'Inspection'}
          Tab3={'Review'}
          onPressTab1={() => setActiveTab('Tab1')}
          onPressTab2={() => setActiveTab('Tab2')}
          onPressTab3={() => setActiveTab('Tab3')}
          colorTab1={
            activeTab === 'Tab1'
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          colorTab2={
            activeTab === 'Tab2'
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          colorTab3={
            activeTab === 'Tab3'
              ? _COLORS.Kodie_BlackColor
              : _COLORS.Kodie_MediumGrayColor
          }
          styleTab1={activeTab === 'Tab1' && PropertyInspectionCSS.activeTab}
          styleTab2={activeTab === 'Tab2' && PropertyInspectionCSS.activeTab}
          styleTab3={activeTab === 'Tab3' && PropertyInspectionCSS.activeTab}
        />
        <View style={PropertyInspectionCSS.Line} />
        {checkTabs()}
      </View>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default PropertyInspection;
