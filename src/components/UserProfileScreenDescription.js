import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar  } from 'react-native';
import axios from 'axios';
import { Card, Button, Icon } from 'react-native-elements'

const UserProfileScreenDescription = ({ route }) => {
  const [userList, setUserList] = useState([]);
  // console.log(username, route?.params?.login);
  
  useEffect(() => {
    if (route?.params?.login) {
      axios.get(`https://api.github.com/users/${route?.params?.login}`)
        .then((response) => {
          const topUsers = response.data;
          console.log(response, topUsers);
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
    <View style={{flex: 1}}>
                <Card>
                    <Image source={{ uri: userList.avatar_url }} style={{ width: 50, height: 50, justifyContent: 'center' }} />
                  <Text style={{marginBottom: 5}}>
                  Nombre de usuario: {userList.login}
                  </Text>
                  <Text>Id Usuario: {userList.id}</Text>
                  <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' 
                    />
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
  });

export default UserProfileScreenDescription;
