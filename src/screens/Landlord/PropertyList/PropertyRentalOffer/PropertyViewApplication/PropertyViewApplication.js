import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../../services/CommonServices';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import UserDetails from '../../../../../components/PropertyViewApplication/UserDetails/UserDetails';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
import {PropertyViewApplicationStyle} from './PropertyViewApplicationStyle';
import {useSelector} from 'react-redux';
import {
  PropertyViewApplicationService,
  QuestionDetailsForTenantQues,
} from '../../../../../services/PropertyRentalOfferApi/PropertyViewApplicationApi';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';
import ViewApplicationSummary from '../ViewApplicationSummary/ViewApplicationSummary';

const PropertyViewApplication = props => {
  const {
    propertyId,
    bid_id,
    tenant_id,
    landlord_id,
    Pre_screening,
    accpetingLandlordId,
    offerForMyPropData,
  } = props.route.params;
  console.log('accpetingLandlordId...', accpetingLandlordId);
  console.log('offerForMyPropData...', offerForMyPropData);
  console.log('bid_id..', bid_id);
  console.log('propertyId..', propertyId);
  console.log('tenant_id..', tenant_id);
  const [isLoading, setIsLoading] = useState(false);
  const [tenantDetails, setTenantDetails] = useState(false);
  const [tenantAccountDetails, setTenantAccountDetails] = useState(false);
  const [tenantQuestDetails, setTenantQuestDetails] = useState([]);
  const [acceptBiddingData, setAcceptBiddingData] = useState([]);
  const loginData = useSelector(state => state.authenticationReducer.data);

  console.log('loginData in view ..', loginData);
  useEffect(() => {
    handlePropertyViewApplication();
    handleQuestionDetailsForTenantQues();
    handleAcceptBidding();
  }, []);
  const handlePropertyViewApplication = async () => {
    setIsLoading(true);
    const propertyViewApplicationData = {
      account_id: tenant_id,
      property_id: propertyId,
      bid_id: bid_id,
    };
    try {
      const response = await PropertyViewApplicationService(
        propertyViewApplicationData,
      );
      if (response?.success === true) {
        setTenantDetails(response?.data[0]);
        setTenantAccountDetails(response?.data[0]?.account_details[0]);
        console.log('response data in view application...', response?.data[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching PropertyViewApplication:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleQuestionDetailsForTenantQues = async () => {
    setIsLoading(true);
    const TenantQuestPayload = {
      p_account_id: tenant_id,
      p_property_id: propertyId,
    };
    try {
      const response = await QuestionDetailsForTenantQues(TenantQuestPayload);
      console.log(
        'response in tenant question..',
        JSON.stringify(response?.data?.[0].parent_json),
      );
      setTenantQuestDetails(response?.data?.[0].parent_json);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching PropertyViewApplication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptBidding = async () => {
    setIsLoading(true);
    try {
      const res = await SignupLookupDetails({
        P_PARENT_CODE: 'ACCEPT_LANDLORD',
        P_TYPE: 'OPTION',
      });

      console.log('accept bidding button data...', res);
      if (res.status === true) {
        setAcceptBiddingData(res?.lookup_details);
        console.log('res?.lookup_details....', res?.lookup_details);
      } else {
        console.error(
          'Error: Unable to fetch Accept bidding data',
          JSON.stringify(res),
        );
        setIsLoading(false);
        return [];
      }
    } catch (error) {
      console.log('error in accept bidding.....', error);
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={PropertyViewApplicationStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => {
          _goBack(props);
        }}
        MiddleText={Pre_screening ? 'Pre-screening' : 'View application'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDetails tenantAccountDetails={tenantAccountDetails} />
        <DividerIcon
          borderBottomWidth={2}
          marginTop={25}
          borderColor={_COLORS?.Kodie_deviderIconColor}
        />
        <View style={PropertyViewApplicationStyle.ApartmentMainView}>
          <Text style={PropertyViewApplicationStyle.apartmentText}>
            {tenantDetails?.property_type}
          </Text>
          <Text style={PropertyViewApplicationStyle.cityText}>
            {tenantDetails?.city && tenantDetails?.city !== 'null'
              ? tenantDetails?.city
              : tenantDetails?.state || ''}
          </Text>
          <View style={PropertyViewApplicationStyle.flat_MainView}>
            <MaterialCommunityIcons
              name={'map-marker'}
              size={15}
              color={_COLORS.Kodie_GreenColor}
              style={{marginTop: 10}}
            />
            <Text style={[PropertyViewApplicationStyle.locationText]}>
              {tenantDetails?.location}
            </Text>
          </View>
        </View>
        <DividerIcon
          borderBottomWidth={2}
          marginTop={25}
          borderColor={_COLORS?.Kodie_deviderIconColor}
        />

        <Text
          style={PropertyViewApplicationStyle.summaryText}
          numberOfLines={3}
          ellipsizeMode="tail">
          {tenantAccountDetails?.UAD_BIO}
        </Text>
        <DividerIcon
          borderBottomWidth={2}
          borderColor={_COLORS?.Kodie_deviderIconColor}
        />

        <View style={{}}>
          <ViewApplicationSummary
            tenantQuestDetails={tenantQuestDetails}
            tenant_id={tenant_id}
            bid_id={bid_id}
            propertyId={propertyId}
            landlord_id={landlord_id}
            accpetingLandlordId={accpetingLandlordId}
            offerForMyPropData={offerForMyPropData}
          />
        </View>

        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewApplication;
