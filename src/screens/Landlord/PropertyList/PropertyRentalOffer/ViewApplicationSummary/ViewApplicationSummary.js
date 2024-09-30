import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { ViewApplicationSummaryStyle } from './ViewApplicationSummaryStyle';

import { _COLORS, FONTFAMILY } from '../../../../../Themes';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import RowTexts from '../../../../../components/Molecules/RowTexts/RowTexts';
import ToggleButton from '../../../../../components/Molecules/ToggleButton/ToggleButton';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import moment from 'moment';
import { SignupLookupDetails } from '../../../../../APIs/AllApi';
import { CommonLoader } from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import {
  getLandlordDetailsByAcceptingId,
  saveLandLordAcceptingService,
  UpdateLandLordAcceptingService,
} from '../../../../../services/PropertyRentalOfferApi/PropertyViewApplicationApi';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ListEmptyComponent from '../../../../../components/Molecules/ListEmptyComponent/ListEmptyComponent';

const occupantData = [
  {
    id: 1,
    name: 'Deependra',
    email: 'deep@gmail.com',
  },
];
const ViewApplicationSummary = props => {
  const {
    tenantQuestDetails,
    tenant_id,
    bid_id,
    propertyId,
    landlord_id,
    accpetingLandlordId,
    offerForMyPropData,
  } = props;
  const navigation = useNavigation();
  console.log('accpetingLandlordId in summary page..', accpetingLandlordId);
  console.log('bid_id in summary page..', bid_id);
  console.log('offerForMyPropData..', JSON.stringify(offerForMyPropData));
  const [isLoading, setIsLoading] = useState(false);
  const [applicationSumReasonOfReject, setApplicationSumReasonOfReject] =
    useState('');
  const [
    applicationSumReasonOfRejectError,
    setApplicationSumReasonOfRejectError,
  ] = useState('');
  const [occupantReasonOfReject, setOccupantReasonOfReject] = useState('');
  const [occupantReasonOfRejectError, setOccupantReasonOfRejectError] =
    useState('');
  const [referenceReasonOfReject, setReferenceReasonOfReject] = useState('');
  const [referenceReasonOfRejectError, setReferenceReasonOfRejectError] =
    useState('');
  const [applicationSummaryToggle, setApplicationSummaryToggle] = useState('');
  const [occupantDetailsToggle, setOccupantDetailsToggle] = useState('');
  const [referenceToggle, setReferenceToggle] = useState('');

  const [occupantButtonId, setOccupantButtonId] = useState(null);
  const [occupantButtonData, setOccupantButtonData] = useState([]);

  const [applicationSumAcceptButtonId, setApplicationSumAcceptButtonId] =
    useState(null);
  const [applicationSumAcceptButtonData, setApplicationSumAcceptButtonData] =
    useState([]);

  const [referenceAcceptButtonId, setReferenceAcceptButtonId] = useState(null);
  const [referenceAcceptButtonData, setReferenceAcceptButtonData] = useState(
    [],
  );
  console.log('occupantButtonId...', occupantButtonId);

  useFocusEffect(
    React.useCallback(() => {
      handleAcceptLanlordToggle();

      if (accpetingLandlordId !== null) {
        handleGetLandLordDeatils(); // Invoke the function here
      }
    }, [accpetingLandlordId]),
  );

  console.log('tenantQuestDetails....', JSON.stringify(tenantQuestDetails));
  console.log(
    'tenantQuestDetails in second obj....',
    JSON.stringify(tenantQuestDetails[1]?.children),
  );

  // Validation....

  const handleApplicationSumReject = text => {
    setApplicationSumReasonOfReject(text);
    if (applicationSumReasonOfReject == '') {
      setApplicationSumReasonOfRejectError('Please enter Reason for rejection');
    } else {
      setApplicationSumReasonOfRejectError('');
    }
  };
  const handleOccupantReasonOfReject = text => {
    setOccupantReasonOfReject(text);
    if (occupantReasonOfReject == '') {
      setOccupantReasonOfRejectError('Please enter Reason for rejection');
    } else {
      setOccupantReasonOfRejectError('');
    }
  };
  const handleReferenceReasonOfReject = text => {
    setReferenceReasonOfReject(text);
    if (referenceReasonOfReject == '') {
      setReferenceReasonOfRejectError('Please enter Reason for rejection');
    } else {
      setReferenceReasonOfRejectError('');
    }
  };

  // const handleFinalAcceptOffer = () => {
  //   if (
  //     !occupantButtonId ||
  //     !applicationSumAcceptButtonId ||
  //     !referenceAcceptButtonId
  //   ) {
  //     Alert.alert(
  //       'Error',
  //       'Please choose an Accept or Reject option for all sections.',
  //     );
  //   } else if (applicationSumReasonOfReject == '') {
  //     setApplicationSumReasonOfRejectError(
  //       'Please enter Reaseon for rejection',
  //     );
  //   } else if (occupantReasonOfReject == '') {
  //     setOccupantReasonOfRejectError('Please enter Reason for rejection');
  //   } else if (referenceReasonOfReject == '') {
  //     setReferenceReasonOfRejectError('Please enter Reason for rejection');
  //   } else {
  //     handleSubmit();
  //   }
  // };

  const handleFinalAcceptOffer = () => {
    // Check if any of the sections haven't been selected (accept or reject)
    if (
      !occupantButtonId ||
      !applicationSumAcceptButtonId ||
      !referenceAcceptButtonId
    ) {
      Alert.alert(
        'Error',
        'Please choose an Accept or Reject option for all sections.',
      );
      return;
    }

    // If 'Reject' is selected for any section, check for corresponding reason
    if (
      applicationSumAcceptButtonId === 556 &&
      applicationSumReasonOfReject === ''
    ) {
      setApplicationSumReasonOfRejectError('Please enter Reason for rejection.');
      return;
    }

    if (occupantButtonId === 556 && occupantReasonOfReject === '') {
      setOccupantReasonOfRejectError('Please enter Reason for rejection.');
      return;
    }

    if (referenceAcceptButtonId === 556 && referenceReasonOfReject === '') {
      setReferenceReasonOfRejectError('Please enter Reason for rejection.');
      return;
    }

    // If all validations pass, submit the form
    handleSubmit();
  };

  const filteredData =
    tenantQuestDetails[0]?.children?.filter(
      item => item.tqm_Question_view !== null,
    ) || [];
  console.log('filteredData..', filteredData);
  const EmploymentfilteredData =
    tenantQuestDetails[1]?.children?.filter(
      item => item.tqm_Question_view !== null,
    ) || [];
  const rentalHistoryfilteredData =
    tenantQuestDetails[2]?.children?.filter(
      item => item.tqm_Question_view !== null,
    ) || [];
  const peferencefilteredData =
    tenantQuestDetails[3]?.children?.filter(
      item => item.tqm_Question_view !== null,
    ) || [];

  console.log('peferencefilteredData..', peferencefilteredData);
  const occupantDataListString =
    tenantQuestDetails[0]?.children[2]?.sub_children[1]?.tqm_Question_value;

  let occupantDataList = [];
  if (occupantDataListString) {
    try {
      occupantDataList = JSON.parse(occupantDataListString); // Parse the JSON string
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  console.log('occupantDataList....', occupantDataList);

  const leaseholderDataString =
    tenantQuestDetails[0]?.children[2]?.sub_children[3]?.tqm_Question_value; // Access the specific object

  let leaseholderDataList = [];
  if (leaseholderDataString) {
    try {
      leaseholderDataList = JSON.parse(leaseholderDataString); // Parse the JSON string
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  console.log('leaseholderDataList....', leaseholderDataList);

  const employeeReferencesDataString =
    tenantQuestDetails?.[1]?.children?.[9]?.tqm_Question_value;

  console.log('employeeReferencesDataString...', employeeReferencesDataString);

  let employeeReferencesList = [];

  if (employeeReferencesDataString) {
    try {
      // Attempt to parse the string into JSON if it exists
      employeeReferencesList = JSON.parse([employeeReferencesDataString]);
    } catch (error) {
      // Log the error in case of invalid JSON
      console.error('Error parsing JSON:', error);
    }
  }
  console.log('employeeReferencesList....', employeeReferencesList);

  const ReferencesDataString =
    tenantQuestDetails?.[2]?.children?.[4]?.tqm_Question_value;

  console.log('ReferencesDataString..', ReferencesDataString);
  let ReferencesList = [];

  if (ReferencesDataString) {
    try {
      // Attempt to parse the string into JSON if it exists
      ReferencesList = JSON.parse(ReferencesDataString);
    } catch (error) {
      // Log the error in case of invalid JSON
      console.error('Error parsing JSON:', error);
    }
  }

  // You can use ReferencesList here for further processing
  console.log('ReferencesList:', ReferencesList);

  // employeeReferencesList will either contain the parsed data or remain an empty array

  // Api intrigation ....

  const handleGetLandLordDeatils = async () => {
    setIsLoading(true);
    const getLandlordDetailsByAcceptingIdPayload = {
      acceptance_id: accpetingLandlordId,
    };
    console.log(
      'getLandlordDetailsByAcceptingIdPayload...',
      getLandlordDetailsByAcceptingIdPayload,
    );
    try {
      const response = await getLandlordDetailsByAcceptingId(
        getLandlordDetailsByAcceptingIdPayload,
      );
      console.log('response in save GetLandLordDeatils', response);
      if (response?.success === true) {
        console.log('responsein get time..', response?.data[0]);
        setApplicationSumAcceptButtonId(response?.data[0]?.status_one);
        setOccupantButtonId(response?.data[0]?.status_two);
        setReferenceAcceptButtonId(response?.data[0]?.status_three);
        setApplicationSumReasonOfReject(response?.data[0]?.reason_one);
        setOccupantReasonOfReject(response?.data[0]?.reason_two);
        setReferenceReasonOfReject(response?.data[0]?.reason_three);
      }
    } catch (error) {
      console.error('Error fetching GetLandLordDeatils:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAcceptLanlordToggle = async () => {
    setIsLoading(true);

    const res = await SignupLookupDetails({
      P_PARENT_CODE: 'ACCEPT_LANDLORD',
      P_TYPE: 'OPTION',
    });

    console.log('AcceptLanlord', res);

    setOccupantButtonData(res?.lookup_details);
    // setOccupantButtonId(res.lookup_details[0].lookup_key);

    // setApplicationSumAcceptButtonId(res.lookup_details[0].lookup_key);
    setApplicationSumAcceptButtonData(res?.lookup_details);

    // setReferenceAcceptButtonId(res.lookup_details[0].lookup_key);
    setReferenceAcceptButtonData(res?.lookup_details);

    setIsLoading(false);
  };

  const handleSaveLandlordAcceptingDetails = async () => {
    console.log('Save accept landlord');
    setIsLoading(true);
    const saveAcceptingDetailsPayload = {
      bid_id: bid_id,
      property_id: propertyId,
      landlord_id: landlord_id,
      tenant_id: tenant_id,
      screening_one_status: applicationSumAcceptButtonId,
      screening_two_status: occupantButtonId,
      screening_three_status: referenceAcceptButtonId,
      screening_one_reason: applicationSumReasonOfReject,
      screening_two_reason: occupantReasonOfReject,
      screening_three_reason: referenceReasonOfReject,
    };
    console.log('saveAcceptingDetailsPayload...', saveAcceptingDetailsPayload);
    try {
      const response = await saveLandLordAcceptingService(
        saveAcceptingDetailsPayload,
      );
      console.log('response in save landlord accepting....', response);
      if (response?.success === true) {
        Alert.alert('Success', response?.data);
        navigation?.navigate('Properties', {
          acceptLanlordPassed: 'acceptLanlordPassed',
        });
        applicationSumAcceptButtonId(null);
        occupantButtonId(null);
        referenceAcceptButtonId(null);
        setApplicationSumReasonOfReject('');
        setOccupantReasonOfReject('');
        setReferenceReasonOfReject('');
      }
    } catch (error) {
      console.error('Error fetching saveLandlordAccepotingDetails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLandlordAcceptingDetails = async () => {
    console.log('update accept landlord');
    setIsLoading(true);
    const updateAcceptingDetailsPayload = {
      landlord_acceptance_id: accpetingLandlordId,
      screening_one_status: applicationSumAcceptButtonId,
      screening_two_status: occupantButtonId,
      screening_three_status: referenceAcceptButtonId,
      screening_one_reason:
        applicationSumAcceptButtonId == 555 ? '' : applicationSumReasonOfReject,
      screening_two_reason:
        occupantButtonId == 555 ? '' : occupantReasonOfReject,
      screening_three_reason:
        referenceAcceptButtonId == 555 ? '' : referenceReasonOfReject,
    };
    console.log(
      'updateAcceptingDetailsPayload...',
      updateAcceptingDetailsPayload,
    );
    try {
      const response = await UpdateLandLordAcceptingService(
        updateAcceptingDetailsPayload,
      );
      console.log('response in Update landlord accepting....', response);
      if (response?.success === true) {
        Alert.alert('Success', response?.data);
        navigation?.navigate('Properties', {
          acceptLanlordPassed: 'acceptLanlordPassed',
        });
        applicationSumAcceptButtonId(null);
        occupantButtonId(null);
        referenceAcceptButtonId(null);
        setApplicationSumReasonOfReject('');
        setOccupantReasonOfReject('');
        setReferenceReasonOfReject('');
      }
    } catch (error) {
      console.error('Error fetching updateLandlordAccepotingDetails :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateSelections = () => {
    if (
      !occupantButtonId ||
      !applicationSumAcceptButtonId ||
      !referenceAcceptButtonId
    ) {
      Alert.alert(
        'Error',
        'Please choose an Accept or Reject option for all sections.',
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // if (!validateSelections()) return;

    // Proceed with your API call here
    console.log('Submitting with selections:', {
      occupantButtonId,
      applicationSumAcceptButtonId,
      referenceAcceptButtonId,
    });
    accpetingLandlordId == null
      ? handleSaveLandlordAcceptingDetails()
      : handleUpdateLandlordAcceptingDetails();
    // Make your API call here
  };

  const handleToggle = key => {
    setOccupantButtonId(key);
  };

  const handleApplicationSumToggle = key => {
    setApplicationSumAcceptButtonId(key);
    // alert(key)
  };
  const handleReferencesToggle = key => {
    setReferenceAcceptButtonId(key);
  };

  // For contact
  // const openEmailClient = emailAddress => {
  //   const mailtoUrl = `mailto:${emailAddress}`;

  //   Linking.openURL(mailtoUrl).catch(err => {
  //     // Handle any errors
  //     console.error('Error opening email client:', err);
  //     Alert.alert(
  //       'Error',
  //       'There was a problem opening your email client. Please try again later.',
  //     );
  //   });
  // };

  const openEmailClient = emailAddress => {
    const mailtoUrl = `mailto:${emailAddress}`; // Only the recipient email address

    // Open Gmail app or default email client
    Linking.openURL(mailtoUrl)
      .then(() => {
        // Optionally, show a success message or perform any additional actions
        Alert.alert('Success', 'Your Gmail client is opened.');
      })
      .catch(err => {
        // Handle any errors when opening the email client
        console.error('Error opening Gmail client:', err);
        Alert.alert('Error', 'There was a problem opening the Gmail client.');
      });
  };

  // const openGmail = emailAddress => {
  //   const gmailUrl = `googlegmail://co?to=${emailAddress}`;

  //   if (Platform.OS === 'android') {
  //     Linking.canOpenURL(gmailUrl)
  //       .then(supported => {
  //         if (supported) {
  //           Linking.openURL(gmailUrl);
  //         } else {
  //           Alert.alert(
  //             'Gmail app not available',
  //             'Please install Gmail to use this feature.',
  //           );
  //         }
  //       })
  //       .catch(err => console.error('Error opening Gmail:', err));
  //   } else {
  //     // For iOS or if Gmail is not available, fallback to mailto
  //     const mailtoUrl = `mailto:${emailAddress}`;
  //     Linking.canOpenURL(mailtoUrl)
  //       .then(supported => {
  //         if (supported) {
  //           Linking.openURL(mailtoUrl);
  //         } else {
  //           Alert.alert(
  //             'Email client not available',
  //             `Cannot open email client for ${emailAddress}`,
  //           );
  //         }
  //       })
  //       .catch(err => console.error('Error opening email client:', err));
  //   }
  // };

  const occupantRenderItem = ({ item, index }) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {item?.fullName}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {item?.emailAddress}
          </Text>
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <CustomSingleButton
            _ButtonText={'Contact'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => openEmailClient(item?.emailAddress)}
          />
        </View>
      </View>
    );
  };
  const leaseHolderRenderItem = ({ item, index }) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {item?.fullName}
          </Text>
          <Text
            style={[ViewApplicationSummaryStyle.occupants_email, { width: 200 }]}>
            {item?.emailAddress}
          </Text>
          {/* <Text
            style={[ViewApplicationSummaryStyle.occupants_email, {width: 200}]}>
            {item?.confirmEmailAddress}
          </Text> */}
        </View>
        <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
          <CustomSingleButton
            _ButtonText={'Contact'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => openEmailClient(item?.emailAddress)}
          />
        </View>
      </View>
    );
  };
  const employeeReferenceRenderItem = ({ item, index }) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {item?.fullName}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {item?.email}
          </Text>
        </View>
        <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
          <CustomSingleButton
            _ButtonText={'Contact'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => openEmailClient(item?.email)}
          />
        </View>
      </View>
    );
  };

  const referenceRenderItem = ({ item, index }) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {item?.fullName}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {item?.email}
          </Text>
        </View>
        <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
          <CustomSingleButton
            _ButtonText={'Contact'}
            backgroundColor={_COLORS.Kodie_WhiteColor}
            borderColor={_COLORS.Kodie_GrayColor}
            height={35}
            width={90}
            marginTop={0}
            onPress={() => openEmailClient(item?.email)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={ViewApplicationSummaryStyle?.mainContainer}>
      {/* Application summary Data */}
      <View style={{ marginHorizontal: 16 }}>
        <TouchableOpacity
          style={ViewApplicationSummaryStyle.applicationSum_view}
          onPress={() => {
            setApplicationSummaryToggle(!applicationSummaryToggle);
          }}>
          <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
            {'Application summary'}
          </Text>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.down_Arrow_icon}
            onPress={() => {
              setApplicationSummaryToggle(!applicationSummaryToggle);
            }}>
            <Fontisto
              name={applicationSummaryToggle ? 'angle-up' : 'angle-down'}
              size={15}
              color={_COLORS.Kodie_DarkGrayColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <DividerIcon />
        {applicationSummaryToggle && (
          <View>
            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Rental details'}
              </Text>
              <FlatList
                data={filteredData} // Use the filtered data
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    rightText={
                      item?.tqm_Question_type === 'Dropdown'
                        ? item?.tqm_Question_value_data || '-'
                        : item?.tqm_Question_value || '-'
                    }
                  />
                )}
              />
            </View>

            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Employment & income'}
              </Text>
              <FlatList
                data={EmploymentfilteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    rightText={
                      item?.tqm_Question_type === 'Dropdown'
                        ? item?.tqm_Question_value_data || '-'
                        : item?.tqm_Question_value || '-'
                    }
                  />
                )}
              />
            </View>

            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Rental history'}
              </Text>
              <FlatList
                data={rentalHistoryfilteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    rightText={
                      item?.tqm_Question_type === 'Dropdown'
                        ? item?.tqm_Question_value_data || '-'
                        : item?.tqm_Question_value === '1'
                          ? 'Yes'
                          : item?.tqm_Question_value === '0'
                            ? 'No'
                            : item?.tqm_Question_value || '-'
                    }
                  />
                )}
              />
            </View>

            <View>
              <Text style={ViewApplicationSummaryStyle?.headingText}>
                {'Preferences'}
              </Text>
              <FlatList
                data={peferencefilteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    rightText={
                      item?.tqm_Question_code === 'PETS_THEY'
                        ? item?.tqm_Question_value_data || '-'
                        : item?.tqm_Question_type === 'Dropdown'
                          ? item?.tqm_Question_value_data || '-'
                          : item?.tqm_Question_value === '1'
                            ? 'Yes'
                            : item?.tqm_Question_value === '0'
                              ? 'No'
                              : item?.tqm_Question_value || '-'
                    }
                  />
                )}
              />
            </View>
            <View style={ViewApplicationSummaryStyle?.screenReportMainview}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  { alignSelf: 'center' },
                ]}>
                {'Screening result'}
              </Text>
              <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                {applicationSumAcceptButtonData.length > 0 && (
                  <ToggleButton
                    tabValue={applicationSumAcceptButtonId} // This reflects the currently selected value
                    setTabValue={newValue =>
                      handleApplicationSumToggle(newValue)
                    } // Pass the new value here
                    activeColor={_COLORS.Kodie_GreenColor}
                    inactiveColor={_COLORS.Kodie_WhiteColor}
                    activeTextColor={_COLORS.Kodie_WhiteColor}
                    inactiveTextColor={_COLORS.Kodie_BlackColor}
                    firstTabLabel={
                      applicationSumAcceptButtonData[0].lookup_description
                    }
                    secondTabLabel={
                      applicationSumAcceptButtonData[1].lookup_description
                    }
                    width={200}
                    firstTabValue={applicationSumAcceptButtonData[0].lookup_key} // This is the value for the first tab
                    secondTabValue={
                      applicationSumAcceptButtonData[1].lookup_key
                    } // This is the value for the second tab
                  />
                )}
              </View>
            </View>
            {applicationSumAcceptButtonId == 556 && (
              <View>
                <Text style={ViewApplicationSummaryStyle?.headingText}>
                  {'Reason for rejection'}
                </Text>
                <TextInput
                  value={applicationSumReasonOfReject}
                  // onChangeText={text => setApplicationSumReasonOfReject(text)}
                  onChangeText={text => handleApplicationSumReject(text)}
                  onBlur={() => {
                    handleApplicationSumReject(applicationSumReasonOfReject);
                  }}
                  placeholder="Please enter the reason for rejection."
                  numberOfLines={5}
                  multiline
                  textAlignVertical="top"
                  maxLength={1000}
                  style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                />
                {applicationSumReasonOfRejectError ? (
                  <Text style={ViewApplicationSummaryStyle?.errorText}>
                    {applicationSumReasonOfRejectError}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Occupante Data  */}
      <View style={{ marginHorizontal: 16 }}>
        <View>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.applicationSum_view}
            onPress={() => {
              setOccupantDetailsToggle(!occupantDetailsToggle);
            }}>
            <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
              {'Occupant details'}
            </Text>
            <TouchableOpacity
              style={ViewApplicationSummaryStyle.down_Arrow_icon}
              onPress={() => {
                setOccupantDetailsToggle(!occupantDetailsToggle);
              }}>
              <Fontisto
                name={occupantDetailsToggle ? 'angle-up' : 'angle-down'}
                size={15}
                color={_COLORS.Kodie_DarkGrayColor}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <DividerIcon />
          {occupantDetailsToggle && (
            <View>
              <View>
                <View style={ViewApplicationSummaryStyle?.rowStyle}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      { color: _COLORS?.Kodie_MediumGrayColor },
                    ]}>
                    {'# of occupants'}
                  </Text>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.occupantNumberStyle,
                      { marginLeft: 110 },
                    ]}>
                    {occupantDataList.length}
                  </Text>
                </View>
                <FlatList
                  data={occupantDataList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={occupantRenderItem}
                  ListEmptyComponent={() => {
                    return (
                      <ListEmptyComponent
                        EmptyText={'No occupant details available.'}
                        EmptyStyle={{ marginVertical: 15 }}
                      />
                    );
                  }}
                />
              </View>
              {/* Leaseholders Data  */}
              <View>
                <Text
                  style={[
                    ViewApplicationSummaryStyle.applicationSumDet,
                    { marginTop: 5 },
                  ]}>
                  {'Leaseholders'}
                </Text>
                <View style={ViewApplicationSummaryStyle?.rowStyle}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      { color: _COLORS?.Kodie_MediumGrayColor },
                    ]}>
                    {'# of leaseholders'}
                  </Text>
                  <Text
                    style={ViewApplicationSummaryStyle?.occupantNumberStyle}>
                    {leaseholderDataList.length}
                  </Text>
                </View>
                <FlatList
                  data={leaseholderDataList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={leaseHolderRenderItem}
                  ListEmptyComponent={() => {
                    return (
                      <ListEmptyComponent
                        EmptyText={'No leaseholders available.'}
                        EmptyStyle={{ marginVertical: 15 }}
                      />
                    );
                  }}
                />
                <View style={ViewApplicationSummaryStyle?.screenReportMainview}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      { alignSelf: 'center' },
                    ]}>
                    {'Screening result'}
                  </Text>
                  <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                    {occupantButtonData.length > 0 && (
                      <ToggleButton
                        tabValue={occupantButtonId} // This reflects the currently selected value
                        setTabValue={newValue => handleToggle(newValue)} // Pass the new value here
                        activeColor={_COLORS.Kodie_GreenColor}
                        inactiveColor={_COLORS.Kodie_WhiteColor}
                        activeTextColor={_COLORS.Kodie_WhiteColor}
                        inactiveTextColor={_COLORS.Kodie_BlackColor}
                        firstTabLabel={occupantButtonData[0].lookup_description}
                        secondTabLabel={
                          occupantButtonData[1].lookup_description
                        }
                        width={200}
                        firstTabValue={occupantButtonData[0].lookup_key} // This is the value for the first tab
                        secondTabValue={occupantButtonData[1].lookup_key} // This is the value for the second tab
                      />
                    )}
                  </View>
                </View>
              </View>
              {occupantButtonId === 556 && (
                <View>
                  <Text style={ViewApplicationSummaryStyle?.headingText}>
                    {'Reason for rejection'}
                  </Text>
                  <TextInput
                    value={occupantReasonOfReject}
                    onChangeText={text => handleOccupantReasonOfReject(text)}
                    onBlur={() =>
                      handleOccupantReasonOfReject(occupantReasonOfReject)
                    }
                    placeholder="Please enter the reason for rejection."
                    numberOfLines={5}
                    multiline
                    textAlignVertical="top"
                    style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                  />
                  {occupantReasonOfRejectError ? (
                    <Text style={ViewApplicationSummaryStyle?.errorText}>
                      {occupantReasonOfRejectError}
                    </Text>
                  ) : null}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      {/* References Data */}
      <View style={{ marginHorizontal: 16 }}>
        <TouchableOpacity
          style={ViewApplicationSummaryStyle.applicationSum_view}
          onPress={() => {
            setReferenceToggle(!referenceToggle);
          }}>
          <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
            {'References'}
          </Text>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.down_Arrow_icon}
            onPress={() => {
              setReferenceToggle(!referenceToggle);
            }}>
            <Fontisto
              name={referenceToggle ? 'angle-up' : 'angle-down'}
              size={15}
              color={_COLORS.Kodie_DarkGrayColor}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <DividerIcon />
        {referenceToggle && (
          <View>
            <View>
              <Text
                style={[
                  ViewApplicationSummaryStyle.applicationSumDet,
                  { marginVertical: 10 },
                ]}>
                {'Employment references'}
              </Text>
              <FlatList
                data={employeeReferencesList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={employeeReferenceRenderItem}
                ListEmptyComponent={() => {
                  return (
                    <ListEmptyComponent
                      EmptyText={'No employment references available.'}
                      EmptyStyle={{ marginVertical: 15 }}
                    />
                  );
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  ViewApplicationSummaryStyle.applicationSumDet,
                  { marginTop: 10 },
                ]}>
                {'Rental references'}
              </Text>
              <FlatList
                data={ReferencesList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={referenceRenderItem}
                ListEmptyComponent={() => {
                  return (
                    <ListEmptyComponent
                      EmptyText={'No rental references available.'}
                      EmptyStyle={{ marginVertical: 15 }}
                    />
                  );
                }}
              />
            </View>
            <View style={ViewApplicationSummaryStyle?.screenReportMainview}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  { alignSelf: 'center' },
                ]}>
                {'Screening result'}
              </Text>
              <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                {referenceAcceptButtonData.length > 0 && (
                  <ToggleButton
                    tabValue={referenceAcceptButtonId} // Current selected value
                    setTabValue={newValue => handleReferencesToggle(newValue)} // Pass new value here
                    activeColor={_COLORS.Kodie_GreenColor}
                    inactiveColor={_COLORS.Kodie_WhiteColor}
                    activeTextColor={_COLORS.Kodie_WhiteColor}
                    inactiveTextColor={_COLORS.Kodie_BlackColor}
                    firstTabLabel={
                      referenceAcceptButtonData[0].lookup_description
                    }
                    secondTabLabel={
                      referenceAcceptButtonData[1].lookup_description
                    }
                    width={200}
                    firstTabValue={referenceAcceptButtonData[0].lookup_key} // First tab key
                    secondTabValue={referenceAcceptButtonData[1].lookup_key} // Second tab key
                  />
                )}
              </View>
            </View>
            {referenceAcceptButtonId == 556 && (
              <View>
                <Text style={ViewApplicationSummaryStyle?.headingText}>
                  {'Reason for rejection'}
                </Text>
                <TextInput
                  value={referenceReasonOfReject}
                  onChangeText={text => handleReferenceReasonOfReject(text)}
                  onBlur={() =>
                    handleReferenceReasonOfReject(referenceReasonOfReject)
                  }
                  placeholder="Please enter the reason for rejection."
                  numberOfLines={5}
                  multiline
                  textAlignVertical="top"
                  style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                />
                {referenceReasonOfRejectError ? (
                  <Text style={ViewApplicationSummaryStyle?.errorText}>
                    {referenceReasonOfRejectError}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        )}
      </View>
      {/* <DividerIcon borderBottomWidth={2} /> */}

      {/* This will open in Phase three */}
      {/* <View style={{marginHorizontal: 16}}>
        <Text style={ViewApplicationSummaryStyle.inspections}>
          {'Tenant  screening report (recommended)'}
        </Text>

        <View style={ViewApplicationSummaryStyle.container}>
          <View style={ViewApplicationSummaryStyle.pdfInfo}>
            <FontAwesome
              name="file-pdf-o"
              size={35}
              color={_COLORS.Kodie_BlackColor}
              resizeMode={'contain'}
            />
            <View style={ViewApplicationSummaryStyle.textContainer}>
              <Text style={ViewApplicationSummaryStyle.pdfName}>
                {'Tenant  screening report.pdf'}
              </Text>
              <Text style={ViewApplicationSummaryStyle.pdfSize}>
                {' '}
                {'4.5 MB'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={ViewApplicationSummaryStyle.crossIcon}
            onPress={() => {
              // setFilePath();
              // setFileKey();
            }}>
            <Entypo name="cross" size={25} color={_COLORS.Kodie_GrayColor} />
          </TouchableOpacity>
        </View>
      </View> */}

      <DividerIcon borderBottomWidth={2} />
      {offerForMyPropData?.landlord_approve == 1 &&
        offerForMyPropData?.screening_one == 555 &&
        offerForMyPropData?.screening_two == 555 &&
        offerForMyPropData?.screening_three == 555 ? (
        <View style={{ marginHorizontal: 16 }}>
          <CustomSingleButton
            _ButtonText={'Back'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            text_Size={18}
            marginBottom={12}
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
      ) : (
        <View style={{ marginBottom: 20, marginHorizontal: 16 }}>
          <RowButtons
            leftButtonHeight={44}
            RightButtonHeight={44}
            LeftButtonText={'Back'}
            RightButtonText={accpetingLandlordId == null ? 'Done' : 'Edit'}
            leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
            LeftButtonborderColor={_COLORS.Kodie_BlackColor}
            LeftButtonTextColor={_COLORS.Kodie_BlackColor}
            onPressLeftButton={() => {
              navigation.pop();
            }}
            RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
            RightButtonborderColor={_COLORS.Kodie_BlackColor}
            RightButtonTextColor={_COLORS.Kodie_WhiteColor}
            onPressRightButton={() => {
              // handleSubmit();
              handleFinalAcceptOffer();
            }}
          />
        </View>
      )}
      {/* {isLoading ? <CommonLoader /> : null} */}
    </View>
  );
};

export default ViewApplicationSummary;
