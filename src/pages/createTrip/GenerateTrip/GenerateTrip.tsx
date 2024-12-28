import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './GenerateTrip.style';
import LottieView from 'lottie-react-native';
import CreateTripContext from '../../../Context/CreateTripContext';
import { AI_PROMPT } from '../../../constant/Options';
import { chatSession } from '../../../Config/AiModel/AiModel';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../Config/FirebaseConfig/FirebaseConfig';

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

interface TripPlanData {
  tripPlan: any; 
  tripData: string;
  docId: string;
  userEmail: string;
}

interface TripContextType {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

type RootStackParamList = {
  'DetailTrip': {
    userTrips: TripPlanData;
  };
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailTrip'>;

export default function GenerateTrip() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const context = useContext(CreateTripContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = auth.currentUser;

  if (!context) {
    throw new Error("CreateTripContext is null");
  }
  const { tripData, setTripData } = context as TripContextType;

  useEffect(() => {
    if (tripData) {
      tripData && GenerateAiTrip();
    }
  }, [tripData]);

  const GenerateAiTrip = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      if (!chatSession) {
        throw new Error('Chat session is not initialized');
      }
  
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData.locationInfo?.name || '')
        .replace('{totalDays}', String(tripData.totalNoOfDays || ''))
        .replace('{totalNight}', String((tripData.totalNoOfDays || 1) - 1))
        .replace('{traveler}', tripData.travelerCount || '')
        .replace('{budget}', tripData.budget || '')
        .replace('{totalDays}', String(tripData.totalNoOfDays || ''))
        .replace('{totalNight}', String((tripData.totalNoOfDays || 1) - 1));
  
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text();
      

      
      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from AI');
      }
  
      const cleanResponse = responseText
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
        .trim();
      
      const tripResp = JSON.parse(cleanResponse);
  
      if (!tripResp || typeof tripResp !== 'object') {
        throw new Error('Invalid response format from AI');
      }
  
      const docId = (Date.now()).toString();
  
      const tripPlanData = {
        userEmail: user?.email || '',
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        docId: docId,
      };
  
      await setDoc(doc(db, "UserTrip", docId), tripPlanData);
  
      navigation.replace('DetailTrip', {
        userTrips: tripPlanData
      });
  
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        responseText: responseText 
      });
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>Please Wait...</Text>
      <Text style={styles.txt2}>We are working to generate your dream trip</Text>
      <LottieView
        style={{ width: '100%', height: 300 }}
        source={require('../../../../assets/lottie/createPlan.json')}
        autoPlay
        loop
      />
      <Text style={styles.txt3}>❗ Don't Go Back</Text>
    </View>
  );
}