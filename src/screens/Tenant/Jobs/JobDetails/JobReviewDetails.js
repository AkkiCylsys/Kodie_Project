// screen number 136,137,138

import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {JobDetailsStyle} from './JobDetailsStyle';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../services/CommonServices';
import {SliderBox} from 'react-native-image-slider-box';
import {BANNERS, _COLORS, IMAGES, FONTFAMILY} from '../../../../Themes';
import CustomTabNavigator from '../../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import {Dropdown} from 'react-native-element-dropdown';
import CustomSingleButton from '../../../../components/Atoms/CustomButton/CustomSingleButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import UploadImageData from '../../../../components/Molecules/UploadImage/UploadImage';
import Entypo from 'react-native-vector-icons/Entypo';
import StepIndicator from 'react-native-step-indicator';
import BiddingDetails from './BiddingDetails/Biddingdetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddJobDetails from '../AddJobDetails';
import Reviewjobdetails1 from '../../../CreateJob/ReviewJobDetails/Reviewjobdetails1';
import JodBiddingDetails from '../../../CreateJob/ReviewJobDetails/JobBiddingDetails/JodBiddingDetails';
import JobDocuments from '../JobDocuments.js/JobDocuments';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
const stepLabels = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const images = [
  BANNERS.previewImage,
  BANNERS.Apartment,
  BANNERS.BannerSecond,
  BANNERS.BannerFirst,
];
const Apartment_data = [
  {label: 'House', value: '1'},
  {label: 'Cottage', value: '2'},
  {label: 'Apartment / Flat', value: '3'},
  {label: 'Townhouse', value: '4'},
  {label: 'ApLand / Vacant Plot', value: '5'},
  {label: 'Farm', value: '6'},
];
const JobReviewDetails = props => {
  // const dispatch = useDispatch();
  let job_id = props?.route?.params?.job_id;
  let JOB_ID = props?.route?.params?.JOB_ID;
  let jobDocTab = props?.route?.params?.jobDocTab;
  console.log('JOB_ID......', JOB_ID);
  console.log('job_id......', job_id);
  let update_JOB_ID = props?.route?.params?.JobId;
  let View_Job_Details = props?.route?.params?.View_Job_Details;
  let editMode = props?.route?.params?.editMode;
  const SearchJobId = props.route.params.SearchJobId;
  const searchView = props.route.params.searchView;
  console.log('SearchJobId...', SearchJobId, searchView);
  const [activeTab, setActiveTab] = useState('Tab1');
  const [currentPage, setCurrentPage] = useState(3);
  const [visible, setVisible] = useState(false);
  const [imageFileData, setImageFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myJobType, setMyJobType] = useState(0);
  const handleJobDetailsSuccess = jobTypeMy => {
    console.log('jobTypeMy in JobDetails component:', jobTypeMy);
    setMyJobType(jobTypeMy);
    console.log('myJobType key....', myJobType);
  };

  useEffect(() => {
    setActiveTab(jobDocTab ? 'Tab4' : 'Tab1');
  }, []);
  const handleImageFilePath = async imagesFilePath => {
    setImageFileData(imagesFilePath);
    // console.log("imagesFilePath....sdfs.", imagesFilePath);
    console.log('imagesFilePath....sdfs.', imagesFilePath);
    console.log('images__imageFileData...', imageFileData);
    // alert(JSON.stringify(imagesFilePath.length))
    console.log('length', imagesFilePath.length);
  };

  const getStepIndicatorIconConfig = ({position, stepStatus}) => {
    const iconConfig = {
      name: 'feed',
      // name: stepStatus === "finished" ? "check" : (position + 1).toString(),
      color: stepStatus === 'finished' ? '#ffffff' : '#fe7013',
      size: 20,
    };

    switch (position) {
      case 0: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 1: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 2: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }
      case 3: {
        iconConfig.name = stepStatus === 'finished' ? 'check' : null;
        break;
      }

      default: {
        break;
      }
    }
    return iconConfig;
  };
  const firstIndicatorSignUpStepStyle = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    separatorFinishedColor: _COLORS.Kodie_GrayColor,
    separatorUnFinishedColor: _COLORS.Kodie_LightOrange,
    stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
    stepIndicatorUnFinishedColor: _COLORS.Kodie_GrayColor,
    stepIndicatorCurrentColor: _COLORS.Kodie_WhiteColor,
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelFinishedColor: _COLORS.Kodie_BlackColor,
    stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
    labelColor: _COLORS.Kodie_BlackColor,
    labelSize: 14,
    labelAlign: 'center',
  };
  const renderStepIndicator = params => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );
  const renderLabel = ({position, stepStatus}) => {
    // const iconColor = stepStatus === "finished" ? "#000000" : "#808080";
    const iconColor =
      position === currentPage // Check if it's the current step
        ? _COLORS.Kodie_BlackColor // Set the color for the current step
        : stepStatus === 'finished'
        ? '#000000'
        : '#808080';
    const iconName =
      position === 0
        ? 'Details'
        : position === 1
        ? 'Terms'
        : position === 2
        ? 'Images'
        : position === 3
        ? 'Review'
        : 'null';

    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 1,
            marginHorizontal: 10,
            color: iconColor,
            alignSelf: 'center',
          }}>{`Step ${position + 1}`}</Text>
        <Text
          style={{
            fontSize: 14,
            marginTop: 5,
            marginHorizontal: 10,
            color: iconColor,
          }}>
          {iconName}
        </Text>
      </View>
    );
  };
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <Reviewjobdetails1
            SearchJobId={SearchJobId}
            searchView={searchView}
            job_id={job_id}
            JobId={JOB_ID}
            update_JOB_ID={update_JOB_ID}
            editMode={editMode}
            View_Job_Details={View_Job_Details}
            imagesFilePath={handleImageFilePath}
            onPress={() => {
              props.navigation.pop(4);
              props.navigation.navigate('Jobs', {
                myJob_Type: myJobType,
              });
            }}
            onJobDetailsSuccess={handleJobDetailsSuccess}
            BidonPress={() => {
              props.navigation.navigate('BidforJob', {
                SearchJobId: SearchJobId,
              });
            }}
          />
        );
      case 'Tab2':
        // return <JodBiddingDetails JOB_ID={JOB_ID} />;
        return (
          <>
            {Alert.alert('Bids', 'Coming soon', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  setActiveTab('Tab1');
                },
              },
            ])}
          </>
        );
      case 'Tab3':
        return (
          <>
            {Alert.alert('Milestones', 'Coming soon', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  setActiveTab('Tab1');
                },
              },
            ])}
          </>
        );
      case 'Tab4':
        return (
          <>
            <JobDocuments
              JobDocumentDetails={(folderId, moduleName, propertyid) => {
                props.navigation.navigate('JobDocumentDetails', {
                  folderId: folderId,
                  moduleName: moduleName,
                  JOB_ID: JOB_ID,
                });
              }}
              JOB_ID={JOB_ID}
            />
          </>
        );
    }
  };
  const refRBSheet = useRef();
  const toggleView = () => {
    setVisible(!visible);
  };
  return (
    <SafeAreaView style={JobDetailsStyle.container}>
      <TopHeader
        // isprofileImage
        // IsNotification
        onPressLeftButton={() =>
          View_Job_Details
            ? props.navigation.navigate('DrawerNavigatorLeftMenu', {
                myJob_Type: myJobType,
              })
            : _goBack(props)
        }
        MiddleText={'Review job details'}
      />
      {View_Job_Details || searchView ? null : (
        <View style={{marginVertical: 10}}>
          <StepIndicator
            customSignUpStepStyle={firstIndicatorSignUpStepStyle}
            currentPosition={3}
            // onPress={onStepPress}
            renderStepIndicator={renderStepIndicator}
            labels={stepLabels}
            stepCount={4}
            renderLabel={renderLabel}
          />
        </View>
      )}
      <ScrollView>
        <ImageBackground>
          {imageFileData.image_file_path &&
          imageFileData.image_file_path.length != 0 ? (
            <View style={JobDetailsStyle.slider_view}>
              <SliderBox
                images={imageFileData?.image_file_path.filter(url =>
                  url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')
                )}
                sliderBoxHeight={200}
                onCurrentImagePressed={index =>
                  console.log(`image ${index} pressed`)
                }
                inactiveDotColor={_COLORS.Kodie_GrayColor}
                dotColor={_COLORS.Kodie_GreenColor}
                // autoplay
                // circleLoop
                resizeMethod={'resize'}
                resizeMode={'cover'}
                dotStyle={JobDetailsStyle.dotStyle}
                ImageComponentStyle={{
                  flex: 1,
                  resizeMode: 'cover',
                }}
              />
            </View>
          ) : null}
          {/* {imageFileData.image_file_path &&
          imageFileData.image_file_path != 0 ? (
            <View style={JobDetailsStyle.bidsview}>
              <Text style={JobDetailsStyle.bidstext}>Accepting bids</Text>
            </View>
          ) : null} */}
        </ImageBackground>
        <View style={JobDetailsStyle.headingview}>
          <Text style={JobDetailsStyle.fixingtext}>
            {imageFileData.job_type}
          </Text>
          <Text style={JobDetailsStyle.electricaltext}>
            {imageFileData.service_looking}
          </Text>
        </View>

        <View
          style={{
            borderBottomWidth: 3,
            borderBottomColor: _COLORS.Kodie_LiteWhiteColor,
            borderColor: _COLORS.Kodie_GrayColor,
            elevation: 4,
            shadowColor: _COLORS.Kodie_GrayColor,
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}>
          <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            TAB4
            TAB3
            Tab1={'Details'}
            Tab2={View_Job_Details || searchView ? 'Bids' : null}
            Tab3={View_Job_Details || searchView ? 'Milestones' : null}
            Tab4={View_Job_Details || searchView ? 'Documents' : null}
            onPressTab1={() => setActiveTab('Tab1')}
            onPressTab2={() =>
              View_Job_Details || searchView ? setActiveTab('Tab2') : null
            }
            onPressTab3={() =>
              View_Job_Details || searchView ? setActiveTab('Tab3') : null
            }
            onPressTab4={() =>
              View_Job_Details || searchView ? setActiveTab('Tab4') : null
            }
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
            colorTab4={
              activeTab === 'Tab4'
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            FONTFAMILY1={
              activeTab === 'Tab1' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY2={
              activeTab === 'Tab2' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY3={
              activeTab === 'Tab3' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            FONTFAMILY4={
              activeTab === 'Tab4' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
            }
            styleTab1={[activeTab === 'Tab1' && JobDetailsStyle.activeTab]}
            styleTab2={
              View_Job_Details || searchView
                ? activeTab === 'Tab2' && JobDetailsStyle.activeTab
                : null
            }
            styleTab3={
              View_Job_Details || searchView
                ? activeTab === 'Tab3' && JobDetailsStyle.activeTab
                : null
            }
            styleTab4={
              View_Job_Details || searchView
                ? activeTab === 'Tab4' && JobDetailsStyle.activeTab
                : null
            }
          />
        </View>
        {checkTabs()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobReviewDetails;
