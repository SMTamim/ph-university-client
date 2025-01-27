import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInput = {
    type: string,
    name: string,
    label: string,
}

const PHInput = ({ type, name, label }: TInput) => {
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller name={name} render={({ field }) => <Input style={{ marginTop: '5px' }} type={type} id={name} {...field} />} />
        </>

    );
};

export default PHInput;