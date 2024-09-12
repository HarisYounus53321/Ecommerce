import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
 
} from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { setting } from '../components/Setting.config';


const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const loading = false;

  const submitHandler = () => {

    console.log(name+' '+email +' '+password+' '+confirmPassword)
    if (password == confirmPassword) {

      console.log("Sending call");
      const url = setting.ip + '/api/Auth/signUp';
      const payload = {
        "username": name.toString(),
        "password": password.toString()
      };
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers here if needed
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            // Handle different status codes
            if (response.status === 409) {
              throw new Error('Username already exists');
            } else if (response.status === 400) {
              throw new Error('Bad request');
            } else {
              throw new Error('Something went wrong');
            }
          }
          return response.json(); // Assuming the API returns JSON
        })
        .then((responseData) => {
          console.log(responseData);
          alert('User added successfully');
          navigation.navigate('login')
          // setData(responseData);
        })
        .catch((error) => {
          console.error('Error:', error.message);
          // Handle the error in your UI if needed
        });
      }      
    else{
      alert('Passwords do not match!');
      return;
    }
    // Handle signup logic here
  };

  return (
    <ImageBackground source={require('./background.png')} style={styles.background}>
      <View style={styles.topContainer}>
                <ImageBackground source={require('./background.png')} style={styles.background}>
                    <Image source={require('./logo.png')} style={styles.logo} />
                </ImageBackground>
            </View>
      <View style={styles.bottomContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Sign Up</Text>
        <Text style={styles.subText}>It's good to see you again!</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={name}
            onChangeText={setName}
          />
          
          <Text style={styles.label}>Email/User nmae</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          {password && confirmPassword && password !== confirmPassword && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}

          {/* <View style={styles.checkBoxContainer}>
            <CheckBox
              value={agree}
              onValueChange={setAgree}
              style={styles.checkbox}
            />
            <Text style={styles.checkText}>
              I agree to the 
              <Text style={styles.linkText}> Terms & Conditions </Text>
              and 
              <Text style={styles.linkText}> Privacy Policy</Text>
            </Text>
          </View> */}

          <Button
            mode="contained"
            style={styles.button}
            disabled={!name || !email || !password || !confirmPassword || agree}
            onPress={submitHandler}
            loading={loading}
          >
            Sign Up
          </Button>

          <View style={styles.loginLink}>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.loginText}>Already have an account? <Text style={styles.signInLink}>Sign In</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
},
logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
},
 
  topContainer: {
    flex: 0.4,
  },
  signInText: {
    fontSize: 28,
    color: '#f0a500', // Orange color
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0a500',
    alignSelf: 'flex-start',
},
  subText: {
    fontSize: 16,
    color: '#707070',
    alignSelf: 'flex-start',
    marginBottom: 20,
},
  bottomContainer: {
    flex: 1.3,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: '#707070', // Gray color
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    height:20,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6, // Android shadow
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkText: {
    color: '#707070', // Gray color
    fontSize: 14,
  },
  linkText: {
    color: '#f0a500', // Orange color
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  button: {
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: '#f0a500', // Orange color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10, // Android shadow
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#707070', // Gray color
    fontSize: 16,
  },
  signInLink: {
    color: '#f0a500', // Orange color
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10, // Android shadow
  },
});

export default Signup;
