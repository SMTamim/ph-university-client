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
}

export type TTableData = Pick<TAcademicSemester, 'name' | 'year' | 'startMonth' | 'endMonth'>;