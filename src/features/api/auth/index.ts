import { baseApi } from "@features/api";
import {
  IPartner,
  IPartnerLoginCredentials,
  IPartnerLoginResponse,
} from "./types";
import { BASE_URL, TAvailableRole } from "@utils/constants";

export const auth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IPartnerLoginResponse, IPartnerLoginCredentials>({
      query: (data) => ({
        url: `${BASE_URL}/auth`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),

    userProfile: builder.query<IPartner, void>({
      query: () => ({
        url: `${BASE_URL}/profile`,
        method: "GET",
      }),
    }),

    logout: builder.mutation<void, { id: string; role: TAvailableRole }>({
      query: (data) => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useUserProfileQuery } =
  auth;
