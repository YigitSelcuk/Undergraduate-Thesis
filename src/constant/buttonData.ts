import { Alert } from "react-native";

const buttonData = [
  {
    id: 1,
    title: 'My Account',
    subtitle: 'Make changes to your account',
    iconName: 'person-outline',
    icon1Name: 'chevron-forward',
    onPress: () => Alert.alert('My Account Pressed!'),
  },
  {
    id: 2,
    title: 'Notifications',
    subtitle: 'Manage your notifications',
    iconName: 'notifications-outline',
    icon1Name: 'chevron-forward',
    onPress: () => Alert.alert('Notifications Pressed!'),
  },
  {
    id: 3,
    title: 'Privacy',
    subtitle: 'Review your privacy settings',
    iconName: 'lock-closed-outline',
    icon1Name: 'chevron-forward',
    onPress: () => Alert.alert('Privacy Pressed!'),
  },
  {
    id: 4,
    title: 'Security',
    subtitle: 'Set up security options',
    iconName: 'shield-checkmark-outline',
    icon1Name: 'chevron-forward',
    onPress: () => Alert.alert('Security Pressed!'),
  },
  {
    id: 5,
    title: 'Help & Support',
    subtitle: 'Get help and find answers',
    iconName: 'help-circle-outline',
    icon1Name: 'chevron-forward',
    onPress: () => Alert.alert('Help & Support Pressed!'),
  },
];

export default buttonData;
