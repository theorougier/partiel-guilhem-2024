// src/components/Calendar.js
import React, { useState, useContext } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import { AuthContext } from '../AuthContext';
import { format } from 'date-fns';

const CalendarPage = () => {
  const [activity, setActivity] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleReservation = async () => {
    if (!activity || !location || !date || !time) {
      setMessage('Merci de remplir tous les champs');
      return;
    }

    // Formater la date pour éviter les problèmes de décalage
    const formattedDate = format(date, 'yyyy-MM-dd');

    try {
      const response = await axios.post(
        'http://localhost:1337/api/reservations',
        {
          data: {
            activity,
            location,
            date: formattedDate, 
            time,
            user: 1, // Remplacez par l'ID utilisateur dynamique si nécessaire
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Reservation réussi !');
    } catch (error) {
      setMessage(error.response?.data?.message || 'La réservation a échoué');
    }
  };

  return (
    <div className="calendar-container">
      <h2>Réservez votre activité</h2>
      <div className="form-group">
        <label>Activité:</label>
        <select value={activity} onChange={handleActivityChange}>
          <option value="">Choisissez votre activité</option>
          <option value="Padel">Padel</option>
          <option value="Gym">Gym</option>
          <option value="Tennis">Tennis</option>
          {/* Add more activities as needed */}
        </select>
      </div>
      <div className="form-group">
        <label>Choisissez votre club:</label>
        <select value={location} onChange={handleLocationChange}>
          <option value="">Choisissez un club</option>
          <option value="Forest Hill La Défense">Forest Hill La Défense</option>
          <option value="Forest Hill Aquaboulevard">Forest Hill Aquaboulevard</option>
          <option value="Forest Hill Timing Paris Sud">Forest Hill Timing Paris Sud</option>
          <option value="Forest Hill La Marche-Marnes-La-Coquette">Forest Hill La Marche-Marnes-La-Coquette</option>
          <option value="Forest Hill Versailles">Forest Hill Versailles</option>
          <option value="Meudon Bord de Seine">Meudon Bord de Seine</option>
          {/* Add more locations as needed */}
        </select>
      </div>
      <div className="form-group">
        <label>Choisissez une Date:</label>
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="form-group">
        <label>Sélectionez une heure:</label>
        <select value={time} onChange={handleTimeChange}>
          <option value="">Choisissez un créneau</option>
          {Array.from({ length: 17 }, (_, i) => (
            <option key={i} value={`${7 + i}:00`}>{`${7 + i}:00`}</option>
          ))}
        </select>
      </div>
      <button className="reserve-button" onClick={handleReservation}>Réserver</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CalendarPage;
