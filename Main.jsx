import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import Login from './screens/Login'; // Ensure this path is correct
import Home from './screens/Home';
import Profile from './screens/Profile';
import Orders from './screens/Orders';
import Signup from './screens/Signup';
import UpdateProfile from './screens/UpdateProfile';
import ChangePassword from './screens/ChangePassword';
import ForgetPassword from './screens/ForgetPassword';
import Verify from './screens/Verify';
import Cart from './screens/Cart';
// import Cart from './screens/Cart';
//import ProductDetails from './screens/ProductDetails';
import { CartProvider } from './components/CartContext'; // Update this path to where your CartContext is defined
import ProductDetailstoAdd from './screens/ProductDetailstoAdd'

const Stack = createNativeStackNavigator();



const Main = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='login'
      >
        <Stack.Group>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='signup' component={Signup} />
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='profile' component={Profile} />
          <Stack.Screen name='orders' component={Orders} />
          
          {/* ProductDetailsToAdd */}
          <Stack.Screen name='updateprofile' component={UpdateProfile} />
          <Stack.Screen name='changepassword' component={ChangePassword} />
          <Stack.Screen name='forgetpassword' component={ForgetPassword} />
          <Stack.Screen name='verify' component={Verify} />
          <Stack.Screen name='cart' component={Cart} />
          <Stack.Screen name='productdetailtoadd' component={ProductDetailstoAdd} />
          {/* <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='productdetails' component={ProductDetails} />
          <Stack.Screen name='cart' component={Cart} />
          <Stack.Screen name='confirmorder' component={ConfirmOrder} />
          <Stack.Screen name='payment' component={Payment} />
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='signup' component={Signup} />
          <Stack.Screen name='profile' component={Profile} />
          <Stack.Screen name='updateprofile' component={UpdateProfile} />
          <Stack.Screen name='changepassword' component={ChangePassword} />
       
          <Stack.Screen name='camera' component={Camera} /> */}

        </Stack.Group>
      </Stack.Navigator>
      <Toast position='top' />
    </NavigationContainer>
    </CartProvider>
  );
};

export default Main;
