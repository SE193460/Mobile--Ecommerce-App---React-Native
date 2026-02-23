import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function PromoBanner() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.subtitle}>NEW COLLECTIONS</Text>
                <Text style={styles.title}>20%<Text style={styles.off}> OFF</Text></Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>SHOP NOW</Text>
                </Pressable>
            </View>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop' }}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E7EB',
        borderRadius: 16,
        height: 160,
        marginHorizontal: 16,
        marginVertical: 10,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000',
        marginBottom: 12,
    },
    off: {
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    image: {
        width: 140,
        height: '100%',
        resizeMode: 'cover',
    },
});
