import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CommentResponse, createAccount, CreateComment, createFeed, createNoti, MediaItem, NotiListDataResponse, TypeFeedItem, UserProfileInfo, UserResponse, UserSearchResult, UserUpdate } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const HOST = '10.35.41.94';
export const BASE_URL = `http://${HOST}:8888`;
export const BASE_MinIO = `http://${HOST}`;

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
    getToken: builder.mutation<{ token: string }, { userInput: string; password: string }>({
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
        responseHandler: (response) => response.text(),
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
        responseHandler: (response) => response.text(),
      }),
      transformResponse: (_raw, meta) => {
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
    searchUser: builder.mutation<UserSearchResult, { keyWord: string }>({
      query: ({ keyWord }) => ({
        url: `/api/user/search?keyWord=${keyWord}`,
        method: 'GET',
      }),
    }),
    followUser: builder.mutation<any, { userTargetId: string }>({
      query: (params) => ({
        url: '/api/user/follow',
        method: 'POST',
        body: params
      }),
    }),
    unFollowUser: builder.mutation<any, { userTargetId: string }>({
      query: (params) => ({
        url: '/api/user/follow',
        method: 'DELETE',
        body: params
      }),
    }),
    getFeedHome: builder.mutation<TypeFeedItem[], { page: number }>({
      query: ({ page }) => ({
        url: `/api/feed/search?page=${page}&size=5`,
        method: 'GET',
      }),
    }),
    getUserInfo: builder.mutation<UserProfileInfo, { username: string }>({
      query: ({ username }) => ({
        url: `/api/user/profile?username=${username}`,
        method: 'GET',
      }),
    }),
    likeFeed: builder.mutation<any, { feedId: string }>({
      query: ({ feedId }) => ({
        url: '/api/feed/action',
        method: 'POST',
        body: feedId
      }),
    }),
    unLikeFeed: builder.mutation<any, { feedId: string }>({
      query: ({ feedId }) => ({
        url: '/api/feed/action',
        method: 'DELETE',
        body: feedId,
        headers: {
          'Content-Type': 'application/json',
        },
        responseHandler: async (response) => {
          const text = await response.text();
          try {
            return JSON.parse(text); // nếu trả JSON
          } catch {
            return { message: text }; // nếu là chuỗi "Success!"
          }
        },
      }),
    }),
    deleteFeed: builder.mutation<{ success: boolean }, { feedId: string }>({
      query: ({ feedId }) => ({
        url: `/api/feed`,
        method: 'DELETE',
        body: feedId,
        headers: {
          'Content-Type': 'text/plain'
        },
        responseHandler: async (response) => {
          const text = await response.text();
          return text;
        },
      }),
      transformResponse: (response: string, meta, arg) => {
        if (meta?.response?.status === 200) {
          return { success: true };
        }
        return { success: false };
      },
      transformErrorResponse: (error) => {
        return { success: false };
      },
    }),
    updateUser: builder.mutation<UserProfileInfo, UserUpdate>({
      query: params => ({
        url: "/api/user",
        method: 'PUT',
        body: params,
      }),
    }),
    getListComment: builder.mutation<CommentResponse[], { feedId: string, page: number }>({
      query: ({ feedId, page }) => ({
        url: `/api/comment?feedId=${feedId}&page=${page}`,
        method: 'GET',
      }),
    }),
    createComment: builder.mutation<CommentResponse, CreateComment>({
      query: (params) => ({
        url: '/api/comment',
        method: 'POST',
        body: params,
      }),
    }),
    deleteComment: builder.mutation<boolean, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/api/comment?commentId=${commentId}`,
        method: 'DELETE',
      }),
    }),
    getListFeedProfile: builder.query<TypeFeedItem[], { authorId: string, page: number }>({
      query: ({ authorId, page }) =>
        `/api/feed/profile?authorId=${authorId}&page=${page}&size=5`,
    }),
    getListMediaProfile: builder.mutation<MediaItem[], { authorId: string, page: number }>({
      query: ({ authorId, page }) => ({
        url: `/api/media/profile?authorId=${authorId}&page=${page}&size=5`,
        method: 'GET',
      }),
    }),
    getListCommentChild: builder.query<CommentResponse[], { parentId: string, page: number }>({
      query: ({ parentId, page }) => ({
        url: `/api/comment/child?parentId=${parentId}&page=${page}`,
      }),
    }),
    getListNoti: builder.mutation<NotiListDataResponse, { userId: string, page: number }>({
      query: ({ userId, page }) => ({
        url: `/api/noti/list?userId=${userId}&page=${page}&size=10`,
        method: 'GET',
      }),
    }),
    createNoti: builder.mutation<any, { param: createNoti }>({
      query: (param) => ({
        url: '/api/noti',
        method: 'POST',
        body: param
      }),
    }),
  }),
});

export const { useGetTokenMutation,
  useGetUserProfileMutation,
  useCreateAccountMutation,
  useCreateOTPMutation,
  useVerifyOTPMutation,
  useCreateFeedMutation,
  useSearchUserMutation,
  useFollowUserMutation,
  useUnFollowUserMutation,
  useGetFeedHomeMutation,
  useGetUserInfoMutation,
  useLikeFeedMutation,
  useUnLikeFeedMutation,
  useDeleteFeedMutation,
  useUpdateUserMutation,
  useGetListCommentMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLazyGetListFeedProfileQuery,
  useGetListMediaProfileMutation,
  useLazyGetListCommentChildQuery,
  useGetListNotiMutation,
  useCreateNotiMutation
} = apiSlice;
