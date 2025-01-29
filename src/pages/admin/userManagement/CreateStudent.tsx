import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHSelect, { TOption } from "../../../components/form/PHSelect";
import { bloodGroupOptions } from "../../../constants/global";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement";
import { useCreateStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponseRedux } from "../../../../types";
import { TStudent } from "../../../../types/userManagement.type";

const formDefaultValues = {
    "name": {
        "firstName": "I am ",
        "middleName": "Student",
        "lastName": "Number 1"
    },
    "gender": "male",
    // "dateOfBirth": "1990-01-01",
    "bloodGroup": "A+",
    "email": "student2@gmail.com",
    "contactNo": "1235678",
    "emergencyContactNo": "987-654-3210",
    "presentAddress": "123 Main St, Cityville",
    "permanentAddress": "456 Oak St, Townsville",
    "guardian": {
        "fatherName": "James Doe",
        "fatherOccupation": "Engineer",
        "fatherContactNo": "111-222-3333",
        "motherName": "Mary Doe",
        "motherOccupation": "Teacher",
        "motherContactNo": "444-555-6666"
    },
    "localGuardian": {
        "name": "Alice Johnson",
        "occupation": "Doctor",
        "contactNo": "777-888-9999",
        "address": "789 Pine St, Villageton"
    },
    "admissionSemester": "677e5d3836bc48ae8c107de1",
    "academicDepartment": "6798fd64d406ec73ea61c5e6"
}

const CreateStudent = () => {

    const { data: dData, isLoading: dLoading, isFetching: dFetching } = useGetAllAcademicDepartmentQuery([]);
    const departmentOptions: TOption[] = dData?.data?.map(opt => ({ label: opt.name, value: opt._id })) || [];

    const { data: sData, isLoading: sLoading, isFetching: sFetching } = useGetAllAcademicSemestersQuery([]);
    const semesterOptions: TOption[] = sData?.data?.map(opt => ({ label: `${opt.name} - ${opt.year}`, value: opt._id })) || [];

    const [createStudent] = useCreateStudentMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const loadingToast = toast.loading('Creating new student...');
        try {
            // console.log(data);
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                password: 'student123',
                student: data
            }));
            formData.append('file', data?.image)
            const res = await createStudent(formData) as TResponseRedux<TStudent>;
            if (res.error) {
                toast.error(res.error?.data.message || 'Some error occurred while creating new student!', { id: loadingToast });
            } else {
                toast.success(res.message || 'New student created successfully!', { id: loadingToast });
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong!', { id: loadingToast });
        }
    }

    return (
        <Row>
            <Col span={24}>
                <PHForm onSubmit={onSubmit} defaultValues={formDefaultValues}>
                    <Divider>
                        <h2>Personal Info</h2>
                    </Divider>
                    <Row gutter={24}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="name.firstName" label="First Name" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="name.middleName" label="Middle Name" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="name.lastName" label="Last Name" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="gender" label="Gender" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker name="dateOfBirth" label="Date of birth" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="bloodGroup" label="Select Blood Group" options={bloodGroupOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller name="image" render={({ field: { onChange, value, ...field } }) => (
                                <Form.Item label="Picture">
                                    <Input type="file" value={value?.fileName} {...field} onChange={(e) => onChange(e.target.files?.[0])} />
                                </Form.Item>
                            )} />
                        </Col>
                    </Row>

                    <Divider>
                        <h2>Contact Info</h2>
                    </Divider>
                    <Row gutter={24}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="email" label="Email" type="email" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="contactNo" label="Contact No" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="emergencyContactNo" label="Emergency Contact No" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="presentAddress" label="Present Address" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="permanentAddress" label="Permanent Address" type="text" />
                        </Col>
                    </Row>

                    <Divider>
                        <h2>Guardian Info</h2>
                    </Divider>
                    <Row gutter={24}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="guardian.fatherName" label="Father Name" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="guardian.fatherOccupation" label="Father Occupation" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="guardian.fatherContactNo" label="Father Contact No" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="guardian.motherName" label="Mother Name" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="guardian.motherOccupation" label="Mother Occupation" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="guardian.motherContactNo" label="Mother Contact No" type="text" />
                        </Col>
                    </Row>

                    <Divider>
                        <h2>Local Guardian Info</h2>
                    </Divider>
                    <Row gutter={24}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="localGuardian.name" label="Name" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="localGuardian.occupation" label="Occupation" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="localGuardian.contactNo" label="Contact No" type="text" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput name="localGuardian.address" label="Address" type="text" />
                        </Col>
                    </Row>

                    <Divider>
                        <h2>Academic Info</h2>
                    </Divider>
                    <Row gutter={24}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect label="Select Admission Semester" name="admissionSemester" options={semesterOptions} disabled={dLoading || dFetching} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect label="Select Academic Department" name="academicDepartment" options={departmentOptions} disabled={sLoading || sFetching} />
                        </Col>
                    </Row>

                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateStudent;