import React, {useEffect, useState} from 'react';
import {View, BackHandler, Alert} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import PropertyList from './MyProperty/PropertyList';
import PropertyList2 from './SearchForRentals/PropertyList2';
import {_goBack} from './../../../services/CommonServices/index';
import {_COLORS} from '../../../Themes';
import {PropertiesCSS} from './PropertiesCss';
import RantalOffer from './RentalOffer/RantalOffer';
import {Config} from '../../../Config';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';

const Properties = props => {
  const routesLength = useNavigationState(state => state.routes.length);

  const loginData = useSelector(state => state.authenticationReducer.data);
  console.log('loginData', loginData?.Login_details?.user_id);

  const [activeTab, setActiveTab] = useState('Tab1');
  const [Property_Data_List, setProperty_Data_List] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    <PropertyList />;
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // BackHandler.exitApp();
        props.navigation.navigate('Dashboard');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <PropertyList
            propertyDetail={() => props.navigation.navigate('PropertyDetails')}
            onEdit={data => {
              // Access propertyid in onEdit function
              const {propertyid} = data;
              // alert(propertyid);
              props.navigation.navigate('PropertyDetails', {
                propertyid: propertyid,
                editMode: 'editMode',
              });
            }}
            onInvite={() => {
              navigation.navigate('Invitefriend');
              // alert("hsdjfh")
            }}
            onPropertyView={propView => {
              const {propertyid} = propView;
              props.navigation.navigate('PropertyReviewDetails', {
                propertyid: propertyid,
                propertyView: 'propertyView',
              });
            }}
          />
        );
      case 'Tab2':
        return (
          <>
            {Alert.alert('Search for rentals', 'Coming soon', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  setActiveTab('Tab1');
                },
              },
            ])}
          </>
          // <PropertyList2
          //   SearchButton={() => props.navigation.navigate('SearchResult')}
          // />
        );
      case 'Tab3':
        return (
          <>
            {Alert.alert('Rental offers', 'Coming soon', [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  setActiveTab('Tab1');
                },
              },
            ])}
          </>
          // <RantalOffer
          //   ViewApplication={() => {
          //     Alert.alert('Coming soon');
          //     //  props.navigation.navigate("ViewApplication")
          //   }}
          // />
        );

      default:
        return <PropertyList />;
    }
  };

  return (
    <View style={PropertiesCSS.Container}>
      <TopHeader
        // onPressLeftButton={() => _goBack(props)}

        onPressLeftButton={() => props.navigation.navigate('Dashboard')}
        MiddleText={'Properties'}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB3
        Tab1={'My properties'}
        Tab2={'Search for rentals'}
        Tab3={'Rental offers'}
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
        styleTab1={activeTab === 'Tab1' && PropertiesCSS.activeTab}
        styleTab2={activeTab === 'Tab2' && PropertiesCSS.activeTab}
        styleTab3={activeTab === 'Tab3' && PropertiesCSS.activeTab}
      />
      <View style={PropertiesCSS.Line} />
      {checkTabs()}
      {/* {activeTab === "Tab1" && (
        <PropertyList
          propertyDetail={() => props.navigation.navigate("PropertyDetails")}
        />
      )}
      {activeTab === "Tab2" && <PropertyList2 />}
      {activeTab === "Tab3" && <PropertyList3 />} */}
    </View>
  );
};

export default Properties;
