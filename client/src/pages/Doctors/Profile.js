//jo user doctor ban chuka h use apna profile page ksa dikhega
import {React, useState, useEffect} from 'react'
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { Form, Input, Row, Col, TimePicker, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import moment from "moment";
const Profile = () => {
    const {user} = useSelector(state=> state.user);
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const handleFinish = async (values) => {
    try{
      dispatch(showLoading());
      const timings = [
        moment(values.timings[0]).format("HH:mm"),
        moment(values.timings[1]).format("HH:mm"),
      ];
      const res = await axios.post("/api/v1/doctor/updateProfile", {...values, userId:user?._id,timings}, //form se data backend ke pas chla jayega
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'), 
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    }
    catch(error){
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
    const getDoctorInfo = async() => {
        try{
            const res = await axios.post("/api/v1/doctor/getDoctorInfo",{userId:user?._id},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }
            )
            if(res.data.success){
                setDoctor(res.data.data);
            }
        }catch(error){
            console.log(error);
        }
    }
  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
        <Form layout="vertical" onFinish={handleFinish} 
        initialValues={{
          ...doctor,
          timings: [
            moment(doctor.timings[0], "HH:mm"),
            moment(doctor.timings[1], "HH:mm"),
          ],
        }}> {/* set initial values of the doctor in the fields*/}
            <h4 className=''>Personal Details </h4>
            <Row gutter={16}>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your First Name!' }]}
                >
                <Input type="text" placeholder="your name" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your Last Name!' }]}
                >
                <Input type="text" placeholder="your last name" />
                </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                >
                <Input type="text" placeholder="your phone number" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                <Input type="email" placeholder="your email" />
                </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col xs={24} md={12} lg={12}>
                <Form.Item label="Website" name="website">
                <Input type="text" placeholder="your website (optional)" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your Address!' }]}
                >
                <Input type="text" placeholder="your address" />
                </Form.Item>
            </Col>
            </Row>

            <h4 className=''>Professional Details </h4>
            <Row gutter={16}>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Specialization"
                name="specialization"
                rules={[{ required: true, message: 'Please input your specialization!' }]}
                >
                <Input type="text" placeholder="e.g. Cardiologist, Dentist" />
                </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Experience (in years)"
                name="experience"
                rules={[{ required: true, message: 'Please input your experience!' }]}
                >
                <Input type="text" placeholder="e.g. 5" />
                </Form.Item>
            </Col>
            </Row>

            <Row gutter={16}>
            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Fees Per Consultation"
                name="feesPerCunsaltation"
                rules={[{ required: true, message: 'Please input the fee!' }]}
                >
                <Input type="number" placeholder="e.g. 500" />
                </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={12}>
                <Form.Item
                label="Timings"
                name="timings"
                rules={[{ required: true, message: 'Please select working timings!' }]}
                >
                <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>

            </Col>
            </Row>
            <div className="d-flex justify-content-end">
            <button className="btn btn-primary form-btn" type="submit">
                Update
            </button>
            </div>
        </Form>
        )}
    </Layout>
  )
}

export default Profile
