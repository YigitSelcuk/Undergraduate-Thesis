import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './SelectTraveler.style'
import { SelectTravelerList } from '../../../constant/Options'
import OptionsCard from '../../../components/OptionsCard/OptionsCard'
import CreateTripContext from '../../../Context/CreateTripContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface TravelerItem {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: string;
}

interface TripData {
  locationInfo?: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    photoRef?: string;
    url?: string;
  };
  travelerCount?: string;
}

interface TripContextType {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

type RootStackParamList = {
  'SelectDate': undefined; 
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectDate'>;


export default function SelectTraveler() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerItem | null>(null);
  const context = useContext(CreateTripContext);
  
  if (!context) {
    throw new Error("CreateTripContext is null");
  }
  
  const { tripData, setTripData } = context as TripContextType;

  useEffect(() => {
    if (selectedTraveler) {
      setTripData(prevData => ({
        ...prevData,
        travelerCount: selectedTraveler.title
      }));
    }
  }, [selectedTraveler, setTripData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's Traveling</Text>
      <View style={styles.body}>
        <Text style={styles.bodyTitle}>Choose your travelers</Text>
        <FlatList<TravelerItem>
          data={SelectTravelerList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={styles.item}>
              <OptionsCard 
                options={item} 
                selectedOption={selectedTraveler} 
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      
      <TouchableOpacity 
      onPress={() => navigation.navigate('SelectDate')}
      style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}