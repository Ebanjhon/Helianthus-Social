import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenResponse, UserResponse } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.9.82:8888',
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: builder => ({
    getToken: builder.mutation<tokenResponse, { username: string; password: string }>({
      query: params => ({
        url: '/api/auth/login',
        method: 'POST',
        body: params,
      }),
    }),
    getUserProfile: builder.mutation<UserResponse, string>({
      query: params => ({
        url: `/api/user?username=${params}`,
      }),
    }),
  }),
});

export const { useGetTokenMutation, useGetUserProfileMutation } = apiSlice;
