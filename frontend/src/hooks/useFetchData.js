import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (accessToken) {
          const apiUrl = getApiUrl(endpoint);

          const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (response.data && response.data.data) {
            setData(response.data.data);
          } else {
            console.error('No data found in response');
          }
        } else {
          console.error('No access token found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading };
};
