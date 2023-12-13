import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { TenantListStyle } from './TenantListStyle';
import { _COLORS } from '../../Themes';
import { _goBack } from '../../services/CommonServices';
import CustomTabNavigator from '../../components/Molecules/CustomTopNavigation/CustomTopNavigation';
import TopHeader from '../../components/Molecules/Header/Header';
import CurrentTenant from "./CurrentTenant/CurrentTenant";
import InviteTenant from '../Landlord/InviteTenant/InviteTenant';
import PreviousTenant from './PreviousTenant/PreviousTenant';
const TenantList = (props) => {
    const [activeTab, setActiveTab] = useState("Tab1");
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return <CurrentTenant />;

        case "Tab2":
        return <PreviousTenant />;

      case "Tab3":
        return <InviteTenant ViewButton ={()=>props.navigation.navigate("PreScreening")} />;

      default:
        return <CurrentTenant />;
    }
  };
  return (
    <View style={TenantListStyle.Container}>

      {/* <TopHeader onPressLeftButton={() => props.navigation.navigate("Dashboard")} /> */}

      <TopHeader 
      // onPressLeftButton={() => _goBack(props)} 
      onPressLeftButton={() => props.navigation.navigate("Dashboard")}
      MiddleText={"Tenants"} />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB3
        Tab1={"Current"}
        Tab2={"Previous"}
        Tab3={"Prospects"}
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
        styleTab1={activeTab === "Tab1" && TenantListStyle.activeTab}
        styleTab2={activeTab === "Tab2" && TenantListStyle.activeTab}
        styleTab3={activeTab === "Tab3" && TenantListStyle.activeTab}
      />
      <View style={TenantListStyle.Line} />
      {checkTabs()}
    </View>
  )
}

export default TenantList