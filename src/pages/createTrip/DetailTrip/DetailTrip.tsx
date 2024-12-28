import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import styles from './DetailTrip.style';
import moment from 'moment';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import UserTripCard from '../../../components/UserTripCard/UserTripCard';
import Config from 'react-native-config';

interface LocationInfo {
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    photoRef: string;
    url: string;
}

interface TripData {
    locationInfo: LocationInfo;
    travelerCount: string;
    startDate: string;
    endDate: string;
    totalNoOfDays: number;
    budget: string;
}

interface TripPlanData {
    tripPlan: {
        flight: any;
        hotels: any[];
        itinerary: any[];
        places_to_visit:any[];
    };
    tripData: string;
    docId: string;
    userEmail: string;
}

export type RootStackParamList = {
    MyTrip: undefined;
    DetailTrip: {
        userTrips: TripPlanData;
    };
    AllDetailTrip: {
        userTrips: TripPlanData;
    };
};

  
type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AllDetailTrip'>;
type DetailTripRouteProp = RouteProp<RootStackParamList, 'DetailTrip'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'MyTrip'>;

export default function DetailTrip() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DetailTripRouteProp>();
    const { userTrips } = route.params;
    const tripDataObj: TripData = JSON.parse(userTrips.tripData);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('MyTrip')}
            >
                <Icon name="arrow-back-circle-outline" size={40} color={'black'} />
            </TouchableOpacity>

            <View style={styles.titleCont}>
                <Text style={styles.title}>Trip Detail</Text>
            </View>

            <ScrollView >
                <View style={styles.body}>
                {tripDataObj.locationInfo?.photoRef ? (
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' 
                            + tripDataObj.locationInfo.photoRef + '&key=' + Config.GOOGLE_MAP_KEY
                        }}
                    />
                ) : (
                    <Image style={styles.image} source={require('./../../../../assets/images/placeholder.jpg')} />
                )}
                    <View >
                        <Text style={styles.location}>{tripDataObj.locationInfo.name}</Text>
                        <View style={styles.info}>
                            <Text style={styles.startDate}>
                                {moment(tripDataObj.startDate).format('DD MMM yyyy')}
                            </Text>
                            <Text style={styles.traveler}>
                                🚌 {tripDataObj.travelerCount}
                            </Text>
                        </View>
                       <TouchableOpacity 
                        onPress={() => navigation.navigate('AllDetailTrip', { 
                            userTrips: userTrips 
                        })} 
                        style={styles.button}
                    >
                        <Text style={styles.txtbtn}>See your plan</Text>
                    </TouchableOpacity>
                    </View>
                        <UserTripCard trip={userTrips} />
                </View>
            </ScrollView>
        </View>
    );
}