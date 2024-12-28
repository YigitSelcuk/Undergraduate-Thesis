import React from 'react';
import { View, Text } from 'react-native';
import styles from './OptionsCard.style';

interface OptionsCardProps {
    options: {
        id: number;
        title: string;
        desc: string;
        icon: string; 
        people: string;
    };
    selectedOption: any;
}

const OptionsCard: React.FC<OptionsCardProps> = ({ options, selectedOption }) => {
    return (
        <View
            style={[
                styles.container,
                selectedOption?.id === options.id && styles.selectContainer
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{options.title}</Text>
                <Text style={styles.desc}>{options.desc}</Text>
            </View>

            <Text style={styles.icon}>{options.icon}</Text>
            </View>
    );
};

export default OptionsCard;

