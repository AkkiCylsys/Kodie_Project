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

const TenantScreening = props => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const [TenantAllDetails, setTenantAllDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTenantList, setSearchTenantList] = useState([]);
  useEffect(() => {
    handleTenantScreening();
  }, []);
  const handleTenantScreening = async () => {
    setIsLoading(true);
    const TenantAllDetailsData = {
      filter: 'Prospects',
      account_id: 730,
    };
    try {
      const response = await getTenantAllDetailsService(TenantAllDetailsData);
      console.log('TenantAllDetails in tenant screening..', response);
      if (response?.success === true) {
        setTenantAllDetails(response?.data);
        console.log(
          'TenantAllDetails in tenant screening..in data',
          JSON.stringify(response?.data),
        );
      }
    } catch (error) {
      console.error('Error fetching TenantAllDetails ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchTeanant = (query) => {
    setSearchQuery(query);
    console.log("Search Query:", query);
    const filtered = query
      ? TenantAllDetails.filter(item => {
          const firstName = item?.account_details?.[0]?.UAD_FIRST_NAME?.toLowerCase() || '';
          console.log("Checking Name:", firstName);
          return firstName.startsWith(query.toLowerCase());
        })
      : TenantAllDetails;
    setSearchTenantList(filtered);
    console.log("Filtered Results:", filtered);
  };
  


  

  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return <CurrentTenant />;
      case 'Tab2':
        return <PreviousTenant />;
      case 'Tab3':
        return (
          <ProspectsTenant
            TenantAllDetails={searchQuery ? searchTenantList : TenantAllDetails}
          />
        );
      default:
        return <CurrentTenant />;
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
        TAB3
        Tab1={'Current'}
        Tab2={'Previous'}
        Tab3={'Prospects'}
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
        searchData={searchTeanant}
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
            //   onPress={props.propertyDetail}
            disabled={isLoading ? true : false}
          />
        </View>
        <DividerIcon
          borderBottomWidth={8}
          color={_COLORS.Kodie_LiteWhiteColor}
        />
        {checkTabs()}
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default TenantScreening;
