import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

type TPHDatePickerProps = {
    name: string;
    label: string;
    disabled?: boolean;
}

const PHDatePicker = ({ name, label, disabled }: TPHDatePickerProps) => {
    return (
        <Controller name={name} render={({ field, fieldState: { error } }) => <Form.Item label={label} >
            <DatePicker {...field}
                disabled={disabled}
                value={field.value ? dayjs(field.value) : null}
                style={{ width: '100%' }} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>} />
    );
};

export default PHDatePicker;