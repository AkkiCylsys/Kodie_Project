import React, {useRef} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import {BiddingDetailsStyle} from './BiddingDetailsStyle';
import {_goBack} from '../../../../../services/CommonServices';
import {_COLORS, IMAGES, LABEL_STYLES} from '../../../../../Themes';
import DividerIcon from '../../../../../components/Atoms/Devider/DividerIcon';
import BiddingComponent from '../../../../../components/Molecules/Bidding/BiddingComponent';

const BiddingDetails = props => {
  const refRBSheet = useRef();

  const biddingData = [
    {
      name: 'Jason Stathom',
      filedname: 'Handyman',
      fileddate: '8 Nov 2023',
      startRating: '4.6',
      ratingnumber: '231',
      ratingamount: 'Bid amount: ',
      ratingprice: '$200',
      address: '1234, Contractor’s address. Australia',
      notverified: 'Not verified',
      CoverText1: 'Cover letter -',
      CoverText2:
        'I am the best contractor in town, ready to go. Check my best works portfolio and...',
      CoverText3: 'read more',
    },
    {
      name: 'Mesut Ozil',
      filedname: 'Plumber',
      fileddate: '8 Nov 2023',
      startRating: '4.0',
      ratingnumber: '100',
      ratingamount: 'Bid amount: ',
      ratingprice: '$180',
      address: '1234, Contractor’s address. Australia',
      verified: true,
      CoverText1: 'Cover letter -',
      CoverText2:
        'I am the best contractor in town, ready to go. Check my best works portfolio and...',
      CoverText3: 'read more',
    },
    {
      name: 'Jack Black',
      filedname: 'Handyman',
      fileddate: '8 Nov 2023',
      startRating: '3.6',
      ratingnumber: '231',
      ratingamount: 'Bid amount: ',
      ratingprice: '$200',
      address: '1234, Contractor’s address. Australia',
      verified: true,
      CoverText1: 'Cover letter -',
      CoverText2:
        'I am the best contractor in town, ready to go. Check my best works portfolio and...',
      CoverText3: 'read more',
    },
  ];

  const renderBiddingItem = ({item}) => (
    <>
      <BiddingComponent
        name={item.name}
        filedname={item.filedname}
        fileddate={item.fileddate}
        startRating={item.startRating}
        ratingnumber={item.ratingnumber}
        ratingamount={item.ratingamount}
        ratingprice={item.ratingprice}
        address={item.address}
        notverified={item.notverified}
        verified={item.verified}
        CoverText1={item.CoverText1}
        CoverText2={item.CoverText2}
        CoverText3={item.CoverText3}
      />
      <DividerIcon />
    </>
  );

  return (
    <View style={BiddingDetailsStyle.mainContainer}>
      <FlatList
        data={biddingData}
        renderItem={renderBiddingItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default BiddingDetails;
