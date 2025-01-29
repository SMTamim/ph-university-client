import { Button, Col, Row } from "antd";
import { TAcademicDepartment, TAcademicFaculty } from "../../../../types/academicManagement.type";
import PHForm from "../../../components/form/PHForm";
import PHSelect, { TOption } from "../../../components/form/PHSelect";
import { useCreateAcademicDepartmentMutation, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schema/academicManagementSchema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import { TResponseRedux } from "../../../../types";

const CreateAcademicDepartment = () => {
    const [createAcademicDepartment] = useCreateAcademicDepartmentMutation(undefined);
    const { data: academicFaculties } = useGetAllAcademicFacultyQuery([{ name: 'limit', value: 100 }]);
    const onSubmit: SubmitHandler<FieldValues> = async (departmentData) => {
        const loadingToast = toast.loading('Creating academic department...');
        try {
            const res = await createAcademicDepartment(departmentData) as TResponseRedux<TAcademicDepartment>;
            if (res?.error) {
                toast.error(res?.error?.data.message || 'Some error occurred while creating academic department!', { id: loadingToast });
            } else {
                toast.success('Academic department created successfully!', { id: loadingToast });
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong!', { id: loadingToast });
        }
    }

    const facultyOptions: TOption[] = academicFaculties?.data?.map(
        (faculty: TAcademicFaculty) => ({ value: faculty._id, label: faculty.name })
    ) || [];

    return (
        <Row>
            <Col span={6}>
                <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
                    <PHSelect label="Select Faculty" name="academicFaculty" options={facultyOptions}></PHSelect>
                    <PHInput label="Name" name="name" type="text"></PHInput>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateAcademicDepartment;