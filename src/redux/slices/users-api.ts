import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/common/common-functions.ts";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQuery(),
  tagTypes: ["usersApi"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["usersApi"],
    }),
    addUser: builder.mutation<any, any>({
      query(arg) {
        return {
          url: "/users",
          method: "POST",
          body: arg,
        };
      },
      invalidatesTags: ["usersApi"],
    }),
    updateUser: builder.mutation<void, Partial<any>>({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["usersApi"],
    }),
    deleteUser: builder.mutation<number | string, number | string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["usersApi"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
