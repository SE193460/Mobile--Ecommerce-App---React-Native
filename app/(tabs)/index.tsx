import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import { router } from "expo-router";
import { useCart } from "../../src/context/CartContext";
import { Product } from "../../src/types/product";

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Button title="Cart" onPress={() => router.push("/cart")} /><FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`../product/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
            <View style={styles.footer}>
              <Text style={styles.price}>${item.price}</Text>
              <Pressable
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.addButtonPressed
                ]}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </Pressable>
            </View>
          </Pressable>
        )} /></>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  image: { height: 140, resizeMode: "contain", marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "600", color: "#333" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: { fontSize: 16, fontWeight: "bold", color: "#E91E63" },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonPressed: {
    opacity: 0.7,
    backgroundColor: "#1976D2",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});