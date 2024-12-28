import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    ListRenderItem,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../DetailTrip/DetailTrip';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import FlightInfo from '../../../components/FlightInfo/FlightInfo';
import HotelDetails from '../../../components/HotelDetails/HotelDetails';
import PlannedTrip from '../../../components/PlannedTrip/PlannedTrip';
import styles from './AllDetailTrip.style';
import { BlurView } from '@react-native-community/blur';
import { db } from '../../../Config/FirebaseConfig/FirebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 330;
const MINIMUM_HEADER_HEIGHT = 100;

type AllDetailTripRouteProp = RouteProp<RootStackParamList, 'AllDetailTrip'>;

type SectionType = 'flight' | 'hotel' | 'planned';

interface SectionItem {
    type: SectionType;
    data: any; 
}

export default function AllDetailTrip() {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<AllDetailTripRouteProp>();
    const { userTrips } = route.params;
    const parsedTripData = JSON.parse(userTrips.tripData);
    const scrollY = useRef(new Animated.Value(0)).current;

    // Animations for image and content
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

    const sections: SectionItem[] = [
        { type: 'flight', data: userTrips },
        { type: 'hotel', data: userTrips },
        { type: 'planned', data: userTrips },
    ];

    const renderHeader = () => (
        <>
            <Animated.View style={[styles.imageContainer, { height: imageHeight, opacity: imageOpacity }]}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${parsedTripData.locationInfo.photoRef}&key=${Config.GOOGLE_MAP_KEY}`,
                    }}
                />
            </Animated.View>

            <Animated.View style={[styles.content, { transform: [{ translateY: contentTranslate }] }]}>
                <Text style={styles.name}>{parsedTripData.locationInfo.name}</Text>
                <View style={styles.date}>
                    <Text style={styles.startDate}>
                        {parsedTripData.startDate ? moment(parsedTripData.startDate).format('DD MMM yyyy') : 'Undefined'}
                    </Text>
                    <Text style={styles.gap}>-</Text>
                    <Text style={styles.startDate}>
                        {parsedTripData.endDate ? moment(parsedTripData.endDate).format('DD MMM yyyy') : 'Undefined'}
                    </Text>
                </View>
                <Text style={styles.traveler}>
                    {parsedTripData.travelerCount ? `🚌 ${parsedTripData.travelerCount}` : 'Undefined'}
                </Text>
            </Animated.View>
        </>
    );

    const renderItem: ListRenderItem<SectionItem> = ({ item }) => {
        switch (item.type) {
            case 'flight':
                return <FlightInfo flightData={item.data} />;
            case 'hotel':
                return <HotelDetails hotelData={item.data} />;
            case 'planned':
                return <PlannedTrip planData={item.data} />;
            default:
                return null;
        }
    };

    const keyExtractor = (item: SectionItem) => item.type;

    const handleChevronBackPress = () => {
        if (!isBookmarked) {
            Alert.alert(
                'Unsaved Trip',
                'This trip has not been saved. Would you like to save it?',
                [
                    {
                        text: 'No',
                        onPress: () => handleDeleteTripData(),
                        style: 'cancel',
                    },
                    { text: 'Yes', onPress: () => navigation.navigate('MyTrip') },
                ],
                { cancelable: false }
            );
        } else {
            navigation.navigate('MyTrip');
        }
    };

    const handleDeleteTripData = async () => {
        try {
            await deleteDoc(doc(db, 'UserTrip', userTrips.docId));
            navigation.navigate('MyTrip');
        } catch (error) {
            console.error('Error deleting document:', error);
            Alert.alert('Error', 'An error occurred while deleting the trip. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <View style={styles.buttonContainer}>
                <BlurView style={styles.blurContainer} blurType="light" blurAmount={20} reducedTransparencyFallbackColor="white" />
                <TouchableOpacity onPress={handleChevronBackPress} style={styles.iconContainer}>
                    <Icon name="chevron-back" size={24} color="#24C690" />
                </TouchableOpacity>
            </View>

            {/* Bookmark Button */}
            <View style={styles.button2Container}>
                <BlurView style={styles.blurContainer} blurType="light" blurAmount={20} reducedTransparencyFallbackColor="white" />
                <TouchableOpacity style={styles.iconContainer} onPress={() => setIsBookmarked(!isBookmarked)}>
                    <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color="#24C690" />
                </TouchableOpacity>
            </View>

            {/* Trip Details */}
            <Animated.FlatList
                style={styles.flatlist}
                data={sections}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={renderHeader}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}
