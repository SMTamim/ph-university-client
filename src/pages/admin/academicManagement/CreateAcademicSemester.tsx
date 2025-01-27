import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col } from "antd";
import PHSelect, { TOption } from "../../../components/form/PHSelect";


const nameAndCodeOptions: TOption[] = [

    {
        value: "01",
        label: "Autumn"
    },
    {
        value: "02",
        label: "Summer"
    },
    {
        value: "03",
        label: "Fall"
    },
];

const monthOptions: TOption[] = [
    {
        value: "January",
        label: "January"
    },
    {
        value: "February",
        label: "February"
    },
    {
        value: "March",
        label: "March"
    },
    {
        value: "April",
        label: "April"
    },
    {
        value: "May",
        label: "May"
    },
    {
        value: "June",
        label: "June"
    },
    {
        value: "July",
        label: "July"
    },
    {
        value: "August",
        label: "August"
    },
    {
        value: "September",
        label: "September"
    },
    {
        value: "October",
        label: "October"
    },
    {
        value: "November",
        label: "November"
    },
    {
        value: "December",
        label: "December"
    },
];

const currentYear = new Date().getFullYear();
const yearOptions: TOption[] = [0, 1, 2, 3, 4].map((year) => ({
    value: (currentYear + year).toString(),
    label: (currentYear + year).toString(),
}))

const CreateAcademicSemester = () => {

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        const name = nameAndCodeOptions.find(option => option.value === data.code)?.label;
        const selectedData = {
            name,
            ...data
        };
        console.log(selectedData);
    }

    return (
        <Col span={6}>
            <PHForm onSubmit={onSubmit}>
                <PHSelect options={nameAndCodeOptions} name="code" label={"Name"} />
                <PHSelect options={yearOptions} name="year" label="Year" />
                <PHSelect options={monthOptions} name="startMonth" label={"Start Month"} />
                <PHSelect options={monthOptions} name="endMonth" label={"End Month"} />
                <Button htmlType="submit">Submit</Button>
            </PHForm>
        </Col>
    );
};

export default CreateAcademicSemester;