import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { VacantPropertiesListStyle } from './VacantPropertiesListStyle';
import TopHeader from '../../components/Molecules/Header/Header';
import { _goBack } from '../../services/CommonServices';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, IMAGES} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import PropertyListing from '../../components/Molecules/PropertyListings/PropertyListing';
import { CommonLoader } from '../../components/Molecules/ActiveLoader/ActiveLoader';
import axios from 'axios';
import { Config } from '../../Config';

const VacantPropertiesList = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [vacantData, setVacantData] = useState([]);

  useEffect(() => {
    get_Vacant_Details();
  }, []);

  const swipeVacantList = async () => {
    const newData = [...vacantData].reverse();
    if (newData.length > 1) {
      const firstIndex = 0;
      const lastIndex = newData.length - 1;
      [newData[firstIndex], newData[lastIndex]] = [
        newData[lastIndex],
        newData[firstIndex],
      ];
    }
    setVacantData(newData);
    setFilteredUsers(newData);
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
    setFilteredUsers(filtered);
  };

  const get_Vacant_Details = async () => {
    try {
      const url = Config.BASE_URL;
      const Vacant_Details_url = url + 'get_vacant_property_list';
      setIsLoading(true);
      const response = await axios.get(Vacant_Details_url);
      if (response?.data?.success === true) {
        const data = response?.data?.property_details || [];
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

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    swipeVacantList();
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
            downArrow={sortOrder === 'asc' ? 'long-arrow-down' : 'long-arrow-up'}
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
