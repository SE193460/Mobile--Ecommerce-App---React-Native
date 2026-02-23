import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface CategoryItemProps {
    name: string;
    image: string;
    onPress?: () => void;
    selected?: boolean;
}

export default function CategoryItem({ name, image, onPress, selected }: CategoryItemProps) {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={[styles.imageContainer, selected && styles.selectedContainer]}>
                <Image source={{ uri: image }} style={styles.image} />
            </View>
            <Text style={[styles.name, selected && styles.selectedText]}>{name}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginRight: 20,
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedContainer: {
        borderColor: '#000',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '500',
        color: '#666',
    },
    selectedText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
