import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import TopHeader from "../../components/Molecules/Header/Header";
import { _goBack } from "../../services/CommonServices";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import EditDashboardComponent from "../../components/Molecules/EditDashboardComponent/EditDashboardComponent";
import { _COLORS, IMAGES } from "../../Themes";
import Entypo from "react-native-vector-icons/Entypo";
import CustomSingleButton from "../../components/Atoms/CustomButton/CustomSingleButton";
import { EditDashboardStyle } from "./EditDashboardStyle";
import { useState } from "react";

const EditDashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <View style={EditDashboardStyle.Mainview}>
        <TopHeader
          onPressLeftButton={() => _goBack(props)}
          MiddleText={"Edit Dashboard"}
        />
        <View style={EditDashboardStyle.Container}>
          <Text style={EditDashboardStyle.maintext}>Financial statistics</Text>
        </View>
        <ScrollView>
          <EditDashboardComponent
            name="“Cash flow overview” displays a summary of cash coming in and cash flowing out."
            heading="Cash flow overview"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Income / expenses summary” provides a concise overview of money earned and spent."
            heading="Income / expenses summary"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name=" “Rental received” refers to the total amount of money collected from tenants as rent for a specific period, such as a week / month."
            heading="Rental received"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Rental owing” summarizes rental payments which are currently due and outstanding."
            heading="Rental owing"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Property expenses” summarizes all costs related to your property."
            heading="Property expenses"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Expenses due” summarizes all expenses which are outstanding and have not yet been paid."
            heading="Expenses due"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Net profit analysis”summarizes the amount you have left over after deducting all expenses from all income earned."
            heading="Net profit analysis"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <View style={EditDashboardStyle.Container}>
            <Text style={EditDashboardStyle.maintext}>Property statistics</Text>
          </View>
          <EditDashboardComponent
            name="“Occupancy rate” details the percentage of properties that currently have tenants."
            heading="Occupancy rate"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Vacancy summary”explains the number of properties which currently do not have any tenants."
            heading="Vacancy summary"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Average rental yield” describes on average, how much money you're making from rent vs. your property's value."
            heading="Average rental yield"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Price to income ratio”describes how much your property costs in comparison to your income."
            heading="Price to income ratio"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Average lease term” summarizes how long, on average, your tenants usually stay in your properties."
            heading="Average lease term"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Average days on market” summarizes how long, on average, your property stays on the market before being rented."
            heading="Average days on market"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />

          <View style={EditDashboardStyle.Container}>
            <Text style={EditDashboardStyle.maintext}>
              Jobs / maintenance statistics
            </Text>
          </View>
          <EditDashboardComponent
            name="“Maintenance status overview”summarizes ongoing maintenance jobs.  "
            heading="Maintenance status overview"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Ongoing jobs”provides a quick view of jobs currently in progress."
            heading="Ongoing jobs"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Overdue jobs”provides a summary of jobs which are taking longer than expected. "
            heading="Overdue jobs"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Unpaid jobs”summarizes jobs which have been completed but haven’t been paid for yet."
            heading="Unpaid jobs"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <View style={EditDashboardStyle.Container}>
            <Text style={EditDashboardStyle.maintext}>General statistics</Text>
          </View>
          <EditDashboardComponent
            name="“Notices & reminders”summarizes important notifications and reminders."
            heading="Notices & reminders"
            icon={
              <AntDesign
                name="minuscircle"
                size={25}
                color={_COLORS.Kodie_lightRedColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <EditDashboardComponent
            name="“Inspections overview”provides a summary of inspections on your properties."
            heading="Inspections overview"
            icon={
              <AntDesign
                name="pluscircle"
                size={25}
                color={_COLORS.Kodie_GreenColor}
              />
            }
            iconmenu={
              <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
            }
          />
          <View style={{ marginHorizontal: 2 }}>
            <EditDashboardComponent
              name="“Tenant screening overview”summarizes the current status of tenant screening. "
              heading="Tenant screening overview"
              icon={
                <AntDesign
                  name="minuscircle"
                  size={25}
                  color={_COLORS.Kodie_lightRedColor}
                />
              }
              iconmenu={
                <Entypo name="menu" size={25} color={_COLORS.Kodie_GrayColor} />
              }
            />
          </View>
          <View style={EditDashboardStyle.buttonview}>
            <CustomSingleButton
              leftImage={IMAGES.uploadIcon}
              isLeftImage={true}
              Text_Color={_COLORS.Kodie_WhiteColor}
              borderColor={_COLORS.Kodie_TransparentColor}
              _ButtonText={"Confirm"}
              backgroundColor={_COLORS.Kodie_BlackColor}
              disabled={isLoading ? true : false}
            />

            <TouchableOpacity style={EditDashboardStyle.goBack_View}>
              <View style={EditDashboardStyle.backIcon}>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={_COLORS.Kodie_MediumGrayColor}
                />
              </View>
              <Text style={EditDashboardStyle.goBack_Text}>{"Go back"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default EditDashboard;
