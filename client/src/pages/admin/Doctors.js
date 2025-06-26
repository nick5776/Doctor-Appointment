//display all active doctors to the admin
import {React,useEffect,useState} from 'react'
import Layout from "./../../components/Layout"
import axios from "axios";
import { Table, message } from 'antd';

const Doctors = () => {
  const [Doctors,setDoctors] = useState([]);
  
  const getDoctors = async() => {
    try{
      const res = await axios.get("/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      if(res.data.success){
        setDoctors(res.data.data);
      }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getDoctors();
  }, []); 
/*Fetches user data from the backend once, when the component first loads.
Dependency array tells react when to run this getUsers function.
Empty array [] -> Effect runs only once, when the component is first mounted.
[count] ->  Runs on mount and every time count changes.

render is a function that lets you customize how the data for a particular column is displayed. Use GPT to see an example
*/
  const handleAccountStatus = async (record,status)=>{
    try{
      const res = await axios.post("/api/v1/admin/changeAccountStatus",
        {doctorId:record._id, userId:record.userId, status:status}, //userId is not being used in backend
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      if(res.data.success){
        message.success(res.data.messge);
        window.location.reload(); //approve krne ke bad block ka button show hojayega admin ko refresh hone ke bad
      }
    }catch(error){
      message.error("Something went wrong");
    }
  }
  const columns = [
    {
      title: "Full Name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title:"Actions",
      dataIndex:"actions",
      render: (text,record) => (
        <div className='d-flex'>
          {record.status==="pending" ? (<button className='btn btn-success' onClick= {()=> handleAccountStatus(record,"approved")}>Approve</button>)
          : (<button className='btn btn-danger'>Block</button>)}
        </div>
      )
    }
  ];

  return (
    <Layout>
        <h1>All Doctors</h1>
        <Table dataSource={Doctors} columns={columns} pagination={{ pageSize: 10 }}/>
    </Layout>
  )
}

export default Doctors








