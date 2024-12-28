// WelcomeSlider.tsx
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  'Login': undefined;
  'Sign-In': undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: "New Adventures",
    description: "If you like to travel, then this is for you! Here you can explore the beauty of the world.",
    image: require('../../../../assets/images/slide1.jpg'),
  },
  {
    id: 2,
    title: "Plan Your Journey",
    description: "Create personalized itineraries with AI-powered recommendations tailored just for you.",
    image: require('../../../../assets/images/slide2.jpg'),
  },
  {
    id: 3,
    title: "Travel Smart",
    description: "Get real-time updates, local insights, and smart travel tips to make your journey unforgettable.",
    image: require('../../../../assets/images/slide3.jpg'),
  },
];

export default function WelcomeSlider() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const offset = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(offset / slideSize);
      setActiveSlide(currentIndex);
  };

  const goToNextSlide = () => {
      if (activeSlide < slides.length - 1) {
          scrollViewRef.current?.scrollTo({
              x: (activeSlide + 1) * screenWidth,
              animated: true
          });
          setActiveSlide(activeSlide + 1);
      }
  };

  const Dots = () => {
      return (
          <View style={styles.pagination}>
              {slides.map((_, index) => (
                  <View
                      key={index}
                      style={[
                          styles.dot,
                          { backgroundColor: index === activeSlide ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)' }
                      ]}
                  />
              ))}
          </View>
      );
  };

  const renderButton = (index: number) => {
      if (index === slides.length - 1) {
          return (
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('Sign-In')}
              >
                  <Text style={styles.buttonText}>Let's Tour</Text>
              </TouchableOpacity>
          );
      } else {
          return (
              <TouchableOpacity
                  style={styles.nextButton}
                  onPress={goToNextSlide}
              >
                  <Text style={styles.nextButtonText}>Next</Text>
                  <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.arrowIcon} />
              </TouchableOpacity>
          );
      }
  };

  return (
      <View style={styles.container}>
          <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              scrollEnabled={false} // Disable manual scrolling
          >
              {slides.map((slide, index) => (
                  <View key={slide.id} style={styles.slide}>
                      <Image
                          source={slide.image}
                          style={styles.image}
                      />
                      <View style={styles.overlay} />
                      <View style={styles.contentContainer}>
                          <Text style={styles.title}>{slide.title}</Text>
                          <Text style={styles.description}>{slide.description}</Text>
                          {renderButton(index)}
                      </View>
                  </View>
              ))}
          </ScrollView>
          <Dots />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
  },
  slide: {
      width: screenWidth,
      height: screenHeight,
  },
  image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentContainer: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      paddingHorizontal: 20,
      alignItems: 'center',
  },
  title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 20,
      textAlign: 'center',
  },
  description: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 30,
      paddingHorizontal: 20,
  },
  button: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 15,
      borderRadius: 25,
      marginTop: 20,
  },
  buttonText: {
      color: '#000000',
      fontSize: 18,
      fontWeight: '600',
  },
  nextButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#FFFFFF',
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 25,
      marginTop: 20,
  },
  nextButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      marginRight: 8,
  },
  arrowIcon: {
      marginLeft: 4,
  },
  pagination: {
      position: 'absolute',
      bottom: 50,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
  },
});