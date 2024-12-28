import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import styles from './PlannedTrip.style';

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
    planData: TripPlanData;
}

// Function to group itinerary items by day
const groupByDay = (itinerary: ItineraryItem[]) => {
    const grouped: { title: string; data: ItineraryItem[] }[] = [];

    itinerary.forEach((item) => {
        const dayGroup = grouped.find((group) => group.title === `Day ${item.day}`);

        if (dayGroup) {
            dayGroup.data.push(item);
        } else {
            grouped.push({
                title: `Day ${item.day}`,
                data: [item],
            });
        }
    });

    return grouped;
};

// Render item for the itinerary list
const renderItem = ({ item }: { item: ItineraryItem }) => {
    const [loading, setLoading] = useState(true);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhotoReference = async () => {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(item.location)}&key=${Config.GOOGLE_MAP_KEY}`
                );
                const photoReference = response.data.results[0]?.photos?.[0]?.photo_reference;
                if (photoReference) {
                    setPhotoUrl(
                        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.GOOGLE_MAP_KEY}`
                    );
                } else {
                    setPhotoUrl(item.image_url); // Fallback to provided image_url
                }
            } catch (error) {
                console.error('Error fetching photo reference:', error);
                setPhotoUrl(item.image_url); // Fallback to provided image_url
            } finally {
                setLoading(false);
            }
        };

        fetchPhotoReference();
    }, [item.location, item.image_url]);

    return (
        <View style={styles.itineraryItem}>
            <View style={styles.imageConta}>
                {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                    <Image
                        style={styles.image}
                        source={{ uri: photoUrl || './../../../assets/images/placeholder.jpg' }}
                        onLoad={() => setLoading(false)}
                        onError={() => setLoading(false)}
                    />
                )}
            </View>
            <View style={styles.body}>
                <Text style={styles.activity}>{item.activity}</Text>
                <Text style={styles.details}>{item.details}</Text>
                <Text style={styles.location}>🚩 {item.location}</Text>
                <Text style={styles.time}>🕑 Time to Travel: {item.time}</Text>
            </View>
        </View>
    );
};

export default function PlannedTrip({ planData }: TripCardProps) {
    const groupedItinerary = groupByDay(planData.tripPlan.itinerary);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏕️ Plan Details</Text>

            <SectionList
                sections={groupedItinerary}
                renderItem={renderItem}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.dayHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
