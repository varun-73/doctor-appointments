import React from 'react'
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useNavigate } from 'react-router-dom'
import Doctorform from '../components/Doctorform';
import moment from 'moment';
const ApplyDoctor = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        //console.log(values);
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/apply-doctor-account", 
                {
                     ...values, 
                     userId: user._id, 
                     timings : [
                        values.timings[0].format("HH:mm"),
                        values.timings[1].format("HH:mm"),
                      ],
                },
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/');
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
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1><hr />
            <Doctorform onFinish={onFinish} />
        </Layout>
    )
}

export default ApplyDoctor
