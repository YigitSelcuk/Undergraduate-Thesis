import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './HotelDetails.style';
import { FlatList } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import axios from 'axios';

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
    hotelData: TripPlanData;
}

export default function HotelDetails({ hotelData }: TripCardProps) {
    const [hotelPhotos, setHotelPhotos] = useState<(string | null)[]>([]);
    const [loading, setLoading] = useState<boolean[]>([]);

    useEffect(() => {
        async function fetchHotelData() {
            const initialLoading = hotelData?.tripPlan?.hotels.map(() => true);
            setLoading(initialLoading);

            const promises = hotelData?.tripPlan?.hotels.map(async (hotel, index) => {
                try {
                    const response = await axios.get(
                        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(hotel.name)}&key=${Config.GOOGLE_MAP_KEY}`
                    );
                    const photoReference =
                        response.data.results[0]?.photos?.[0]?.photo_reference;
                    if (photoReference) {
                        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.GOOGLE_MAP_KEY}`;
                    }
                    return null; // Eğer fotoğraf yoksa boş döner
                } catch (error) {
                    console.error('Error fetching photo:', error);
                    return null;
                } finally {
                    setLoading((prevLoading) =>
                        prevLoading.map((item, idx) => (idx === index ? false : item))
                    );
                }
            });

            const photos = await Promise.all(promises);
            setHotelPhotos(photos);
        }

        fetchHotelData();
    }, [hotelData]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏨 Hotel Recommendation</Text>
            <FlatList
                style={styles.flatlist}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={hotelData?.tripPlan?.hotels}
                renderItem={({ item, index }) =>
                (
                    <View style={styles.body}>
                        <View >
                            {loading[index] ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : (
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: hotelPhotos[index] || item.image_url, // Eğer fotoğraf bulunamazsa varsayılan URL'yi kullanır
                                    }}
                                />
                            )}
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.detailContent}>
                                <Text style={styles.rating}>🌟 {item.rating}</Text>
                                <Text style={styles.rating}>💰 {item.price}</Text>
                            </View>
                            <View style={styles.desc}>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
