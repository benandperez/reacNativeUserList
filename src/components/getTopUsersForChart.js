import axios from "axios";

const getTopUsersForChart = async (dataFoll) => {
  try {
    const requests = dataFoll.map(async (element) => {
      try {
        const response = await axios.get(element.followers_url);
        const topUsers = response.data.length;
        return {
          users: element.login,
          followers: topUsers,
        };
      } catch (error) {
        // Trata el error de la solicitud individual según tus necesidades
        console.error(`Error fetching followers for ${element.login}`, error);
        return {
          users: element.login,
          followers: 0, // Puedes ajustar este valor según tus necesidades
        };
      }
    });

    const results = await Promise.all(requests);
    const labels = results.map((result) => result.users);
    const datasets = [{ data: results.map((result) => result.followers) }];

    return { labels, datasets };
  } catch (error) {
    throw error;
  }
};

export default getTopUsersForChart;