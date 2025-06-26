import Layout  from "../components/Layout"
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message} from 'antd';
import moment from "moment";
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';

function BookingPage() {
  const [doctors, setDoctors] = useState([]);
  const params = useParams();
  // const [date,setDate] = useState();
  // const [time,setTime]=useState();
  const [date,setDate] = useState(null);
  const [time,setTime]=useState(null);
  const [isAvailable,setAvailable]=useState();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const getDoctorData = async ()=> {
    try{
      //we are using post instead of get b/c we need to send doctorId which is not possible in get
      const res = await axios.post("/api/v1/doctor/getDoctorById",{doctorId:params.doctorId},
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
  const handleBooking = async ()=> {
    try{
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/book-appointment",
      {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctors,
        userInfo: user,
        date: date?.format("DD-MM-YYYY"),  // Format just before sending
        time: time?.format("HH:mm"),
      },
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token"), //setting token
        },
      });
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
      }
    }
    catch(error){
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async ()=> {
    try{
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/booking-availability",
        {doctorId:params.doctorId,
          date:date,
          time:time
        },
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token"), //setting token
        },
      });
      dispatch(hideLoading());
      if(res.data.success){
        setAvailable(true);
        message.success(res.data.message);
      }
    }
    catch(error){
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
        <h1>Booking Page</h1>
        {doctors &&
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>
              Specialization : {doctors.specialization}
            </h4>
            <h4>
              Fees : {doctors.feesPerCunsaltation}
            </h4>
            <div className="d-flex flex-column w-50">
              {/* <DatePicker format="DD-MM-YYYY" onChange={(value) => {
                  //setAvailable(false)
                  setDate(moment(value).format("DD-MM-YYYY"))
                }}
                />
              <TimePicker format ="HH:mm"
                  onChange={(value) => {
                    //setAvailable(false)
                    setTime(moment(value).format("HH:mm"))
                  }}
              /> */}
              <DatePicker
                format="DD-MM-YYYY"
                value={date}
                onChange={(value) => setDate(value)} // Keep as moment object
              />

              <TimePicker
                format="HH:mm"
                value={time}
                onChange={(value) => setTime(value)} // Keep as moment object
              />
              <button className="btn btn-primary m-2" onClick={handleAvailability}>Check Availability</button>
              
              <button className="btn btn-dark m-2" onClick={handleBooking}>Book Now</button>
              

            </div>
          </div>
          
        }
    </Layout>
  )
}

export default BookingPage
