import { Stack } from "expo-router";
import { CartProvider } from "../src/context/CartContext";

export default function Layout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: true }} />
    </CartProvider>
  );
}