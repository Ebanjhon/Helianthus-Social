import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FetchProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  params?: Record<string, any>;
  formData?: FormData;
  body?: any;
  headers?: Record<string, string>;
  files?: Record<string, File> | null;
  autoFetch?: boolean;
  handleDonefetch?: () => void;
}

const useFetchApi = ({
  url,
  method = 'GET',
  params = {},
  formData,
  body = null,
  headers = {},
  files = null,
  autoFetch = false,
  handleDonefetch,
}: FetchProps) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStatus(null);

    try {
      const token = await AsyncStorage.getItem('token');
      const authHeaders = token ? {Authorization: `Bearer ${token}`} : {};
      const response = await axios({
        url,
        method,
        params,
        data: formData ? formData : body,
        headers: {
          'Content-Type': files ? 'multipart/form-data' : 'application/json',
          ...authHeaders,
          ...headers,
        },
      });

      setData(response.data);
      setStatus(response.status);
      handleDonefetch && handleDonefetch();
    } catch (err) {
      console.log(err.response.data);
      setError(err);
      setStatus(err.response?.status || 500);
    } finally {
      setIsLoading(false);
    }
  }, [url, method, params, body, headers, files, handleDonefetch]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  useEffect(() => {
    if (data) {
      console.log('kkk');
      handleDonefetch && handleDonefetch();
    }
  }, [data]);

  return {data, isLoading, error, status, submit: fetchData};
};

export default useFetchApi;

// cách dùng
//  const {data, error, isLoading, status, refetchData} = useFetchApi({
//    url: 'https://api.example.com/data',
//    method: 'GET',
// body: user,
//    params: {userId: 1},
//  });

// const formData = new FormData();
// if (files) {
//   Object.keys(files).forEach(key => {
//     formData.append(key, files[key]);
//   });
// }
