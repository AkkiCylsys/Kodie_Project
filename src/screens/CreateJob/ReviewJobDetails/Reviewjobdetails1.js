import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {_goBack} from '../../../services/CommonServices/CommonMethods';
import {ReviewjobdetailsStyle1} from './ReviewjobdetailsStyle1';
import {_COLORS} from '../../../Themes';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import RowTexts from '../../../components/Molecules/RowTexts/RowTexts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Config} from '../../../Config';
import axios from 'axios';
import RowButtons from '../../../components/Molecules/RowButtons/RowButtons';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import moment from 'moment/moment';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import { getJobDetailServices } from '../../../services/JobModuleServices/JobModuleServices';
const Reviewjobdetails1 = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);
  const userRole = loginData?.Account_details?.[0]?.user_role_id;
  // const userRole = '4,2';
  const roleArray = userRole ? userRole.split(',') : [];
  const hasTenantRole = roleArray.includes('2'); // Tenant role (2)
  const hasLandlordRole = roleArray.includes('3'); // Landlord role (3)
  const hasContractorRole = roleArray.includes('4'); // Contractor role (4)
  const createJobId = useSelector(state => state.AddCreateJobReducer.data);
  console.log('createJobId in reviewjobDetails.....', createJobId);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetailsData, setJobDetailsData] = useState([]);
  const imagesFiles = jobDetailsData.image_file_path;
  // const SearchJobId = props.route.params.SearchJobId;
  const searchView = props.searchView;
  const SearchJobId = props.SearchJobId;
  const JobId = props?.JobId;
  console.log('JobId finalin review..', JobId);
  useEffect(() => {
    if (JobId) {
      getJobDetails();
    }
  }, [JobId]);
  const getJobDetails = () => {
    setIsLoading(true);
    const jobDetailsData = {
      // jm_job_id: F_job_id || SearchJobId,
      jm_job_id: JobId,
    };
    getJobDetailServices(jobDetailsData)
      .then(response => {
        console.log('API Response JobDetails:', response?.data);
        if (response.data.success === true) {
          setJobDetailsData(response?.data?.data);
          console.log('jobDetailsData....', response?.data?.data);
          console.log('job_type_my..', response?.data?.data?.job_type_my);
          props.onJobDetailsSuccess(response?.data?.data?.job_type_my);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed JobDetails', error);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // EditMode ........
  const getUpdateJobDetails = () => {
    const url = Config.BASE_URL;
    const jobDetails_url = url + 'job/get';
    console.log('Request URL:', jobDetails_url);
    setIsLoading(true);
    const jobDetails_Data = {
      jm_job_id: props.update_JOB_ID,
    };
    axios
      .post(jobDetails_url, jobDetails_Data)
      .then(response => {
        console.log('API Response JobDetails for updateImage:', response.data);
        if (response.data.success === true) {
          setJobDetailsData(response?.data?.data);
          console.log('jobDetailsData_term....', response?.data?.data);
          // setUpdateAllImage(response.data.data.image_file_path);
          console.log(
            'updateAllImage.....',
            response?.data?.data?.image_file_path,
          );
          console.log('job_type_my..', response?.data?.data?.job_type_my);
          props.onJobDetailsSuccess(response?.data?.data?.job_type_my);
        } else {
          // alert(response?.data?.message);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed UpdateJobDetails', error);
        setIsLoading(false);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  props?.imagesFilePath(jobDetailsData);
  // alert(JSON.stringify(jobDetailsData.first_name))
  return (
    <View>
      <View style={{flex: 1, marginHorizontal: 16}}>
        <View style={{marginTop: 17}}>
          <Text style={ReviewjobdetailsStyle1.textview}>
            {jobDetailsData.job_description}
          </Text>
          <Text style={ReviewjobdetailsStyle1.textview1}>
            Job request summary
          </Text>
        </View>
        <View style={{marginBottom: 16}}>
          <RowTexts
            leftText={'Name'}
            rightText={`${
              jobDetailsData.first_name == 'null' ||
              jobDetailsData.first_name == ''
                ? '-'
                : jobDetailsData.first_name
            } ${
              jobDetailsData.last_name == 'null' ||
              jobDetailsData.last_name == ''
                ? '-'
                : jobDetailsData.last_name
            }`}
          />
          <RowTexts
            leftText={'Location'}
            rightText={
              jobDetailsData.job_location == 'null' ||
              jobDetailsData.job_location == ''
                ? '-'
                : jobDetailsData.job_location || ''
            }
          />
          <RowTexts
            leftText={'Property type'}
            rightText={
              jobDetailsData.property_type == 'null' ||
              jobDetailsData.property_type == ''
                ? '-'
                : jobDetailsData.property_type || ''
            }
          />
          <RowTexts
            leftText={'Proposed date'}
            rightText={
              jobDetailsData.job_date == 'null' || jobDetailsData.job_date == ''
                ? '-'
                : moment(jobDetailsData.job_date).format('MMM DD, YYYY' || '')
            }
          />
          {/* <RowTexts
            leftText={'Proposed time'}
            rightText={
              jobDetailsData.job_time === 'null' ||
              jobDetailsData.job_time === '' ||
              jobDetailsData.proposed_time === 'null' ||
              jobDetailsData.proposed_time === ''
                ? '-'
                : jobDetailsData.job_time && jobDetailsData.proposed_time
                ? `${moment(jobDetailsData.job_time, 'h:mm a').format(
                    'h:mm A',
                  )} - ${moment(jobDetailsData.proposed_time, 'h:mm a').format(
                    'h:mm A',
                  )}`
                : ''
            }
          /> */}
          <RowTexts
            leftText={'Proposed time'}
            rightText={
              jobDetailsData.proposed_time === ''
                ? '-'
                : jobDetailsData.proposed_time
                ? ` ${moment(jobDetailsData.proposed_time, 'h:mm a').format(
                    'h:mm A',
                  )}`
                : ''
            }
          />
          {hasContractorRole ? (
            <RowTexts
              leftText={'Number of hours'}
              rightText={
                jobDetailsData.number_of_hours === 'null' ||
                jobDetailsData.number_of_hours === ''
                  ? '-'
                  : jobDetailsData.number_of_hours
              }
            />
          ) : null}
          <RowTexts
            leftText={'How often'}
            rightText={
              jobDetailsData.how_often == 'null' ||
              jobDetailsData.how_often == ''
                ? '-'
                : jobDetailsData.how_often || ' '
            }
          />
          <RowTexts
            leftText={'Budget range'}
            rightText={
              jobDetailsData.job_min_budget === 'null' ||
              jobDetailsData.job_min_budget === '' ||
              jobDetailsData.job_max_budget === 'null' ||
              jobDetailsData.job_max_budget === '' ||
              (jobDetailsData.job_max_budget === '$1' &&
                jobDetailsData.job_max_budget === '$2000')
                ? '-'
                : `${jobDetailsData.job_min_budget || ''} - ${
                    jobDetailsData.job_max_budget || ''
                  }`
            }
          />
          {hasContractorRole ? null : (
            <RowTexts
              leftText={'Payment'}
              rightText={
                jobDetailsData.payment_by == 'null' ||
                jobDetailsData.payment_by == ''
                  ? '-'
                  : jobDetailsData.payment_by
              }
            />
          )}
          {/* This is hide for now client requirement. */}
          {/* <RowTexts
          leftText={"Booking insurance"}
          rightText={jobDetailsData.insurance}
        /> */}
        </View>
      </View>
      <DividerIcon />
      <View style={{flex: 1, marginHorizontal: 16}}>
        {props.View_Job_Details || searchView ? null : (
          <>
            <View style={ReviewjobdetailsStyle1.nextBtn_view}>
              <CustomSingleButton
                _ButtonText={'Create job'}
                Text_Color={_COLORS.Kodie_WhiteColor}
                disabled={isLoading ? true : false}
                onPress={props.onPress}
              />
            </View>
            <TouchableOpacity
              style={ReviewjobdetailsStyle1.goBack_View}
              onPress={() => {
                navigation.pop();
              }}>
              <View style={ReviewjobdetailsStyle1.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={ReviewjobdetailsStyle1.goBack_Text}>
                {'Go back'}
              </Text>
            </TouchableOpacity>
          </>
        )}
        {searchView ? (
          <View style={{borderWidth: 0.3, borderRadius: 15}}>
            <View style={{marginHorizontal: 20, marginVertical: 25}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 12}}>Bidding ends in</Text>
                <Text style={{fontSize: 12}}>Budget:</Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View
                    style={{
                      borderWidth: 0.4,
                      borderRadius: 8,
                      paddingHorizontal: 5,
                      paddingVertical: 8,
                      color: _COLORS.Kodie_GrayColor,
                    }}>
                    <Text style={{fontSize: 9}}>22 hrs</Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.4,
                      marginHorizontal: 5,
                      fontSize: 9,
                      borderRadius: 5,
                      paddingHorizontal: 5,
                      paddingVertical: 8,
                    }}>
                    <Text style={{fontSize: 9}}>33 mins</Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 0.4,
                      fontSize: 9,
                      borderRadius: 8,
                      paddingHorizontal: 5,
                      paddingVertical: 8,
                      color: _COLORS.Kodie_GrayColor,
                    }}>
                    <Text style={{fontSize: 9}}>10 secs</Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 0.4,
                    borderRadius: 8,
                    paddingHorizontal: 5,
                    paddingVertical: 8,
                    color: _COLORS.Kodie_GrayColor,
                  }}>
                  <Text style={{fontSize: 9}}>$100 per hour</Text>
                </View>
              </View>
              <View style={{marginTop: 8}}>
                <RowButtons
                  LeftButtonText={'Bid for job'}
                  leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
                  LeftButtonTextColor={_COLORS.Kodie_BlackColor}
                  LeftButtonborderColor={_COLORS.Kodie_BlackColor}
                  RightButtonText={'Message'}
                  RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
                  RightButtonTextColor={_COLORS.Kodie_WhiteColor}
                  RightButtonborderColor={_COLORS.Kodie_LightWhiteColor}
                  onPressLeftButton={props.BidonPress}
                  onPressRightButton={props.MessageBtn}
                />
              </View>
            </View>
          </View>
        ) : null}
      </View>
        {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default Reviewjobdetails1;
