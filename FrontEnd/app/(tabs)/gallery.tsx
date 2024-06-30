import React, { useState } from 'react';
import { View, ScrollView, FlatList, StyleSheet, Image, Dimensions, TextInput, Platform, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type PhotoData = {
  id: string;
  photoUri: any;
  timestamp: string;
  name: string;
};

const data: PhotoData[] = [
  { id: '1', photoUri: require('../../assets/images/chesseburger.png'), timestamp: '2023-06-28 12:00', name: 'Cheeseburger' },
  { id: '2', photoUri: require('../../assets/images/pasta.png'), timestamp: '2023-06-29 08:30', name: 'Pasta' },
  { id: '3', photoUri: require('../../assets/images/watermellon.png'), timestamp: '2023-06-29 08:30', name: 'Watermelon' },
  { id: '4', photoUri: require('../../assets/images/pancakes.png'), timestamp: '2023-07-01 09:00', name: 'Pancakes' },
];

const numColumns = 2;
const { width } = Dimensions.get('window');
const itemSize = width / numColumns - 24; // Adjust size to leave space for padding

const renderItem = ({ item }: { item: PhotoData }) => (
  <View style={styles.itemContainer}>
    <Image source={item.photoUri} style={styles.image} />
    <View style={styles.overlay}>
      <ThemedText style={styles.imageName}>{item.name}</ThemedText>
    </View>
    <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
  </View>
);

export default function SavedScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Saved</ThemedText>
        <ThemedText type="link" style={styles.select}>Select</ThemedText>
      </ThemedView>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ThemedText style={styles.sectionTitle}>Today</ThemedText>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.columnWrapper}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight, // Adjust for iPhone notch
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black', // Same color as the background
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  select: {
    fontSize: 16,
    color: 'green',
    marginRight: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'white',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: itemSize,
    marginBottom: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: itemSize,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  imageName: {
    color: 'white',
    textAlign: 'center',
  },
  timestamp: {
    padding: 8,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
