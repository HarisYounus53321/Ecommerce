import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../styles/styles';
import { Button } from 'react-native-paper';

const ProductCard = ({
  stock,
  name,
  price,
  image,
  id,
  addToCartHandler,
  i,
  navigate,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigate('productdetails', { id })}
      activeOpacity={1}
      style={{
        elevation: 5,
        width: 220,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 20,
        height: 400,
        backgroundColor: i % 2 === 0 ? colors.color7 : colors.color2,
      }}
    >
      <Image
        source={{ uri: image }}
        style={{
          width: '100%',
          height: 200,
          resizeMode: 'contain',
          marginTop: 10,
        }}
      />

      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            color: i % 2 === 0 ? colors.color2 : colors.color3,
            fontSize: 25,
            fontWeight: '300',
          }}
        >
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: i % 2 === 0 ? colors.color2 : colors.color3,
            fontSize: 20,
            fontWeight: '700',
          }}
        >
          ${price}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: i % 2 === 0 ? colors.color5 : colors.color3,
          width: '100%',
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        }}
        onPress={() => addToCartHandler(id, stock)}
      >
        <Text
          style={{
            color: i % 2 === 0 ? colors.color7 : colors.color2,
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          Add To Cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;
