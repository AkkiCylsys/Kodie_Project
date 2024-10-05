import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';
 
// Updated data structure
const SOUND_OF_SILENCE = [
  {
    userId: 1,
    comment: "Great sound quality and battery life!",
    rating: 5
  },
  {
    userId: 2,
    comment: "Comfortable to wear, but the noise cancelling isn't the best.",
    rating: 4
  },
  {
    userId: 3,
    comment: "Shakya",
    rating: 4
  },
  {
    userId: 4,
    comment: "Akshay",
    rating: 4
  }
];
 
export default function DraggableLyrics() {
  const [data, setData] = useState(SOUND_OF_SILENCE);
 
  function keyExtractor(item) {
    return item.userId.toString(); // Use userId as the key
  }
 
  function renderItem(info: DragListRenderItemInfo<{ userId: number; comment: string; rating: number; }>) {
    const { item, onDragStart, onDragEnd } = info;
 
    return (
      <TouchableOpacity
        key={item.userId}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        style={styles.item} // Add styles for better appearance
      >
        <Text style={styles.comment}>{item.comment}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
      </TouchableOpacity>
    );
  }
 
  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }
 
  return (
    <View style={styles.container}>
      <DragList
        data={data}
        keyExtractor={keyExtractor}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  comment: {
    fontSize: 16,
  },
  rating: {
    fontSize: 14,
    color: '#888',
  },
});