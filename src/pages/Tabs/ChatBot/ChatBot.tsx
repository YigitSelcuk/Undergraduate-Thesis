import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Config from 'react-native-config';
import MapView, { Marker } from 'react-native-maps';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
  animation?: Animated.Value; 
}

interface AIResponse {
  answer?: string;
  error?: string;
  details?: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
}

const TravelChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const askAIQuestion = async (question: string): Promise<AIResponse> => {
    if (!question) {
      return { error: 'Soru gereklidir.' };
    }

    try {
      const promptText = `
      Sen bir seyahat asistanısın. Görevin, seyahatle ilgili kullanıcı isteklerine olabilecek en iyi şekilde, detaylı ve anlaşılır yanıtlar vermektir. 
      Aşağıdaki yönergelere göre hareket et:
      - Kullanıcının sorularına mümkün olduğunca yardımcı ol, detaylandır, alternatif önerilerde bulun.
      - Destinasyon önerileri, yol tarifi, gezi planı, yemek, konaklama ve aktiviteler hakkında bilgi ver.
      - Eğer kullanıcı bir konum sorduysa, yanıtının sonunda JSON formatında coğrafi koordinatlarını (latitude, longitude) ver. Örneğin:

        {
          "latitude": 40.748817,
          "longitude": -73.985428
        }

      - Yanıtlarını açık, anlaşılır ve dostane bir dille yaz.

      Şimdi kullanıcının sorusu: ${question}
      `;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + Config.GOOGLE_CHATBOT_KEY,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: promptText
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error('API yanıt vermedi');
      }

      const data = await response.json();
      console.log('API Response:', data); 
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!answer) {
        throw new Error('Yanıt bulunamadı');
      }

      return { answer };
    } catch (error) {
      console.error('API Error:', error);
      return {
        error: 'Yanıt alınamadı',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      };
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      text: inputText,
      isUser: true,
      timestamp: new Date().getTime(),
      animation: new Animated.Value(0)
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await askAIQuestion(inputText);

      if (result.error) {
        const errorMessage: Message = {
          text: `Hata: ${result.error}`,
          isUser: false,
          timestamp: new Date().getTime(),
          animation: new Animated.Value(0),
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } else if (result.answer) {
        const botMessage: Message = {
          text: result.answer,
          isUser: false,
          timestamp: new Date().getTime(),
          animation: new Animated.Value(0),
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);

        // Yanıtta koordinat bilgisi var mı?
        const coordinateMatch = botMessage.text.match(/\{\s*"latitude"\s*:\s*([0-9.\-]+)\s*,\s*"longitude"\s*:\s*([0-9.\-]+)\s*\}/);
        if (coordinateMatch && coordinateMatch.length === 3) {
          const lat = parseFloat(coordinateMatch[1]);
          const lng = parseFloat(coordinateMatch[2]);
          if (!isNaN(lat) && !isNaN(lng)) {
            setLocationData({ latitude: lat, longitude: lng });
          } else {
            setLocationData(null);
          }
        } else {
          setLocationData(null);
        }
      }
    } catch (error) {
      console.error('Send Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const animateMessage = useCallback((message: Message) => {
    if (message.animation) {
      Animated.timing(message.animation, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, []);

  useEffect(() => {
    // Son eklenen mesaj için animasyonu başlat
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      animateMessage(lastMessage);
    }
  }, [messages, animateMessage]);

  const renderMessage = (message: Message, index: number) => {
    // Animasyon stilleri
    const animatedStyle = {
      opacity: message.animation ? message.animation : 1,
      transform: [
        {
          translateY: message.animation 
            ? message.animation.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              })
            : 0,
        }
      ],
    };

    return (
      <Animated.View
        key={`${message.timestamp}-${index}`}
        style={[
          styles.messageBubble,
          message.isUser ? styles.userMessage : styles.botMessage,
          animatedStyle
        ]}
      >
        {!message.isUser && (
          <View style={styles.botAvatar}>
            <Icon name="airplane" size={20} color="#fff" />
          </View>
        )}
        <LinearGradient
          colors={message.isUser ? ['#2563EB', '#1D4ED8'] : ['#ffffff', '#f8fafc']}
          style={[
            styles.messageGradient,
            message.isUser ? styles.userGradient : styles.botGradient
          ]}
        >
          <Text style={[
            styles.messageText,
            message.isUser ? styles.userMessageText : styles.botMessageText
          ]}>
            {message.text}
          </Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <LinearGradient
        colors={['#EEF2FF', '#ffffff']}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TravAI Asistan</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message, index) => renderMessage(message, index))}
          {isLoading && (
            <View style={styles.loadingContainer}>
              {/* Lottie animasyonu */}
              <LottieView
                source={require('./../../../../assets/lottie/loading4.json')}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </View>
          )}

          {/* Eğer locationData varsa haritayı göster */}
          {locationData && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: locationData.latitude,
                  longitude: locationData.longitude,
                  latitudeDelta: 0.05,  
                  longitudeDelta: 0.05,
                }}
                region={{
                  latitude: locationData.latitude,
                  longitude: locationData.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: locationData.latitude,
                    longitude: locationData.longitude
                  }}
                  title="Konum"
                  description="Burada talep edilen konum"
                />
              </MapView>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Seyahat planınız için sorunuz..."
            placeholderTextColor="#94A3B8"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={isLoading}
          >
            <Icon
              name={isLoading ? "timer-outline" : "send"}
              size={24}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 32,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    maxWidth: width * 0.8,
  },
  messageGradient: {
    borderRadius: 20,
    padding: 12,
    maxWidth: '100%',
  },
  userGradient: {
    borderTopRightRadius: 4,
    marginLeft: 'auto',
  },
  botGradient: {
    borderTopLeftRadius: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  userMessageText: {
    color: '#ffffff',
  },
  botMessageText: {
    color: '#1E293B',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 120,
    color: '#1E293B',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center'
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  map: {
    width: '100%',
    height: '100%',
  }
});

export default TravelChatbot;
