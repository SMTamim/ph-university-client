import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        id: 'A-0001',
        password: 'admin123'
    }

    const [login, { error }] = useLoginMutation();
    console.log('error => ', error);

    const onSubmit = async (data: FieldValues) => {
        // console.log(data);
        const loadingToast = toast.loading('Logging in...');
        try {
            const userCredentials = {
                id: data.id,
                password: data.password,
            };
            const res = await login(userCredentials).unwrap();
            console.log({ res });
            const user = verifyToken(res.data.accessToken) as TUser;
            dispatch(setUser({
                user,
                token: res.data.accessToken,
            }));
            toast.success('Successfully logged in!', { id: loadingToast, duration: 2000 });
            navigate(`/${user.role}/dashboard`);
        }
        catch (err) {
            console.log(err);
            toast.error('Something went wrong!', { id: loadingToast, duration: 2000 });
        }
    }

    return (
        <Row align="middle" justify="center" style={{ height: '100vh' }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <div style={{ marginBottom: '10px' }}>
                    <PHInput type="text" name="id" label="ID:" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <PHInput type="text" name="password" label="Password:" />
                </div>
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;