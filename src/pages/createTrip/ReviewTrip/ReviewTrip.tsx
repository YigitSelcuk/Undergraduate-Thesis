import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import styles from './ReviewTrip.style'
import CreateTripContext from '../../../Context/CreateTripContext';
import moment from 'moment';
import InfoItem from '../../../components/InfoItem/InfoItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'

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
  startDate?: string; 
  endDate?: string;  
  totalNoOfDays?: number; 
  budget?: string;  
}

interface TripContextType {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

type RootStackParamList = {
  'GenerateTrip': undefined; 
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GenerateTrip'>;

export default function ReviewTrip() {

  const context = useContext(CreateTripContext);

  if (!context) {
    throw new Error("CreateTripContext is null");
  }

  const { tripData, setTripData } = context as TripContextType;
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review your trip</Text>
      <View style={styles.contextContainer}>
        <Text style={styles.contex}>
          Before generating your trip, please review your selection
        </Text>
        
        {/* Destination Info */}
        <InfoItem
          icon="📍"
          title="Destination"
          description={tripData.locationInfo?.name}
        />
        {/* Date Info */}
        <InfoItem
          icon="📆"
          title="Travel Date"
          description={`${moment(tripData.startDate).format('DD MMM')} To ${moment(
            tripData.endDate
          ).format('DD MMM')} (${tripData.totalNoOfDays} days)`}
        />
        {/* Traveler Info */}
        <InfoItem
          icon="🚌"
          title="Who is Traveling"
          description={tripData.travelerCount}
        />
        {/* Budget Info */}
        <InfoItem
          icon="💰"
          title="Budget"
          description={tripData.budget}
        />
      </View>
      <TouchableOpacity 
      onPress={()=>navigation.navigate('GenerateTrip')}
      style={styles.continueButton}>
        <Text style={styles.continueText}>Build My Trip</Text>
      </TouchableOpacity>
    </View>
  );
}