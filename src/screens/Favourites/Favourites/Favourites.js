import React, {useState} from 'react';
import {View, Alert, SafeAreaView} from 'react-native';
import {FavouritesStyle} from './FavouritesStyle';
import TopHeader from '../../../components/Molecules/Header/Header';
import DividerIcon from '../../../components/Atoms/Devider/DividerIcon';
import CustomTabNavigator from '../../../components/Molecules/CustomTopNavigation/CustomTopNavigation';

import {_COLORS, FONTFAMILY} from '../../../Themes';

import FavProperties from '../FavProperties/FavProperties';
import FavContractors from '../FavContractors/FavContractors';
import FavJobs from '../FavJobs/FavJobs';
import {_goBack} from '../../../services/CommonServices';
const Favourites = props => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const checkTabs = () => {
    switch (activeTab) {
      case 'Tab1':
        return <FavProperties />;
      case 'Tab2':
        return (
          // <FavContractors />
          Alert.alert('Favourite contractors', 'Coming soon')
        );

      case 'Tab3':
        return (
          // <FavJobs />
          Alert.alert('Favourite Jobs', 'Coming soon')
        );

      default:
        return <FavProperties />;
    }
  };
  return (
    <SafeAreaView style={FavouritesStyle?.mainContainer}>
      <TopHeader
        MiddleText={'Favourite properties'}
        onPressLeftButton={() => _goBack(props)}
      />
      <View style={{marginTop: 5}}>
        <CustomTabNavigator
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          TabTextStyle={{
            fontSize: 12,
          }}
          TAB3={'TAB3'}
          Tab1={'Properties'}
          Tab2={'Contractors'}
          Tab3={'Jobs'}
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
          FONTFAMILY1={
            activeTab === 'Tab1' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
          }
          FONTFAMILY2={
            activeTab === 'Tab2' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
          }
          FONTFAMILY3={
            activeTab === 'Tab3' ? FONTFAMILY.K_Bold : FONTFAMILY.K_SemiBold
          }
          styleTab1={activeTab === 'Tab1' && FavouritesStyle.activeTab}
          styleTab2={activeTab === 'Tab2' && FavouritesStyle.activeTab}
          styleTab3={activeTab === 'Tab3' && FavouritesStyle.activeTab}
        />
      </View>
      <DividerIcon
        borderBottomWidth={4}
        color={_COLORS.Kodie_LiteWhiteColor}
        marginTop={1}
      />
      {checkTabs()}
    </SafeAreaView>
  );
};

export default Favourites;
