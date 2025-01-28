import { TAcademicSemester } from "./../../../../types/academicManagement.type";
import { TQueryParam, TResponseRedux } from "../../../../types";
import baseApi from "../../api/baseApi";


const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if(args){
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          })
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        if (response.success) {
          return {
            data: response.data,
            meta: response.meta
          };
        }
        return response;
      }
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data
      })
    })
  })
});

export const { useGetAllAcademicSemestersQuery, useAddAcademicSemesterMutation } = academicManagementApi;
