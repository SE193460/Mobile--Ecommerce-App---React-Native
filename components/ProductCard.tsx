import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../src/types/product';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
    item: Product;
    onAddToCart: (item: Product) => void;
}

export default function ProductCard({ item, onAddToCart }: ProductCardProps) {
    return (
        <Pressable
            style={styles.card}
            onPress={() => router.push(`/product/${item.id}`)}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Pressable style={styles.heartButton}>
                    <Ionicons name="heart-outline" size={18} color="#000" />
                </Pressable>
            </View>
            <View style={styles.info}>
                <Text style={styles.brand}>H&M</Text>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>4.9 (136)</Text>
                </View>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        width: '48%',
        marginBottom: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 180,
        backgroundColor: '#F9F9F9',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    info: {
        padding: 8,
    },
    brand: {
        fontSize: 10,
        color: '#888',
        marginBottom: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 10,
        color: '#666',
        marginLeft: 4,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});
