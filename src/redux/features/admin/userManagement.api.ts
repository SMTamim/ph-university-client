import { TQueryParam, TResponseRedux, TStudent } from "../../../../types";
import baseApi from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg) => {
            params.append(arg.name, arg.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        if (response.success) {
          return {
            data: response.data,
            meta: response.meta
          };
        }
        return response;
      }
    }),

    createStudent: builder.mutation({
      query: (studentData) => ({
        url: "/users/create-student",
        method: "POST",
        body: studentData
      })
    })
  })
});

export const { useGetAllStudentsQuery, useCreateStudentMutation } = userManagementApi;
