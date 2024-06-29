import React from 'react';
import { StyleSheet, Image, ScrollView, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  // Assuming today's consumed calories and goal
  const consumedCalories = 1800;
  const dailyGoal = 2000;
  const proteinGoal = 120;
  const proteinConsumed = 80; // Example values, you should replace these with actual data
  const carbsGoal = 200;
  const carbsConsumed = 150; // Example values
  const fatsGoal = 50;
  const fatsConsumed = 40; // Example values

  const caloriesProgress = (consumedCalories / dailyGoal) * 100;
  const proteinProgress = (proteinConsumed / proteinGoal) * 100;
  const carbsProgress = (carbsConsumed / carbsGoal) * 100;
  const fatsProgress = (fatsConsumed / fatsGoal) * 100;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2c2c2c', dark: '#1c1c1c' }}
      headerImage={
        <Image
          source={require('@/assets/images/apple-heart-shape-outline-glyph-flat.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>Today's Summary</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Today's Calories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.subtitle}>Calories</ThemedText>
            <Icon name="flame" size={24} color="#fff" style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <ThemedText style={styles.text}>Calories Consumed: {consumedCalories} kcal</ThemedText>
            <ThemedText style={styles.text}>Calories Goal: {dailyGoal} kcal</ThemedText>
          </View>
          
          {/* Progress Bar for Calories */}
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${caloriesProgress}%` }]} />
          </View>
          
        </View>

        {/* Protein Progress Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.subtitle}>Protein</ThemedText>
            <Icon name="nutrition" size={24} color="#fff" style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <ThemedText style={styles.text}>Protein Consumed: {proteinConsumed}g</ThemedText>
            <ThemedText style={styles.text}>Protein Goal: {proteinGoal}g</ThemedText>
          </View>
          
          {/* Progress Bar for Protein */}
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${proteinProgress}%` }]} />
          </View>
        </View>

        {/* Carbohydrates Progress Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.subtitle}>Carbohydrates</ThemedText>
            <Icon name="nutrition" size={24} color="#fff" style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <ThemedText style={styles.text}>Carbs Consumed: {carbsConsumed}g</ThemedText>
            <ThemedText style={styles.text}>Carbs Goal: {carbsGoal}g</ThemedText>
          </View>
          
          {/* Progress Bar for Carbohydrates */}
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${carbsProgress}%` }]} />
          </View>
        </View>

        {/* Fats Progress Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.subtitle}>Fats</ThemedText>
            <Icon name="nutrition" size={24} color="#fff" style={styles.icon} />
          </View>
          <View style={styles.textContainer}>
            <ThemedText style={styles.text}>Fats Consumed: {fatsConsumed}g</ThemedText>
            <ThemedText style={styles.text}>Fats Goal: {fatsGoal}g</ThemedText>
          </View>
          
          {/* Progress Bar for Fats */}
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${fatsProgress}%` }]} />
          </View>
        </View>

        {/* Add other sections as needed */}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignItems: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
  },
  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#2c2c2c',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    marginLeft: 10,
    color: '#fff',
  },
  textContainer: {
    marginLeft: 34,
  },
  text: {
    color: '#ccc',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#3a3a3a',
    borderRadius: 5,
    marginTop: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
});
