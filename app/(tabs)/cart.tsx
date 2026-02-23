import { View, Text, FlatList, StyleSheet, Pressable, Image, SafeAreaView } from "react-native";
import { useCart } from "../../src/context/CartContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CartScreen() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </Pressable>
          <Text style={styles.headerTitle}>My Cart</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#DDD" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Pressable style={styles.goShoppingButton} onPress={() => router.push("/")}>
            <Text style={styles.goShoppingText}>GO SHOPPING</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={18} color="#888" />
                </Pressable>
              </View>
              <Text style={styles.variant}>Category: {item.category}</Text>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityControls}>
                  <Pressable
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityBtn}
                  >
                    <Ionicons name="remove" size={16} color="#000" />
                  </Pressable>
                  <Text style={styles.quantityNum}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityBtn}
                  >
                    <Ionicons name="add" size={16} color="#000" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <Pressable
          style={styles.checkoutBtn}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutBtnText}>CHECKOUT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 16, fontWeight: "600" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyText: { fontSize: 16, color: "#999", marginVertical: 20 },
  goShoppingButton: {
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  goShoppingText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  listContent: { padding: 20 },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  imageWrapper: {
    width: 80,
    height: 80,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  image: { width: "100%", height: "100%", resizeMode: "contain" },
  details: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  title: { fontSize: 14, fontWeight: "600", color: "#333", flex: 1, marginRight: 10 },
  variant: { fontSize: 11, color: "#888", marginBottom: 5 },
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 15, fontWeight: "bold", color: "#000" },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityBtn: { padding: 6 },
  quantityNum: { fontSize: 13, fontWeight: "600", paddingHorizontal: 8, minWidth: 25, textAlign: "center" },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: { fontSize: 14, color: "#888" },
  totalAmount: { fontSize: 20, fontWeight: "bold", color: "#F44336" },
  checkoutBtn: {
    backgroundColor: "#1A1A1A",
    height: 54,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutBtnText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
