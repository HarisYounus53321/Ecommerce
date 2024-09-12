import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useCart } from '../components/CartContext';
import moment from 'moment';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetailstoAdd = ({ route }) => {
  const { product } = route.params;
  const { cartItems, setCartItems } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [modalVisible, setModalVisible] = useState(false);

  const addToCartHandler = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity, size: selectedSize }
          : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          quantity: quantity,
          price: product.price,
          image: product.images[0]?.url,
          size: selectedSize
        }
      ]);
    }
    setModalVisible(true); // Show modal after adding to cart
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const currentDate = moment().format('MMYYYYSS');

  return (
    
    <>
    <ScrollView contentContainerStyle={styles.container}>

      <Image source={{ uri: product.images[0]?.url }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.currentDate}>{currentDate}</Text>
        <Text style={styles.productCategory}>SKU | {product.category}</Text>
        <Text style={styles.productStock}>In Stock</Text>
        <Text style={styles.productPrice}>{`$${product.price}`}</Text>
        <View style={styles.separator} />

        <Text style={styles.sizeLabel}>Select Size:</Text>
        <View style={styles.sizeContainer}>
          {product.size.split(',').map(size => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeButton, selectedSize === size && styles.selectedSizeButton]}
              onPress={() => handleSizeSelection(size)}
            >
              <Text style={[styles.sizeButtonText, selectedSize === size && styles.selectedSizeButtonText]}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity Picker */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantity:</Text>
          <View style={styles.quantityPicker}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={addToCartHandler}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>
            Are you struggling to stay on budget while juggling the versatile fashion trends? Stay trendy while on budget with us! Use your freedom of shopping to your advantage by making the right choices.
          </Text>
          <View style={styles.separator} />
        </View>
        <View style={styles.separator} />
        <TouchableOpacity>
          <Text style={styles.moreInfoHeader}>More Info</Text>
        </TouchableOpacity>
        <View style={styles.moreInfoContent}>
          <Text style={styles.moreInfoItem}><Text style={styles.moreInfoLabel}>Color:</Text> {product.color}</Text>
          <Text style={styles.moreInfoItem}><Text style={styles.moreInfoLabel}>Fabric:</Text> {product.fabric}</Text>
          <Text style={styles.moreInfoItem}><Text style={styles.moreInfoLabel}>Season:</Text> {product.season}</Text>
          <Text style={styles.moreInfoItem}><Text style={styles.moreInfoLabel}>Description:</Text> This item is versatile, comfortable, and designed to keep you trendy without breaking the bank.</Text>
          <Text style={styles.moreInfoItem}><Text style={styles.moreInfoLabel}>Disclaimer:</Text> Due to the photographic lighting & different screen calibrations, the colors of the original product may slightly vary from the picture.</Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Item Added to Cart!</Text>
            <Image source={{ uri: product.images[0]?.url }} style={styles.modalImage} />
            <Text style={styles.modalText}>{product.name}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
     <Footer activeRoute={'home'} />
     </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  currentDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 10,
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    textAlign: 'left',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 14,
    color: '#888',
    textAlign: 'left',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 24,
    color: '#888',
    textAlign: 'left',
    marginBottom: 20,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  sizeLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sizeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    margin: 5,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedSizeButton: {
    borderColor: '#FFA500',
    backgroundColor: '#FFA500',
  },
  sizeButtonText: {
    color: '#333',
    fontSize: 16,
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  quantityPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
  },
  budgetContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  budgetText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  moreInfoHeader: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 20,
  },
  moreInfoContent: {
    marginTop: 10,
  },
  moreInfoItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  moreInfoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductDetailstoAdd;
