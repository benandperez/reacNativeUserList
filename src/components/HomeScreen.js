// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, StatusBar } from 'react-native'; // Importa Alert para mostrar mensajes de alerta
import UserProfileScreenList from './UserProfileScreenList';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
      // Validador: Verifica que el texto de búsqueda tenga al menos 4 caracteres
      if (username.length < 4) {
        console.log(username.length < 4);
      Alert.alert('Error', 'Ingrese al menos 4 caracteres para realizar la búsqueda.');
      return;
    }

    // Validador: No permite la búsqueda de la palabra “doublevpartners”
    if (username.toLowerCase() === 'doublevpartners') {
      Alert.alert('Error', 'No se permite la búsqueda de "doublevpartners".');
      return;
    }

    // Lógica para buscar usuarios usando la API de GitHub
    // y navegar a la pantalla de perfil con el nombre de usuario.
    if (username.trim() !== '') {
      navigation.navigate('UserProfile', { username });

    }
  };

  return (
    <View style={{flex: 1}}>
        <Text  style={styles.text}>
            Lista de Usuarios
        </Text>
      <TextInput
        placeholder="Ingrese un nombre de usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.button}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <UserProfileScreenList />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    text: {
      marginVertical: 5,
      fontWeight: 'bold',
      fontSize: 40
    },
    button: {
        marginVertical: 5,
        fontSize: 15
      },
  });

export default HomeScreen;
