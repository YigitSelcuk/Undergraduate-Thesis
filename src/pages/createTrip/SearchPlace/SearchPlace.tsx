import React, { useState, useRef, useContext, useEffect } from 'react';
import { Image, SafeAreaView, Text, View, FlatList } from 'react-native';
import styles from './SearchPlace.style';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import CreateTripContext from '../../../Context/CreateTripContext';
import Icon from 'react-native-vector-icons/Ionicons';
type Place = {
  place_id: string;
  description: string;
};

type RootStackParamList = {
  'SelectTraveler': undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectTraveler'>;

interface TripData {
  locationInfo?: {
    name: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    photoRef?: string;
    url?: string;
  };
}

interface TripContextType {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

interface PopularPlace {
  name: string;
  photoRef: string;
  rating: string;
}

export default function SearchPlace() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [popularPlaces, setPopularPlaces] = useState<PopularPlace[]>([]);
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const googlePlacesRef = useRef(null);

  const context = useContext(CreateTripContext);

  if (!context) {
    throw new Error("CreateTripContext is null");
  }

  const { tripData, setTripData } = context as TripContextType;

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  useEffect(() => {
    fetchRandomPopularPlaces();
  }, []);

  const fetchRandomPopularPlaces = async () => {
    const randomQueries = ['tourist attractions', 'landmarks', 'popular places'];
    const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          randomQuery
        )}&key=${Config.GOOGLE_MAP_KEY}`
      );
      const data = await response.json();
      const places = data.results;

      if (places && places.length > 0) {
        const randomPlaces = getRandomSelection(places, 10); // Select 10 random places
        const formattedPlaces = randomPlaces.map((place) => ({
          name: place.name,
          photoRef: place?.photos?.[0]?.photo_reference || null,
          rating: place.rating ? `🌟${place.rating}` : 'No rating',
        }));
        setPopularPlaces(formattedPlaces);
      }
    } catch (error) {
      console.error('Error fetching random places:', error);
    }
  };

  const getRandomSelection = (array: any[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getPhotoUrl = (photoRef: string) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${Config.GOOGLE_MAP_KEY}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search Place (City or District)'
        fetchDetails={true}
        onPress={(data: GooglePlaceData, details: GooglePlaceDetail | null = null) => {
          const addressComponents = details?.address_components || [];
          const isCityOrDistrict = addressComponents.some(component =>
            component.types.includes('administrative_area_level_1') ||
            component.types.includes('administrative_area_level_2')
          );

          if (isCityOrDistrict) {
            setTripData((prevData) => ({
              ...prevData,
              locationInfo: {
                name: data.description,
                coordinates: details?.geometry.location,
                photoRef: details?.photos?.[0]?.photo_reference,
                url: details?.url,
              },
            }));
            navigation.navigate('SelectTraveler');
          } else {

          }
        }}
        query={{
          key: Config.GOOGLE_MAP_KEY,
          language: 'en',
          types: '(regions)',
        }}
        styles={{
          textInput: styles.textInput,
          container: styles.autocompleteContainer,
          listView: styles.listView,
        }}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.contentTitle}>Popular Options</Text>
        </View>
        <FlatList
          data={popularPlaces}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.contentBody}>
              {item.photoRef ? (
                <Image
                  style={styles.contentImage}
                  source={{ uri: getPhotoUrl(item.photoRef) }}
                />
              ) : (
                <Image
                  style={styles.contentImage}
                  source={require('./../../../../assets/images/placeholder.jpg')}
                />
              )}
              <View style={styles.overlay}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
