import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppCalendar = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true); // Track whether it's for start date
  const [isTimePicker, setIsTimePicker] = useState(false); // Track whether to show time picker
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [pickedCal, setPickedCal] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Request calendar permissions on mount
    RNCalendarEvents.requestPermissions()
      .then((res) => {
        setPermissionStatus(res);
        if (res === 'authorized') {
          RNCalendarEvents.findCalendars().then((calendars) => {
            const modifiableCal = calendars.find((cal) => cal.allowsModifications);
            if (modifiableCal) {
              setPickedCal(modifiableCal);
            }
          });
        }
      })
      .catch((err) => console.log('Error requesting permissions:', err));
  }, []);

  const createEvent = () => {
    if (permissionStatus !== 'authorized') {
      alert('Calendar access is not authorized.');
      return;
    }

    if (!pickedCal) {
      alert('No valid calendar found.');
      return;
    }

    const eventConfig = {
      calendarId: Platform.OS === 'android' ? pickedCal.id : undefined,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: eventLocation,
      notes: "Test event notes", // Optional: add notes
    };

    RNCalendarEvents.saveEvent(eventTitle, eventConfig)
      .then((eventId) => {
        alert('Event saved!');
        fetchEvents(); // Fetch events after creating a new one
      })
      .catch((err) => {
        console.log('Error while saving event:', err);
      });
  };

  const fetchEvents = () => {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7); 

    RNCalendarEvents.fetchAllEvents(
      today.toISOString(),
      oneWeekLater.toISOString(),
    )
      .then((fetchedEvents) => {
        setEvents(fetchedEvents);
      })
      .catch((err) => {
        console.log('Error fetching events:', err);
      });
  };

  const deleteEvent = (eventId) => {
    RNCalendarEvents.removeEvent(eventId)
      .then((success) => {
        if (success) {
          alert('Event deleted successfully!');
          fetchEvents(); 
        }
      })
      .catch((err) => {
        console.log('Error while deleting event:', err);
      });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || (isStartDate ? startDate : endDate);
    setShowDatePicker(false);

    if (isStartDate) {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }
  };

  const showDatePickerForStart = () => {
    setIsStartDate(true);
    setIsTimePicker(false);
    setShowDatePicker(true);
  };

  const showDatePickerForEnd = () => {
    setIsStartDate(false);
    setIsTimePicker(false);
    setShowDatePicker(true);
  };

  const showTimePicker = () => {
    setIsTimePicker(true);
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Event Title"
            value={eventTitle}
            onChangeText={setEventTitle}
          />
        </View>

        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Event Location"
            value={eventLocation}
            onChangeText={setEventLocation}
          />
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>Start Date & Time:</Text>
          <View style={styles.row}>
            <Button
              title={startDate.toLocaleDateString()}
              onPress={showDatePickerForStart}
            />
            <Button
              title={startDate.toLocaleTimeString()}
              onPress={showTimePicker}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.label}>End Date & Time:</Text>
          <View style={styles.row}>
            <Button
              title={endDate.toLocaleDateString()}
              onPress={showDatePickerForEnd}
            />
            <Button
              title={endDate.toLocaleTimeString()}
              onPress={showTimePicker}
            />
          </View>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={isTimePicker ? (isStartDate ? startDate : endDate) : (isStartDate ? startDate : endDate)}
            mode={isTimePicker ? 'time' : 'date'}
            display="default"
            onChange={handleDateChange}
          />
        )}


        <View style={styles.mainContainer}>
        <Button title="Save Event" onPress={createEvent} />
          {/* <Button title="Fetch Events" onPress={fetchEvents} />
          {events.length > 0 && (
            <View>
              <Text style={styles.label}>Fetched Events:</Text>
              {events.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                  <Text>{event.title}</Text>
                  <Text>{new Date(event.startDate).toLocaleString()}</Text>
                  <Button
                    title="Delete"
                    onPress={() => deleteEvent(event.id)}
                  />
                </View>
              ))}
            </View>
          )} */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  mainContainer: {
    padding: 20,
  },
  rowContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
});

export default AppCalendar;
