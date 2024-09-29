import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../../services/CommonServices';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import UserDetails from '../../../../../components/PropertyViewApplication/UserDetails/UserDetails';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import {UserDetailsStyle} from '../../../../../components/PropertyViewApplication/UserDetails/UserDetailsStyle';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
import {PropertyViewApplicationStyle} from './PropertyViewApplicationStyle';
import RowTexts from '../../../../../components/Molecules/RowTexts/RowTexts';
import PreRentalQuestionnaire from '../../../../../components/PropertyViewApplication/UserDetails/PreRentalQuestionnaire/PreRentalQuestionnaire';
import {useSelector} from 'react-redux';
import {
  PropertyViewApplicationService,
  QuestionDetailsForTenantQues,
} from '../../../../../services/PropertyRentalOfferApi/PropertyViewApplicationApi';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
import {SignupLookupDetails} from '../../../../../APIs/AllApi';
import {acceptingLandlord} from '../../../../../services/PropertyRentalOfferApi/AcceptingBiddingApi';
import ViewApplicationSummary from '../ViewApplicationSummary/ViewApplicationSummary';
import RowButtons from '../../../../../components/Molecules/RowButtons/RowButtons';
const PropertyViewApplication = props => {
  const {
    propertyId,
    bid_id,
    tenant_id,
    landlord_id,
    Pre_screening,
    accpetingLandlordId,
    offerForMyPropData,
  } = props.route.params; // Accessing params from props

  // Logging the values for debugging
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
      p_account_id: loginData?.Login_details?.user_account_id,
      p_property_id: propertyId,
      // p_property_id: 1934,
    };
    try {
      const response = await QuestionDetailsForTenantQues(TenantQuestPayload);
      console.log(
        'response in tenant question..',
        JSON.stringify(response?.data?.[0].parent_json),
      );
      setTenantQuestDetails(response?.data?.[0].parent_json);
      setIsLoading(false);

      // if (response?.data?.success === true) {
      //   console.log(
      //     'QuestionDetailsForTenantQues response....',
      //     JSON.stringify(response?.data),
      //   );
      //   setTenantQuestDetails(response?.data[0]?.parent_json);
      //   console.log("setTenantQuestDetails....",JSON.stringify(response?.data))

      // }
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
        onPressLeftButton={() => _goBack(props)}
        MiddleText={Pre_screening ? 'Pre-screening' : 'View application'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDetails tenantAccountDetails={tenantAccountDetails} />
        <DividerIcon />
        <View style={PropertyViewApplicationStyle.ApartmentMainView}>
          <Text style={PropertyViewApplicationStyle.apartmentText}>
            {tenantDetails?.property_type}
          </Text>
          <Text style={PropertyViewApplicationStyle.cityText}>
            {tenantDetails?.city}
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
        <DividerIcon />
        {/* <View style={PropertyViewApplicationStyle.summaryView}>
          <Text style={PropertyViewApplicationStyle.cityText}>
            {'Offer summary'}
          </Text>
          <RowTexts
            leftText={'Lease start date'}
            rightText={'1 September 2023'}
          />
          <RowTexts leftText={'Length of lease'} rightText={'6 months'} />
          <RowTexts
            leftText={'Rental payment frequency'}
            rightText={'Weekly'}
          />
          <RowTexts leftText={'Rental amount'} rightText={'$870'} />
          <TouchableOpacity
            style={PropertyViewApplicationStyle.readMoreTextContainer}>
            <Text style={PropertyViewApplicationStyle.readMoreText}>
              {'read more'}
            </Text>
          </TouchableOpacity>
        </View> */}
        <Text
          style={PropertyViewApplicationStyle.summaryText}
          numberOfLines={2}
          ellipsizeMode="tail">
          {tenantAccountDetails?.UAD_BIO}
        </Text>
        <DividerIcon />
        {/* <View style={PropertyViewApplicationStyle.summaryView}>
          <Text style={PropertyViewApplicationStyle.cityText}>
            {'Pre-rental questionnaire'}
          </Text>
        </View> */}
        {/* <PreRentalQuestionnaire
          accountId={loginData?.Login_details?.user_account_id}
          propertyId={propertyId}
          bid_id={bid_id}
          tenant_id={tenant_id}
          landlord_id={landlord_id}
          acceptBiddingData={acceptBiddingData}
        /> */}

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
        {/* <DividerIcon borderBottomWidth={2} />

        <View style={{marginHorizontal: 16}}>
          <Text style={PropertyViewApplicationStyle.inspections}>
            {'Tenant  screening report (recommended)'}
          </Text>

          <View style={PropertyViewApplicationStyle.container}>
            <View style={PropertyViewApplicationStyle.pdfInfo}>
              <FontAwesome
                name="file-pdf-o"
                size={35}
                color={_COLORS.Kodie_BlackColor}
                resizeMode={'contain'}
              />
              <View style={PropertyViewApplicationStyle.textContainer}>
                <Text style={PropertyViewApplicationStyle.pdfName}>
                  {'Tenant  screening report.pdf'}
                </Text>
                <Text style={PropertyViewApplicationStyle.pdfSize}>
                  {' '}
                  {'4.5 MB'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={PropertyViewApplicationStyle.crossIcon}
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
            RightButtonText={'Done'}
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
              alert('approve');
            }}
          />
        </View> */}
        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewApplication;
