import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useCart } from '../components/CartContext';
import { setting } from '../components/Setting.config';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserEmail } = useCart();  // Correct usage of useCart hook

    const handleLogin = async () => {
        const encodedEmail = encodeURIComponent(email);
        const encodedPassword = encodeURIComponent(password);

        const url = `${setting.ip}/api/Auth/login?email=${encodedEmail}&passowrd=${encodedPassword}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data1 = await response.text();
            const trimmedData = data1.trim();
            const cleanData = trimmedData.replace(/^"|"$/g, '');

            if (cleanData.toLowerCase() === 'login in') {
                console.log('Login successful, navigating to home.');
                setUserEmail(email);  // Correctly set the email in global context
                navigation.navigate('home');
            } else {
                console.log('Login failed, data received:', cleanData);
                alert('Login failed, please check your credentials and try again.');
            }

        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <ImageBackground source={require('./background.png')} style={styles.background}>
                    <Image source={require('./logo.png')} style={styles.logo} />
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.headerText}>Sign in</Text>
                <Text style={styles.subText}>It's good to see you again!</Text>

                <Text style={styles.label}>Email/User name</Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.normalText}>
                        Don’t have an account?
                        <Text style={styles.signUpText}> Sign up now</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 0.4,
    },
    bottomContainer: {
        flex: 0.6,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 30,
        elevation: 100, // For Android shadow
    },

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
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#707070',
        marginBottom: 5,
    },
    inputField: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#FFF',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 6,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0a500',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 6,
    },
    loginButtonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    signUpText: {
        fontSize: 16,
        color: '#f0a500',  // Orange color for "Sign up now"
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,  // Slightly stronger shadow
        shadowRadius: 3,
        elevation: 100,  // Android shadow
    },
});

export default LoginScreen;
