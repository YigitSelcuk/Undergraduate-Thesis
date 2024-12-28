import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import styles from './SignUp.style'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../Config/FirebaseConfig/FirebaseConfig'

type RootStackParamList = {
  'Sign-In': undefined; 
};

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Sign-In'>;

export default function SignUp() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');



  const onCreateAccount = () => {
    if(!email&&!password&&!fullName){
      ToastAndroid.show('Please enter all details',ToastAndroid.BOTTOM)
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigation.navigate('Sign-In')

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
        // ..
      });

  }
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Icon name='arrow-back-circle-outline' size={45} color='black'></Icon>
      </TouchableOpacity>
      <Text style={styles.title}>Create New Account</Text>
         {/* Full Name*/}
         <View style={styles.inputContainer}>
        <Text style={styles.emailText}>Full Name</Text>
        <TextInput onChangeText={(value)=>setFullName(value)} style={styles.emailInput} placeholder='Enter Full Name'></TextInput>
      </View>
      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.emailText}>Email</Text>
        <TextInput onChangeText={(value)=>setEmail(value)} style={styles.emailInput} placeholder='Enter Email'></TextInput>
      </View>
      {/* Password */}
      <View style={styles.inputPSWDContainer}>
        <Text style={styles.emailText}>Password</Text>
        <TextInput onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.emailInput} placeholder='Enter Password'></TextInput>
      </View>
       {/*Create Account Button */}
       <TouchableOpacity onPress={onCreateAccount} style={styles.signIn}>
        <Text style={styles.signInText}>Create Account</Text>
      </TouchableOpacity>
      {/* Sign In Button  */}
      <TouchableOpacity onPress={()=>navigation.navigate('Sign-In')} style={styles.createAccount}>
        <Text style={styles.createAccountText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}