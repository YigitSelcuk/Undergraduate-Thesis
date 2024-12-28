import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './UserTripList.style';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Config from 'react-native-config';

interface TripData {
    locationInfo?: {
        name: string;
        photoRef?: string; 
    };
    startDate?: string;
    travelerCount?: number | undefined; // `string` kaldırıldı
}
interface UserTrip {
    tripData: TripData | string;
}

interface UserTripListProps {
    userTrips: UserTrip[];
    onTripPress: (trip: TripData) => void;
}

export default function UserTripList({ userTrips, onTripPress }: UserTripListProps) {
    const firstTrip = userTrips[0];
    const latestTrip = firstTrip.tripData;

    let tripData: TripData;

    if (typeof latestTrip === 'string') {
        tripData = JSON.parse(latestTrip);
    } else {
        tripData = latestTrip;
    }

    return (
        <TouchableOpacity onPress={() => onTripPress(tripData)} style={styles.container}>
            <View style={styles.imgbody}>
                {tripData.locationInfo?.photoRef ? (
                    <Image
                        style={styles.image}
                        source={{
                            uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + tripData.locationInfo.photoRef + '&key=' + Config.GOOGLE_MAP_KEY
                        }}
                    />
                ) : (
                    <Image style={styles.image} source={require('./../../../assets/images/placeholder.jpg')} />
                )}
            </View>
            <View style={styles.txtbody}>
                <Text style={styles.location}>
                    {tripData.locationInfo?.name
                        ? tripData.locationInfo.name.length > 44
                            ? `${tripData.locationInfo.name.slice(0, 44)}...`
                            : tripData.locationInfo.name
                        : 'Undefined'}
                </Text>

                <Text style={styles.startDate}>
                    {tripData.startDate ? moment(tripData.startDate).format('DD MMM yyyy') : 'Undefined'}
                </Text>
                <Text style={styles.traveler}>
                    {tripData.travelerCount ? `🚌 ${tripData.travelerCount}` : 'Undefined'}
                </Text>
            </View>
            <View style={styles.icon}>
                <Icon name="arrow-redo" size={30} color={'black'} />
            </View>
        </TouchableOpacity>
    );
}
