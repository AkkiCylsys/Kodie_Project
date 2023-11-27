import React from "react";
import { View, Text, FlatList } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { CustomStepIndicatorStyle } from "./CustomStepIndicatorStyle";
import { _COLORS } from "../../../Themes";

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: _COLORS.Kodie_GreenColor,
  separatorFinishedColor: _COLORS.Kodie_GreenColor,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: _COLORS.Kodie_GreenColor,
  stepIndicatorUnFinishedColor: "#aaaaaa",
  stepIndicatorCurrentColor: _COLORS.Kodie_GreenColor,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: "#000000",
  stepIndicatorLabelFinishedColor: _COLORS.Kodie_GreenColor,
  stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
  labelColor: "#000",
  labelSize: 15,
  currentStepLabelColor: _COLORS.Kodie_GreenColor,
};

const dummyData = {
  data: [
    {
      id: 1,
      body: "The bid has been approved. Proceed to schedule the job.",
      title: "Job bid approved",
      Date: "7 Nov 2023, 15:23",
      Text: "Schedule now",
    },
    {
      id: 2,
      title: "Scheduled",
      body: "The job has been scheduled for 11 November 2023 at 08:00am.",
      Date: "7 Nov 2023, 16:44",
    },
    {
      id: 3,
      title: "Job started",
      body: "Jason Stathom has started working on your job.",
      Date: "11 Nov 2023, 08:00",
    },
    {
      id: 4,
      title: "In progress",
      body: "The job is currently in progress and will be finished soon.",
      Date: "11 Nov 2023, 09:00",
    },
    {
      id: 5,
      title: "Complete",
      body: "Great news! Your job has been completed and is awaiting your sign off.",
      Date: "11 Nov 2023, 10:00",
    },
    {
      id: 6,
      title: "Awaiting payment",
      body: "You have signed the job done by Jason Stathom off.",
      Date: "11 Nov 2023, 13:23",
      Text: "Proceed to payment",
    },
    {
      id: 7,
      title: "Job closed",
      body: "Job done! Please remember to leave a review for Jason Stathom.",
      Date: "12 Nov 2023, 08:03",
      Text: "Leave review",
    },
  ],
};

export default function CustomStepIndicator() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 40,
  }).current;

  const renderPage = (rowData) => {
    const item = rowData.item;
    return (
      <View>
        <View style={CustomStepIndicatorStyle.rowItem}>
          <View style={CustomStepIndicatorStyle.Viewitem}>
            <Text style={CustomStepIndicatorStyle.textview}>{item.title}</Text>
            <Text style={CustomStepIndicatorStyle.body}>{item.Date}</Text>
          </View>
          <Text style={CustomStepIndicatorStyle.body}>
            {item.body}
            <Text style={CustomStepIndicatorStyle.textView}>{item.Text}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={CustomStepIndicatorStyle.container}>
      <View style={CustomStepIndicatorStyle.stepIndicator}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          stepCount={dummyData.data.length}
          direction="vertical"
          currentPosition={currentPage}
          // labels={dummyData.data.map((item) => item.title)}
        />
      </View>
      <FlatList
        style={{ flexGrow: 1 }}
        data={dummyData.data}
        renderItem={renderPage}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}
