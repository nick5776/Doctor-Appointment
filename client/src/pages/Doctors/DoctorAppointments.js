
import Layout from "../../components/Layout";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Table, message } from 'antd';
import { useSelector } from 'react-redux';
import moment from "moment";

const DoctorAppointments = () => {
  const { user } = useSelector(state => state.user);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.post("/api/v1/doctor/doctor-appointments", {
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

  const handleStatus = async(record, status) => {
    try {
      const res = await axios.post("/api/v1/doctor/update-status", {
        appointmentsId:record._id, status
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }); 
      if (res.data.success) {
        getAppointments();
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong.");
    }
  }
 
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
    {
      title:"Actions",
      dataIndex:"actions",
      render : (text,record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button className="btn btn-primary" onClick={()=> handleStatus(record,"approved")}>Approve</button>
              <button className="btn btn-danger ms-2" onClick={()=> handleStatus(record,"rejected")}>Reject</button>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <Layout>
      <h1>All Appointments</h1>
      <Table columns={columns} dataSource={appointments}></Table>
    </Layout>
  );
};
export default DoctorAppointments;


