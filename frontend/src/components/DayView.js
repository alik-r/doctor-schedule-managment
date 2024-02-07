import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

const DayView = ({ date }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    console.log('date:', date)
    fetchAppointmentsForDate(date);
  }, [date]);

  const fetchAppointmentsForDate = async (date) => {
    try {
      const response = await axios.get(`/api/appointments?date=${date}`);
      console.log('response data:', response.data)
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`/api/appointments/delete/${id}`);
      fetchAppointmentsForDate(date);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="day-view p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Appointments for {date}</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments scheduled for this day.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-4 border border-gray-300 rounded-md shadow-md flex justify-between items-center">
              <div>
                <p className="font-semibold">Doctor ID: {appointment.doctor}</p>
                <p>Time: {appointment.start_time} - {appointment.end_time}</p>
                <p>Patient: {appointment.patient_name}</p>
              </div>
              <div>
                <Link to={`/edit-appointment/${appointment.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Edit</Link>
                <button onClick={() => handleDeleteAppointment(appointment.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayView;
