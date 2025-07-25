import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Row } from 'antd';
import Layout from "../components/Layout"
import DoctorList from '../components/DoctorList';
const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async ()=> {
    try{
      const res = await axios.get("/api/v1/user/getAllDoctors",
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token"), //setting token
        },
      });
      if(res.data.success){
        setDoctors(res.data.data);
      }
    }
    catch(error){
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className='text-center'>Home Page</h1>
      <Row>
        {doctors && doctors.map(doctor => (
          <DoctorList doctor={doctor}/>
        ))}
      </Row>
    </Layout>
  )
}

export default Homepage;
