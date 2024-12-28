import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AccountButton({
  title,
  subtitle,
  icon1Name,
  iconName,
  onPress
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity 
      style={[
        styles.buttonContainer, 
        { backgroundColor: isPressed ? '#E0E0E0' : '#FFFFFF' } // Change background color on press
      ]}
      onPressIn={() => setIsPressed(true)} // When button is pressed
      onPressOut={() => setIsPressed(false)} // When button is released
      onPress={onPress}
      activeOpacity={1} // Keeps the opacity consistent
    >
      <View style={styles.titleRow}>

        {/* Icon on the left */}
        <View style={styles.titleImgContainer}>
          <Icon name={iconName} size={24} color="#24C690" />
        </View>

        {/* Text Section */}
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        {/* Icon on the right */}
        <View style={styles.iconContainer}>
          <Icon name={icon1Name} size={24} color="#24C690" />
        </View>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 3,
    marginHorizontal: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  titleImgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily:'Outfit-Bold'
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    fontFamily:'Outfit-Regular'

  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
