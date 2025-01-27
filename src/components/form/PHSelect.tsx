import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

export type TOption = { value: string, label: string }

type TPHSelectProps = {
    name: string,
    label: string,
    options: TOption[],
}

const PHSelect = ({ name, label, options }: TPHSelectProps) => {
    return (
        <Controller name={name} render={({ field }) => <Form.Item label={label}>
            <Select
                defaultValue={options[0].value}
                style={{ width: "100%" }}
                {...field}
                options={options}
            />
        </Form.Item>} />
    );
};

export default PHSelect;