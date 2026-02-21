import { View, Text, Image, Button } from "react-native";
import { router } from "expo-router";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: any) {
    const { addToCart } = useCart();

    return (
        <View style={{ padding: 12 }}>
            <Image source={{ uri: product.image }} style={{ height: 120 }} />
            <Text>{product.title}</Text>
            <Text>${product.price}</Text>

            <Button
                title="View"
                onPress={() => router.push(`/product/${product.id}`)}
            />

            <Button
                title="Add to cart"
                onPress={() => addToCart(product)}
            />
        </View>
    );
}