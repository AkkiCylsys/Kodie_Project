import React, { useCallback, useState,useEffect } from "react";
import RangeSliderRN from "rn-range-slider";
import { View, Text } from "react-native";
import { RangeSliderStyle } from "./RangeSliderCss";

// import Label from "./Label";
import Notch from "./Notch";
import Rail from "./Rail";
import RailSelected from "./RailSelected";
import Thumb from "./Thumb";
import { _COLORS } from "../../../Themes";

const RangeSlider = ({ from, to,onPriceRangeChange }) => {
  // const RangeSlider = () => {
  const [low, setLow] = useState(from);
  const [high, setHigh] = useState(to);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  //   const renderLabel = useCallback((value) => <Label text={value} />, []);
  //   const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow, newHigh) => {
      setLow(newLow);
      setHigh(newHigh);
    },
    [setLow, setHigh]
  );

  useEffect(() => {
    const priceRange = high - low;
    onPriceRangeChange(priceRange);
  }, [low, high, onPriceRangeChange]);

  const priceRange = high - low;
  console.log("priceRange...", priceRange);
  // alert(priceRange);
  return (
    <>
      <View style={RangeSliderStyle.rangecomponetView}>
        <RangeSliderRN
          selectionColor="#4286f4"
          thumbColor={_COLORS.Kodie_BlueColor}
          thumbBorderColor="#45B742"
          //style={{backgroundColor:'red'}}
          min={from}
          max={to}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          // renderLabel={renderLabel}
          // renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
      </View>
      <View style={RangeSliderStyle.rangeContainer}>
        <View>
          <Text style={RangeSliderStyle.range}>${low}</Text>
        </View>
        <View>
          <Text style={RangeSliderStyle.range}>${high}</Text>
        </View>
      </View>
    </>
  );
};

export default RangeSlider;
