// import React, { useEffect, useState } from "react";
// import {
//   SafeAreaView,
//   StatusBar,
//   useColorScheme,
//   Text,
//   View,
//   TouchableWithoutFeedback,
//   Animated,
//   useWindowDimensions,
// } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import { SwipeListView } from "react-native-swipe-list-view";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Entypo from "react-native-vector-icons/Entypo";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import ReactNativeHapticFeedback from "react-native-haptic-feedback";
// import { JobRequestStyle } from "./JobRequestStyle";
// import { _COLORS, FONTFAMILY, LABEL_STYLES } from "../../../../Themes";
// import DividerIcon from "../../../Atoms/Devider/DividerIcon";
// import { CommonLoader } from "../../ActiveLoader/ActiveLoader";
// import axios from "axios";

// const hapticFeedbackOptions = {
//   enableVibrateFallback: true,
//   ignoreAndroidSystemSettings: false,
// };

// const HiddenItemWithActions = (props) => {
//   const {
//     leftActionActivated,
//     rightActionActivated,
//     swipeAnimatedValue,
//     onClose,
//     onDelete,
//     rowKey,
//   } = props;

//   if (rightActionActivated) {
//     ReactNativeHapticFeedback.trigger("impactLight", hapticFeedbackOptions);
//     Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
//       toValue: Math.abs(swipeAnimatedValue.__getValue()),
//       duration: 250,
//       useNativeDriver: false,
//     }).start();
//   } else {
//     Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
//       toValue: 100,
//       duration: 250,
//       useNativeDriver: false,
//     }).start();
//   }

//   return (
//     <Animated.View
//       style={[
//         JobRequestStyle.rowBack,
//         { height: rowAnimatedValues[rowKey].rowHeight },
//       ]}
//     >
//       {!rightActionActivated && (
//         <TouchableWithoutFeedback onPress={onClose}>
//           <Animated.View
//             style={[
//               JobRequestStyle.backBtn,
//               JobRequestStyle.backLeftBtn,
//               {
//                 width: 100,
//                 transform: [
//                   {
//                     translateX: swipeAnimatedValue.interpolate({
//                       inputRange: [0, 60, 100],
//                       outputRange: [-100, -40, 0],
//                       extrapolate: "clamp",
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View style={JobRequestStyle.backBtnInner}>
//               <Ionicons
//                 name="arrow-forward-outline"
//                 size={22}
//                 color={_COLORS.Kodie_BlackColor}
//               />
//               <Text style={JobRequestStyle.backBtnText}>Left</Text>
//             </View>
//           </Animated.View>
//         </TouchableWithoutFeedback>
//       )}
//       {!leftActionActivated && (
//         <TouchableWithoutFeedback onPress={onClose}>
//           <Animated.View
//             style={[
//               JobRequestStyle.backBtn,
//               JobRequestStyle.backRightBtn,
//               JobRequestStyle.backRightBtnLeft,
//               {
//                 width: 100,
//                 transform: [
//                   {
//                     translateX: swipeAnimatedValue.interpolate({
//                       inputRange: [-200, -120, 0],
//                       outputRange: [-100, -20, 100],
//                       extrapolate: "clamp",
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View style={JobRequestStyle.backBtnInner}>
//               <Entypo
//                 name="dots-three-horizontal"
//                 size={22}
//                 color={_COLORS.Kodie_WhiteColor}
//               />
//               <Text style={JobRequestStyle.backBtnText}>More</Text>
//             </View>
//           </Animated.View>
//         </TouchableWithoutFeedback>
//       )}
//       {!leftActionActivated && (
//         <TouchableWithoutFeedback onPress={onDelete}>
//           <Animated.View
//             style={[
//               JobRequestStyle.backBtn,
//               JobRequestStyle.backRightBtn,
//               JobRequestStyle.backRightBtnRight,
//               {
//                 width: rowAnimatedValues[rowKey].rowBackWidth,
//                 transform: [
//                   {
//                     translateX: swipeAnimatedValue.interpolate({
//                       inputRange: [-200, -120, 0],
//                       outputRange: [0, 40, 100],
//                       extrapolate: "clamp",
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <View style={JobRequestStyle.backBtnInner}>
//               <Ionicons
//                 name="archive-outline"
//                 size={22}
//                 color={_COLORS.Kodie_WhiteColor}
//               />
//               <Text style={JobRequestStyle.backBtnText}>Archive</Text>
//             </View>
//           </Animated.View>
//         </TouchableWithoutFeedback>
//       )}
//     </Animated.View>
//   );
// };

// const rowAnimatedValues = {};
// Array(20)
//   .fill("")
//   .forEach((_, i) => {
//     rowAnimatedValues[`${i}`] = {
//       rowHeight: new Animated.Value(60),
//       rowFrontTranslate: new Animated.Value(1),
//       rowBackWidth: new Animated.Value(100),
//     };
//   });

// const JobRequestArchive = () => {
//   const isDarkMode = useColorScheme() === "dark";
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//   const { width: screenWidth } = useWindowDimensions();

//   const [list, setList] = useState([]);
//   const [isLoading, setIsLoading] = useState([]);
//   const get_Details = () => {
//     const url = "https://e3.cylsys.com/api/v1/job/getAlljobs/479";
//     const Details_url = url;
//     console.log("Request URL:", Details_url);
//     setIsLoading(true);
//     axios
//       .get(Details_url)
//       .then((response) => {
//         if (response.data && response.data.data.length > 0) {
//           const updatedList = response.data.data.map((item, index) => ({
//             key: index.toString(),
//             job_id: item.job_id.toString(),
//             service_looking: item.service_looking,
//             job_location: item.job_location,
//             job_budget: item.job_budget,
//           }));
//           setList(updatedList);
//           updatedList.forEach((item, i) => {
//             rowAnimatedValues[`${i}`] = {
//               rowHeight: new Animated.Value(60),
//               rowFrontTranslate: new Animated.Value(1),
//               rowBackWidth: new Animated.Value(100),
//             };
//           });

//           setIsLoading(false);
//         } else {
//           setIsLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("API failed", error);
//       });
//   };

//   useEffect(() => {
//     get_Details();
//   }, []);

//   const VisibleItem = (props) => {
//     const { data, screenWidth, rowKey } = props;
//     const translateX = rowAnimatedValues[
//       rowKey
//     ]?.rowFrontTranslate?.interpolate({
//       inputRange: [0, 1],
//       outputRange: [-screenWidth, 0],
//       extrapolate: "clamp",
//     });
//     return (
//       <TouchableWithoutFeedback onPress={() => console.log("touched")}>
//         <Animated.View
//           style={[
//             JobRequestStyle.rowFront,
//             {
//               transform: [
//                 {
//                   translateX: translateX || 0,
//                 },
//               ],
//             },
//           ]}
//         >
//           <View style={JobRequestStyle.Container}>
//             {console.log(data.job_id)}
//             <View style={JobRequestStyle.flat_MainView}>
//               <View style={JobRequestStyle.flexContainer}>
//                 <Text style={JobRequestStyle.commontext}>
//                   {data.service_looking}
//                 </Text>
//               </View>

//               <View style={JobRequestStyle.RightContainer}>
//                 <View
//                   style={[
//                     JobRequestStyle.buttonView,
//                     {
//                       backgroundColor: data.isPosted
//                         ? _COLORS.Kodie_mostLightBlueColor
//                         : data.isongoing
//                         ? _COLORS.Kodie_LightOrange
//                         : _COLORS.Kodie_mostLightGreenColor,
//                     },
//                   ]}
//                 >
//                   <View
//                     style={[
//                       JobRequestStyle.roundButton,
//                       {
//                         backgroundColor: data.isPosted
//                           ? _COLORS.Kodie_BlueColor
//                           : data.isongoing
//                           ? _COLORS.Kodie_DarkOrange
//                           : _COLORS.Kodie_GreenColor,
//                       },
//                     ]}
//                   />
//                   <Text
//                     style={[
//                       JobRequestStyle.buttonText,
//                       {
//                         color: data.isPosted
//                           ? _COLORS.Kodie_BlueColor
//                           : data.isongoing
//                           ? _COLORS.Kodie_DarkOrange
//                           : _COLORS.Kodie_GreenColor,
//                       },
//                     ]}
//                   >
//                     {data.button}
//                   </Text>
//                 </View>
//               </View>
//               <Entypo
//                 name={"dots-three-horizontal"}
//                 size={20}
//                 color={_COLORS.Kodie_GrayColor}
//                 style={{ marginLeft: 15 }}
//               />
//             </View>
//             <Text style={JobRequestStyle.commonMidtext}>{data.refno}</Text>
//             <View style={JobRequestStyle.flat_MainView}>
//               <View style={JobRequestStyle.flexContainer}>
//                 <View style={JobRequestStyle.propertyView}>
//                   <View style={JobRequestStyle.flexContainer}>
//                     <Text style={JobRequestStyle.tom}>Tom</Text>
//                     <View style={JobRequestStyle.locationView}>
//                       <MaterialCommunityIcons
//                         name={"map-marker"}
//                         size={16}
//                         color={_COLORS.Kodie_MediumGrayColor}
//                         style={{ alignSelf: "center" }}
//                       />
//                       <Text style={JobRequestStyle.locationText}>
//                         {data.job_location}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View style={[JobRequestStyle.BudgetView]}>
//                 <View style={JobRequestStyle.flexContainer}>
//                   <Text style={JobRequestStyle.bugetText}>
//                     {data.job_budget}
//                   </Text>

//                   <Text style={JobRequestStyle.spend}>{data.location}</Text>
//                 </View>
//               </View>
//             </View>
//             {/* <DividerIcon /> */}
//           </View>
//         </Animated.View>
//       </TouchableWithoutFeedback>
//     );
//   };
//   const closeRow = (rowMap, rowKey) => {
//     if (rowMap[rowKey]) {
//       rowMap[rowKey].closeRow();
//     }
//   };

//   const deleteRow = (rowKey) => {
//     const newData = list.filter((item) => item.key !== rowKey);
//     setList(newData);
//   };

//   const onDelete = (rowKey) => {
//     Animated.timing(rowAnimatedValues[rowKey].rowFrontTranslate, {
//       toValue: 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
//       toValue: screenWidth + 40,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//     Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
//       toValue: 0,
//       delay: 200,
//       duration: 200,
//       useNativeDriver: false,
//     }).start(() => deleteRow(rowKey));
//   };

//   const onRightActionStatusChange = (rowKey) => {
//     console.log("on right action status change");
//   };

//   const swipeGestureEnded = (rowKey, data) => {
//     if (data.translateX < -200) {
//       Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
//         toValue: screenWidth,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//       Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
//         toValue: 0,
//         delay: 200,
//         duration: 200,
//         useNativeDriver: false,
//       }).start(() => deleteRow(rowKey));
//     }
//   };

//   const renderItem = (data, rowMap) => {
//     return (
//       <VisibleItem
//         data={data.item}
//         rowKey={data.item.key}
//         screenWidth={screenWidth}
//       />
//     );
//   };

//   const renderHiddenItem = (data, rowMap) => (
//     <HiddenItemWithActions
//       data={property_List}
//       rowMap={rowMap}
//       rowKey={data.item.key}
//       onClose={() => closeRow(rowMap, data.item.key)}
//       onDelete={() => onDelete(data.item.key)}
//     />
//   );

//   return (
//     <>
//       <SafeAreaView style={backgroundStyle}>
//         <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
//         <SwipeListView
//           data={list}
//           renderItem={renderItem}
//           renderHiddenItem={renderHiddenItem}
//           leftOpenValue={60}
//           rightOpenValue={-120}
//           stopLeftSwipe={100}
//           stopRightSwipe={-201}
//           rightActivationValue={-200}
//           rightActionValue={-screenWidth}
//           onRightActionStatusChange={onRightActionStatusChange}
//           swipeGestureEnded={swipeGestureEnded}
//           swipeToOpenPercent={10}
//           swipeToClosePercent={10}
//           useNativeDriver={false}
//         />
//       </SafeAreaView>
//       {isLoading ? <CommonLoader /> : null}
//     </>
//   );
// };

// export default JobRequestArchive;

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SwipeListView} from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {JobRequestStyle} from './JobRequestStyle';
import {_COLORS, FONTFAMILY, LABEL_STYLES} from '../../../../Themes';
import DividerIcon from '../../../Atoms/Devider/DividerIcon';
import {CommonLoader} from '../../ActiveLoader/ActiveLoader';
import axios from 'axios';

const hapticFeedbackOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const HiddenItemWithActions = props => {
  const {
    leftActionActivated,
    rightActionActivated,
    swipeAnimatedValue,
    onClose,
    onDelete,
    rowKey,
  } = props;
  const animatedValues = rowAnimatedValues[rowKey];
  if (!animatedValues) {
    return null;
  }
  const singleValue = animatedValues.rowBackWidth;

  useEffect(() => {
    if (rightActionActivated) {
      ReactNativeHapticFeedback.trigger('impactLight', hapticFeedbackOptions);
      Animated.timing(singleValue, {
        toValue: Math.abs(swipeAnimatedValue.__getValue()),
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(singleValue, {
        toValue: 100,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [rightActionActivated, swipeAnimatedValue, singleValue]);

  return (
    <Animated.View
      style={[
        JobRequestStyle.rowBack,
        {height: rowAnimatedValues[rowKey].rowHeight},
      ]}>
      {!rightActionActivated && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              JobRequestStyle.backBtn,
              JobRequestStyle.backLeftBtn,
              {
                width: 100,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [0, 60, 100],
                      outputRange: [-100, -40, 0],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <View style={JobRequestStyle.backBtnInner}>
              <Ionicons
                name="arrow-forward-outline"
                size={22}
                color={_COLORS.Kodie_BlackColor}
              />
              <Text style={JobRequestStyle.backBtnText}>Left</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {!leftActionActivated && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              JobRequestStyle.backBtn,
              JobRequestStyle.backRightBtn,
              JobRequestStyle.backRightBtnLeft,
              {
                width: 100,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [-200, -120, 0],
                      outputRange: [-100, -20, 100],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <View style={JobRequestStyle.backBtnInner}>
              <Entypo
                name="dots-three-horizontal"
                size={22}
                color={_COLORS.Kodie_WhiteColor}
              />
              <Text style={JobRequestStyle.backBtnText}>More</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {!leftActionActivated && (
        <TouchableWithoutFeedback>
          {/* onPress={onDelete} */}
          <Animated.View
            style={[
              JobRequestStyle.backBtn,
              JobRequestStyle.backRightBtn,
              JobRequestStyle.backRightBtnRight,
              {
                width: rowAnimatedValues[rowKey].rowBackWidth,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [-200, -120, 0],
                      outputRange: [0, 40, 100],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            <View style={JobRequestStyle.backBtnInner}>
              <Ionicons
                name="archive-outline"
                size={22}
                color={_COLORS.Kodie_WhiteColor}
              />
              <Text style={JobRequestStyle.backBtnText}>Archive</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

const rowAnimatedValues = {};

const JobRequestArchive = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {width: screenWidth} = useWindowDimensions();
  const [list, setList] = useState([]);
  const [catchData, setCatchData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  Array(catchData)
    .fill('')
    .forEach((_, i) => {
      rowAnimatedValues[`${i}`] = {
        rowHeight: new Animated.Value(60),
        rowFrontTranslate: new Animated.Value(1),
        rowBackWidth: new Animated.Value(100),
      };
    });
  // const get_Details = () => {
  //   const url = "https://e3.cylsys.com/api/v1/job/getAlljobs/261";
  //   const Details_url = url;
  //   console.log("Request URL:", Details_url);
  //   setIsLoading(true);
  //   axios
  //     .get(Details_url)
  //     .then((response) => {
  //       if (response.data && response.data.data.length > 0) {
  //         setCatchData(response.data.data.length);
  //         const updatedList = response.data.data.map((item, index) => ({
  //           key: index.toString(),
  //           job_id: item.job_id.toString(),
  //           service_looking: item.service_looking,
  //           job_location: item.job_location,
  //           job_budget: item.job_budget,
  //         }));
  //         setList(updatedList);
  //         updatedList.forEach((item, i) => {
  //           rowAnimatedValues[`${i}`] = {
  //             rowHeight: new Animated.Value(60),
  //             rowFrontTranslate: new Animated.Value(1),
  //             rowBackWidth: new Animated.Value(100),
  //           };
  //         });

  //         setIsLoading(false);
  //       } else {
  //         alert("No data received from the API");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("API failed", error);
  //     });
  // };

  const get_Details = () => {
    const url = 'https://kodieapis.cylsys.com/api/v1/job/getAlljobs/479';
    const Details_url = url;
    console.log('Request URL:', Details_url);
    setIsLoading(true);
    axios
      .get(Details_url)
      .then(response => {
        if (response.data && response.data.data.length > 0) {
          // ... (your existing code)

          const updatedList = response.data.data.map((item, index) => ({
            key: index.toString(),
            job_id: item.job_id.toString(),
            service_looking: item.service_looking,
            job_location: item.job_location,
            job_budget: item.job_budget,
          }));
          setList(updatedList);
          updatedList.forEach((item, i) => {
            rowAnimatedValues[`${i}`] = {
              rowHeight: new Animated.Value(60),
              rowFrontTranslate: new Animated.Value(1),
              rowBackWidth: new Animated.Value(100),
            };
          });

          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API failed', error);
      });
  };

  // const archiveJob = async (jobId) => {
  //   try {
  //     const url = "https://e3.cylsys.com/api/v1/job/addJobArchieve";
  //     console.log('Archive api.....',url)
  //     const response = await axios.post(url, {
  //       p_job_id: jobId,
  //     });

  //     if (response.data && response.data.success) {
  //       console.log("Job archived successfully");
  //       return true;
  //     } else {
  //       console.error("Failed to archive job:", response.data.message);
  //       alert("Error", "Failed to archive job");
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //     alert("Error", "API call failed");
  //     return false;
  //   }
  // };
  const archiveJob = async jobId => {
    try {
      const url = 'https://kodieapis.cylsys.com/api/v1/job/addJobArchieve';
      console.log('Archive api.....', url);
      const response = await axios.post(url, {
        p_job_id: jobId,
      });

      console.log('Archive API Response:', response.data);

      if (response.data && response.data.success) {
        console.log('Job archived successfully');
        setIsLoading(false);
        return true;
      } else {
        console.error('Failed to archive job:', response.data.message);
        alert('Error', 'Failed to archive job');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('API call failed:', error);
      alert('Error', 'API call failed');
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    get_Details();
    archiveJob();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await get_Details();
      console.log('List:', list);

      if (list.length > 0) {
        const isArchived = await archiveJob(list[0].job_id);

        if (isArchived) {
          // Logic for successful archive
          // alert('Success', 'Job archived successfully');
        } else {
          // Logic for failed archive
          alert('Error', 'Failed to archive job');
        }
      }
    };

    fetchData();
  }, [list]);

  const VisibleItem = props => {
    const {data, screenWidth, rowKey} = props;
    const translateX = rowAnimatedValues[
      rowKey
    ]?.rowFrontTranslate?.interpolate({
      inputRange: [0, 1],
      outputRange: [-screenWidth, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableWithoutFeedback onPress={() => console.log('touched')}>
        <Animated.View
          style={[
            JobRequestStyle.rowFront,
            {
              // height: rowAnimatedValues[rowKey].rowHeight,
              transform: [
                {
                  translateX: translateX || 0,
                },
              ],
            },
          ]}>
          <View style={JobRequestStyle.Container}>
            {console.log(data.job_id)}
            <View style={JobRequestStyle.flat_MainView}>
              <View style={JobRequestStyle.flexContainer}>
                <Text style={JobRequestStyle.commontext}>
                  {data.service_looking}
                </Text>
              </View>

              <View style={JobRequestStyle.RightContainer}>
                <View
                  style={[
                    JobRequestStyle.buttonView,
                    {
                      backgroundColor: data.isPosted
                        ? _COLORS.Kodie_mostLightBlueColor
                        : data.isongoing
                        ? _COLORS.Kodie_LightOrange
                        : _COLORS.Kodie_mostLightGreenColor,
                    },
                  ]}>
                  <View
                    style={[
                      JobRequestStyle.roundButton,
                      {
                        backgroundColor: data.isPosted
                          ? _COLORS.Kodie_BlueColor
                          : data.isongoing
                          ? _COLORS.Kodie_DarkOrange
                          : _COLORS.Kodie_GreenColor,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      JobRequestStyle.buttonText,
                      {
                        color: data.isPosted
                          ? _COLORS.Kodie_BlueColor
                          : data.isongoing
                          ? _COLORS.Kodie_DarkOrange
                          : _COLORS.Kodie_GreenColor,
                      },
                    ]}>
                    {data.button}
                  </Text>
                </View>
              </View>
              <Entypo
                name={'dots-three-horizontal'}
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={{marginLeft: 15}}
              />
            </View>
            <Text style={JobRequestStyle.commonMidtext}>{data.refno}</Text>
            <View style={JobRequestStyle.flat_MainView}>
              <View style={JobRequestStyle.flexContainer}>
                <View style={JobRequestStyle.propertyView}>
                  <View style={JobRequestStyle.flexContainer}>
                    <Text style={JobRequestStyle.tom}>Tom</Text>
                    <View style={JobRequestStyle.locationView}>
                      <MaterialCommunityIcons
                        name={'map-marker'}
                        size={16}
                        color={_COLORS.Kodie_MediumGrayColor}
                        style={{alignSelf: 'center'}}
                      />
                      <Text style={JobRequestStyle.locationText}>
                        {data.job_location}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[JobRequestStyle.BudgetView]}>
                <View style={JobRequestStyle.flexContainer}>
                  <Text style={JobRequestStyle.bugetText}>
                    {data.job_budget}
                  </Text>

                  <Text style={JobRequestStyle.spend}>{data.location}</Text>
                </View>
              </View>
            </View>
            {/* <DividerIcon /> */}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = rowKey => {
    const newData = list.filter(item => item.key !== rowKey);
    setList(newData);
  };

  const onDelete = async rowKey => {
    const jobId = list.find(item => item.key === rowKey)?.job_id;

    // if (jobId) {
    //   await archiveJob(jobId);
    // }
    if (jobId) {
      const isArchived = await archiveJob(jobId);

      // const updatedList = list.map((item) => {
      //   if (item.key === rowKey) {
      //     return { ...item, archived: true };
      //   }
      //   return item;
      // });
      if (isArchived) {
        const updatedList = list.map(item => {
          if (item.key === rowKey) {
            return {...item, archived: true};
          }
          return item;
        });

        setList(updatedList);
        Animated.timing(rowAnimatedValues[rowKey].rowFrontTranslate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
          toValue: screenWidth + 40,
          duration: 200,
          useNativeDriver: false,
        }).start();
        Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
          toValue: 0,
          delay: 200,
          duration: 200,
          useNativeDriver: false,
        }).start(() => deleteRow(rowKey));
      }
    }
  };

  const onRightActionStatusChange = rowKey => {
    console.log('on right action status change');
  };

  const swipeGestureEnded = (rowKey, data) => {
    if (data.translateX < -200) {
      Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
        toValue: screenWidth,
        duration: 200,
        useNativeDriver: false,
      }).start();
      Animated.timing(rowAnimatedValues[rowKey].rowHeight, {
        toValue: 0,
        delay: 200,
        duration: 200,
        useNativeDriver: false,
      }).start(() => deleteRow(rowKey));
    }
  };

  const renderItem = (data, rowMap) => {
    return (
      <VisibleItem
        data={data.item}
        rowKey={data.item.key}
        screenWidth={screenWidth}
        rowAnimatedValues={rowAnimatedValues}
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HiddenItemWithActions
      data={data.item}
      rowMap={rowMap}
      rowKey={data.item.key}
      onClose={() => closeRow(rowMap, data.item.key)}
      onDelete={() => onDelete(data.item.key)}
    />
  );

  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <SwipeListView
          data={list}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={60}
          rightOpenValue={-120}
          stopLeftSwipe={100}
          stopRightSwipe={-250}
          rightActivationValue={-200}
          rightActionValue={-screenWidth}
          onRightActionStatusChange={onRightActionStatusChange}
          swipeGestureEnded={swipeGestureEnded}
          swipeToOpenPercent={10}
          swipeToClosePercent={10}
          useNativeDriver={false}
        />
      </SafeAreaView>
      {isLoading ? <CommonLoader /> : null}
    </>
  );
};

export default JobRequestArchive;
