// src/components/Dashboard.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { AuthContext } from '../AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservationResponse, userResponse] = await Promise.all([
          axios.get('http://localhost:1337/api/reservations', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get('http://localhost:1337/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        console.log('Reservations Response:', reservationResponse.data);
        console.log('Users Response:', userResponse.data);
        setReservations(reservationResponse.data.data);
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  if (!reservations.length || !users.length) {
    return <p>Loading...</p>;
  }

  const activityData = reservations.reduce((acc, reservation) => {
    const activity = reservation.attributes.activity;
    if (!acc[activity]) acc[activity] = 0;
    acc[activity]++;
    return acc;
  }, {});

  const activityChartData = Object.keys(activityData).map((key) => ({
    name: key,
    value: activityData[key],
  }));

  const locationData = reservations.reduce((acc, reservation) => {
    const location = reservation.attributes.location;
    if (!acc[location]) acc[location] = 0;
    acc[location]++;
    return acc;
  }, {});

  const locationChartData = Object.keys(locationData).map((key) => ({
    name: key,
    value: locationData[key],
  }));

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="statistics">
        <p>Total Users: {users.length}</p>
        <p>Total Reservations: {reservations.length}</p>
      </div>

      <div className="charts-container">
        <h3>Reservations by Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <h3>Reservations by Location</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={locationChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
