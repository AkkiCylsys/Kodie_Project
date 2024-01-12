import React, { useState, useRef } from "react";
import { View, ScrollView } from "react-native";
import { ManagingcontractorsStyle } from "./ManagingcontractorsStyle";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import { _COLORS, IMAGES } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import SearchBar from "../../components/Molecules/SearchBar/SearchBar";
import CustomTabNavigator from "../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import Contractors from "../../components/Molecules/Contractors/Contractors";
import RBSheet from "react-native-raw-bottom-sheet";
import ContractorsImage from "../../components/Molecules/Contractors/ContractorsImage/ContractorsImage";
import Preferred from "./Preferred/Preferred";
import CurrentContractor from "./Current/Current";
import PreviousContractor from "./PreviousContractor/PreviousContractor";
import AddContractorModal from "../../components/Molecules/AddContractorModal/AddContractorModal";

const Managingcontractors = (props) => {
  const refRBSheet1 = useRef();
  const [activeScreen, setActiveScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("Tab1");
  const [isLoading, setIsLoading] = useState(false);
  const toggleView = () => {
    setVisible(!visible);
  };
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return <Preferred />;
      case "Tab2":
        return <CurrentContractor />;
      case "Tab3":
        return <PreviousContractor />;
    }
  };
  return (
    <View style={ManagingcontractorsStyle.mainContainer}>
      <TopHeader
        leftImage={"menu"}
        onPressLeftButton={() => _goBack(props)}
        MiddleText={"Contractors"}
        isprofileImage
        IsNotification={true}
      />

      <View style={ManagingcontractorsStyle.container}>
        <View style={ManagingcontractorsStyle.tabview}>
          <CustomTabNavigator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            TAB3
            Tab1={"Preferred"}
            Tab2={"Current"}
            Tab3={"Previous"}
            onPressTab1={() => setActiveTab("Tab1")}
            onPressTab2={() => setActiveTab("Tab2")}
            onPressTab3={() => setActiveTab("Tab3")}
            colorTab1={
              activeTab === "Tab1"
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            colorTab2={
              activeTab === "Tab2"
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            colorTab3={
              activeTab === "Tab3"
                ? _COLORS.Kodie_BlackColor
                : _COLORS.Kodie_MediumGrayColor
            }
            styleTab1={
              activeTab === "Tab1" && ManagingcontractorsStyle.activeTab
            }
            styleTab2={
              activeTab === "Tab2" && ManagingcontractorsStyle.activeTab
            }
            styleTab3={
              activeTab === "Tab3" && ManagingcontractorsStyle.activeTab
            }
          />
        </View>
        <View style={ManagingcontractorsStyle.Line} />
        <SearchBar
          marginTop={20}
          frontSearchIcon
          isFilterImage
          filterImage={IMAGES.filter}
          height={48}
        />
        <View style={ManagingcontractorsStyle.Line1} />
        <View style={ManagingcontractorsStyle.buttonview}>
          <CustomSingleButton
            _ButtonText={"Add contractor"}
            Text_Color={_COLORS.Kodie_WhiteColor}
            text_Size={14}
            backgroundColor={_COLORS.Kodie_BlackColor}
            height={40}
            marginTop={20}
            onPress={() => {
              refRBSheet1.current.open();
            }}
            disabled={isLoading ? true : false}
          />
        </View>
        <View style={ManagingcontractorsStyle.Line1} />
      </View>
      {checkTabs()}

      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={true}
        height={280}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0, 0.20)",
          },
          draggableIcon: {
            backgroundColor: _COLORS.Kodie_BlackColor,
          },
          container: ManagingcontractorsStyle.bottomModal_container,
        }}
      >
        <AddContractorModal onCloseModal={() => refRBSheet1.current.close()} />
      </RBSheet>
    </View>
  );
};
export default Managingcontractors;
