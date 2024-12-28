import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useState } from 'react';
import styles from './SelectDate.style';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import CreateTripContext from '../../../Context/CreateTripContext';
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface TripData {
  travelerCount?: string;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  totalNoOfDays?: number;
}

interface TripContextType {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

export default function SelectDate() {
  const [startDate, setStartDate] = useState<moment.Moment | undefined>(undefined);
  const [endDate, setEndDate] = useState<moment.Moment | undefined>(undefined);

  const context = useContext(CreateTripContext);
  
  if (!context) {
    throw new Error('CreateTripContext is null');
  }
  type RootStackParamList = {
    'SelectBudget': undefined; 
  };
  type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectBudget'>;

  const { tripData, setTripData } = context as TripContextType;
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const onDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    if (type === 'START_DATE') {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const OnDateSelectionContinue = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show('Please select Start and End Date', ToastAndroid.LONG);
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, 'days');
    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays + 1,
    });
    navigation.navigate('SelectBudget')

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Dates</Text>
      
      <Text style={styles.travelerInfo}>
        {tripData.travelerCount ? `Travelers: ${tripData.travelerCount}` : 'No travelers selected'}
      </Text>

      <View style={styles.calendarConainer}>
        <CalendarPicker
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          onDateChange={onDateChange}
          selectedRangeStyle={{
            backgroundColor: '#a4a4a4',
          }}
        />
      </View>

      <TouchableOpacity onPress={OnDateSelectionContinue} style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}