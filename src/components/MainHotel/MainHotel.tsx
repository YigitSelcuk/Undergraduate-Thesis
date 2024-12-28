import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './MainHotel.style';
import axios from 'axios';
import Config from 'react-native-config';

interface HotelDetailsProps {
    hotelData: {
        tripPlan: {
            hotels: Array<{
                name: string;
                address: string;
                price: string;
                image_url: string;
                geo_coordinates: string;
                rating: number;
                description: string;
            }>
        }
    }
}

export default function MainHotel({ hotelData }: HotelDetailsProps) {
    const [hotelPhotos, setHotelPhotos] = useState<(string | null)[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchHotelData() {
            if (!hotelData?.tripPlan?.hotels?.length) {
                setLoading(false);
                return;
            }

            try {
                const promises = hotelData.tripPlan.hotels.map(async (hotel) => {
                    try {
                        const response = await axios.get(
                            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(hotel.name)}&key=${Config.GOOGLE_MAP_KEY}`
                        );
                        const photoReference = response.data.results[0]?.photos?.[0]?.photo_reference;
                        return photoReference
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${Config.GOOGLE_MAP_KEY}`
                            : hotel.image_url;
                    } catch {
                        return hotel.image_url;
                    }
                });

                const photos = await Promise.all(promises);
                setHotelPhotos(photos);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchHotelData();
    }, [hotelData]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!hotelData?.tripPlan?.hotels?.length) {
        return (
            <View>
                <Text>No Hotel Information Available</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={hotelData.tripPlan.hotels}
            horizontal
            renderItem={({ item, index }) => (
                <View style={styles.body}>
                    <Image
                        style={styles.image}
                        source={{ uri: hotelPhotos[index] || item.image_url }}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>💰 {item.price}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            )}
        />
    );
}
