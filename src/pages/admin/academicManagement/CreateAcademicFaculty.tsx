import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schema/academicManagementSchema";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponseRedux } from "../../../../types";
import { TAcademicFaculty } from "../../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {

    const [createAcademicFaculty] = useCreateAcademicFacultyMutation(undefined);
    const onSubmit: SubmitHandler<FieldValues> = async (facultyData) => {
        const loadingToast = toast.loading("Creating academic faculty...");
        console.log(facultyData);
        try {
            const data = await createAcademicFaculty(facultyData) as TResponseRedux<TAcademicFaculty>;
            if (data?.error) {
                toast.error(data.error?.data.message || "Something went wrong", { id: loadingToast });
            } else {
                toast.success("Academic faculty created successfully", { id: loadingToast });
            }

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong!", { id: loadingToast });
        }
    }
    return (
        <Row>
            <Col span={6} >
                <PHForm resolver={zodResolver(academicFacultySchema)} onSubmit={onSubmit} >
                    <PHInput type="text" name="name" label="Name"></PHInput>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateAcademicFaculty;