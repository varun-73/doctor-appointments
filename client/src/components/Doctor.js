import React from 'react'
import { useNavigate } from 'react-router-dom'

const Doctor = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className='card p-2 cursor-pointer' onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
      <h1 className='card-title'>{doctor.firstName} {doctor.lastName}</h1>
      <p style={{ marginBottom: '-1px' }}>({doctor.specialization})</p>
      <hr style={{ border: 'none', borderTop: '2px solid rgba(30, 81, 3, 0.931)', margin: '5px 0' }} />
      <p><b>Phone Number : </b>{doctor.phoneNumber}</p>
      <p><b>Address : </b>{doctor.address}</p>
      <p><b>Fee per Visit : </b>{doctor.feeForConsultation}</p>
      <p><b>Timings : </b>{doctor.timings[0]} - {doctor.timings[1]}</p>
    </div>

  )
}

export default Doctor