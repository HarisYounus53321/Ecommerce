import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { colors, defaultStyle, formHeading } from '../styles/styles';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import { useCart } from '../components/CartContext';
import { setting } from '../components/Setting.config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {  userEmail } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(setting.ip +'/api/OrderManagement/ordersummary?customerId='+userEmail);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ImageBackground
      source={{ uri: 'background.png' }} // Replace with your background image URL
      style={styles.backgroundImage}
    >
      <View style={[defaultStyle, styles.container]}>
        <Header back={true} />
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Orders</Text>
        </View>
        {loading ? (
          <Loader />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : orders.length > 0 ? (
          <View style={styles.scrollViewContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {orders.map((item, index) => (
                <OrderItem
                  key={item.orderId}
                  index={index}
                  id={item.orderId}
                  price={item.totalPrice}
                  status={item.status}
                  paymentMethod="Not Available" // Placeholder, adjust as needed
                  orderOn={new Date(item.orderDate).toLocaleDateString()}
                  address={item.address}
                  style={styles.orderItem}
                />
              ))}
            </ScrollView>
          </View>
        ) : (
          <Headline style={styles.noOrderText}>No Order Yet</Headline>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  headingContainer: {
    marginBottom: 20,
    paddingTop: 70,
  },
  headingText: {
    ...formHeading,
    color: '#000000', // Dark color for the header text
    backgroundColor: '#FFD580',
  },
  scrollViewContainer: {
    padding: 10,
    flex: 1,
  },
  noOrderText: {
    textAlign: 'center',
    color: '#FFA500', // Light orange color for "No Order Yet"
  },
  errorText: {
    textAlign: 'center',
    color: 'red', // Color for error messages
  },
  orderItem: {
    backgroundColor: '#FFD580', // Off-white background for order tiles
    borderColor: '#000000', // Black border color
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
});

export default Orders;
