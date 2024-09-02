import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TenantScreeningStyle} from './TenantScreeningStyle';
import {_COLORS, IMAGES} from '../../../Themes';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import TopHeader from '../../../components/Molecules/Header/Header';
import CurrentTenant from '../../Tenant/CurrentTenant/CurrentTenant';
import ProspectsTenant from '../ProspectsTenant/ProspectsTenant';
import PreviousTenant from '../../Tenant/PreviousTenant/PreviousTenant';
import {getTenantAllDetailsService} from '../../../services/TenantManagementsServices/TenantScreeningServices/TenantScreeningServices';
import CustomSingleButton from '../../../components/Atoms/CustomButton/CustomSingleButton';
import SearchBar from '../../../components/Molecules/SearchBar/SearchBar';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import {CommonLoader} from '../../../components/Molecules/ActiveLoader/ActiveLoader';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const TenantScreening = props => {
  const navigation = useNavigation();
  const loginData = useSelector(state => state.authenticationReducer.data);
  const isFocus = useIsFocused();
  const [activeTab, setActiveTab] = useState('Tab1');
  const [TenantAllDetails, setTenantAllDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTenantList, setSearchTenantList] = useState([]);

  useEffect(() => {
    if (isFocus) {
      handleTenantScreening();
    }
  }, [activeTab, isFocus]);

  const handleTenantScreening = async () => {
    setIsLoading(true);
    setTenantAllDetails([]);
    setSearchTenantList([])
    const filterType =
      activeTab === 'Tab1'
        ? 'Current'
        : activeTab === 'Tab2'
        ? 'Previous'
        : 'Prospects';
    const TenantAllDetailsData = {
      filter: filterType,
      account_id: loginData?.Login_details?.user_account_id,
    };
    console.log('TenantAllDetailsData. in payload...', TenantAllDetailsData);
    try {
      const response = await getTenantAllDetailsService(TenantAllDetailsData);
      console.log('TenantAllDetails in tenant screening:', response);
      if (response?.success) {
        console.log(
          'TenantAllDetails in tenant screening data :...',
          JSON.stringify(response?.data),
        );
        setTenantAllDetails(response?.data);
        setSearchTenantList(response?.data); // Initialize search list with the full data set
      }
    } catch (error) {
      console.error('Error fetching TenantAllDetails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchTenant = query => {
    setSearchQuery(query);
    console.log('Search Query:', query);

    const filtered = query
      ? TenantAllDetails.filter(
          item =>
            item?.account_details[0].UAD_FIRST_NAME &&
            item?.account_details[0].UAD_FIRST_NAME.toLowerCase().includes(
              query.toLowerCase(),
            ),
        )
      : TenantAllDetails;

    setSearchTenantList(filtered);
    console.log('Filtered Results:', JSON.stringify(filtered));
  };

  const checkTabs = () => {
    const dataToPass = searchQuery ? searchTenantList : TenantAllDetails;
    switch (activeTab) {
      case 'Tab1':
        return <ProspectsTenant TenantAllDetails={dataToPass} />;
      case 'Tab2':
        return <ProspectsTenant TenantAllDetails={dataToPass} />;
      case 'Tab3':
        return <ProspectsTenant TenantAllDetails={dataToPass} />;
      default:
        return <ProspectsTenant TenantAllDetails={dataToPass} />;
    }
  };

  return (
    <SafeAreaView style={TenantScreeningStyle.Container}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate('Dashboard')}
        MiddleText={'Tenants'}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        Tab1={'Current'}
        Tab2={'Previous'}
        Tab3={'Prospects'}
        TAB3
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
        styleTab1={activeTab === 'Tab1' && TenantScreeningStyle.activeTab}
        styleTab2={activeTab === 'Tab2' && TenantScreeningStyle.activeTab}
        styleTab3={activeTab === 'Tab3' && TenantScreeningStyle.activeTab}
      />
      <View style={TenantScreeningStyle.Line} />
      <SearchBar
        filterImage={IMAGES.filter}
        isFilterImage={true}
        height={48}
        marginTop={20}
        placeholder={'Search tenants'}
        frontSearchIcon
        searchData={searchTenant}
        filterIcon="filter"
        iconSet="AntDesign"
      />
      <DividerIcon borderBottomWidth={8} color={_COLORS.Kodie_LiteWhiteColor} />
      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          <CustomSingleButton
            _ButtonText={'+ Add tenant'}
            Text_Color={_COLORS.Kodie_WhiteColor}
            text_Size={14}
            backgroundColor={_COLORS.Kodie_BlackColor}
            disabled={isLoading}
            onPress={() => navigation.navigate('Invitefriend')}
          />
        </View>
        <DividerIcon
          borderBottomWidth={8}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        {checkTabs()}
      </ScrollView>
      {isLoading && <CommonLoader />}
    </SafeAreaView>
  );
};

export default TenantScreening;
