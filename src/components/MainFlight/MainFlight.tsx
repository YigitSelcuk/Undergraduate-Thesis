import { View, Text } from 'react-native'
import React from 'react'
import styles from './MainFlight.style'

interface FlightInfoProps {
    flightData: {
        tripPlan: {
            flight: {
                details: string;
                price: string;
                booking_url: string;
            }
        }
    }
}

export default function MainFlight({ flightData }: FlightInfoProps) {
    if (!flightData?.tripPlan?.flight) {
        return (
            <View style={styles.container}>
                <Text style={styles.infoText}>No Flight Information Available</Text>
            </View>
        );
    }

    const { details, price } = flightData.tripPlan.flight;

    return (
        <View style={styles.container}>
            <Text style={styles.price}>✈️ Flights</Text>
            <Text style={styles.infoText}>Airline: {details || 'Not available'}</Text>
            <Text style={styles.infoText}>Price: {price || 'Not available'}</Text>
        </View>
    )
}
