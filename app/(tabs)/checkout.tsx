import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useCart } from "../../src/context/CartContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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

    const orderItems = cart
      .map((item) => `• ${item.title}\n  Qty: ${item.quantity} | Total: $${(item.price * item.quantity).toFixed(2)}`)
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeader}>Delivery Address</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter your name"
              placeholderTextColor="#AAA"
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
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
              placeholderTextColor="#AAA"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
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
              placeholderTextColor="#AAA"
            />
            {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
          </View>

          <Text style={styles.sectionHeader}>Order Summary</Text>
          <View style={styles.summaryCard}>
            {cart.map(item => (
              <View key={item.id} style={styles.summaryItem}>
                <Text style={styles.summaryTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.summaryPrice}>x{item.quantity}  ${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Pressable
          style={styles.placeOrderBtn}
          onPress={handleSubmit}
        >
          <Text style={styles.placeOrderBtnText}>PLACE ORDER</Text>
        </Pressable>
      </View>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>Order Confirmed!</Text>
            <Text style={styles.thankYouText}>Thank you for your purchase, {name}!</Text>
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.summaryText}>{orderSummary}</Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>BACK TO HOME</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  scrollContent: { padding: 20 },
  sectionHeader: { fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 15, marginTop: 10 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, fontWeight: "600", color: "#888", marginBottom: 8, textTransform: "uppercase" },
  input: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    color: "#000",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top"
  },
  inputError: {
    borderColor: "#FF5252",
    backgroundColor: "#FFF5F5"
  },
  errorText: { color: "#FF5252", fontSize: 11, marginTop: 4 },
  summaryCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryTitle: { fontSize: 13, color: "#666", flex: 1, marginRight: 10 },
  summaryPrice: { fontSize: 13, fontWeight: "600", color: "#333" },
  divider: { height: 1, backgroundColor: "#EEE", marginVertical: 10 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 15, fontWeight: "bold", color: "#000" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#F44336" },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  placeOrderBtn: {
    backgroundColor: "#1A1A1A",
    height: 54,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  placeOrderBtnText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "100%",
    maxHeight: "85%",
    padding: 24,
    alignItems: "center",
  },
  successIcon: { marginBottom: 15 },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalBody: {
    width: "100%",
    marginBottom: 25,
  },
  summaryText: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
  },
  closeButton: {
    backgroundColor: "#000",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center"
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold"
  }
});
