import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import TopHeader from "../../../components/Molecules/Header/Header";
import CustomTabNavigator from "../../../components/Molecules/CustomTopNavigation/CustomTopNavigation";
import { _goBack } from "./../../../services/CommonServices/index";
import { _COLORS } from "../../../Themes";
import { JobsCss } from "./JobsCss";
import Repair from "./Repair/Repair";
import SearchForContractor from "./SearchforContractor/SearchForContractor";
import SearchforJob from "./SearchforJob/SearchforJob";
import { useRoute } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
const Jobs = (props) => {
  const route = useRoute();
  const [job_sub_type, setJobSubType] = useState(1);
  const [activeTab, setActiveTab] = useState("Tab1");
  let myJob_Type = props.route.params?.myJob_Type;
  let job_sub_type_req = props.route.params?.job_sub_type;
  console.log("job_sub_type_req...", job_sub_type_req);

  useEffect(() => {
    Platform.OS == "ios" ? CheckIOSMapPermission() : checkpermissionlocation();
  }, []);
  // Location.....
  const CheckIOSMapPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            getOneTimeLocation();
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkpermissionlocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "App permission",
          message: "App need access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        getOneTimeLocation();
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.log("err....", err);
    }
  };
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log("Postition location......", position);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        // setlatitude(currentLatitude);
        // setlongitude(currentLongitude);
        // dispatch(saveLocationData({...position?.coords}));
        // saveLocation(position?.coords);
      },
      (error) => {
        console.log("error.....", error);
        //setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };
  const checkTabs = () => {
    switch (activeTab) {
      case "Tab1":
        return (
          <Repair
            onpress={() => {
              props.navigation.navigate("CreateJobFirstScreen", {
                myJob: "requested",
              });
            }}
            myJob_Type={myJob_Type}
            servicing_press={() => {
              props.navigation.navigate("CreateJobFirstScreen", {
                myJob: "Servicing",
              });
            }}
            create_job_id={(job_id) => {
              // alert(job_id);
              props.navigation.navigate("JobDetails", {
                JOB_ID: job_id,
                View_Job_Details: "View_Job_Details",
              });
            }}
            job_sub_type_req={job_sub_type_req}
          />
        );
      case "Tab2":
        return (
          <SearchForContractor
            Search={(SearchData) => {
              alert("dfgdsgddgdsdfd", JSON.stringify(SearchData));
              props.navigation.navigate("SearchDetail", {
                SearchDataDetail: SearchData,
              });
            }}
          />
        );

      case "Tab3":
        return (
          <SearchforJob
            SearchResultJob={(Searchjob) => {
              // alert("Searchjob", JSON.stringify(Searchjob));
              props.navigation.navigate("SearchJobResult", {
                SearchDataDetail: Searchjob,
              });
            }}
          />
        );

      default:
        return (
          <Repair onpress={props.navigation.navigate("CreateJobFirstScreen")} />
        );
    }
  };

  return (
    <View style={JobsCss.Container}>
      <TopHeader
        onPressLeftButton={() => props.navigation.navigate("Dashboard")}
        MiddleText={"Jobs"}
        isprofileImage
        IsNotification={true}
      />
      <CustomTabNavigator
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        TAB3
        Tab1={"My jobs"}
        Tab2={"Search for contractors"}
        Tab3={"Search for jobs"}
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
        styleTab1={activeTab === "Tab1" && JobsCss.activeTab}
        styleTab2={activeTab === "Tab2" && JobsCss.activeTab}
        styleTab3={activeTab === "Tab3" && JobsCss.activeTab}
      />
      <View style={JobsCss.Line} />
      {checkTabs()}
    </View>
  );
};

export default Jobs;
