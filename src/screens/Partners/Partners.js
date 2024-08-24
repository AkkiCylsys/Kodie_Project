import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {_COLORS, IMAGES} from '../../Themes';
import TopHeader from '../../components/Molecules/Header/Header';
import {PartnersStyle} from './PartnersStyle';
import {_goBack} from '../../services/CommonServices';
import {Divider} from 'react-native-paper';
import DividerIcon from '../../components/Atoms/Devider/DividerIcon';

const slides = [
  {
    key: 'one',
    title: 'Debt collectors',
    text: 'Debt collectors pursue unpaid debts on behalf of creditors, aiming to recover owed money by negotiating, settling, or taking legal actions.',
    image: IMAGES.DebtCollectors,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Tanant screening partners',
    text: "Tenant screening partners help landlords assess prospective tenants' backgrounds, including credit, criminal history, and rental history, to make informed leasing decisions. ",
    image: IMAGES.TanantScreeningPartners,
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Legal partners',
    text: 'Legal partners are law firms or attorneys who collaborate on cases, share resources, and provide legal services to clients together.  ',
    image: IMAGES.LegalPartners,
    backgroundColor: '#22bcb5',
  },
  {
    key: 'three',
    title: 'Data partners',
    text: 'Data partners collaborate to share, analyze, or exchange data for mutual benefit, often for research, business insights, or improved decision-making.',
    image: IMAGES.DataPartners,
    backgroundColor: '#22bcb5',
  },
  {
    key: 'three',
    title: 'Rental payment partners',
    text: 'Rental payment partners facilitate secure and efficient rent transactions between tenants and landlords, often through online platforms or payment processing services.',
    image: IMAGES.RentalPaymentPartners,
    backgroundColor: '#22bcb5',
  },
];

const Partners = props => {
  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({item}) => {
    return (
      <>
        <View style={PartnersStyle.slide}>
          <View style={PartnersStyle.imgttitlebindview}>
            <Image source={item.image} style={PartnersStyle.img} />
            <Text style={PartnersStyle.title}>{item.title}</Text>
            {/* <View style={PartnersStyle.hrline}></View> */}
            <DividerIcon />
          </View>
          <Text style={PartnersStyle.text}>{item.text}</Text>
        </View>
      </>
    );
  };

  const onDone = () => {
    setShowRealApp(true);
  };

  if (showRealApp) {
    return <App />;
  } else {
    return (
      <SafeAreaView style={PartnersStyle.container}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={'Partners'}
        />
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          autoPlay={true}
          autoPlayTimeout={3000}
          dotStyle={PartnersStyle.dotStyle} // Customize the inactive dot style
          activeDotStyle={PartnersStyle.activeDotStyle}
        />
      </SafeAreaView>
    );
  }
};

export default Partners;
