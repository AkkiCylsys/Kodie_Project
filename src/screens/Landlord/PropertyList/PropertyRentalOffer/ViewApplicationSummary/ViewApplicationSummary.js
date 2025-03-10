import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import {ViewApplicationSummaryStyle} from './ViewApplicationSummaryStyle';

import {_COLORS, FONTFAMILY} from '../../../../../Themes';
import Fontisto from 'react-native-vector-icons/Fontisto';
import RowTexts from '../../../../../components/Molecules/RowTexts/RowTexts';
import ToggleButton from '../../../../../components/Molecules/ToggleButton/ToggleButton';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import moment from 'moment';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import {
  getLandlordDetailsByAcceptingId,
  saveLandLordAcceptingService,
  UpdateLandLordAcceptingService,
} from '../../../../../services/PropertyRentalOfferApi/PropertyViewApplicationApi';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
        handleGetLandLordDeatils();
      }
    }, [accpetingLandlordId]),
  );

  console.log('tenantQuestDetails....', JSON.stringify(tenantQuestDetails));
  console.log(
    'tenantQuestDetails in second obj....',
    JSON.stringify(tenantQuestDetails[1]?.children),
  );

  const handleApplicationSumReject = text => {
    setApplicationSumReasonOfReject(text);
    const onlySpacesRegex = /^\s*$/;
    if (applicationSumReasonOfReject == '') {
      setApplicationSumReasonOfRejectError(
        'Please enter reason for rejection.',
      );
    } else if (onlySpacesRegex.test(text)) {
      setApplicationSumReasonOfRejectError(
        'Reason for rejection cannot be empty or contain only spaces.',
      );
    } else {
      setApplicationSumReasonOfRejectError('');
    }
  };
  const handleOccupantReasonOfReject = text => {
    setOccupantReasonOfReject(text);
    const onlySpacesRegex = /^\s*$/;
    if (occupantReasonOfReject == '') {
      setOccupantReasonOfRejectError('Please enter reason for rejection.');
    } else if (onlySpacesRegex.test(text)) {
      setOccupantReasonOfRejectError(
        'Reason for rejection cannot be empty or contain only spaces.',
      );
    } else {
      setOccupantReasonOfRejectError('');
    }
  };
  const handleReferenceReasonOfReject = text => {
    setReferenceReasonOfReject(text);
    const onlySpacesRegex = /^\s*$/;
    if (referenceReasonOfReject == '') {
      setReferenceReasonOfRejectError('Please enter reason for rejection.');
    } else if (onlySpacesRegex.test(text)) {
      setReferenceReasonOfRejectError(
        'Reason for rejection cannot be empty or contain only spaces.',
      );
    } else {
      setReferenceReasonOfRejectError('');
    }
  };

  const handleFinalAcceptOffer = () => {
    if (
      !occupantButtonId ||
      !applicationSumAcceptButtonId ||
      !referenceAcceptButtonId
    ) {
      Alert.alert(
        'Warning',
        'Please select either the Accept or Reject option for each section.',
      );
      return;
    }

    if (
      applicationSumAcceptButtonId === 556 &&
      applicationSumReasonOfReject === ''
    ) {
      setApplicationSumReasonOfRejectError(
        'Please enter reason for rejection.',
      );
      return;
    }

    if (occupantButtonId === 556 && occupantReasonOfReject === '') {
      setOccupantReasonOfRejectError('Please enter reason for rejection.');
      return;
    }

    if (referenceAcceptButtonId === 556 && referenceReasonOfReject === '') {
      setReferenceReasonOfRejectError('Please enter reason for rejection.');
      return;
    }

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
  console.log('EmploymentfilteredData..', EmploymentfilteredData);
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
      occupantDataList = JSON.parse(occupantDataListString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }
  console.log('occupantDataList....', occupantDataList);

  const leaseholderDataString =
    tenantQuestDetails[0]?.children[2]?.sub_children[3]?.tqm_Question_value;

  let leaseholderDataList = [];
  if (leaseholderDataString) {
    try {
      leaseholderDataList = JSON.parse(leaseholderDataString);
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
      employeeReferencesList = JSON.parse([employeeReferencesDataString]);
    } catch (error) {
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
      ReferencesList = JSON.parse(ReferencesDataString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  console.log('ReferencesList:', ReferencesList);

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

    setApplicationSumAcceptButtonData(res?.lookup_details);

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
    console.log('Submitting with selections:', {
      occupantButtonId,
      applicationSumAcceptButtonId,
      referenceAcceptButtonId,
    });
    accpetingLandlordId == null
      ? handleSaveLandlordAcceptingDetails()
      : handleUpdateLandlordAcceptingDetails();
  };

  const handleToggle = key => {
    setOccupantButtonId(key);
  };

  const handleApplicationSumToggle = key => {
    setApplicationSumAcceptButtonId(key);
  };
  const handleReferencesToggle = key => {
    setReferenceAcceptButtonId(key);
  };

  const openEmailClient = emailAddress => {
    const mailtoUrl = `mailto:${emailAddress}`;

    Linking.openURL(mailtoUrl)
      .then(() => {})
      .catch(err => {
        console.error('Error opening Gmail client:', err);
      });
  };

  const occupantRenderItem = ({item, index}) => {
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
        <View style={{marginHorizontal: 5}}>
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
  const leaseHolderRenderItem = ({item, index}) => {
    return (
      <View style={ViewApplicationSummaryStyle.occupants_item_View}>
        <View>
          <Text style={ViewApplicationSummaryStyle.occupants_name}>
            {item?.fullName}
          </Text>
          <Text
            style={[ViewApplicationSummaryStyle.occupants_email, {width: 200}]}>
            {item?.emailAddress}
          </Text>
        </View>
        <View style={{marginHorizontal: 5, alignSelf: 'center'}}>
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
  const employeeReferenceRenderItem = ({item, index}) => {
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
        <View style={{marginHorizontal: 5, alignSelf: 'center'}}>
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

  const referenceRenderItem = ({item, index}) => {
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
        <View style={{marginHorizontal: 5, alignSelf: 'center'}}>
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
      <View style={{marginHorizontal: 16}}>
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
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    leftTextStyle={{
                      color: _COLORS?.Kodie_MediumGrayColor,
                    }}
                    rightText={
                      item?.tqm_Question_view === 'Budget' &&
                      item?.tqm_Question_value
                        ? `$${item?.tqm_Question_value}`
                        : item?.tqm_Question_type === 'Dropdown'
                        ? item?.tqm_Question_value_data || '-'
                        : item?.tqm_Question_type === 'Date'
                        ? moment(item?.tqm_Question_value).format(
                            'DD MMMM YYYY',
                          ) || '-'
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
                renderItem={({item}) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    leftTextStyle={{
                      color: _COLORS?.Kodie_MediumGrayColor,
                    }}
                    rightText={
                      item?.tqm_Question_type === 'Dropdown'
                        ? item?.tqm_Question_value_data || '-'
                        : item?.tqm_Question_type === 'Date'
                        ? moment(item?.tqm_Question_value).format(
                            'DD MMMM YYYY',
                          ) || '-'
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
                renderItem={({item}) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    leftTextStyle={{
                      color: _COLORS?.Kodie_MediumGrayColor,
                    }}
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
                renderItem={({item}) => (
                  <RowTexts
                    leftText={item?.tqm_Question_view}
                    leftTextStyle={{
                      color: _COLORS?.Kodie_MediumGrayColor,
                    }}
                    rightText={
                      item?.tqm_Question_code === 'PETS_THEY'
                        ? item?.tqm_Question_value_data
                            ?.split(',')
                            .map(pet => pet.trim())
                            .join(', ') || '-'
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
                  {alignSelf: 'center'},
                ]}>
                {'Screening result'}
              </Text>

              {(offerForMyPropData?.screening_one == 555 &&
                offerForMyPropData?.screening_two == 555 &&
                offerForMyPropData?.screening_three == 555) ||
              (offerForMyPropData?.landlord_finalize == 0 &&
                offerForMyPropData?.landlord_approve == 0) ? (
                <View style={[ViewApplicationSummaryStyle?.acceptTextView]}>
                  <Text style={ViewApplicationSummaryStyle?.AcceptText}>
                    {'Accepted'}
                  </Text>
                </View>
              ) : (
                <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                  {applicationSumAcceptButtonData.length > 0 && (
                    <ToggleButton
                      tabValue={applicationSumAcceptButtonId}
                      setTabValue={newValue =>
                        handleApplicationSumToggle(newValue)
                      }
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
                      width={180}
                      firstTabValue={
                        applicationSumAcceptButtonData[0].lookup_key
                      }
                      secondTabValue={
                        applicationSumAcceptButtonData[1].lookup_key
                      }
                    />
                  )}
                </View>
              )}
            </View>
            {applicationSumAcceptButtonId == 556 && (
              <View>
                <Text style={ViewApplicationSummaryStyle?.headingText}>
                  {'Reason for rejection'}
                </Text>
                <TextInput
                  value={applicationSumReasonOfReject}
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

      <View style={{marginHorizontal: 16}}>
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
                      {color: _COLORS?.Kodie_MediumGrayColor},
                    ]}>
                    {'# of occupants'}
                  </Text>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.occupantNumberStyle,
                      {marginLeft: 110},
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
                        EmptyStyle={{marginVertical: 15}}
                      />
                    );
                  }}
                />
              </View>
              <View>
                <Text
                  style={[
                    ViewApplicationSummaryStyle.applicationSumDet,
                    {marginTop: 5, fontFamily: FONTFAMILY?.K_Bold},
                  ]}>
                  {'Leaseholders'}
                </Text>
                <View style={ViewApplicationSummaryStyle?.rowStyle}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      {color: _COLORS?.Kodie_MediumGrayColor},
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
                        EmptyStyle={{marginVertical: 15}}
                      />
                    );
                  }}
                />
                <View style={ViewApplicationSummaryStyle?.screenReportMainview}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      {alignSelf: 'center'},
                    ]}>
                    {'Screening result'}
                  </Text>
                  {(offerForMyPropData?.screening_one == 555 &&
                    offerForMyPropData?.screening_two == 555 &&
                    offerForMyPropData?.screening_three == 555) ||
                  (offerForMyPropData?.landlord_finalize == 0 &&
                    offerForMyPropData?.landlord_approve == 0) ? (
                    <View style={ViewApplicationSummaryStyle?.acceptTextView}>
                      <Text style={ViewApplicationSummaryStyle?.AcceptText}>
                        {'Accepted'}
                      </Text>
                    </View>
                  ) : (
                    <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                      {occupantButtonData.length > 0 && (
                        <ToggleButton
                          tabValue={occupantButtonId}
                          setTabValue={newValue => handleToggle(newValue)}
                          activeColor={_COLORS.Kodie_GreenColor}
                          inactiveColor={_COLORS.Kodie_WhiteColor}
                          activeTextColor={_COLORS.Kodie_WhiteColor}
                          inactiveTextColor={_COLORS.Kodie_BlackColor}
                          firstTabLabel={
                            occupantButtonData[0].lookup_description
                          }
                          secondTabLabel={
                            occupantButtonData[1].lookup_description
                          }
                          width={180}
                          firstTabValue={occupantButtonData[0].lookup_key}
                          secondTabValue={occupantButtonData[1].lookup_key}
                        />
                      )}
                    </View>
                  )}
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
      <View style={{marginHorizontal: 16}}>
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
                  {marginVertical: 10},
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
                      EmptyStyle={{marginVertical: 15}}
                    />
                  );
                }}
              />
            </View>
            <View>
              <Text
                style={[
                  ViewApplicationSummaryStyle.applicationSumDet,
                  {marginTop: 10},
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
                      EmptyStyle={{marginVertical: 15}}
                    />
                  );
                }}
              />
            </View>
            <View style={ViewApplicationSummaryStyle?.screenReportMainview}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  {alignSelf: 'center'},
                ]}>
                {'Screening result'}
              </Text>
              {(offerForMyPropData?.screening_one == 555 &&
                offerForMyPropData?.screening_two == 555 &&
                offerForMyPropData?.screening_three == 555) ||
              (offerForMyPropData?.landlord_finalize == 0 &&
                offerForMyPropData?.landlord_approve == 0) ? (
                <View style={ViewApplicationSummaryStyle?.acceptTextView}>
                  <Text style={ViewApplicationSummaryStyle?.AcceptText}>
                    {'Accepted'}
                  </Text>
                </View>
              ) : (
                <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                  {referenceAcceptButtonData.length > 0 && (
                    <ToggleButton
                      tabValue={referenceAcceptButtonId}
                      setTabValue={newValue => handleReferencesToggle(newValue)}
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
                      width={180}
                      firstTabValue={referenceAcceptButtonData[0].lookup_key}
                      secondTabValue={referenceAcceptButtonData[1].lookup_key}
                    />
                  )}
                </View>
              )}
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

      <DividerIcon
        borderBottomWidth={2}
        borderColor={_COLORS?.Kodie_deviderIconColor}
      />
      {(offerForMyPropData?.screening_one == 555 &&
        offerForMyPropData?.screening_two == 555 &&
        offerForMyPropData?.screening_three == 555) ||
      (offerForMyPropData?.landlord_finalize == 0 &&
        offerForMyPropData?.landlord_approve == 0) ? (
        <View style={{marginHorizontal: 16}}>
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
        <View style={{marginBottom: 20, marginHorizontal: 16}}>
          <RowButtons
            leftButtonHeight={58}
            RightButtonHeight={58}
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
              handleFinalAcceptOffer();
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ViewApplicationSummary;
