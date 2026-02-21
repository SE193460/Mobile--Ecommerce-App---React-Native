// app/checkout.tsx
import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from "react-native";
import { useCart } from "../../src/context/CartContext";
import { router } from "expo-router";

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !address.trim()) {
      return Alert.alert("Error", "Please fill in all fields.");
    }

    if (!validateEmail(email)) {
      return Alert.alert("Error", "Please enter a valid email address.");
    }

    if (cart.length === 0) {
      return Alert.alert("Error", "Your cart is empty.");
    }

    // Construct detailed order summary
    const orderItems = cart
      .map((item) => `- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const summary = `Order Summary:\n${orderItems}\n\nTotal: $${total.toFixed(2)}\n\nDelivery Address:\n${address}`;

    Alert.alert(
      "Order Confirmation",
      `Thank you, ${name}!\n\n${summary}`,
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            router.replace("/");
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="email@example.com"
        />

        <Text style={styles.label}>Shipping Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Enter your full address"
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <Button
          title="Place Order"
          onPress={handleSubmit}
          color="#2196F3"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  section: { marginBottom: 30 },
  label: { fontSize: 16, fontWeight: "600", color: "#666", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fafafa"
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center"
  },
  totalLabel: { fontSize: 18, color: "#666" },
  totalValue: { fontSize: 22, fontWeight: "bold", color: "#E91E63" }
});