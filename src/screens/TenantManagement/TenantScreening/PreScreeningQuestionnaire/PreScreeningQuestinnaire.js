import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {FONTFAMILY, _COLORS} from '../../../../Themes';
import {PreScreeningQuestinnaireStyle} from './PreScreeningQuesionnaireStyle';
import UserDetails from '../../../../components/PropertyViewApplication/UserDetails/UserDetails';
import PreRentalQuestionnaire from '../../../../components/PropertyViewApplication/UserDetails/PreRentalQuestionnaire/PreRentalQuestionnaire';
import TopHeader from '../../../../components/Molecules/Header/Header';
import DividerIcon from '../../../../components/Atoms/Devider/DividerIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {_goBack} from '../../../../services/CommonServices';
const PreScreeningQuestinnaire = props => {
  const TenantAllDetails = props?.route?.params?.TenantAllDetails;
  console.log('TenantAllDetails in screening...', JSON.stringify(TenantAllDetails));
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView style={PreScreeningQuestinnaireStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'View application'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDetails tenantAccountDetails={TenantAllDetails?.account_details?.[0]}/>
        <DividerIcon />
        <View style={PreScreeningQuestinnaireStyle.ApartmentMainView}>
          <Text style={PreScreeningQuestinnaireStyle.apartmentText}>
            {'NA'}
          </Text>
          <Text style={PreScreeningQuestinnaireStyle.cityText}>{'NA'}</Text>
          <View style={PreScreeningQuestinnaireStyle.flat_MainView}>
            <MaterialCommunityIcons
              name={'map-marker'}
              size={15}
              color={_COLORS.Kodie_GreenColor}
              style={{marginTop: 10}}
            />
            <Text style={[PreScreeningQuestinnaireStyle.locationText]}>
              {'NA'}
            </Text>
          </View>
        </View>
        <DividerIcon />
        <DividerIcon />
        <View style={PreScreeningQuestinnaireStyle.summaryView}>
          <Text style={PreScreeningQuestinnaireStyle.cityText}>
            {'Pre-rental questionnaire'}
          </Text>
        </View>
        {/* <PreRentalQuestionnaire
        accountId={loginData?.Login_details?.user_account_id}
        propertyId={propertyId}
        bid_id={bid_id}
        tenant_id={tenant_id}
        landlord_id={landlord_id}
        acceptBiddingData={acceptBiddingData}
      /> */}
        {isLoading ? <CommonLoader /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreScreeningQuestinnaire;
