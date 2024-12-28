import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import styles from './MainPlanned.style';

interface ItineraryItem {
    day: number;
    activity: string;
    location: string;
    details: string;
    image_url: string;
}

interface PlannedTripProps {
    planData: {
        tripPlan: {
            itinerary: ItineraryItem[];
        }
    }
}

const groupByDay = (itinerary: ItineraryItem[]) => {
    const grouped: { title: string; data: ItineraryItem[] }[] = [];
    itinerary.forEach((item) => {
        const dayGroup = grouped.find((group) => group.title === `Day ${item.day}`);
        if (dayGroup) {
            dayGroup.data.push(item);
        } else {
            grouped.push({ title: `Day ${item.day}`, data: [item] });
        }
    });
    return grouped;
};

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
            <View style={styles.imageContainer}>
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
                <Text style={styles.location}>🚩 {item.location}</Text>
                <Text style={styles.details}>{item.details}</Text>
            </View>
        </View>
    );
};

export default function MainPlanned({ planData }: PlannedTripProps) {
    if (!planData?.tripPlan?.itinerary?.length) {
        return (
            <View style={styles.container}>
                <Text>No Itinerary Available</Text>
            </View>
        );
    }

    const groupedItinerary = groupByDay(planData.tripPlan.itinerary || []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🏕️ Main Planned Details</Text>

            <SectionList
                sections={groupedItinerary}
                renderItem={renderItem}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.dayHeader}>{section.title}</Text>
                )}
                keyExtractor={(item, index) => `${item.day}-${index}`}
            />
        </View>
    );
}
