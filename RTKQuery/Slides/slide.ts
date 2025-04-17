import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createAccount, createFeed, UserResponse } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const BASE_URL = 'http://192.168.1.120:8888';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
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
    getToken: builder.mutation<{ token: string }, { username: string; password: string }>({
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
    createAccount: builder.mutation<UserResponse, createAccount>({
      query: params => ({
        url: "/api/user",
        method: 'POST',
        body: params,
      }),
    }),
    createOTP: builder.mutation<{ otp: string }, void>({
      query: () => ({
        url: "/api/auth/send-otp",
        method: "POST",
        responseHandler: (response) => response.text(), // 👈 xử lý dạng text
      }),
      transformResponse: (rawResult: string) => {
        const otp = rawResult.split(':')[1]?.trim() ?? '';
        return { otp };
      },
    }),
    verifyOTP: builder.mutation<{ status: number }, string>({
      query: (params) => ({
        url: "/api/auth/verify",
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'text/plain',
        },
        responseHandler: (response) => response.text(), // 👈 để tránh lỗi JSON parse
      }),
      transformResponse: (_raw, meta) => {
        // 👈 Lấy status code từ meta
        return { status: meta?.response?.status || 0 };
      },
    }),
    createFeed: builder.mutation<createFeed, { content: string }>({
      query: params => ({
        url: "/api/feed",
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetTokenMutation,
  useGetUserProfileMutation,
  useCreateAccountMutation,
  useCreateOTPMutation,
  useVerifyOTPMutation,
  useCreateFeedMutation
} = apiSlice;
