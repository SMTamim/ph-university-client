import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col } from "antd";
import PHSelect, { TOption } from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academicManagementSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement";
import { toast } from "sonner";
import { TResponse } from "../../../../types/index";

const currentYear = new Date().getFullYear();
const yearOptions: TOption[] = [0, 1, 2, 3, 4].map((year) => ({
    value: (currentYear + year).toString(),
    label: (currentYear + year).toString(),
}))

const CreateAcademicSemester = () => {

    const [addAcademicSemester] = useAddAcademicSemesterMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating academic semester...");
        const name = semesterOptions.find(option => option.value === data.code)?.label;
        const selectedData = {
            name,
            ...data
        };
        try {
            const res = await addAcademicSemester(selectedData) as TResponse;
            if (res?.error) {
                toast.error(res.error?.data.message, { id: toastId });
            } else {
                toast.success("Academic semester created successfully", { id: toastId });
            }
        } catch (err) {
            console.log(err);
        }
        console.log(selectedData);
    }

    return (
        <Col span={6}>
            <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                <PHSelect options={semesterOptions} name="code" label={"Name"} />
                <PHSelect options={yearOptions} name="year" label="Year" />
                <PHSelect options={monthOptions} name="startMonth" label={"Start Month"} />
                <PHSelect options={monthOptions} name="endMonth" label={"End Month"} />
                <Button htmlType="submit">Submit</Button>
            </PHForm>
        </Col>
    );
};

export default CreateAcademicSemester;