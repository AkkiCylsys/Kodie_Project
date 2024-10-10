import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {VacantPropertiesListStyle} from './VacantPropertiesListStyle';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, IMAGES} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import PropertyListing from '../../components/Molecules/PropertyListings/PropertyListing';
import {CommonLoader} from '../../components/Molecules/ActiveLoader/ActiveLoader';
import {Config} from '../../Config';
import {useSelector} from 'react-redux';
import axiosInstance from '../../services/axiosInstance';

const VacantPropertiesList = props => {
  const loginData = useSelector(state => state.authenticationReducer.data);

  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [vacantData, setVacantData] = useState([]);

  const accountId = loginData?.Login_details?.user_account_id;
  useEffect(() => {
    get_Vacant_Details();
  }, []);

  const swipeVacantList = () => {
    // Reverse the entire list
    const reversedData = [...vacantData].reverse();
    
    // Update the state with the reversed list
    setVacantData(reversedData);
    setFilteredUsers(reversedData);
  };
  
  const toggleSortOrder = () => {
    // Toggle the sort order between ascending and descending
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  
    // Reverse the list when toggling
    swipeVacantList();
  };
  
  const searchVacantProperty = query => {
    setSearchQuery(query);
  
    const filtered = query
      ? vacantData.filter(item => {
          const propertyTypeMatch =
            item.property_type &&
            item.property_type.toLowerCase().includes(query.toLowerCase());
  
          const cityMatch =
            item.City && item.City.toLowerCase().includes(query.toLowerCase());
  
          const stateMatch =
            item.state && item.state.toLowerCase().includes(query.toLowerCase());
  
          const countryMatch =
            item.country && item.country.toLowerCase().includes(query.toLowerCase());
  
          const locationMatch =
            item.location &&
            item.location.toLowerCase().includes(query.toLowerCase());
  
          // Return true if any of the fields match the query
          return (
            propertyTypeMatch || cityMatch || stateMatch || countryMatch || locationMatch
          );
        })
      : vacantData;
  
    setFilteredUsers(filtered);
  };
  const get_Vacant_Details = async () => {
    try {
      const url = Config.BASE_URL;
      const Vacant_Details_url ='get_vacant_property_list';
      setIsLoading(true);
      const data = {
        account_id: accountId,
      };
      const response = await axiosInstance.post(Vacant_Details_url, data);
      if (response?.data?.success === true) {
        const data = response?.data?.property_details || [];
        console.log('vacant DataList..', data);
        setVacantData(data);
        setFilteredUsers(data); // Initialize filteredUsers with fetched data
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error('API failed Vacant_Details', error);
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <SafeAreaView style={VacantPropertiesListStyle.maincontainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Vacant'}
      />
      <ScrollView>
        <View style={VacantPropertiesListStyle.searchview}>
          <SearchBar
            marginTop={1}
            frontSearchIcon
            updownSearch
            height={45}
            searchData={searchVacantProperty}
            SortedData={toggleSortOrder}
            upArrow={sortOrder === 'asc' ? 'long-arrow-up' : 'long-arrow-down'}
            downArrow={
              sortOrder === 'asc' ? 'long-arrow-down' : 'long-arrow-up'
            }
            placeholder={'Search Properties'}
          />
        </View>
        <DividerIcon style={VacantPropertiesListStyle.divider} />
        <View>
          <PropertyListing
            filteredUsers={filteredUsers}
            searchQuery={searchQuery}
            vacantData={vacantData}
            get_Vacant_Details={get_Vacant_Details}
          />
        </View>
      </ScrollView>
      {isLoading ? <CommonLoader /> : null}
    </SafeAreaView>
  );
};

export default VacantPropertiesList;
