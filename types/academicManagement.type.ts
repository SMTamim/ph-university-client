export type TAcademicSemester = {
  _id: string;
  name: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicSemesterTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">;

export type TAcademicFaculty = {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TAcademicFacultyTableData = Pick<TAcademicFaculty, "name">;

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
export type TAcademicDepartmentTableData = {
  name: string;
  academicFaculty: string;
};
