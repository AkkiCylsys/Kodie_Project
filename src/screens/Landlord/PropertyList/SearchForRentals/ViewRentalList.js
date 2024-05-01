import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopHeader from '../../../../components/Molecules/Header/Header';
import {ViewRentalListStyle} from './ViewRentalListStyle';
import {_goBack} from '../../../../services/CommonServices';
const ViewRentalList = () => {
  return (
    <SafeAreaView style={ViewRentalListStyle.mainContainer}>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'Search results'}
      />
    </SafeAreaView>
  );
};

export default ViewRentalList;

const styles = StyleSheet.create({});
