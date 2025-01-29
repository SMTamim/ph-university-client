import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "../../../../types/academicManagement.type";
import { TQueryParam, TResponseRedux } from "../../../../types";
import baseApi from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // academic semester endpoints
    getAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          });
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
    }),

    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return response;
      }
    }),

    // academic faculty endpoints
    getAllAcademicFaculty: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value as string);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params: params
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        if (response.success) {
          return {
            data: response.data,
            meta: response.meta
          };
        }
        return response;
      }
    }),
    // academic department endpoints
    createAcademicDepartment: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-departments/create-academic-department",
          method: "POST",
          body: data
        };
      }
    }),

    getAllAcademicDepartment: builder.query({
      query: (args: TQueryParam[]) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg) => params.append(arg.name, arg.value as string));
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>)=>{
        if(response.success){
          return {
            data: response.data,
            meta: response.meta
          }
        }
        return response;
      }
    })
  })
});

export const {
  useGetAllAcademicSemestersQuery,
  useAddAcademicSemesterMutation,
  useCreateAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery
} = academicManagementApi;
