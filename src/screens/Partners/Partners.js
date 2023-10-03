// import { View, Text, ScrollView, Image } from "react-native";
// import React from "react";
// import TopHeader from "../../components/Molecules/Header/Header";
// import { PartnersStyle } from "./PartnersStyle";
// import { _COLORS, IMAGES } from "../../Themes";
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { useState } from "react";
// const PartnersData = [
//   {
//     id: "1",
//     Heading: "Debt collectors",
//     Sub_heading:
//       "Debt collectors pursue unpaid debts on behalf of creditors, aiming to recover owed money by negotiating, settling, or taking legal actions.",
//     img: IMAGES.Account,
//   },
//   {
//     id: "2",
//     Heading: "Tanant screening partners",
//     Sub_heading:
//       "Tenant screening partners help landlords assess prospective tenants' backgrounds, including credit, criminal history, and rental history, to make informed leasing decisions.",
//     img: IMAGES.Account,
//   },
//   {
//     id: "3",
//     Heading: "Legal partners",
//     Sub_heading:
//       "Legal partners are law firms or attorneys who collaborate on cases, share resources, and provide legal services to clients together.  ",
//     img: IMAGES.Privacy,
//   },
//   {
//     id: "4",
//     Heading: "Data partners",
//     Sub_heading:
//       "Data partners collaborate to share, analyze, or exchange data for mutual benefit, often for research, business insights, or improved decision-making. ",
//     img: IMAGES.Notification,
//   },
//   {
//     id: "5",
//     Heading: "Rental payment partners",
//     Sub_heading:
//       "Rental payment partners facilitate secure and efficient rent transactions between tenants and landlords, often through online platforms or payment processing services. ",
//     img: IMAGES.Storage,
//   },
// ];

// const Partners = () => {
// const [showslider,setShowSlider] = useState(true)

// const renderSlide =({item}) =>{
//     return <View>
//        <Text>{item.Heading}</Text>
//        {/* <Text>{item.Sub_heading}</Text> */}

//     </View>
// }
//   return (
//     <View>
//       <TopHeader
//         onPressLeftButton={() => _goBack(props)}
//         MiddleText={"Partners"}
//       />
//    <ScrollView>
//     <View style={{flex:1}}>
//         {
//           showslider ? <AppIntroSlider data={PartnersData}
//           renderItem={renderSlide} />:
//           <View><Text>not found</Text></View>
//         }
//     </View>
//    </ScrollView>

//     </View>
//   );
// };
// export default Partners;

import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { _COLORS, IMAGES } from "../../Themes";
import TopHeader from "../../components/Molecules/Header/Header";
import { PartnersStyle } from "./PartnersStyle";
import { _goBack } from "../../services/CommonServices";
import { Divider } from "react-native-paper";

const slides = [
  {
    key: "one",
    title: "Debt collectors",
    text: "Debt collectors pursue unpaid debts on behalf of creditors, aiming to recover owed money by negotiating, settling, or taking legal actions.",
    image: IMAGES.DebtCollectors,
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Tanant screening partners",
    text: "Tenant screening partners help landlords assess prospective tenants' backgrounds, including credit, criminal history, and rental history, to make informed leasing decisions. ",
    image: IMAGES.TanantScreeningPartners,
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Legal partners",
    text: "Legal partners are law firms or attorneys who collaborate on cases, share resources, and provide legal services to clients together.  ",
    image: IMAGES.LegalPartners,
    backgroundColor: "#22bcb5",
  },
  {
    key: "three",
    title: "Data partners",
    text: "Data partners collaborate to share, analyze, or exchange data for mutual benefit, often for research, business insights, or improved decision-making.",
    image: IMAGES.DataPartners,
    backgroundColor: "#22bcb5",
  },
  {
    key: "three",
    title: "Rental payment partners",
    text: "Rental payment partners facilitate secure and efficient rent transactions between tenants and landlords, often through online platforms or payment processing services.",
    image: IMAGES.RentalPaymentPartners,
    backgroundColor: "#22bcb5",
  },
];

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <>
        <View style={PartnersStyle.slide}>
          <View style={PartnersStyle.imgttitlebindview}>
            <Image source={item.image} style={PartnersStyle.img} />
            <Text style={PartnersStyle.title}>{item.title}</Text>
             <View style={PartnersStyle.hrline}></View>
            <Divider style={{ borderColor: _COLORS.Kodie_BlackColor }} />
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
      <>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Partners"}
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
      </>
    );
  }
};

export default App;
