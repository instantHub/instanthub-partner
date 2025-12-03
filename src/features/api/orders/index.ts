import { baseApi } from "@features/api";
import { ORDER_API_PATHS, UNASSIGNED_ORDERS_TAG } from "./constants";
import { IAssignmentStatus, IOrder, IUnAssignedOrdersResponse } from "./types";
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
    getMyAssignedOrders: build.query<IOrder[], void>({
      query: () => ({
        url: ORDER_API_PATHS.MY_ORDERS,
        method: "GET",
      }),
      providesTags: [],
    }),
    assignOrderToPartner: build.mutation<
      { message: string; partner: IPartner },
      {
        orderId: string;
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
      invalidatesTags: [UNASSIGNED_ORDERS_TAG],
    }),
  }),
});

export const {
  useGetOrdersByLocationQuery,
  useGetMyAssignedOrdersQuery,
  useAssignOrderToPartnerMutation,
} = orders;
