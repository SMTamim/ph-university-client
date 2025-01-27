import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInput = {
    type: string,
    name: string,
    label: string,
}

const PHInput = ({ type, name, label }: TInput) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Controller name={name} render={({ field }) => <Form.Item label={label}>
                <Input style={{ marginTop: '5px' }} type={type} id={name} {...field} />
            </Form.Item>} />
        </div>

    );
};

export default PHInput;