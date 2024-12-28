import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import styles from './UserTripCard.style';

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
    trip?: TripPlanData;
}

export default function UserTripCard({ 
    trip = { 
        tripPlan: { 
            itinerary: [] 
        } 
    } 
}: TripCardProps) {
    const itinerary = trip.tripPlan.itinerary;

    const [locationImages, setLocationImages] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(true);

    const fetchLocationImage = async (location: string) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
                params: {
                    query: location,
                    key: Config.GOOGLE_MAP_KEY,
                },
            });

            if (response.data.results.length > 0) {
                const photoReference = response.data.results[0].photos?.[0]?.photo_reference;
                if (photoReference) {
                    const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.GOOGLE_MAP_KEY}`;
                    setLocationImages((prevImages) => ({
                        ...prevImages,
                        [location]: imageUrl,
                    }));
                }
            }
        } catch (error) {
            console.error('Error fetching location image:', error);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            const fetchPromises = itinerary.map(async (item) => {
                if (!locationImages[item.location]) {
                    await fetchLocationImage(item.location);
                }
            });
            await Promise.all(fetchPromises);
            setLoading(false);
        };

        fetchImages();
    }, [itinerary]);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {Array.isArray(itinerary) && itinerary.length > 0 ? (
                    itinerary.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <View>
                                {loading || !locationImages[item.location] ? (
                                    <ActivityIndicator size="small" color="#0000ff" />
                                ) : (
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri: locationImages[item.location] || 'https://example.com/default-image.jpg',
                                        }}
                                    />
                                )}
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.dayTime}>Day {item.day} - {item.time}</Text>
                                <Text style={styles.activity}>{item.activity}</Text>
                                <Text style={styles.location}>{item.location}</Text>
                                <Text style={styles.details} numberOfLines={2}>
                                    {item.details}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>No itinerary data available.</Text>
                )}
            </ScrollView>
        </View>
    );
}
