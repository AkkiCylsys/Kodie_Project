import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {ViewApplicationSummaryStyle} from './ViewApplicationSummaryStyle';

import {_COLORS, FONTFAMILY} from '../../../../../Themes';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import RowTexts from '../../../../../components/Molecules/RowTexts/RowTexts';
import ToggleButton from '../../../../../components/Molecules/ToggleButton/ToggleButton';
import CustomSingleButton from '../../../../../components/Atoms/CustomButton/CustomSingleButton';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import moment from 'moment';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
import {
  getLandlordDetailsByAcceptingId,
  saveLandLordAcceptingService,
  UpdateLandLordAcceptingService,
} from '../../../../../services/PropertyRentalOfferApi/PropertyViewApplicationApi';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

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
  } = props;
  const navigation = useNavigation();
  console.log('accpetingLandlordId in summary page..', accpetingLandlordId);
  console.log('bid_id in summary page..', bid_id);
  const [isLoading, setIsLoading] = useState(false);
  const [applicationSumReasonOfReject, setApplicationSumReasonOfReject] =
    useState('');
  const [occupantReasonOfReject, setOccupantReasonOfReject] = useState('');
  const [referenceReasonOfReject, setReferenceReasonOfReject] = useState('');
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
        handleGetLandLordDeatils();  // Invoke the function here
      }
    }, [accpetingLandlordId]),
  );
  
  console.log('tenantQuestDetails....', JSON.stringify(tenantQuestDetails));
  console.log(
    'tenantQuestDetails in second obj....',
    JSON.stringify(tenantQuestDetails[1]?.children),
  );

  const filteredData =
    tenantQuestDetails[0]?.children?.filter(
      item => item.tqm_Question_view !== null,
    ) || [];
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
        alert(response?.data);
        navigation?.navigate('Properties', {
          acceptLanlordPassed: 'acceptLanlordPassed',
        });
        applicationSumAcceptButtonId(null);
        occupantButtonId(null);
        referenceAcceptButtonId(null);
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
      screening_one_reason: applicationSumReasonOfReject,
      screening_two_reason: occupantReasonOfReject,
      screening_three_reason: referenceReasonOfReject,
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
        alert(response?.data);
        navigation?.navigate('Properties', {
          acceptLanlordPassed: 'acceptLanlordPassed',
        });
        applicationSumAcceptButtonId(null);
        occupantButtonId(null);
        referenceAcceptButtonId(null);
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
    if (!validateSelections()) return;

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
  };
  const handleReferencesToggle = key => {
    setReferenceAcceptButtonId(key);
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
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      //   removeOccupant(index);
                    },
                  },
                ],
              );
            }}
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
          <Text
            style={[ViewApplicationSummaryStyle.occupants_email, {width: 200}]}>
            {item?.confirmEmailAddress}
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
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      //   removeOccupant(index);
                    },
                  },
                ],
              );
            }}
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
            {'Jason Macfie'}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {'Manager'}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {'info@kodie.com.au'}
          </Text>
          <Text style={ViewApplicationSummaryStyle.occupants_email}>
            {'0402 123 124'}
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
            onPress={() => {
              Alert.alert(
                'Remove person?',
                'This person will be permanently removed from the application.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Remove',
                    onPress: () => {
                      console.log('Remove');
                      //   removeOccupant(index);
                    },
                  },
                ],
              );
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={ViewApplicationSummaryStyle?.mainContainer}>
      {/* Application summary Data */}
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
                data={filteredData} // Use the filtered data
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
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
                renderItem={({item}) => (
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
                renderItem={({item}) => (
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
                {'Preferences'}
              </Text>
              <FlatList
                data={peferencefilteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  {alignSelf: 'center'},
                ]}>
                {'Screening result'}
              </Text>
              <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                {applicationSumAcceptButtonData.length > 0 && (
                  <ToggleButton
                    tabValue={applicationSumAcceptButtonId}
                    setTabValue={handleApplicationSumToggle} // Directly pass handleToggle
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
                    firstTabValue={applicationSumAcceptButtonData[0].lookup_key} // Pass the first tab key
                    secondTabValue={
                      applicationSumAcceptButtonData[1].lookup_key
                    } // Pass the second tab key
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
                  onChangeText={text => setApplicationSumReasonOfReject(text)}
                  placeholder="Please enter the Reason for rejection."
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Occupante Data  */}
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
                    style={ViewApplicationSummaryStyle?.occupantNumberStyle}>
                    {occupantDataList.length}
                  </Text>
                </View>
                <FlatList
                  data={occupantDataList}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={occupantRenderItem}
                />
              </View>
              {/* Leaseholders Data  */}
              <View>
                <Text
                  style={[
                    ViewApplicationSummaryStyle.applicationSumDet,
                    {marginTop: 5},
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
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      ViewApplicationSummaryStyle?.headingText,
                      {alignSelf: 'center'},
                    ]}>
                    {'Screening result'}
                  </Text>
                  <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                    {occupantButtonData.length > 0 && (
                      <ToggleButton
                        tabValue={occupantButtonId}
                        setTabValue={handleToggle} // Directly pass handleToggle
                        activeColor={_COLORS.Kodie_GreenColor}
                        inactiveColor={_COLORS.Kodie_WhiteColor}
                        activeTextColor={_COLORS.Kodie_WhiteColor}
                        inactiveTextColor={_COLORS.Kodie_BlackColor}
                        firstTabLabel={occupantButtonData[0].lookup_description}
                        secondTabLabel={
                          occupantButtonData[1].lookup_description
                        }
                        width={200}
                        firstTabValue={occupantButtonData[0].lookup_key} // Pass the first tab key
                        secondTabValue={occupantButtonData[1].lookup_key} // Pass the second tab key
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
                    onChangeText={text => setOccupantReasonOfReject(text)}
                    placeholder="Please enter the Reason for rejection."
                    numberOfLines={5}
                    textAlignVertical="top"
                    style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      {/* References Data */}
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
                data={occupantData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={referenceRenderItem}
              />
            </View>
            <View>
              <Text style={ViewApplicationSummaryStyle.applicationSumDet}>
                {'Rental references'}
              </Text>
              <FlatList
                data={occupantData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={referenceRenderItem}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  ViewApplicationSummaryStyle?.headingText,
                  {alignSelf: 'center'},
                ]}>
                {'Screening result'}
              </Text>
              <View style={ViewApplicationSummaryStyle?.toggleButtonView}>
                {referenceAcceptButtonData.length > 0 && (
                  <ToggleButton
                    tabValue={referenceAcceptButtonId}
                    setTabValue={handleReferencesToggle} // Directly pass handleToggle
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
                    firstTabValue={referenceAcceptButtonData[0].lookup_key} // Pass the first tab key
                    secondTabValue={referenceAcceptButtonData[1].lookup_key} // Pass the second tab key
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
                  onChangeText={text => setReferenceReasonOfReject(text)}
                  placeholder="Please enter the Reason for rejection."
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={ViewApplicationSummaryStyle?.reasonRejectStyle}
                />
              </View>
            )}
          </View>
        )}
      </View>
      <DividerIcon borderBottomWidth={2} />
      <View style={{marginHorizontal: 16}}>
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
      </View>
      <DividerIcon borderBottomWidth={2} />
      <View style={{marginBottom: 20, marginHorizontal: 16}}>
        <RowButtons
          leftButtonHeight={44}
          RightButtonHeight={44}
          LeftButtonText={'Back'}
          RightButtonText={accpetingLandlordId == null ? 'Done' : 'Edit'}
          leftButtonbackgroundColor={_COLORS.Kodie_WhiteColor}
          LeftButtonborderColor={_COLORS.Kodie_BlackColor}
          LeftButtonTextColor={_COLORS.Kodie_BlackColor}
          onPressLeftButton={() => {
            alert('reject');
          }}
          RightButtonbackgroundColor={_COLORS.Kodie_BlackColor}
          RightButtonborderColor={_COLORS.Kodie_BlackColor}
          RightButtonTextColor={_COLORS.Kodie_WhiteColor}
          onPressRightButton={() => {
            handleSubmit();
            // handleSaveLandlordAcceptingDetails();
          }}
        />
      </View>
      {isLoading ? <CommonLoader /> : null}
    </View>
  );
};

export default ViewApplicationSummary;
