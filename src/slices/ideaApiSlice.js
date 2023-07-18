import { IDEAS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const ideasApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIdeas: builder.query({
      query: ({ pageNumber }) => ({
        url: IDEAS_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Ideas'],
    }),
    getIdeaDetails: builder.query({
      query: (ideaId) => ({
        url: `${IDEAS_URL}/${ideaId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createIdea: builder.mutation({
      query: (data) => ({
        url: `${IDEAS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Idea'],
    }),
    updateIdea: builder.mutation({
      query: (data) => ({
        url: `${IDEAS_URL}/${data.ideaId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Ideas'],
    }),
    deleteIdea: builder.mutation({
      query: (ideaId) => ({
        url: `${IDEAS_URL}/${ideaId}`,
        method: 'DELETE',
      }),
      providesTags: ['Idea'],
    }),
  }),
});

export const {
  useGetIdeasQuery,
  useGetIdeaDetailsQuery,
  useCreateIdeaMutation,
  useUpdateIdeaMutation,
  useDeleteIdeaMutation,
} = ideasApiSlice;
