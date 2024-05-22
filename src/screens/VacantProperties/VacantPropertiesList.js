import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React,{ useState } from 'react';
import {VacantPropertiesListStyle} from './VacantPropertiesListStyle';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, IMAGES} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import PropertyListing from '../../components/Molecules/PropertyListings/PropertyListing';

const VacantPropertiesList = props => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order is descending
  const [vacantData, setVacantData] = useState([]);
  const [allData, setAllData] = useState([])
    
  const handleVacantData = (data) => {
      setVacantData(data);
      setFilteredUsers(data);
  };
  const sortByDate = () => {
    // const vacantData1 = allData.filter(item => item.property_id !== item?.property_id);
    const sortedData = [...vacantData].sort((a, b) => {
        console.log("Sorting:", a.property_id, b.property_id);
        return sortOrder === 'asc' ? a.property_id - b.property_id : b.property_id - a.property_id;
    });
    console.log("Sorted Data:", sortedData);
    setAllData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
};
  const searchVacantProperty = query => {
    setSearchQuery(query);
    const filtered = query
      ? vacantData.filter(
          item =>
            item.property_type && item.property_type.toLowerCase().includes(query.toLowerCase()),
        )
      : vacantData;
    console.log('filtered.........', filtered);
    setFilteredUsers(filtered);
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
          />
        </View>
        <DividerIcon style={VacantPropertiesListStyle.divider} />

        <View>
          <PropertyListing onVacantDataFetch={handleVacantData} filteredUsers={filteredUsers} searchQuery={searchQuery} allData={allData}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VacantPropertiesList;
