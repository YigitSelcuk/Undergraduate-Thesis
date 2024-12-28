import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Alert,
    Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import moment from 'moment';
import MainFlight from '../../../components/MainFlight/MainFlight';
import MainHotel from '../../../components/MainHotel/MainHotel';
import MainPlanned from '../../../components/MainPlanned/MainPlanned';
import { db } from '../../../Config/FirebaseConfig/FirebaseConfig';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import styles from './MainReview.style';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 330;
const MINIMUM_HEADER_HEIGHT = 100;

interface TripData {
    locationInfo?: {
        photoRef?: string;
        name?: string;
    };
    startDate?: string;
    endDate?: string;
    travelerCount?: number;
    tripPlan?: object;
}

interface RouteParams {
    userTrips: {
        docId: string;
    };
}

interface Section {
    type: 'flight' | 'hotel' | 'planned';
    data: TripData;
}

export default function MainReview() {
    const [tripData, setTripData] = useState<TripData | null>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute<{ params: RouteParams }>();
    const { userTrips } = route.params;
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchTripData = async () => {
            try {
                const docRef = doc(db, 'UserTrip', userTrips.docId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const parsedData = data.tripData ? JSON.parse(data.tripData) : {};
                    const mergedData: TripData = {
                        ...data,
                        ...parsedData,
                        ...data.tripPlan,
                    };
                    setTripData(mergedData);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTripData();
    }, [userTrips.docId]);

    const imageHeight = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT - MINIMUM_HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT, MINIMUM_HEADER_HEIGHT],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT - MINIMUM_HEADER_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const contentTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT - MINIMUM_HEADER_HEIGHT],
        outputRange: [0, -30],
        extrapolate: 'clamp',
    });

    const sections: Section[] = tripData ? [
        { type: 'flight', data: tripData },
        { type: 'hotel', data: tripData },
        { type: 'planned', data: tripData },
    ] : [];

    const renderHeader = () => (
        <>
            <Animated.View style={[styles.imageContainer, { height: imageHeight, opacity: imageOpacity }]}>
                <Image
                    style={styles.image}
                    source={{
                        uri: tripData?.locationInfo?.photoRef
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.locationInfo.photoRef}&key=${Config.GOOGLE_MAP_KEY}`
                            : 'https://via.placeholder.com/400',
                    }}
                />
            </Animated.View>

            <Animated.View style={[styles.content, { transform: [{ translateY: contentTranslate }] }]}>
                <Text style={styles.name}>{tripData?.locationInfo?.name || 'Unknown Location'}</Text>
                <View style={styles.date}>
                    <Text style={styles.startDate}>
                        {tripData?.startDate ? moment(tripData.startDate).format('DD MMM yyyy') : 'Undefined'}
                    </Text>
                    <Text style={styles.gap}>-</Text>
                    <Text style={styles.startDate}>
                        {tripData?.endDate ? moment(tripData.endDate).format('DD MMM yyyy') : 'Undefined'}
                    </Text>
                </View>
                <Text style={styles.traveler}>
                    {tripData?.travelerCount ? `🚌 ${tripData.travelerCount}` : 'Traveler info not available'}
                </Text>
            </Animated.View>
        </>
    );

    const renderItem = ({ item }: { item: Section }) => {
        switch (item.type) {
            case 'flight':
                return <MainFlight flightData={item.data} />;
            case 'hotel':
                return <MainHotel hotelData={item.data} />;
            case 'planned':
                return <MainPlanned planData={item.data} />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <View >
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!tripData) {
        return (
            <View >
                <Text>No trip data found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={sections}
                renderItem={renderItem}
                keyExtractor={(item) => item.type}
                ListHeaderComponent={renderHeader}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
