import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Pressable,
    ScrollView,
    SafeAreaView
} from "react-native";
import { getProductById } from "../../src/api/productApi";
import { useCart } from "../../src/context/CartContext";
import { Product } from "../../src/types/product";
import { Ionicons } from "@expo/vector-icons";

const COLORS = [
    { id: '1', color: '#1A237E' },
    { id: '2', color: '#2196F3', selected: true },
    { id: '3', color: '#BBDEFB' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState('S');

    const fetchProduct = async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getProductById(id);
            if (!data) throw new Error("Product not found");
            setProduct(data);
        } catch (err: any) {
            setError(err.message || "Something went wrong while loading the product.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.stateText}>Loading product details...</Text>
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error || "Product not found"}</Text>
                <Pressable style={styles.retryButton} onPress={fetchProduct}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.headerTitle}>Detail Product</Text>
                <Pressable onPress={() => router.push("/cart")}>
                    <Ionicons name="cart-outline" size={24} color="#000" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <View style={styles.pagination}>
                        <View style={styles.dot} />
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.brandRow}>
                        <Text style={styles.brand}>H&M</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>4.9 (136)</Text>
                        </View>
                    </View>

                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.title}</Text>
                        <Pressable>
                            <Ionicons name="heart-outline" size={24} color="#000" />
                        </Pressable>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        <Text style={styles.oldPrice}>$550.00</Text>
                    </View>

                    <Text style={styles.description}>
                        Elevate your casual wardrobe with our Loose Fit Printed T-shirt.
                        Crafted from premium cotton for maximum comfort, this relaxed-fit tee features...
                    </Text>

                    <View style={styles.selectors}>
                        <View style={styles.selectorGroup}>
                            <Text style={styles.selectorLabel}>Colors</Text>
                            <View style={styles.colorRow}>
                                {COLORS.map(c => (
                                    <View
                                        key={c.id}
                                        style={[
                                            styles.colorCircle,
                                            { backgroundColor: c.color },
                                            c.selected && styles.selectedColor
                                        ]}
                                    >
                                        {c.selected && <Ionicons name="checkmark" size={16} color="#fff" />}
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.selectorGroup}>
                            <Text style={styles.selectorLabel}>Size</Text>
                            <View style={styles.sizeRow}>
                                {SIZES.map(s => (
                                    <Pressable
                                        key={s}
                                        onPress={() => setSelectedSize(s)}
                                        style={[styles.sizeChip, selectedSize === s && styles.selectedSizeChip]}
                                    >
                                        <Text style={[styles.sizeText, selectedSize === s && styles.selectedSizeText]}>{s}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable
                    style={styles.cartButton}
                    onPress={() => addToCart(product)}
                >
                    <Ionicons name="cart-outline" size={20} color="#000" style={styles.cartIcon} />
                    <Text style={styles.cartButtonText}>ADD TO CART</Text>
                </Pressable>
                <Pressable
                    style={styles.buyButton}
                    onPress={() => { }}
                >
                    <Text style={styles.buyButtonText}>BUY NOW</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#F44336",
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        height: 350,
        backgroundColor: "#F9F9F9",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    image: {
        width: "80%",
        height: "80%",
        resizeMode: "contain",
    },
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: 20,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#DDD",
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#2196F3",
        width: 12,
    },
    infoContainer: {
        padding: 20,
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    brand: {
        fontSize: 14,
        color: "#888",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 14,
        color: "#666",
        marginLeft: 4,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        flex: 1,
        marginRight: 10,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#F44336",
        marginRight: 10,
    },
    oldPrice: {
        fontSize: 16,
        color: "#BBB",
        textDecorationLine: "line-through",
    },
    description: {
        fontSize: 14,
        color: "#666",
        lineHeight: 22,
        marginBottom: 25,
    },
    selectors: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    selectorGroup: {
        flex: 1,
    },
    selectorLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 12,
    },
    colorRow: {
        flexDirection: "row",
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedColor: {
        borderWidth: 2,
        borderColor: "#2196F3",
    },
    sizeRow: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    sizeChip: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginBottom: 8,
    },
    selectedSizeChip: {
        backgroundColor: "#000",
    },
    sizeText: {
        fontSize: 12,
        color: "#333",
    },
    selectedSizeText: {
        color: "#fff",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        flexDirection: "row",
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },
    cartButton: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#DDD",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    cartIcon: {
        marginRight: 8,
    },
    cartButtonText: {
        fontSize: 12,
        fontWeight: "bold",
    },
    buyButton: {
        flex: 1,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#1A1A1A",
        justifyContent: "center",
        alignItems: "center",
    },
    buyButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    stateText: {
        marginTop: 10,
        color: "#666",
        fontSize: 16,
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    retryButton: {
        backgroundColor: "#000",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
