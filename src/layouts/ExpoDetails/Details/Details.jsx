/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import location2 from "../../../assets/icons/location2.png";
import "./Details.css";
import { useAuth } from "../../../context/AuthContext";

const Details = () => {
  const { expo } = useOutletContext();
  const [status, setStatus] = useState(expo.data.status || 'Pending');
  const [feedback, setFeedback] = useState('');
  const { user } = useAuth();

  const {
    title,
    profile_picture,
    description,
    start_at,
    end_at,
    location,
    ticket_in_place,
    ticket_in_place_price,
    ticket_in_virtual_price,
    ticket_prime,
    ticket_prime_price,
    width,
    height,
    block_size
  } = expo.data;



  return (
    <div className='expo-details-div'>
      <div className='expo-header'>
        <img src={profile_picture} alt={title} className="expo-details-image" />
        <div className='expo-header-info'>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="expo-location-info">
            <img src={location2} alt="Location icon" className="expo-location-icon" />
            <p>{location}</p>
          </div>
        </div>
      </div>

      <div className="expo-details-info">
        <div className="expo-date-info">
          <p><strong>Start Date:</strong> {start_at}</p>
          <p><strong>End Date:</strong> {end_at}</p>
        </div>

        <div className="expo-ticket-info">
          <h3>Ticket Information</h3>
          <p><strong>In-Place Tickets:</strong> {ticket_in_place} available at ${ticket_in_place_price}</p>
          <p><strong>Virtual Tickets:</strong> ${ticket_in_virtual_price}</p>
          <p><strong>Prime Tickets:</strong> {ticket_prime} available at ${ticket_prime_price}</p>
        </div>

        <div className="expo-dimensions-info">
          <h3>Dimensions & Block Size</h3>
          <p><strong>Width:</strong> {width} units</p>
          <p><strong>Height:</strong> {height} units</p>
          <p><strong>Block Size:</strong> {block_size} units</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
