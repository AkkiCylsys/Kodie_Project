// import React, {useState, useRef, useEffect} from 'react';
// import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
// import Button from '../../components/md-components/atoms/Button';
// import Header from '../../components/md-components/molecules/Header';
// import YesTick from '../../assets/icons/yesTickIcon.svg';
// import ErrorIcon from '../../assets/icons/errorIcon.svg';
// import Text from '../..//components/md-components/atoms/TextComponent';
// import styles from './style';

// const FunctionError = ({route, navigation, ...props}) => {
//   let yesTick = <YesTick fill="#EAF6FF" style={styles.yes_tick} />;
//   return (
//     <>
//       <Header
//         backgroundColor="#EAF6FF"
//         showLeftIcon={true}
//         LeftIcon="back"
//         yesIcon={false}
//         headerName="Back"
//         showRightIcon={false}
//       />
//       {yesTick}
//       <SafeAreaView style={styles.container}>
//         <View style={styles.content}>
//           <ErrorIcon width={230} height={210} style={styles.errorLogo} />
//           <Text style={styles.heading}>An error occurred</Text>
//           <Text style={styles.message}>
//             We are searching for the possible reason.
//           </Text>
//         </View>

//         <Button buttonStyle={styles.retryBtn} textStyle={styles.btn_text}>
//           Retry
//         </Button>
//       </SafeAreaView>
//     </>
//   );
// };

// export default FunctionError;
