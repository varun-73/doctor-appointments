import React from 'react'
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("https://doctor-appointment-lqtk.onrender.com/api/user/login", values);
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/");
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            dispatch(hideLoading());
            toast.error("Somthing went wrong...", error)
        }
    }

    return (
        <div className='authentication'>
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Welcom Back</h1>
                <Form layout='vertical' onFinish={onFinish}>

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' type='email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='Password' type='password' />
                    </Form.Item>

                    <div className='d-flex flex-column'>
                        <Button className='primary-button my-2 full-width-button' htmlType='submit'>LOGIN</Button><br />
                        <Link to='/register' className='anchor '>CLICK HERE TO REGISTER</Link>

                    </div>
                </Form>
            </div>

        </div>
    )
}

export default Login
