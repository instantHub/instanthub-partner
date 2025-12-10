import { baseApi } from "@features/api";
import {
  MY_ORDERS_API_TAG,
  ORDER_API_PATHS,
  ORDER_STATS_API_TAG,
  UNASSIGNED_ORDERS_TAG,
} from "./constants";
import {
  IAssignmentStatus,
  IOrder,
  IPartnerOrderStats,
  IUnAssignedOrdersResponse,
} from "./types";
import { IPartner } from "../auth/types";

export const orders = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrdersByLocation: build.query<IUnAssignedOrdersResponse, void>({
      query: () => ({
        url: ORDER_API_PATHS.BY_LOCATION,
        method: "GET",
      }),
      providesTags: [UNASSIGNED_ORDERS_TAG],
    }),
    getMyAssignedOrders: build.query<{ message: string; data: IOrder[] }, void>(
      {
        query: () => ({
          url: ORDER_API_PATHS.MY_ORDERS,
          method: "GET",
        }),
        providesTags: [MY_ORDERS_API_TAG],
      }
    ),

    getOrderStats: build.query<IPartnerOrderStats, void>({
      query: () => `${ORDER_API_PATHS.BASE}/stats`,
      providesTags: [ORDER_STATS_API_TAG],
      // Refetch on mount and focus
      keepUnusedDataFor: 60, // Cache for 60 seconds
    }),

    assignOrderToPartner: build.mutation<
      { message: string; partner: IPartner },
      {
        _orderId: string;
        _userId: string;
        userRole: string;
        assignmentStatus: IAssignmentStatus;
      }
    >({
      query: (data) => ({
        url: ORDER_API_PATHS.ASSIGN_ORDER,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: [ORDER_STATS_API_TAG, MY_ORDERS_API_TAG],
    }),

    unassignOrder: build.mutation<
      { message: string; order: IOrder },
      {
        _orderId: string;
      }
    >({
      query: ({ _orderId }) => ({
        url: ORDER_API_PATHS.UNASSIGN_ORDER(_orderId),
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [ORDER_STATS_API_TAG, MY_ORDERS_API_TAG],
    }),
  }),
});

export const {
  useGetOrdersByLocationQuery,
  useGetMyAssignedOrdersQuery,
  useGetOrderStatsQuery,
  useAssignOrderToPartnerMutation,
  useUnassignOrderMutation,
} = orders;
