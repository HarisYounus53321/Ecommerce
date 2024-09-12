import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, Button, Image, ImageBackground } from 'react-native';
import { useCart } from '../components/CartContext';
import { setting } from '../components/Setting.config';
import SuccessModal from './SuccessMessage';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const { cartItems, setCartItems, userEmail } = useCart();
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigation = useNavigation(); 

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        navigation.navigate('home');  // Navigate to home screen
    };
    const handleConfirmOrder = async () => {
        const order = {
            username: userEmail,  // Assuming the user's email is used as the username
            address: address,
            phone_no: phoneNumber,
            items: cartItems.map(item => ({
                qty: item.quantity,
                pid: item.id,  // Assuming 'id' refers to the product ID
                orderId: 101,  // This should be dynamically set based on your logic
                price: item.price
            })),
        };
    
        console.log('Order being sent:', JSON.stringify(order, null, 2));
    
        try {
            const response = await fetch( setting.ip +'/api/OrderManagement/PlaceOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to send order:', errorData);
                alert('Failed to send order: ' + errorData.message);
                return;
            }
    
            setIsModalVisible(true);

            setCartItems([]); // Optionally clear cart after order
            address=''
            phoneNumber=''
            //navigation.navigate('home')
        } catch (error) {
            console.error('Error:', error);
           // alert('Error placing order. Please try again later.');
        }
    };
    

    return (
        <ImageBackground source={require('./background.png')} style={styles.background}>
            <View style={styles.container}>
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image}} style={styles.itemImage} />
                            <View style={styles.itemDetailsContainer}>
                                <Text style={styles.itemName}>{item.name} - ${item.price}</Text>
                                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                                    <Text style={styles.removeItem}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={setAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
                <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
                <Button
                    title="Confirm Order"
                    onPress={handleConfirmOrder}
                    color="#f0a500"
                />
                 <SuccessModal visible={isModalVisible} onClose={handleCloseModal} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    itemDetailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 16,
    },
    removeItem: {
        color: '#FF6347',
        fontSize: 16,
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#ccc',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Cart;
