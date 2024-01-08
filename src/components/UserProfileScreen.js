import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, FlatList, StyleSheet, StatusBar  } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import getTopUsersForChart from './getTopUsersForChart'; // Ajusta la ruta según la ubicación de tu archivo
import axios from 'axios';
import { Card, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
const screenWidth = Dimensions.get("window").width

const UserProfileScreen = ({ route }) => {
  const { username } = route?.params || { username: 'YOUR_NAME' };
  const [userList, setUserList] = useState([]);
  const [view, setView] = useState(false);
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

  const [chartData, setChartData] = useState([{ labels: [], datasets: [{ data: [] }] }]);

  useEffect(() => {
    if (userList.length > 0) {
        getTopUsersForChart(userList)
        .then((chartData) => {
            setView(true)
            setChartData(chartData);
        })
        .catch((error) => {
          console.error('Error fetching chart data', error);
        });
    }
  }, [userList]);

  const handleSearch = (login) => {
    // y navegar a la pantalla de perfil con el nombre de usuario.
    if (login.trim() !== '') {
      navigation?.navigate('UserProfileScreenDescription', { login });
    }
  };

  if (userList.length === 0) {
    return <Text>Cargando...</Text>;
  }

   // Estilo del gráfico
   const chartConfig = {
    backgroundColor: '#fff',
    decimalPlace: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
    style:{
      borderRadius: 16,
      marginVertical: 5,
      marginHorizontal: 5
    },
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    strokeWidth: 2,
    barPercentage: 0.4,
    barRadius: 0.8,
    propsForLabels:{
      fontFamily:'arial',
      },
  }
  return (
    <View style={{flex: 1}}>
            {view && chartData?.labels?.length > 0 && (
                <BarChart
                    data={chartData}
                    width={screenWidth}
                    showValuesOnTopOfBars
                    showBarTops={false}
                    height={400}
                    yAxisLabel=''
                    yAxisSuffix=''
                    yAxisInterval={5}
                    chartConfig={chartConfig}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16 
                    }}
                    // horizontalLabelRotation={40}
                    verticalLabelRotation={50}
                />
            )}

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
                    onPress={() => handleSearch(user.login)}/>
                </Card>
              </View>
            )}
        />
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

export default UserProfileScreen;
