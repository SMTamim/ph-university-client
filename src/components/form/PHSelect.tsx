import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

export type TOption = { value: string, label: string }

type TPHSelectProps = {
    name: string,
    label: string,
    options: TOption[],
    disabled?: boolean,
}

const PHSelect = ({ name, label, options, disabled }: TPHSelectProps) => {
    return (
        <Controller name={name} render={({ field, fieldState: { error } }) => <Form.Item label={label}>
            <Select
                disabled={disabled}
                // defaultValue={options[0].value}
                style={{ width: "100%" }}
                {...field}
                options={options}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>} />
    );
};

export default PHSelect;