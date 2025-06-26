import {React,useEffect,useState} from 'react'
import Layout from "./../../components/Layout"
import axios from "axios";
import { Table, message } from 'antd';

const Users = () => {
  const [users,setUsers] = useState([]);
  
  const getUsers = async() => {
    try{
      const res = await axios.get("/api/v1/admin/getAllUsers",
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      if(res.data.success){
        setUsers(res.data.data);
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
//render is a function that lets you customize how the data for a particular column is displayed. Use GPT to see an example
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Is Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (record.isDoctor ? "Yes" : "No"),
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render: (text,record) => (
        <div className='d-flex'>
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ];
  return (
    <Layout>
        <h1>All Users</h1>
        <Table dataSource={users} columns={columns} pagination={{ pageSize: 10}}/>
    </Layout>
  )
}

export default Users
