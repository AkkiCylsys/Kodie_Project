import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import {VacantPropertiesListStyle} from './VacantPropertiesListStyle';
import TopHeader from '../../components/Molecules/Header/Header';
import {_goBack} from '../../services/CommonServices';
import SearchBar from '../../components/Molecules/SearchBar/SearchBar';
import {_COLORS, IMAGES} from '../../Themes';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';
import PropertyListing from '../../components/Molecules/PropertyListings/PropertyListing';
const VacantPropertiesList = props => {
  const searchVacantProperty = () => {};
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
            isFilterImage
            filterImage={IMAGES.filter}
            height={48}
            searchData={searchVacantProperty}
          />
        </View>
        <DividerIcon style={VacantPropertiesListStyle.divider} />

        <View>
          <PropertyListing />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VacantPropertiesList;
