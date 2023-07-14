import { PLANS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: ({ pageNumber }) => ({
        url: PLANS_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Plans'],
    }),
    getPlanDetails: builder.query({
      query: (planId) => ({
        url: `${PLANS_URL}/${planId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPlan: builder.mutation({
      query: (data) => ({
        url: `${PLANS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Plan'],
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `${PLANS_URL}/${data.planId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Plans'],
    }),
    deletePlan: builder.mutation({
      query: (planId) => ({
        url: `${PLANS_URL}/${planId}`,
        method: 'DELETE',
      }),
      providesTags: ['Plan'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanDetailsQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApiSlice;
