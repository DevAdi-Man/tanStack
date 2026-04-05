import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "@/types/product.type";

type ProductCardProps = {
  product: Product;
  onPress?: (product: Product) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress?.(product)}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.brand}>{product.brand}</Text>

        <Text style={styles.rating}>⭐ {product.rating}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>

          <Text style={styles.oldPrice}>${product.price}</Text>

          <Text style={styles.discount}>
            {product.discountPercentage.toFixed(0)}% OFF
          </Text>
        </View>

        <Text style={styles.stock}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 10,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  brand: {
    fontSize: 13,
    color: "#777",
    marginVertical: 4,
  },

  rating: {
    fontSize: 13,
    marginBottom: 6,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },

  oldPrice: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: "#888",
    marginRight: 6,
  },

  discount: {
    fontSize: 12,
    color: "green",
    fontWeight: "600",
  },

  stock: {
    marginTop: 6,
    fontSize: 12,
    color: "#555",
  },
});
