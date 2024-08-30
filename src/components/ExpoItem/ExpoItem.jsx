/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../UI/Button';
import "../ExpoItem/ExpoItem.css";
import Expo from "../../assets/images/Expo.jpg";
import eye from "../../assets/icons/eye.svg";
import heart from "../../assets/icons/heart.svg";
import location from "../../assets/icons/location.svg";
import Star from "../../assets/icons/Star.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchExpoDetails } from '../../util/ExposHttp';
import { useAuth } from "../../context/AuthContext";

const ExpoItem = ({ expo }) => {

    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <li className="Expo-item">
            <article>
                <div className='tools'>
                </div>
                <img src={expo.profile_picture} alt="Expo" />
                <div>
                    <div className='Expo-item-header'>
                        <h3>{expo.title}</h3>
                        <div className='Expo-item-icons'>
                            <img src={Star} alt="Star icon" />
                            <p className="Expo-item-info"> 4.7</p>
                        </div>
                    </div>
                    <p className="Expo-item-Date">{expo.start_at}</p>
                </div>
                <div className='Expo-item-icons'>
                    <img src={location} alt="Location icon" />
                    <p className="Expo-item-info">{expo.location}</p>
                </div>
                <div className="Expo-item-footer">
                    <div className='Expo-item-icons'>
                        <img src={eye} alt="View icon" />
                        <p className="Expo-item-info"> {expo.status}</p>
                        <img src={heart} alt="Favorite icon" />
                        <p className="Expo-item-info"> 3,22</p>
                    </div>
                    <div className="Expo-item-actions">
                        <Link to={`/dashboard/Activity/${expo.id}/details`} key={expo.id} className="Expo-item-link">
                            <Button>book</Button>
                        </Link>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default ExpoItem;
