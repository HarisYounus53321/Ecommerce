import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import { useCart } from '../components/CartContext';
const Profile = ({ navigation }) => {
  
  const {  userEmail } = useCart();
  const navigateHandler = (title) => {
    switch (title) {
      case 'My Profile':
        navigation.navigate('updateprofile');
        break;
      case 'My Orders':
        navigation.navigate('orders');
        break;
      case 'Change Password':
        navigation.navigate('changepassword');
        break;
      case 'Help & Support':
        navigation.navigate('helpandsupport');
        break;
      case 'Logout':
        logoutHandler();
        navigation.navigate('login');
        break;
      case 'Delete Profile':
        // Handle delete profile logic here
        console.log('Delete Profile');
        break;
      default:
        break;
    }
  };

  const logoutHandler = () => {
    console.log('sign out');
    // Add logout logic here (e.g., clearing user session, etc.)
  };

  return (
  <>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity>
          <Text style={styles.backButton}>{'<'} Back</Text>
        </TouchableOpacity> */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' }} // Replace with your image URL
            style={styles.profileImage}
          />
        
          <Text style={styles.profileName}>{userEmail}</Text>
          <Text style={styles.profileUsername}>@:{userEmail}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {/* <MenuItem title="My Profile" icon="👤" navigateHandler={navigateHandler} /> */}
        <MenuItem title="My Orders" icon="📦" navigateHandler={navigateHandler} />
        <MenuItem title="Change Password" icon="🔒" navigateHandler={navigateHandler} />
        {/* <MenuItem title="Address" icon="📍" /> */}
        {/* <MenuItem title="Payment Methods" icon="💳" /> */}
        <MenuItem title="Help & Support" icon="❓" navigateHandler={navigateHandler} />
        <MenuItem title="Logout" icon="🚪" navigateHandler={navigateHandler} isLogout />
        <MenuItem title="Delete Profile" icon="🗑️" navigateHandler={navigateHandler} isDelete />
      </View>
     
    </ScrollView>
    <Footer activeRoute={'home'} />
    </>
    
  );
};

const MenuItem = ({ title, icon, navigateHandler, isDelete, isLogout }) => (
  <TouchableOpacity
    style={[styles.menuItem, isDelete && styles.deleteItem]}
    onPress={() => {
      if (isLogout) {
        navigateHandler('Logout');
      } else {
        navigateHandler(title);
      }
    }}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={[styles.menuText, isDelete && styles.deleteText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFA500', // Orange background
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    fontSize: 18,
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileUsername: {
    fontSize: 18,
    color: '#fff',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  menuText: {
    fontSize: 18,
  },
  deleteItem: {
    backgroundColor: '#fff0f0',
  },
  deleteText: {
    color: 'red',
  },
});

export default Profile;
