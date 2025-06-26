import React from 'react';
import "../styles/RegisterStyles.css";
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux'; //You want to tell Redux to do something — like change some state. To do that, you dispatch an action using useDispatch.
import {hideLoading, showLoading} from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registration Success");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='form-container'>
      <Form 
        layout="vertical"
        onFinish={onFinishHandler}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className='text-center'>Register Form</h1>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" />
        </Form.Item>

        <Link to="/login" className='m-2'>Already a user Login here</Link>

        <button className='btn btn-primary' type="submit">Register</button>
      </Form>
    </div>
  );
};

export default Register;
