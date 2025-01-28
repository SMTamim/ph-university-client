import { z } from "zod";

export const academicSemesterSchema = z.object({
  year: z.string({ required_error: "Please select a year" }),
  code: z.string({ required_error: "Please select a name" }),
  startMonth: z.string({ required_error: "Please select a start month" }),
  endMonth: z.string({ required_error: "Please select a end month" })
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please enter a faculty name" }).min(1, { message: "Please enter a valid name" }),
})