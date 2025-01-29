import { TQueryParam, TResponseRedux, TStatus, TStudent } from "../../../../types";
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
          params: params
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

    getSingleStudent: builder.query({
      query: (studentId: string) => ({
        url: `/students/${studentId}`,
        method: "GET"
      }),
      transformResponse: (response: TResponseRedux<TStudent>) => {
        if (response.success) return response.data;
        return response;
      }
    }),

    createStudent: builder.mutation({
      query: (studentData) => ({
        url: "/users/create-student",
        method: "POST",
        body: studentData
      })
    }),

    updateSingleStudent: builder.mutation({
      query: (studentData: Partial<TStudent>) => ({
        url: `/students/${studentData._id}`,
        method: "PATCH",
        body: { student: studentData }
      })
    }),

    changeUserStatus: builder.mutation({
      query: ({ status, userId }: { status: TStatus, userId: string }) => ({
        url: `/users/change-status/${userId}`,
        method: "POST",
        body: { status }
      })
    })
  })
});

export const {
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useCreateStudentMutation,
  useUpdateSingleStudentMutation,
  useChangeUserStatusMutation,
} = userManagementApi;
