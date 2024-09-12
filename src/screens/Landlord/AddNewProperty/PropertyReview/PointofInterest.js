import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDScJ03PP_dCxbRtighRoi256jTXGvJ1Dw';

const PointofInterest = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchPointsOfInterest("27.149994", "79.499901");
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const fetchPointsOfInterest = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=point_of_interest&key=${GOOGLE_MAPS_API_KEY}`
      );

      const poiData = categorizeData(response.data.results);
      console.log(JSON.stringify(poiData))
      setData(poiData);
    } catch (error) {
      console.error('Error fetching POIs:', error);
    }
  };

  const categorizeData = (places) => {
    const categories = {
      'Schools & Education': [],
      'Food & Entertainment': [],
      'Health': [],
      'Transport': []
    };

    places.forEach(place => {
      const { name, vicinity } = place;
      const distance = `${(place.distance || Math.random() * 3).toFixed(1)}km`; // Mocking distance
      if (place.types.includes('school') || place.types.includes('university')) {
        categories['Schools & Education'].push({ name, distance });
      } else if (place.types.includes('restaurant') || place.types.includes('food')) {
        categories['Food & Entertainment'].push({ name, distance });
      } else if (place.types.includes('hospital') || place.types.includes('health')) {
        categories['Health'].push({ name, distance });
      } else if (place.types.includes('bus_station') || place.types.includes('train_station')) {
        categories['Transport'].push({ name, distance });
      }
    });

    return Object.entries(categories).map(([category, items]) => ({ category, items }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDistance}>{item.distance}</Text>
    </View>
  );

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.category}</Text>
      <FlatList
        data={item.items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<TouchableOpacity onPress={()=>{
          alert(JSON.stringify(item.items.length))
          if(item.items.length >2){

          }else{
            alert(JSON.stringify("No more data found!"))
          }
        }}><Text style={styles.viewMore}>View more...</Text></TouchableOpacity>}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Points of Interest</Text>
      <FlatList
        data={data}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemDistance: {
    fontSize: 16,
    color: '#888',
  },
  viewMore: {
    color: '#45B742',
    marginTop: 5,
  },
});

//export default PointofInterest;


export default PointofInterest;
