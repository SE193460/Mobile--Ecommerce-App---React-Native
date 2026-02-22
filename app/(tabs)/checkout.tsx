// app/checkout.tsx
import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import { useCart } from "../../src/context/CartContext";
import { router } from "expo-router";

export default function CheckoutScreen() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", address: "" });
  const [showModal, setShowModal] = useState(false);
  const [orderSummary, setOrderSummary] = useState("");

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    const newErrors = { name: "", email: "", address: "" };
    let hasError = false;

    if (!name.trim()) {
      newErrors.name = "Full name is required";
      hasError = true;
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email format";
      hasError = true;
    }

    if (!address.trim()) {
      newErrors.address = "Shipping address is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    if (cart.length === 0) {
      return Alert.alert("Error", "Your cart is empty.");
    }

    // Construct detailed order summary
    const orderItems = cart
      .map((item) => `• ${item.title}\n  Qty: ${item.quantity} | Price: $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n\n");

    const summary = `Order Summary:\n\n${orderItems}\n\n----------------------------\nGrand Total: $${total.toFixed(2)}\n\nShip to:\n${address}`;

    setOrderSummary(summary);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearCart();
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Enter your name"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          style={[styles.input, errors.email && styles.inputError]}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="email@example.com"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <Text style={styles.label}>Shipping Address</Text>
        <TextInput
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            if (errors.address) setErrors({ ...errors, address: "" });
          }}
          style={[styles.input, styles.textArea, errors.address && styles.inputError]}
          multiline
          numberOfLines={4}
          placeholder="Enter your full address"
        />
        {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
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

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Confirmed!</Text>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.thankYouText}>Thank you for your purchase, {name}!</Text>
              <Text style={styles.summaryText}>{orderSummary}</Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Back to Home</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  totalValue: { fontSize: 22, fontWeight: "bold", color: "#E91E63" },
  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginTop: -15,
    marginBottom: 15,
    marginLeft: 4
  },
  inputError: {
    borderColor: "#D32F2F",
    backgroundColor: "#FFEBEE"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "100%",
    maxHeight: "80%",
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 15,
    marginBottom: 15
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center"
  },
  modalBody: {
    marginBottom: 20
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center"
  },
  summaryText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8
  },
  closeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center"
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});