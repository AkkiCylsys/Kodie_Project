import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import TopHeader from '../../../../../components/Molecules/Header/Header';
import {_goBack} from '../../../../../services/CommonServices';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserDetails from '../../../../../components/PropertyViewApplication/UserDetails/UserDetails';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import { UserDetailsStyle } from '../../../../../components/PropertyViewApplication/UserDetails/UserDetailsStyle';
import { _COLORS,FONTFAMILY } from '../../../../../Themes';
const PropertyViewApplication = props => {
  return (
    <SafeAreaView>
      <TopHeader
        onPressLeftButton={() => _goBack(props)}
        MiddleText={'View application'}
      />
      <ScrollView>
        <UserDetails />
        <DividerIcon />
        <View style={UserDetailsStyle.ApartmentMainView}>
          <Text style={UserDetailsStyle.apartmentText}>{'Apartment'}</Text>
          <Text style={UserDetailsStyle.cityText}>{'Melbourne'}</Text>
          <View style={UserDetailsStyle.flat_MainView}>
            <MaterialCommunityIcons
              name={'map-marker'}
              size={15}
              color={_COLORS.Kodie_GreenColor}
              style={{marginTop: 10}}
            />
            <Text style={UserDetailsStyle.locationText}>
              {"gadarwara......"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyViewApplication;
