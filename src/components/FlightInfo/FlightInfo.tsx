import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './FlightInfo.style'
interface ItineraryItem {
    day: number;
    time: string;
    activity: string;
    location: string;
    details: string;
    image_url: string;
    geo_coordinates: string;
    ticket_pricing?: string;
    time_to_travel?: string;
}

interface Hotel {
    name: string;
    address: string;
    price: string;
    image_url: string;
    geo_coordinates: string;
    rating: number;
    description: string;
}

interface Flight {
    details: string;
    price: string;
    booking_url: string;
}

interface TripPlan {
    flight: Flight;
    hotels: Hotel[];
    itinerary: ItineraryItem[];
}

interface TripPlanData {
    tripPlan: TripPlan;
    tripData: string;
    docId: string;
    userEmail: string;
}

interface TripCardProps {
    flightData: TripPlanData;
}

export default function FlightInfo({ flightData }: TripCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.flight}>
                <Text style={styles.price}>✈️ Flights</Text>
              
            </View>
            <Text style={styles.infoText}>Airline: {flightData.tripPlan.flight.details}</Text>
            <Text style={styles.infoText}>Price: {flightData.tripPlan.flight.price}</Text>



        </View>
    )
}