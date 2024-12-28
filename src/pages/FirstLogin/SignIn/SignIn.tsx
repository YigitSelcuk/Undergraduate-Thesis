import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Platform,
  Animated,
  Image,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../Config/FirebaseConfig/FirebaseConfig';
import firebaseErrors from '../../../components/ErrorCode/firebaseError';
import styles from './SignIn.style';

// Import social icons
const GoogleIcon = require('../../../../assets/images/google.png');
const FacebookIcon = require('../../../../assets/images/linkedin.png');

type RootStackParamList = {
  'Sign-Up': undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Sign-Up'>;

export default function SignIn() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Animation setup
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Fade and scale animation for the entire screen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      const message = 'Lütfen Email ve Şifre Giriniz';
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.LONG);
      } else {
        Alert.alert('Hata', message);
      }
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Kullanıcı giriş yaptı:', user);
      })
      .catch((error) => {
        const errorCode = error.code as keyof typeof firebaseErrors;
        const errorMessage = firebaseErrors[errorCode] || 'Beklenmeyen bir hata oluştu.';

        if (Platform.OS === 'android') {
          ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        } else {
          Alert.alert('Giriş Başarısız', errorMessage);
        }

        console.error('Firebase Hatası:', error);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful Google sign-in
        console.log('Google Sign-In Successful', result.user);
      })
      .catch((error) => {
        console.error('Google Sign-In Error', error);
      });
  };

  const handleFacebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful Facebook sign-in
        console.log('Facebook Sign-In Successful', result.user);
      })
      .catch((error) => {
        console.error('Facebook Sign-In Error', error);
      });
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity: fadeAnim,
          transform: [
            { 
              scale: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1]
              }) 
            }
          ]
        }
      ]}
    >
      <Text style={styles.title}>Let's Sign you in.</Text>
      <Text style={styles.title2}>Welcome Back</Text>
      <Text style={styles.title3}>You've been missed!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.emailText}>Email</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={[styles.emailInput, { elevation: 3, shadowColor: '#c5c5c5', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 }]}
          placeholder="Enter your email"
          value={email}
          placeholderTextColor="#999"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputPSWDContainer}>
        <Text style={styles.emailText}>Password</Text>
        <TextInput
          onChangeText={(value) => setPassword(value)}
          secureTextEntry={true}
          style={[styles.emailInput, { elevation: 3, shadowColor: '#c3c3c3', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 }]}
          placeholder="Enter your password"
          value={password}
          placeholderTextColor="#999"
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity onPress={onSignIn} style={[styles.signIn, { elevation: 1 }]}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Social Login Section */}
      <View style={styles.socialLoginContainer}>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity onPress={handleGoogleSignIn} style={styles.socialIcon}>
            <Image source={GoogleIcon} style={styles.socialIconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFacebookSignIn} style={styles.socialIcon}>
            <Image source={FacebookIcon} style={styles.socialIconImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Sign-Up')} 
        style={[styles.createAccount, { elevation: 3 }]}
      >
        <Text style={styles.createAccountText}>Create New Account</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}