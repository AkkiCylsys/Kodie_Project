import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {VacantPropertiesListStyle} from './VacantPropertiesListStyle';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, IMAGES} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import PropertyListing from '../../components/Molecules/PropertyListings/PropertyListing';
import {CommonLoader} from '../../components/Molecules/ActiveLoader/ActiveLoader';
import {useEffect} from 'react';
import {Config} from '../../Config';
import axios from 'axios';
const VacantPropertiesList = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order is descending
  const [vacantData, setVacantData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    get_Vacant_Details();
  }, []);
  const sortByDate = () => {
    const sortedData = [...vacantData].sort((a, b) => {
      console.log('Sorting:', a.property_id, b.property_id);
      return sortOrder === 'asc'
        ? a.property_id - b.property_id
        : b.property_id - a.property_id;
    });
    console.log('Sorted Data:', sortedData);
    setVacantData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const searchVacantProperty = query => {
    setSearchQuery(query);
    const filtered = query
      ? vacantData.filter(
          item =>
            item.property_type &&
            item.property_type.toLowerCase().includes(query.toLowerCase()),
        )
      : vacantData;
    console.log('filtered.........', filtered);
    setFilteredUsers(filtered);
  };

  // Api intrigation .....
  const get_Vacant_Details = async () => {
    try {
      const url = Config.BASE_URL;
      const Vacant_Details_url = url + 'get_vacant_property_list';
      setIsLoading(true);
      console.log('Request URL:', Vacant_Details_url);
      const response = await axios.get(Vacant_Details_url);
      console.log('API Response Vacant_Details_url:', response?.data);
      if (response?.data?.success === true) {
        setVacantData(response?.data?.property_details);
      } else {
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error('API failed Vacant_Details', error);
      alert('An error occurred while fetching vacant details');
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
            SortedData={sortByDate}
            upArrow={sortOrder == 'asc' ? 'long-arrow-up' : 'long-arrow-down'}
            downArrow={sortOrder == 'asc' ? 'long-arrow-down' : 'long-arrow-up'}
            placeholder={'Search Property'}
          />
        </View>
        <DividerIcon style={VacantPropertiesListStyle.divider} />
        <View>
          <PropertyListing
            filteredUsers={filteredUsers}
            searchQuery={searchQuery}
            allData={allData}
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
