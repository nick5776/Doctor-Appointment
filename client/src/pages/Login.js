import React from 'react';
import "../styles/LoginStyles.css";
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from 'react-redux'; //You want to tell Redux to do something — like change some state. To do that, you dispatch an action using useDispatch.
import {hideLoading, showLoading} from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading()); //Immediately tells Redux to set loading = true, app sees loading = true and shows the Spinner.

      const res = await axios.post("/api/v1/user/login", values); //This starts running immediately after the dispatch(showLoading()). JavaScript does not wait for the spinner to finish showing. Spinner and API call run in parallel.
      
      dispatch(hideLoading()); //dispatch(hideLoading()) → sets loading = false → spinner disappears. Then based on res.data.success, it navigates or shows a message.
      
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Success");
        navigate("/");
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
  return(
    <div className='form-container'>
      <Form 
        layout="vertical"
        onFinish={onFinishHandler}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className='text-center'>
          Login Form
        </h1>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email"/> 
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" />
        </Form.Item>
        <Link to="/register" className='m-2'>Not a user register here</Link>
        <button className='btn btn-primary' type="submit"> Login </button>

      </Form>
    </div>
  )
};
export default Login;
