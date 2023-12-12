import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SwipeListView } from "react-native-swipe-list-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { ArchiveJobStyle } from "./ArchiveJobStyle";
import { _COLORS,FONTFAMILY,LABEL_STYLES } from "../../../../Themes";
import DividerIcon from "../../../Atoms/Devider/DividerIcon";


const property_List = [
  {
    id: "1",
    name: "Door handle repairingfgh",
    location: "1729 Melbourne St Australia",
    buttonName: "Posted",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$200",
    readText: "My door handle is broken and.",
    isPosted: true,
    isongoing: false,
    isCompleted: false,
    refno: "Ref #16694",
  },
  {
    id: "2",
    name: "Plasterer to fix wall",
    location: "1729 Melbourne St Australia",
    buttonName: "Ongoing",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$200",
    readText: "My door handle is broken and.",
    isPosted: false,
    isongoing: true,
    isCompleted: false,
    refno: "Ref #16694",
  },
  {
    id: "3",
    name: "Epoxy garage repair",
    location: "1729 Melbourne St Australia",
    buttonName: "Completed",
    tanentname: "Tom",
    budget: "Budget",
    spend: "$200",
    readText: "My door handle is broken and.",
    isPosted: false,
    isongoing: false,
    isCompleted: true,
    refno: "Ref #16694",
  },
];
const hapticFeedbackOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const HiddenItemWithActions = (props) => {
  const {
    leftActionActivated,
    rightActionActivated,
    swipeAnimatedValue,
    onClose,
    onDelete,
    rowKey,
  } = props;

  if (rightActionActivated) {
    ReactNativeHapticFeedback.trigger("impactLight", hapticFeedbackOptions);
    Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
      toValue: Math.abs(swipeAnimatedValue.__getValue()),
      duration: 250,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.timing(rowAnimatedValues[rowKey].rowBackWidth, {
      toValue: 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View
      style={[ArchiveJobStyle.rowBack, { height: rowAnimatedValues[rowKey].rowHeight }]}
    >
      {!rightActionActivated && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              ArchiveJobStyle.backBtn,
              ArchiveJobStyle.backLeftBtn,
              {
                width: 100,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [0, 60, 100],
                      outputRange: [-100, -40, 0],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={ArchiveJobStyle.backBtnInner}>
              <Ionicons
                name="arrow-forward-outline"
                size={22}
                color={_COLORS.Kodie_BlackColor}
              />
              <Text style={ArchiveJobStyle.backBtnText}>Left</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {!leftActionActivated && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View
            style={[
              ArchiveJobStyle.backBtn,
              ArchiveJobStyle.backRightBtn,
              ArchiveJobStyle.backRightBtnLeft,
              {
                width: 100,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [-200, -120, 0],
                      outputRange: [-100, -20, 100],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={ArchiveJobStyle.backBtnInner}>
              <Entypo
                name="dots-three-horizontal"
                size={22}
                color={_COLORS.Kodie_WhiteColor}
              />
              <Text style={ArchiveJobStyle.backBtnText}>More</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      {!leftActionActivated && (
        <TouchableWithoutFeedback onPress={onDelete}>
          <Animated.View
            style={[
              ArchiveJobStyle.backBtn,
              ArchiveJobStyle.backRightBtn,
              ArchiveJobStyle.backRightBtnRight,
              {
                width: rowAnimatedValues[rowKey].rowBackWidth,
                transform: [
                  {
                    translateX: swipeAnimatedValue.interpolate({
                      inputRange: [-200, -120, 0],
                      outputRange: [0, 40, 100],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={ArchiveJobStyle.backBtnInner}>
              <Ionicons name="archive-outline"  size={22} color={_COLORS.Kodie_WhiteColor} />
              <Text style={ArchiveJobStyle.backBtnText}>Archive</Text>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
};

const rowAnimatedValues = {};
Array(20)
  .fill("")
  .forEach((_, i) => {
    rowAnimatedValues[`${i}`] = {
      rowHeight: new Animated.Value(60),
      rowFrontTranslate: new Animated.Value(1),
      rowBackWidth: new Animated.Value(100),
    };
  });

const ArchiveJob = () => {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const { width: screenWidth } = useWindowDimensions();

  const [list, setList] = useState(
    property_List.map((item) => ({
      key: item.id,
      text: item.name,
      buttonName: item.buttonName,
      tanentname: item.tanentname,
      budget: item.budget,
      spend: item.spend,
      refno: item.refno,
      readText: item.readText,
      isPosted: item.isPosted,
      isOngoing: item.isongoing,
      isCompleted: item.isCompleted,
      isLocation: item.location,
    }))
  );

  const VisibleItem = (props) => {
    const { data, screenWidth, rowKey } = props;
    return (
      <TouchableWithoutFeedback onPress={() => console.log("touched")}>
        <Animated.View
          style={[
            ArchiveJobStyle.rowFront,
            {
              // height: rowAnimatedValues[rowKey].rowHeight,
              transform: [
                {
                  translateX: rowAnimatedValues[
                    rowKey
                  ].rowFrontTranslate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-screenWidth, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View style={ArchiveJobStyle.Container}>
            {console.log(data.name)}
            <View style={ArchiveJobStyle.flat_MainView}>
              <View style={ArchiveJobStyle.flexContainer}>
                <Text style={ArchiveJobStyle.commontext}>{data.text}</Text>
              </View>

              <View style={ArchiveJobStyle.RightContainer}>
                <View
                  style={[
                    ArchiveJobStyle.buttonView,
                    {
                      backgroundColor: data.isPosted
                        ? _COLORS.Kodie_mostLightBlueColor
                        : data.isongoing
                        ? _COLORS.Kodie_LightOrange
                        : _COLORS.Kodie_mostLightGreenColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      ArchiveJobStyle.roundButton,
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
                      ArchiveJobStyle.buttonText,
                      {
                        color: data.isPosted
                          ? _COLORS.Kodie_BlueColor
                          : data.isongoing
                          ? _COLORS.Kodie_DarkOrange
                          : _COLORS.Kodie_GreenColor,
                      },
                    ]}
                  >
                    {data.buttonName}
                  </Text>
                </View>
              </View>
              <Entypo
                name={"dots-three-horizontal"}
                size={20}
                color={_COLORS.Kodie_GrayColor}
                style={{ marginLeft: 15 }}
              />
            </View>
            <Text style={ArchiveJobStyle.commonMidtext}>{data.refno}</Text>
            <View style={ArchiveJobStyle.flat_MainView}>
              <View style={ArchiveJobStyle.flexContainer}>
                <View style={ArchiveJobStyle.propertyView}>
                  <View style={ArchiveJobStyle.flexContainer}>
                    <Text style={ArchiveJobStyle.tom}>Tom</Text>
                    <View style={ArchiveJobStyle.locationView}>
                      <MaterialCommunityIcons
                        name={"map-marker"}
                        size={16}
                        color={_COLORS.Kodie_MediumGrayColor}
                        style={{ alignSelf: "center" }}
                      />
                      <Text style={ArchiveJobStyle.locationText}>
                        {"1729 Melbourne St Australia"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[ArchiveJobStyle.BudgetView]}>
                <View style={ArchiveJobStyle.flexContainer}>
                  <Text style={ArchiveJobStyle.bugetText}>{data.budget}</Text>

                  <Text style={ArchiveJobStyle.spend}>{data.spend}</Text>
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

  const deleteRow = (rowKey) => {
    const newData = list.filter((item) => item.key !== rowKey);
    setList(newData);
  };

  const onDelete = (rowKey) => {
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
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log("on right action status change");
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
      />
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <HiddenItemWithActions
      data={property_List}
      rowMap={rowMap}
      rowKey={data.item.key}
      onClose={() => closeRow(rowMap, data.item.key)}
      onDelete={() => onDelete(data.item.key)}
    />
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <SwipeListView
        data={list}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={60}
        rightOpenValue={-120}
        stopLeftSwipe={100}
        stopRightSwipe={-201}
        rightActivationValue={-200}
        rightActionValue={-screenWidth}
        onRightActionStatusChange={onRightActionStatusChange}
        swipeGestureEnded={swipeGestureEnded}
        swipeToOpenPercent={10}
        swipeToClosePercent={10}
        useNativeDriver={false}
      />
    </SafeAreaView>
  );
};

export default ArchiveJob;
