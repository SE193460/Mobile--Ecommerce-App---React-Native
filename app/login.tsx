import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
    const [username, setUsername] = useState("johnd"); // Default for testing
    const [password, setPassword] = useState("m38rmF$"); // Default for testing
    const { login, isLoading, error } = useAuth();

    const handleLogin = async () => {
        await login(username, password);
        // Navigation will be handled by the protected route logic or manually
        // If login is successful, we can go back or to home
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inner}
            >
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#000" />
                    </Pressable>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue shopping</Text>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        <Pressable
                            style={[styles.loginButton, isLoading && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Login</Text>
                            )}
                        </Pressable>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account?</Text>
                            <Pressable>
                                <Text style={styles.signupText}> Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    inner: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 40,
    },
    form: {
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: "#000",
    },
    loginButton: {
        backgroundColor: "#000",
        borderRadius: 12,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    disabledButton: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    errorText: {
        color: "#D32F2F",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    footerText: {
        color: "#666",
        fontSize: 14,
    },
    signupText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "bold",
    },
});
