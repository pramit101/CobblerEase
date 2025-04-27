import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { products } from "../data/products";
import { styles } from "../Styles/service_image_box";
import { imageMap } from "../data/imageMaps";

type ImageBoxProps = {
  name: string;
  image: string;
  description: string;
};

export const Service_image_box = ({
  name,
  image,
  description,
}: ImageBoxProps) => {
  return (
    <View className="main_box" style={styles.main_box}>
      <Text className="service_tag" style={styles.service_tag}>
        SERVICE
      </Text>
      <Image
        source={imageMap[image]}
        style={{
          width: "90%",
          height: 150,
          borderRadius: 10,
          margin: 10,
          marginTop: 15,
        }}
        resizeMode="stretch"
      />
      <Text className="product_name" style={styles.name}>
        {" "}
        {name}{" "}
      </Text>
      <Text className="product_desc" style={styles.desc}>
        {" "}
        {description}{" "}
      </Text>
    </View>
  );
};
