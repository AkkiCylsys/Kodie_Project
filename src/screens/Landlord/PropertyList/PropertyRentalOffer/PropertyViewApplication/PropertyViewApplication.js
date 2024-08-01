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
import UserDetails from '../../../../../components/PropertyViewApplication/UserDetails/UserDetails';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import {UserDetailsStyle} from '../../../../../components/PropertyViewApplication/UserDetails/UserDetailsStyle';
import {_COLORS, FONTFAMILY} from '../../../../../Themes';
import {PropertyViewApplicationStyle} from './PropertyViewApplicationStyle';
import RowTexts from '../../../../../components/Molecules/RowTexts/RowTexts';
import PreRentalQuestionnaire from '../../../../../components/PropertyViewApplication/UserDetails/PreRentalQuestionnaire/PreRentalQuestionnaire';
import {useSelector} from 'react-redux';
import {PropertyViewApplicationService} from '../../../../../services/PropertyRentalOfferApi/PropertyViewApplicationApi';
import {CommonLoader} from '../../../../../components/Molecules/ActiveLoader/ActiveLoader';
const PropertyViewApplication = props => {
  const propertyId = props.route.params.propertyId;
  const bid_id = props.route.params.bid_id;
  const tenant_id = props.route.params.tenant_id;
  const [isLoading, setIsLoading] = useState(false);
  const [tenantDetails, setTenantDetails] = useState(false);
  const [tenantAccountDetails, setTenantAccountDetails] = useState(false);

  const loginData = useSelector(state => state.authenticationReducer.data);

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
      console.log('response in PropertyViewApplication..', response?.data[0]);
      if (response?.success === true) {
        setTenantDetails(response?.data[0]);
        setTenantAccountDetails(response?.data[0]?.account_details[0]);
        console.log(
          'Accountdetails...',
          JSON.stringify(response?.data[0]?.account_details),
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching PropertyViewApplication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePropertyViewApplication();
  }, []);
  return (
    <SafeAreaView style={PropertyViewApplicationStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'View application'}
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
        <View style={PropertyViewApplicationStyle.summaryView}>
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
        </View>
        <DividerIcon />
        <View style={PropertyViewApplicationStyle.summaryView}>
          <Text style={PropertyViewApplicationStyle.cityText}>
            {'Pre-rental questionnaire'}
          </Text>
        </View>
        <PreRentalQuestionnaire
          accountId={loginData?.Login_details?.user_account_id}
          propertyId={propertyId}
        />
        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewApplication;
