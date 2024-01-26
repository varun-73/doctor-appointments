import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Doctor from '../components/Doctor';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'
function Home() {

    const [doctor, setDoctor] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get("https://doctor-appointment-lqtk.onrender.com/api/user/get-all-approved-doctors", {
                headers: {

                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            dispatch(hideLoading());
            if (response.data.success) {
                setDoctor(response.data.data);
            }

        } catch (error) {
            dispatch(hideLoading);
        }
    };

    useEffect(() => {

        getData();
    }, []);
    return (
        <Layout>
            <Row gutter={16} >
                {doctor.map((doctor) => (
                    <Col style={{ marginBottom: '16px', borderRadius: '100px' }} span={8} xs={24} sm={24} lg={8}>
                        <Doctor doctor={doctor} />
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

export default Home
