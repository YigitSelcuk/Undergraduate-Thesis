import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Profile.style';
import Button from '../../../components/Button/Button';
import buttonData from '../../../constant/buttonData';
import { signOut } from 'firebase/auth'; 
import { auth } from '../../../Config/FirebaseConfig/FirebaseConfig';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SignUp: undefined;
  Profile: undefined;
};

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function Profile({ navigation }: ProfileProps) {

  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      console.log('Kullanıcı başarıyla çıkış yaptı');
      navigation.navigate('SignIn'); 
    } catch (error) {
      console.error('Çıkış işlemi sırasında bir hata oluştu:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCont}>
        <Text style={styles.containerTitle}>Profile</Text>
        
        <TouchableOpacity style={styles.exit} onPress={handleSignOut}>
          <Icon name="exit-to-app" size={38} color="#24C690" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleRow}>
        <View style={styles.titleImgContainer}>
          <Image
            style={styles.titleImg}
            source={require('./../../../../assets/images/placeholder.jpg')}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.emailText}>yigitselcuk@gmail.com</Text>
        </View>

        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="pencil-outline" size={24} color="#24C690" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View>
          {buttonData.map(button => (
            <Button
              key={button.id}
              title={button.title}
              subtitle={button.subtitle}
              icon1Name={button.icon1Name}
              iconName={button.iconName}
              onPress={button.onPress}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
