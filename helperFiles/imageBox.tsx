import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { products } from "../data/products";
import { styles } from "../Styles/imageBox";

type ImageBoxProps = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  description: string;
  price: number;
};

export const ImageBox = ({
  id,
  name,
  image,
  description,
  price,
}: ImageBoxProps) => {
  return (
    <View className="main_box" style={styles.main_box}>
      <Image
        source={image}
        style={{ width: "100%", height: 200 }}
        resizeMode="stretch"
      />
      <Text className="product_id" style={styles.id}>
        {" # "}
        {id}{" "}
      </Text>
      <Text className="product_name" style={styles.name}>
        {" "}
        {name}{" "}
      </Text>
      <Text className="product_desc" style={styles.desc}>
        {" "}
        {description}{" "}
      </Text>
      <Text className="product_price" style={styles.price}>
        {"$"}
        {price}{" "}
      </Text>
    </View>
  );
};
