// app/cart.tsx
import { View, Text, FlatList, Button, StyleSheet, Pressable, Image } from "react-native";
import { useCart } from "../../src/context/CartContext";
import { router } from "expo-router";

export default function CartScreen() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Button title="Go Shopping" onPress={() => router.push("/")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>

              <View style={styles.controls}>
                <View style={styles.quantityContainer}>
                  <Pressable
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </Pressable>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
              <Text style={styles.subtotal}>Subtotal: ${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: ${total.toFixed(2)}
        </Text>
        <Button title="Go to Checkout" onPress={() => router.push("/checkout")} color="#2196F3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyText: { fontSize: 18, color: "#666", marginBottom: 20 },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center"
  },
  image: { width: 80, height: 80, resizeMode: "contain", borderRadius: 8 },
  details: { flex: 1, marginLeft: 15 },
  title: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 4 },
  price: { fontSize: 14, color: "#E91E63", fontWeight: "bold", marginBottom: 8 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 5
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#2196F3" },
  quantityText: { fontSize: 16, paddingHorizontal: 10, minWidth: 20, textAlign: "center" },
  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  removeButtonText: { color: "#FF5252", fontSize: 14, fontWeight: "500" },
  subtotal: { fontSize: 12, color: "#888", marginTop: 8 },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  totalText: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "right", color: "#333" },
});
