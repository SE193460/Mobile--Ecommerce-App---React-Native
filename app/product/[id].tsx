import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { getProductById } from "../../src/api/productApi";
import { useCart } from "../../src/context/CartContext";
import { Product } from "../../src/types/product";

export default function ProductDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getProductById(id)
                .then(data => setProduct(data))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2196F3" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.addButton,
                        pressed && styles.addButtonPressed
                    ]}
                    onPress={() => addToCart(product)}
                >
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: "#fff", paddingBottom: 30 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    image: { width: "100%", height: 300, resizeMode: "contain", marginVertical: 20 },
    infoContainer: { padding: 20 },
    title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 8 },
    category: { fontSize: 14, color: "#888", textTransform: "uppercase", marginBottom: 12 },
    price: { fontSize: 24, fontWeight: "bold", color: "#E91E63", marginBottom: 16 },
    description: { fontSize: 16, color: "#666", lineHeight: 24, marginBottom: 24 },
    addButton: {
        backgroundColor: "#2196F3",
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    addButtonPressed: {
        opacity: 0.8,
        backgroundColor: "#1976D2",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});