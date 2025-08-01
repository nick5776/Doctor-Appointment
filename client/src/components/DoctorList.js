//Display sall doctors to user
import React from 'react'
import { useNavigate } from 'react-router-dom';


function DoctorList({doctor}) {
    const navigate = useNavigate();
    
  return (
    <>
        <div className='card' 
        style= {{cursor:'pointer'}}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
            <div className='card-header'>
                Dr. {doctor.firstName} {doctor.lastName}
            </div>
       
            <div className='card-body'> 
                <p>
                    <b>Specialization - </b>  {doctor.specialization}
                </p>
                <p>
                    <b>Experience - </b>  {doctor.experience}
                </p>
                <p>
                    <b>Fees Per Cunsaltation - </b>  {doctor.feesPerCunsaltation}
                </p>
                <p>
                    <b>Timings - </b>  {doctor.timings[0]} - {doctor.timings[1]}
                </p>
            </div>
         </div >
    </>
  )
}

export default DoctorList

