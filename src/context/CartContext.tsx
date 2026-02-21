import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const exist = prev.find(i => i.id === product.id);
            if (exist) {
                return prev.map(i =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(i => i.id !== productId));
    };

    const increaseQuantity = (productId: number) => {
        setCart(prev =>
            prev.map(i =>
                i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
            )
        );
    };

    const decreaseQuantity = (productId: number) => {
        setCart(prev => {
            const item = prev.find(i => i.id === productId);
            if (item && item.quantity > 1) {
                return prev.map(i =>
                    i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
                );
            }
            return prev.filter(i => i.id !== productId);
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};