import React, {useEffect, useState} from 'react';
import {View, Text, BackHandler, SafeAreaView, Alert} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import {_goBack} from './../../../services/CommonServices/index';
import {_COLORS, FONTFAMILY} from '../../../Themes';
import {JobsCss} from './JobsCss';
import Repair from './Repair/Repair';
import SearchForContractor from './SearchforContractor/SearchForContractor';
import SearchforJob from './SearchforJob/SearchforJob';
import {
  useFocusEffect
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Jobs = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '3';
  const roleArray = userRole ? userRole.split(',') : [];
  const hasTenantRole = roleArray.includes('2'); // Tenant role (2)
  const hasLandlordRole = roleArray.includes('3'); // Landlord role (3)
  const hasContractorRole = roleArray.includes('4'); // Contractor role (4)
  const [activeTab, setActiveTab] = useState('Tab1');
  let myJob_Type = props.route.params?.myJob_Type;
  let job_sub_type_req = props.route.params?.job_sub_type;
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
      <View style={{marginTop: 5}}>
        <CustomTabNavigator
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          TAB3={hasContractorRole ? 'TAB3' : null}
          Tab1={'My jobs'}
          Tab2={'Search for contractors'}
          Tab3={hasContractorRole ? 'Search for jobs' : null}
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
          FONTFAMILY1={
            activeTab === 'Tab1' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
          }
          FONTFAMILY2={
            activeTab === 'Tab2' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
          }
          FONTFAMILY3={
            activeTab === 'Tab3' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
          }
          styleTab1={activeTab === 'Tab1' && JobsCss.activeTab}
          styleTab2={activeTab === 'Tab2' && JobsCss.activeTab}
          styleTab3={activeTab === 'Tab3' && JobsCss.activeTab}
        />
      </View>
      <View style={JobsCss.Line} />
      {checkTabs()}
    </SafeAreaView>
  );
};

export default Jobs;
