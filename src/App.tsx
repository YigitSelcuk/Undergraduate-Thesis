import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Router from './Route/Router';
import TabRouter from './Route/TabRouter';
import { auth } from './Config/FirebaseConfig/FirebaseConfig';
import LottieView from 'lottie-react-native';
import { User } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

function App(): React.JSX.Element {
  const [userSession, setUserSession] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserSession(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          style={{ width: 200, height: 200 }}
          source={require('../assets/lottie/loading.json')} // Lottie animasyon dosyanızın yolu
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        {userSession ? <TabRouter /> : <Router />}
      </NavigationContainer>
    </View>
  );
}

export default App;