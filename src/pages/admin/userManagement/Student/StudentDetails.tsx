import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagement.api";
import { FaTruckLoading } from "react-icons/fa";

const StudentDetails = () => {

    const {studentId} = useParams();
    const {data, isLoading} = useGetSingleStudentQuery(studentId as string);
    console.log(data);

    return (
        <pre>
            {isLoading ? <FaTruckLoading /> : <div>{JSON.stringify(data, null, 2)}</div>}
        </pre>
    );
};

export default StudentDetails;