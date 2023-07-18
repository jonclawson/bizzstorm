import { GROUPS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const groupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: ({ pageNumber }) => ({
        url: GROUPS_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Groups'],
    }),
    getGroupDetails: builder.query({
      query: (groupId) => ({
        url: `${GROUPS_URL}/${groupId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createGroup: builder.mutation({
      query: (data) => ({
        url: `${GROUPS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Group'],
    }),
    updateGroup: builder.mutation({
      query: (data) => ({
        url: `${GROUPS_URL}/${data.groupId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Groups'],
    }),
    deleteGroup: builder.mutation({
      query: (groupId) => ({
        url: `${GROUPS_URL}/${groupId}`,
        method: 'DELETE',
      }),
      providesTags: ['Group'],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupDetailsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApiSlice;
