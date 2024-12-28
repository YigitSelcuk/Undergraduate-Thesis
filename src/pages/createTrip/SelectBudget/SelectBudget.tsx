import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from './SelectBudget.style'
import { FlatList } from 'react-native-gesture-handler'
import { SelectBudgetOptions } from '../../../constant/Options'
import OptionsCard from '../../../components/OptionsCard/OptionsCard'
import CreateTripContext from '../../../Context/CreateTripContext'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'

interface TripData {
    travelerCount?: string;
    startDate?: moment.Moment;
    endDate?: moment.Moment;
    totalNoOfDays?: number;
    budget?: string;
}

interface BudgetOption {
    id: number;
    title: string;
    desc: string;
    icon: string;
    people: string;
}

interface TripContextType {
    tripData: TripData;
    setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

type RootStackParamList = {
    'ReviewTrip': undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReviewTrip'>;

export default function SelectBudget() {
    const [selectedOption, setSelectedOption] = useState<BudgetOption | undefined>();
    const context = useContext(CreateTripContext);
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    if (!context) {
        throw new Error("CreateTripContext is null");
    }
    const { tripData, setTripData } = context as TripContextType;

    useEffect(() => {
        if (selectedOption) {
            setTripData(prevData => ({
                ...prevData,
                budget: selectedOption.title
            }));
        }
    }, [selectedOption, setTripData]);
    const onClickContinue = () => {
        if (!selectedOption) {
            ToastAndroid.show('Select Your Budget', ToastAndroid.LONG);
            return;
        }
        navigation.navigate('ReviewTrip');

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget</Text>
            <View style={styles.contextContainer}>
                <Text style={styles.context}>Choose spending habits for your trip</Text>
                <FlatList
                    data={SelectBudgetOptions}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedOption(item)}
                            style={styles.card}>
                            <OptionsCard options={item} selectedOption={selectedOption} />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <TouchableOpacity onPress={onClickContinue} style={styles.continueButton}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}