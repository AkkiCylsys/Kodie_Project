import React, {useEffect, useState} from 'react';
import {View, BackHandler, Alert, SafeAreaView} from 'react-native';
import TopHeader from '../../../components/Molecules/Header/Header';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import PropertyList from './MyProperty/PropertyList';
import PropertyList2 from './SearchForRentals/PropertyList2';
import {_goBack} from './../../../services/CommonServices/index';
import {_COLORS} from '../../../Themes';
import {PropertiesCSS} from './PropertiesCss';
import {Config} from '../../../Config';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import ViewRentalDetails from './SearchForRentals/ViewRentalDetails';
import PropertyRentalOffer from './PropertyRentalOffer/PropertyRentalOffer';

const Properties = props => {
  const tab3 = props?.route?.params?.tab3;
  const acceptLanlordPassed = props?.route?.params?.acceptLanlordPassed
  console.log("acceptLanlordPassed...",acceptLanlordPassed);
  const routesLength = useNavigationState(state => state.routes.length);
  const loginData = useSelector(state => state.authenticationReducer.data);
  const [activeTab, setActiveTab] = useState('Tab1');
  const [Property_Data_List, setProperty_Data_List] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const navigation = useNavigation();
  // useEffect(() => {
  //   setActiveTab(tab3 == 'tab3' || acceptLanlordPassed == "acceptLanlordPassed" ? 'Tab3' : 'Tab1');
  // }, []);

  useEffect(() => {
    setActiveTab(tab3 == 'tab3'  ? 'Tab3' : 'Tab1');
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
  const handleOpenMap = value => {
    console.log('Opening map:', value);
    setOpenMap(value);
    // Do something with the value, such as updating state
  };

  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return (
          <PropertyList
            propertyDetail={() => props.navigation.navigate('PropertyDetails')}
            onEdit={data => {
              const {propertyid} = data;
              props.navigation.navigate('PropertyDetails', {
                propertyid: propertyid,
                editMode: 'editMode',
              });
            }}
            onInvite={() => {
              navigation.navigate('Invitefriend');
            }}
            onPropertyView={propView => {
              const {propertyid} = propView;
              props.navigation.navigate('PropertyReviewDetails', {
                propertyid: propertyid,
                propertyView: 'propertyView',
                backProperty: 'backProperty',
              });
            }}
          />
        );
      case 'Tab2':
        return (
          <>
            <PropertyList2
              SearchButton={() => {
                props.navigation.navigate('SearchResult');
              }}
              setOpenMap={handleOpenMap}
              closeMap={openMap}
            />
          </>
        );
      case 'Tab3':
        return <PropertyRentalOffer  acceptLanlordPassed={acceptLanlordPassed}/>;

      default:
        return <PropertyList />;
    }
  };

  return (
    <SafeAreaView style={PropertiesCSS.Container}>
      <TopHeader
        IsNotification
        isprofileImage
        onPressLeftButton={() => {
          openMap == true
            ? setOpenMap(false)
            : props.navigation.navigate('Dashboard');
        }}
        onPressRightImgProfile={() =>
          props.navigation.navigate('LandlordProfile')
        }
        MiddleText={'Properties'}
      />
      <>
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
      </>
      {checkTabs()}
    </SafeAreaView>
  );
};

export default Properties;
