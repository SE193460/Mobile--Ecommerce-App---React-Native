import axios from "axios";

export const getProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
};

export const getProductById = async (id: string) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
};