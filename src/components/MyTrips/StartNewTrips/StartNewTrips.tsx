import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './StartNewTrips.style'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  'SearchPlace': undefined; 
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchPlace'>;

export default function StartNewTrips() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Icon name='location-sharp' size={30} color={'black'}></Icon>
      <Text style={styles.context}>No trips planned yet</Text>
      <Text style={styles.context2}>Looks like its time to plan a new travel experinece! Get Started below</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SearchPlace')} style={styles.button}>
        <Text style={styles.buttonText}>Start a new trip</Text>
      </TouchableOpacity>
    </View>
  )
}