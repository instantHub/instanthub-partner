import { baseApi } from "@features/api";
import {
  ICreatePartnerExecutiveRequest,
  ICreatePartnerExecutiveResponse,
  IExecutive,
} from "./types";
import { EXECUTIVE_API_TAG, EXECUTIVES_API_PATHS } from "./constant";

export const executive = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPartnerExecutive: builder.mutation<
      ICreatePartnerExecutiveResponse,
      ICreatePartnerExecutiveRequest
    >({
      query: (data) => ({
        url: EXECUTIVES_API_PATHS.BASE,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [EXECUTIVE_API_TAG],
    }),

    getPartnerExecutives: builder.query<IExecutive[], void>({
      query: () => ({
        url: EXECUTIVES_API_PATHS.BASE,
        method: "GET",
      }),
      providesTags: [EXECUTIVE_API_TAG],
    }),

    deletePartnerExecutives: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: EXECUTIVES_API_PATHS.BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: [EXECUTIVE_API_TAG],
    }),
  }),
});

export const {
  useCreatePartnerExecutiveMutation,
  useGetPartnerExecutivesQuery,
  useDeletePartnerExecutivesMutation,
} = executive;
