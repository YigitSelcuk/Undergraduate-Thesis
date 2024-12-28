import { View, Text } from 'react-native';
import React from 'react';
import styles from '../../pages/createTrip/ReviewTrip/ReviewTrip.style';

interface InfoItemProps {
  icon: string;
  title: string;
  description: string | undefined;
}

export default function InfoItem({ icon, title, description }: InfoItemProps) {
  return (
    <View style={styles.descContainer}>
      <Text style={styles.icon}>{icon}</Text>
      <View>
        <Text style={styles.desc}>{title}</Text>
        <Text style={styles.location}>{description}</Text>
      </View>
    </View>
  );
}