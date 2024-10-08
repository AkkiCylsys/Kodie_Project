import React, {useEffect, useState} from 'react';
import {View, Text, BackHandler, SafeAreaView, Alert} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import {_goBack} from './../../../services/CommonServices/index';
import {_COLORS} from '../../../Themes';
import {JobsCss} from './JobsCss';
import Repair from './Repair/Repair';
import SearchForContractor from './SearchforContractor/SearchForContractor';
import SearchforJob from './SearchforJob/SearchforJob';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
const Jobs = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [job_sub_type, setJobSubType] = useState(1);
  const [activeTab, setActiveTab] = useState('Tab1');
  let myJob_Type = props.route.params?.myJob_Type;
  let job_sub_type_req = props.route.params?.job_sub_type;
  console.log('job_sub_type_req...', job_sub_type_req);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // BackHandler.exitApp();
        props.navigation.navigate('Dashboard');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <Repair
            onpress={() => {
              props.navigation.navigate('CreateJobFirstScreen', {
                myJob: 'requested',
              });
            }}
            myJob_Type={myJob_Type}
            servicing_press={() => {
              props.navigation.navigate('CreateJobFirstScreen', {
                myJob: 'Servicing',
              });
            }}
            create_job_id={job_id => {
              // alert(job_id);
              props.navigation.navigate('JobReviewDetails', {
                JOB_ID: job_id,
                View_Job_Details: 'View_Job_Details',
              });
            }}
            job_sub_type_req={job_sub_type_req}
          />
        );
      case 'Tab2':
        return (
          <>
            {Alert.alert('Search for contractor', 'Coming soon', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  setActiveTab('Tab1');
                },
              },
            ])}
          </>
          // <SearchForContractor
          //   Search={SearchData => {
          //     alert('dfgdsgddgdsdfd', JSON.stringify(SearchData));
          //     props.navigation.navigate('SearchDetail', {
          //       SearchDataDetail: SearchData,
          //     });
          //   }}
          // />
        );

      case 'Tab3':
        return (
          // <SearchforJob
          //   SearchResultJob={Searchjob => {
          //     // alert("Searchjob", JSON.stringify(Searchjob));
          //     props.navigation.navigate('SearchJobResult', {
          //       SearchDataDetail: Searchjob,
          //     });
          //   }}
          // />
          <>
            {Alert.alert('Search for job', 'Coming soon', [
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

      default:
        return (
          <Repair onpress={props.navigation.navigate('CreateJobFirstScreen')} />
        );
    }
  };
  return (
    <SafeAreaView style={JobsCss.Container}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate('Dashboard')}
        MiddleText={'Jobs'}
        isprofileImage
        IsNotification={true}
        onPressRightImgProfile={() =>
          props.navigation.navigate('LandlordProfile')
        }
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB3
        Tab1={'My jobs'}
        Tab2={'Search for contractors'}
        Tab3={'Search for jobs'}
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
        styleTab1={activeTab === 'Tab1' && JobsCss.activeTab}
        styleTab2={activeTab === 'Tab2' && JobsCss.activeTab}
        styleTab3={activeTab === 'Tab3' && JobsCss.activeTab}
      />
      <View style={JobsCss.Line} />
      {checkTabs()}
    </SafeAreaView>
  );
};

export default Jobs;
