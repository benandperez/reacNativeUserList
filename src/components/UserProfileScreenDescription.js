import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar  } from 'react-native';
import axios from 'axios';
import { Card, Button, Icon } from 'react-native-elements'

const UserProfileScreenDescription = ({ route }) => {
  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    if (route?.params?.login) {
      axios.get(`https://api.github.com/users/${route?.params?.login}`)
        .then((response) => {
          const topUsers = response.data;
          setUserList(topUsers);
        })
        .catch((error) => {
          console.error('Error fetching user data', error);
        });
      
    }
  }, []);

  if (userList.length === 0) {
    return <Text>Cargando...</Text>;
  }
  return (
    <View style={{style: styles.container}}>
      <Card>
          <Image source={{ uri: userList.avatar_url }} style={{ width: 50, height: 50, justifyContent: 'center' }} />
        <Text style={styles.text}>
        Nombre de usuario: {userList.login}
        </Text>
        <Text style={styles.text}>Id Usuario: {userList.id}</Text>
        <Text style={styles.text}>URL Seguidores: {userList.followers_url}</Text>
        <Text style={styles.text}>Seguidores: {userList.followers}</Text>
        <Text style={styles.text}>Siguiendo: {userList.following}</Text>
        <Text style={styles.text}>URL Git: {userList.url}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
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
    },
  });

export default UserProfileScreenDescription;
