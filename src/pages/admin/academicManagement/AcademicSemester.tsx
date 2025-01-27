import { useGetAllAcademicSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {

    const {data}  = useGetAllAcademicSemestersQuery(undefined);
    console.log(data);
    return (
        <div>
            This is academic semester
        </div>
    );
};

export default AcademicSemester;