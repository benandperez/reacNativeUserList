const users = [
  {
     name: 'brynn',
     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
 ]
import React, { useEffect, useState  } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar  } from 'react-native';
import axios from 'axios';

import { Card, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const UserProfileScreenList = ({ route }) => {
  const { username } = route?.params || { username: 'YOUR_NAME' };
  const [userList, setUserList] = useState([]);
  const navigation = useNavigation();
  

  useEffect(() => {
    axios.get(`https://api.github.com/search/users?q=${username}`)
      .then((response) => {
        const topUsers = response.data.items.slice(0, 10);
        setUserList(topUsers);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, [username]);

  const handleSearchUser = (login) => {
  // y navegar a la pantalla de perfil con el nombre de usuario.
  if (login.trim() !== '' && navigation) {
    navigation?.navigate('UserProfileScreenDescription', { login });
  }
};

  if (userList.length === 0) {
    return <Text>Cargando...</Text>;
  }  

      return (
        <FlatList
          data={userList}
          keyExtractor={(user) => user.id.toString()}
          ItemSeparatorComponent={''}
          renderItem={({ item: user }) => (
          
          <View key={user.id} style={styles.container}>
              <Card>
                  <Image source={{ uri: user.avatar_url }} style={{ width: 50, height: 50, justifyContent: 'center' }} />
                <Text style={{marginBottom: 5}}>
                Nombre de usuario: {user.login}
                </Text>
                <Text>Id Usuario: {user.id}</Text>
                <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='VIEW NOW' 
                  onPress={() => handleSearchUser(user.login)}/>
              </Card>
          </View>
          )}
        />
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      marginBottom: StatusBar.currentHeight || 0,
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

export default UserProfileScreenList;
