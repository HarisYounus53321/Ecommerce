import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Settings } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import SearchModal from '../components/SearchModal';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import Heading from '../components/Heading';
import { useCart } from '../components/CartContext';
import { setting } from '../components/Setting.config';

const categories = [
  // { category: 'jeans', _id: 1 },
  // { category: 'pants', _id: 2 },
  // { category: 'shirts', _id: 4 },
];

const Home = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const { cartItems, setCartItems } = useCart();

  const fetchProducts = async () => {
    const url = setting.ip+'/api/ProductManagement';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categoryButtonHandler = (id) => {
    setCategory(id);
  };

  const addToCartHandler = (product) => {

    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      console.log("IMage            : "+product.images[0]?.url)
      console.log(product)
      const updatedItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
     // console.log(updatedItems)
      setCartItems(updatedItems);
      alert("Item added to Cart");
    } else {
      console.log("IMage            : "+product.images[0]?.url)
      console.log(product)
      setCartItems([...cartItems, { id: product.id, name: product.name, quantity: 1, price: product.price ,image:product.images[0]?.url}]);
      alert("Item added to Cart");
    }
  };

  const productClickHandler = (product) => {
    navigation.navigate('productdetailtoadd', { product });
  };

  return (
    <>
      {activeSearch && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveSearch={setActiveSearch}
          products={products}
        />
      )}

      <View style={{ ...defaultStyle, flex: 1 }}>
        {/* Header */}
        <Header />

        {/* Heading row */}
        <View
          style={{
            paddingTop: 70,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Main Heading */}
          <Heading text1={'Our'} text2={'Products'} />

          {/* Searchbar */}
          <View>
            <TouchableOpacity onPress={() => setActiveSearch((prev) => !prev)}>
              <Avatar.Icon
                icon={'magnify'}
                color='gray'
                size={50}
                style={{ backgroundColor: colors.color7, elevation: 12 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View
          style={{
            flexDirection: 'row',
            height: 28,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
            }}
          >
            {categories.map((item) => (
              <Button
                key={item._id}
                style={{
                  backgroundColor:
                    category === item._id ? colors.color7 : colors.color5,
                  borderRadius: 100,
                  margin: 5,
                }}
                onPress={() => categoryButtonHandler(item._id)}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: category === item._id ? colors.color3 : 'gray',
                  }}
                >
                  {item.category}
                </Text>
              </Button>
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View style={{ flex: 1, backgroundColor: '#ffdbbb' }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.map((item, index) => (
              <ProductCard
                key={item._id}
                id={item._id}
                i={index}
                name={item.name}
                price={item.price}
                image={item.images[0]?.url}
                addToCartHandler={() => addToCartHandler(item)}
                navigate={() => productClickHandler(item)}
                stock={item.stock}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <Footer activeRoute={'home'} />
    </>
  );
};

export default Home;
