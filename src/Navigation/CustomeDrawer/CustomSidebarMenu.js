import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { IMAGES, _COLORS } from "../../Themes";
import DividerIcon from "../../components/Atoms/Devider/DividerIcon";
import { DrawerStyle } from "./DrawerStyle";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomSidebarMenu = (props) => {
  const [selectedId, setselectedId] = useState("");

  const check = (data) => {
    switch (data) {
      case "PropertyLinking":
        setselectedId("PropertyLinking");
        props.navigation.navigate("PropertyListings");
        break;
      case "RentalOffers":
        setselectedId("RentalOffers");
        props.navigation.navigate("RantalOffer");
        break;
      case "vacantProperties":
        setselectedId("vacantProperties");
        props.navigation.navigate("VacantPropertiesList");
        break;
      case "Inspection":
        setselectedId("Inspection");
        props.navigation.navigate("NewInspection");
        break;
      case "Tetants":
        setselectedId("Tetants");
        // props.navigation.navigate("TwoStepVerification");
        props.navigation.navigate("InviteTenant");
        break;
      case "MaintenanceJobs":
        setselectedId("MaintenanceJobs");
        props.navigation.navigate("Reviewjobdetails1");
        break;
      case "Contractors":
        setselectedId("Contractors");
        props.navigation.navigate("Managingcontractors");
        break;
      case "Notices":
        setselectedId("Notices");
        props.navigation.navigate("Notices");
        break;
      case "Documents":
        setselectedId("Documents");
        props.navigation.navigate("AccountStep");
        break;
      case "Reports":
        setselectedId("Reports");
        props.navigation.navigate("Reports");
        break;
      case "Partners":
        setselectedId("Partners");
        props.navigation.navigate("Partners");
        break;
      case "LogOut":
        setselectedId("LogOut");
        props.navigation.navigate("LoginScreen");
        break;

      default:
        setselectedId("Dashboard");
        break;
    }
  };
  return (
    <SafeAreaView style={DrawerStyle.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={DrawerStyle.Container}
      >
        <Text style={DrawerStyle.HeaderText}>{"Properties"}</Text>
        <TouchableOpacity
          style={[
            DrawerStyle.SubHeadingView,
            {
              backgroundColor:
                selectedId == "PropertyLinking"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("PropertyLinking")}
        >
          {/* <Image
            source={IMAGES.PropertyListing}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialCommunityIcons 
          name="calendar-text-outline" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Property listings"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "RentalOffers"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("RentalOffers")}
        >
          {/* <Image
            source={IMAGES.RentalOffers}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialCommunityIcons 
          name="calendar-arrow-left" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Rental offers"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "vacantProperties"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("vacantProperties")}
        >
          {/* <Image
            source={IMAGES.vacantProperties}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <Octicons 
          name="shield-x" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Vacant properties"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "Inspection"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Inspection")}
        >
          {/* <Image
            source={IMAGES.Inspections}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialCommunityIcons 
          name="calendar-search" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Inspections"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "Tetants"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Tetants")}
        >
          {/* <Image
            source={IMAGES.Tenants}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialCommunityIcons 
          name="shield-account-outline" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Tenants"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />

        <Text style={DrawerStyle.HeaderText}>{"Jobs"}</Text>
        <TouchableOpacity
          style={[
            DrawerStyle.SubHeadingView,
            {
              backgroundColor:
                selectedId == "MaintenanceJobs"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("MaintenanceJobs")}
        >
          {/* <Image
            source={IMAGES.Maintenancejobs}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <Feather 
          name="list" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Maintenance  jobs"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "Contractors"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Contractors")}
        >
          {/* <Image
            source={IMAGES.ContractorDrawer}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialIcons 
          name="engineering" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Contractors"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <Text style={DrawerStyle.HeaderText}>{"Other"}</Text>
        <TouchableOpacity
          style={[
            DrawerStyle.SubHeadingView,
            {
              backgroundColor:
                selectedId == "Notices"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Notices")}
        >
          {/* <Image
            source={IMAGES.Noticesreminders}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <Ionicons 
          name="mail-unread-outline" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Notices & reminders"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />

        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "Documents"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Documents")}
        >
          {/* <Image
            source={IMAGES.DocumentDrawer}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialCommunityIcons 
          name="file-download-outline" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Documents"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />

        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "Reports"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Reports")}
        >
          <MaterialIcons 
          name="bar-chart" size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          {/* <Image
            source={IMAGES.Reports}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <Text style={DrawerStyle.SubHeading}>{"Reports"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "Partners"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("Partners")}
        >
          {/* <Image
            source={IMAGES.Partner}
            style={DrawerStyle.ImageStyle}
            resizeMode={"contain"}
          /> */}
          <MaterialCommunityIcons 
          name="seal" 
          size={25} 
          color={_COLORS.Kodie_GreenColor} 
          resizeMode={"contain"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Partners"}</Text>
        </TouchableOpacity>
        <DividerIcon marginBottom={3} marginTop={5} />
        {/* <TouchableOpacity
          style={[
            DrawerStyle.rowFlex,
            {
              backgroundColor:
                selectedId == "LogOut"
                  ? _COLORS.Kodie_LiteWhiteColor
                  : _COLORS.Kodie_WhiteColor,
            },
          ]}
          onPress={() => check("LogOut")}
        >
          <Image
            source={IMAGES.Logout}
            style={DrawerStyle.ImageStyle}
            resizeMode={"center"}
          />
          <Text style={DrawerStyle.SubHeading}>{"Log Out"}</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CustomSidebarMenu;
