import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    FlatList
} from 'react-native';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../Config/FirebaseConfig/FirebaseConfig';
import UserTripList from '../../../components/UserTripList/UserTripList';
import StartNewTrips from '../../../components/MyTrips/StartNewTrips/StartNewTrips';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './MyTrip.style';

interface TripData {
    locationInfo?: {
        name: string;
        photoRef?: string;
    };
    startDate?: string;
    travelerCount?: number | undefined;
}

interface UserTrip {
    tripData: TripData;
    flightData?: any[];
    hotelData?: any[];
    plannedData?: any[];
    userEmail: string;
    id?: string;
}

type RootStackParamList = {
    'SearchPlace': undefined;
    'MainReview': { userTrips: UserTrip };
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchPlace' | 'MainReview'>;

export default function MyTrip() {
    const [userTrips, setUserTrips] = useState<UserTrip[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const user = auth.currentUser;
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    useFocusEffect(
        useCallback(() => {
            if (user) {
                refreshTrips();
            }
        }, [user])
    );

    const refreshTrips = async () => {
        setRefreshing(true);
        await GetMyTrips();
        setRefreshing(false);
    };

    const GetMyTrips = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'UserTrip'), where('userEmail', '==', user?.email));
            const querySnapshot = await getDocs(q);

            const newTrips: UserTrip[] = [];
            querySnapshot.forEach((d) => {
                const data = d.data() as UserTrip;
                if (data.tripData && data.userEmail) {
                    newTrips.push({ ...data, id: d.id });
                }
            });

            setUserTrips(newTrips);
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (trip: UserTrip) => {
        if (trip.id) {
            try {
                await deleteDoc(doc(db, 'UserTrip', trip.id));
                setUserTrips(prev => prev.filter(t => t.id !== trip.id));
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };

    const renderItem = ({ item }: { item: UserTrip }) => {
        return (
            <UserTripList 
                userTrips={[item]} 
                onTripPress={() => navigation.navigate('MainReview', { userTrips: item })} 
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>My Trips</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SearchPlace')}
                    style={styles.addButton}
                >
                    <Text style={styles.creatButton}>+ Create Trip</Text>
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#000" style={styles.loader} />}

            {userTrips.length === 0 ? (
                <StartNewTrips />
            ) : (
                <FlatList
                    data={userTrips}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    contentContainerStyle={styles.flatListContent}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshTrips} tintColor="#000" />}
                    showsVerticalScrollIndicator={false}
                    bounces={true}
                    style={styles.flatList}
                />
            )}
        </View>
    );
}

