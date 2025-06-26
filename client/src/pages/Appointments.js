import Layout from "../components/Layout";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Table, message } from 'antd';
import { useSelector } from 'react-redux';
import moment from "moment";
const Appointments = () => {
  const { user } = useSelector(state => state.user);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.post("/api/v1/user/user-appointments", {
        userId: user._id
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }); 
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error("Failed to load appointments.");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text,record) => (
    //     <span>
    //         {record.doctorId.firstName} {record.doctorId.firstName}
    //     </span>
    //   )
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text,record) => (
    //     <span>
    //         {record.doctorId.phone}
    //     </span>
    //   )
    // },
    {
      title: "Date",
      dataIndex: "date",
      render: (text,record) => (
        <span>
            {record.date}
        </span>
      )
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text,record) => (
        <span>
            {record.time}
        </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <Layout>
      <h1>All Appointments</h1>
      <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  );
};

export default Appointments;
